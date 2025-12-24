# 📚 API Documentation - Test Cases

## Base URL
```
/api/test-cases
```

---

## 📋 Endpoints Overview

| Method | Endpoint | Auth | Permission | Description |
|--------|----------|------|------------|-------------|
| GET | `/` | ✅ | COURSE_READ | Lấy tất cả test cases |
| GET | `/:testCaseId` | ✅ | COURSE_READ | Lấy test case theo ID |
| GET | `/lesson/:lessonId` | ❌ | - | Lấy test cases của một bài học |
| POST | `/` | ✅ | COURSE_CREATE | Tạo test case mới |
| PUT | `/:testCaseId` | ✅ | COURSE_UPDATE | Cập nhật test case |
| DELETE | `/:testCaseId` | ✅ | COURSE_DELETE | Xóa test case |

---

## 1️⃣ GET `/api/test-cases/`

### Mô tả
Lấy tất cả test cases trong hệ thống

### Authentication
- ✅ **Required**: Bearer Token
- **Permission**: `COURSE_READ`

### Request
```http
GET /api/test-cases/ HTTP/1.1
Host: localhost:3000
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Response Success (200)
```json
{
  "success": true,
  "message": "Lấy tất cả test cases thành công",
  "data": [
    {
      "testCaseId": "550e8400-e29b-41d4-a716-446655440000",
      "lessonId": "cddf551b-fa03-491a-898d-703beb441898",
      "description": "Nhập xin chào với thẻ h1",
      "input": "123",
      "expectedOutput": "123",
      "testCodes": "function validateH1(html) {\n  const h1Regex = /<h1\\b[^>]*>([\\s\\S]*?)<\\/h1>/i;\n  const match = html.match(h1Regex);\n  if (!match) {\n    return { ok: false, error: \"Không tìm thấy thẻ <h1>\" };\n  }\n  return { ok: true };\n}",
      "created_at": "2025-12-12T09:00:00.000Z",
      "updated_at": "2025-12-12T09:00:00.000Z"
    }
  ]
}
```

### Response Empty (200)
```json
{
  "success": true,
  "message": "Chưa có test case",
  "data": []
}
```

---

## 2️⃣ GET `/api/test-cases/:testCaseId`

### Mô tả
Lấy thông tin chi tiết của một test case theo ID

### Authentication
- ✅ **Required**: Bearer Token
- **Permission**: `COURSE_READ`

### Parameters
| Name | Type | Location | Required | Description |
|------|------|----------|----------|-------------|
| testCaseId | UUID | Path | ✅ | ID của test case |

### Request
```http
GET /api/test-cases/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
Host: localhost:3000
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Response Success (200)
```json
{
  "success": true,
  "message": "Lấy thành công test case theo ID",
  "data": {
    "testCaseId": "550e8400-e29b-41d4-a716-446655440000",
    "lessonId": "cddf551b-fa03-491a-898d-703beb441898",
    "description": "Nhập xin chào với thẻ h1",
    "input": "123",
    "expectedOutput": "123",
    "testCodes": "function validateH1(html) {...}",
    "created_at": "2025-12-12T09:00:00.000Z",
    "updated_at": "2025-12-12T09:00:00.000Z"
  }
}
```

### Response Not Found (404)
```json
{
  "success": false,
  "message": "Không tìm thấy test case cần tìm."
}
```

---

## 3️⃣ GET `/api/test-cases/lesson/:lessonId` ⭐

### Mô tả
Lấy tất cả test cases của một bài học cụ thể

### Authentication
- ❌ **Not Required** (Public endpoint)
- Cho phép xem test cases nếu lesson là preview hoặc user đã enroll

### Parameters
| Name | Type | Location | Required | Description |
|------|------|----------|----------|-------------|
| lessonId | UUID | Path | ✅ | ID của bài học |

### Request
```http
GET /api/test-cases/lesson/cddf551b-fa03-491a-898d-703beb441898 HTTP/1.1
Host: localhost:3000
```

