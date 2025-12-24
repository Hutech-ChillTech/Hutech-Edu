# 🔧 HƯỚNG DẪN SỬA LỖI FRONTEND

## 📋 TÓM TẮT

Backend đã được cập nhật với cấu trúc API mới. Frontend cần sửa 3 chỗ chính:

1. Cấu trúc response `learningSpeed` đã thay đổi
2. Endpoint certificate đã thay đổi
3. Authentication header cần được thêm vào
4. **⚠️ QUAN TRỌNG: Không nhầm lẫn giữa `certificateId` (UUID) và `certificateURL` (đường dẫn PDF)**

---

## ⚠️ LƯU Ý QUAN TRỌNG

### **CertificateId vs CertificateURL**

❌ **SAI:**

```typescript
// Đang dùng certificateURL thay vì certificateId
const pdfUrl = certificate.certificateURL; // "certificate_xxx.pdf"
fetch(`/api/certificates/${pdfUrl}`); // ❌ Sai! Đây là URL không phải ID
```

✅ **ĐÚNG:**

```typescript
// Dùng certificateId (UUID)
const certificateId = certificate.certificateId; // "uuid-format"
fetch(`/api/certificates/${certificateId}`); // ✅ Đúng!

// Để tải PDF, dùng trực tiếp certificateURL
if (certificate.certificateURL) {
  window.open(certificate.certificateURL, "_blank"); // ✅ Đúng!
}
```

---

## ✅ LỖI 1: LessonDetailPage.tsx - Đọc sai cấu trúc recommendations

### Tìm đoạn code (khoảng dòng 433):

```typescript
const speed = recommendations.learningSpeed;
```

### Thay bằng:

```typescript
const { currentCourse, recommendedLevel, reason, courses } = recommendations;
```

### Hoặc nếu chỉ cần courses:

```typescript
const courses = recommendations.courses;
```

---

## ✅ LỖI 2: certificate.service.ts - Sửa hàm getUserCertificateInCourse

### Tìm toàn bộ hàm:

```typescript
export const getUserCertificateInCourse = async (
  userId: string,
  courseId: string
) => {
  const response = await fetch(`${API_URL}/certificates/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.userId;
};
```

### Thay toàn bộ bằng:

```typescript
export const getUserCertificateInCourse = async (courseId: string) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/certificates/course/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Certificate not found");
  }

  const result = await response.json();
  return result.data;
};
```

---

## ✅ LỖI 3: LessonDetailPage.tsx - Thay thế hàm onQuizComplete

### Tìm toàn bộ hàm onQuizComplete (khoảng dòng 400-470):

### Thay toàn bộ bằng:

```typescript
const onQuizComplete = async (result: { passed: boolean; score: number }) => {
  try {
    console.log("✅ Quiz completed:", result);

    // 1. Lấy course progress
    const progressData = await courseService.getCourseProgress(
      userId,
      courseId
    );
    console.log("📊 Course progress after quiz:", progressData.percentage, "%");

    // 2. Nếu hoàn thành 100%
    if (progressData.percentage === 100) {
      console.log("🎉 Showing course completion modal!");
      setShowCourseCompletionModal(true);

      try {
        // 3. Lấy recommendations (CẤU TRÚC MỚI)
        const recommendations = await learningSpeedService.calculateSpeed({
          userId,
          courseId,
        });

        // Sử dụng cấu trúc mới
        console.log("📚 Recommended courses:", recommendations.courses);
        setRecommendedCourses(recommendations.courses);

        if (recommendations.recommendedLevel) {
          setRecommendedLevel(recommendations.recommendedLevel);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }

      try {
        // 4. Xử lý certificate
        let certificate;
        const token = localStorage.getItem("token");

        try {
          // Thử tạo certificate mới
          const issueResponse = await fetch(
            `http://localhost:3000/api/certificates/issue/${courseId}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (issueResponse.ok) {
            const { data } = await issueResponse.json();
            certificate = data.certificate;
            console.log("✅ Certificate created:", certificate);
          } else if (issueResponse.status === 400) {
            throw new Error("Already has certificate");
          }
        } catch (issueError) {
          // Lấy certificate đã tồn tại
          const getResponse = await fetch(
            `http://localhost:3000/api/certificates/course/${courseId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (getResponse.ok) {
            const { data } = await getResponse.json();
            certificate = data;
            console.log("✅ Certificate retrieved:", certificate);
          }
        }

        if (certificate) {
          setCertificate(certificate);
        }
      } catch (error) {
        console.error("Error handling certificate:", error);
      }
    }
  } catch (error) {
    console.error("Error in onQuizComplete:", error);
  }
};
```

---

## 📊 CẤU TRÚC API MỚI

### 1. Learning Speed API

**Endpoint:** `POST /api/learning-speed/calculate`

**Request:**

```json
{
  "userId": "string",
  "courseId": "string"
}
```

**Response (CẤU TRÚC MỚI):**

```json
{
  "success": true,
  "data": {
    "currentCourse": {
      "courseName": "Khóa học ABC",
      "level": "Basic",
      "subLevel": "Low",
      "position": 1
    },
    "recommendedLevel": {
      "level": "Basic",
      "subLevel": "Medium",
      "position": 2
    },
    "reason": "Bạn đã hoàn thành Khóa học ABC. Gợi ý khóa học tiếp theo!",
    "courses": [
      {
        "courseId": "uuid",
        "courseName": "Khóa học XYZ",
        "level": "Basic",
        "subLevel": "Medium",
        "description": "...",
        "thumbnail": "..."
      }
    ]
  }
}
```

### 2. Certificate API

#### Tạo Certificate

**Endpoint:** `POST /api/certificates/issue/:courseId`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "certificate": {
      "certificateId": "uuid",
      "userId": "uuid",
      "courseId": "uuid",
      "certificateTitle": "Chứng chỉ hoàn thành khóa học ABC",
      "averageScore": 85.5,
      "totalScore": 171,
      "maxScore": 200,
      "issueDate": "2025-12-24T10:30:00.000Z",
      "certificateURL": null
    },
    "message": "Chúc mừng! Bạn đã nhận được certificate với điểm 85.50%"
  }
}
```

#### Lấy Certificate của Course

**Endpoint:** `GET /api/certificates/course/:courseId`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "certificateId": "uuid",
    "userId": "uuid",
    "courseId": "uuid",
    "certificateTitle": "Chứng chỉ hoàn thành khóa học ABC",
    "averageScore": 85.5,
    "totalScore": 171,
    "maxScore": 200,
    "issueDate": "2025-12-24T10:30:00.000Z",
    "certificateURL": "https://..."
  }
}
```

#### Lấy Tất Cả Certificates

**Endpoint:** `GET /api/certificates/my-certificates`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "certificateId": "uuid",
      "certificateTitle": "...",
      "averageScore": 85.5,
      "issueDate": "2025-12-24T10:30:00.000Z",
      "course": {
        "courseName": "...",
        "thumbnail": "..."
      }
    }
  ]
}
```