### Response Success (200)
```json
{
  "success": true,
  "message": "Lấy tất cả test cases thành công",
  "data": [
    {
      "testCaseId": "550e8400-e29b-41d4-a716-446655440000",
      "lessonId": "cddf551b-fa03-491a-898d-703beb441898",
      "description": "Nhập xin chào với thẻ h1",
      "input": "123",
      "expectedOutput": "123",
      "testCodes": "function validateH1(html) {\n  const h1Regex = /<h1\\b[^>]*>([\\s\\S]*?)<\\/h1>/i;\n  const match = html.match(h1Regex);\n  if (!match) {\n    return { ok: false, error: \"Không tìm thấy thẻ <h1>\" };\n  }\n  const innerText = match[1].replace(/<[^>]*>/g, '').trim();\n  if (innerText !== \"Xin chào\") {\n    return { ok: false, error: `Nội dung <h1> phải là \"Xin chào\"` };\n  }\n  return { ok: true };\n}",
      "created_at": "2025-12-12T09:00:00.000Z",
      "updated_at": "2025-12-12T09:00:00.000Z"
    }
  ]
}
```

### Response No Test Cases (200)
```json
{
  "success": true,
  "message": "Bài học này không có test case",
  "data": []
}
```

---

## 4️⃣ POST `/api/test-cases/`

### Mô tả
Tạo test case mới cho một bài học

### Authentication
- ✅ **Required**: Bearer Token
- **Permission**: `COURSE_CREATE`

### Request Body
| Field | Type | Required | Max Length | Description |
|-------|------|----------|------------|-------------|
| lessonId | UUID | ✅ | - | ID của bài học |
| description | String | ✅ | 5000 | Mô tả yêu cầu test case |
| input | String | ❌ | 5000 | Dữ liệu đầu vào (optional) |
| expectedOutput | String | ❌ | 5000 | Kết quả mong đợi (optional) |
| testCodes | String | ❌ | - | Code để kiểm tra (optional) |

### Request
```http
POST /api/test-cases/ HTTP/1.1
Host: localhost:3000
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "lessonId": "cddf551b-fa03-491a-898d-703beb441898",
  "description": "Nhập xin chào với thẻ h1",
  "input": "123",
  "expectedOutput": "123",
  "testCodes": "function validateH1(html) {\n  const h1Regex = /<h1\\b[^>]*>([\\s\\S]*?)<\\/h1>/i;\n  const match = html.match(h1Regex);\n  if (!match) {\n    return { ok: false, error: \"Không tìm thấy thẻ <h1>\" };\n  }\n  const innerText = match[1].replace(/<[^>]*>/g, '').trim();\n  if (innerText !== \"Xin chào\") {\n    return { ok: false, error: `Nội dung <h1> phải là \"Xin chào\"` };\n  }\n  return { ok: true };\n}"
}
```

### Response Success (200)
```json
{
  "success": true,
  "message": "Thêm mới thành công test case",
  "data": {
    "testCaseId": "550e8400-e29b-41d4-a716-446655440000",
    "lessonId": "cddf551b-fa03-491a-898d-703beb441898",
    "description": "Nhập xin chào với thẻ h1",
    "input": "123",
    "expectedOutput": "123",
    "testCodes": "function validateH1(html) {...}",
    "created_at": "2025-12-12T09:00:00.000Z",
    "updated_at": "2025-12-12T09:00:00.000Z"
  }
}
```

### Response Validation Error (400)
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "lessonId",
      "message": "lessonId là bắt buộc"
    },
    {
      "field": "description",
      "message": "Mô tả là bắt buộc"
    }
  ]
}
```

---

## 5️⃣ PUT `/api/test-cases/:testCaseId`

### Mô tả
Cập nhật thông tin test case

### Authentication
- ✅ **Required**: Bearer Token
- **Permission**: `COURSE_UPDATE`

### Parameters
| Name | Type | Location | Required | Description |
|------|------|----------|----------|-------------|
| testCaseId | UUID | Path | ✅ | ID của test case cần cập nhật |

### Request Body
Tất cả các field đều **optional**:

| Field | Type | Max Length | Description |
|-------|------|------------|-------------|
| description | String | 5000 | Mô tả test case |
| input | String | 5000 | Dữ liệu đầu vào |
| expectedOutput | String | 5000 | Kết quả mong đợi |
| testCodes | String | - | Code để kiểm tra |

### Request
```http
PUT /api/test-cases/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
Host: localhost:3000
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "description": "Nhập xin chào với thẻ h1 (Updated)",
  "testCodes": "function validateH1(html) { /* updated code */ }"
}
```

### Response Success (200)
```json
{
  "success": true,
  "message": "Cập nhật test case thành công",
  "data": {
    "testCaseId": "550e8400-e29b-41d4-a716-446655440000",
    "lessonId": "cddf551b-fa03-491a-898d-703beb441898",
    "description": "Nhập xin chào với thẻ h1 (Updated)",
    "input": "123",
    "expectedOutput": "123",
    "testCodes": "function validateH1(html) { /* updated code */ }",
    "created_at": "2025-12-12T09:00:00.000Z",
    "updated_at": "2025-12-12T10:30:00.000Z"
  }
}
```

---

## 6️⃣ DELETE `/api/test-cases/:testCaseId`

### Mô tả
Xóa test case

### Authentication
- ✅ **Required**: Bearer Token
- **Permission**: `COURSE_DELETE`

### Parameters
| Name | Type | Location | Required | Description |
|------|------|----------|----------|-------------|
| testCaseId | UUID | Path | ✅ | ID của test case cần xóa |

### Request
```http
DELETE /api/test-cases/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
Host: localhost:3000
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Response Success (200)
```json
{
  "success": true,
  "message": "Xóa test case thành công",
  "data": {
    "testCaseId": "550e8400-e29b-41d4-a716-446655440000",
    "lessonId": "cddf551b-fa03-491a-898d-703beb441898",
    "description": "Nhập xin chào với thẻ h1",
    "input": "123",
    "expectedOutput": "123",
    "testCodes": "function validateH1(html) {...}",
    "created_at": "2025-12-12T09:00:00.000Z",
    "updated_at": "2025-12-12T09:00:00.000Z"
  }
}
```

---

## 🔐 Authentication

Tất cả các endpoint (trừ `GET /lesson/:lessonId`) yêu cầu Bearer Token:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🎯 Permissions

| Permission | Description |
|------------|-------------|
| COURSE_READ | Xem test cases |
| COURSE_CREATE | Tạo test case mới |
| COURSE_UPDATE | Cập nhật test case |
| COURSE_DELETE | Xóa test case |

## 📝 Validation Rules

### Create Test Case
- `lessonId`: Bắt buộc, phải là UUID hợp lệ
- `description`: Bắt buộc, không được rỗng, tối đa 5000 ký tự
- `input`: Optional, tối đa 5000 ký tự
- `expectedOutput`: Optional, tối đa 5000 ký tự
- `testCodes`: Optional, không giới hạn độ dài

### Update Test Case
- Tất cả các field đều optional
- Validation tương tự như Create

## 🧪 Example Test Code

### JavaScript Validation Function
```javascript
function validateH1(html) {
  // Regex tìm thẻ <h1>...</h1>
  const h1Regex = /<h1\b[^>]*>([\s\S]*?)<\/h1>/i;
  
  const match = html.match(h1Regex);
  if (!match) {
    return {
      ok: false,
      error: "Không tìm thấy thẻ <h1>...</h1>."
    };
  }
  
  // Lấy nội dung bên trong thẻ
  const innerText = match[1].replace(/<[^>]*>/g, '').trim();
  
  if (innerText !== "Xin chào") {
    return {
      ok: false,
      error: `Nội dung <h1> phải là "Xin chào" nhưng bạn nhập: "${innerText}".`
    };
  }
  
  return { ok: true };
}
```

## 🔗 Related APIs

- **Lessons API**: `/api/lessons`
- **Code Submissions API**: `/api/code-submissions`
- **Test Code Execution API**: `/api/test-code`

---

**Version:** 1.0  
**Last Updated:** 2025-12-12  
**Maintained by:** Hutech-Edu Development Team