---

## 🔐 LƯU Ý VỀ AUTHENTICATION

Tất cả API calls phải có header:

```typescript
const token = localStorage.getItem("token");

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};
```

---

## ✅ CHECKLIST

- [ ] Sửa `LessonDetailPage.tsx` dòng ~433: `recommendations.learningSpeed` → `recommendations.courses`
- [ ] Sửa `certificate.service.ts`: Thay endpoint từ `/user/${userId}` → `/course/${courseId}`
- [ ] Sửa `LessonDetailPage.tsx`: Thay toàn bộ hàm `onQuizComplete`
- [ ] Kiểm tra tất cả API calls có header `Authorization`
- [ ] Test flow: Làm quiz → Hoàn thành course → Nhận certificate
- [ ] Kiểm tra console log không còn lỗi

---

## 🚀 FLOW HOÀN CHỈNH

1. **User làm quiz** → Submit answers
2. **Backend tính điểm** → Trả về kết quả
3. **Frontend check progress** → Nếu = 100%:
   - Gọi API tạo certificate (sẽ nhận `certificateId` trong response)
   - Lấy danh sách khóa học gợi ý
   - Hiển thị modal chúc mừng + certificate + recommendations
4. **User có thể**:
   - Xem certificate (dùng `certificateId`)
   - Download/Print certificate (dùng `certificateURL` nếu có)
   - Chọn khóa học tiếp theo từ recommendations

### ⚠️ Phân biệt khi nào dùng gì:

| Mục đích                  | Dùng field       | Ví dụ                                   |
| ------------------------- | ---------------- | --------------------------------------- |
| Lấy thông tin certificate | `certificateId`  | `GET /api/certificates/{certificateId}` |
| Tải file PDF              | `certificateURL` | `window.open(certificateURL)`           |
| Hiển thị chi tiết         | `certificateId`  | Gọi API với UUID                        |
| Download trực tiếp        | `certificateURL` | Link tải file                           |

### Code mẫu xử lý certificate:

```typescript
// Sau khi nhận certificate từ API
const certificate = {
  certificateId: "550e8400-e29b-41d4-a716-446655440000", // UUID
  certificateURL: "https://domain.com/certificates/cert_123.pdf", // PDF URL
  // ... other fields
};

// ✅ Để xem chi tiết certificate
const viewCertificate = async () => {
  const response = await fetch(
    `/api/certificates/${certificate.certificateId}`, // Dùng certificateId
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await response.json();
};

// ✅ Để tải PDF
const downloadPDF = () => {
  if (certificate.certificateURL) {
    window.open(certificate.certificateURL, "_blank"); // Dùng certificateURL
  } else {
    alert("Certificate PDF chưa được tạo");
  }
};

// ❌ SAI - Đừng làm thế này
const wrong = async () => {
  // Đừng dùng certificateURL làm certificateId
  await fetch(`/api/certificates/${certificate.certificateURL}`); // ❌ SAI!
};
```

---

## 📞 HỖ TRỢ

Nếu gặp lỗi:

1. Kiểm tra backend đã restart chưa
2. Kiểm tra token có trong localStorage không
3. Kiểm tra console log để xem response từ API
4. Đảm bảo courseId và userId đúng

**Backend changes:** Đã hoàn thành ✅  
**Frontend changes:** Cần thực hiện theo document này ⏳
