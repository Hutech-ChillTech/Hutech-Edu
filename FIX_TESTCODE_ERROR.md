# 🔧 Hướng dẫn sửa lỗi Test Case

## ❌ Lỗi gặp phải

```
Unknown argument `testCode`. Did you mean `testCodes`?
```

## 🎯 Nguyên nhân

Tên trường trong code không khớp với schema Prisma:
- ❌ Code đang dùng: `testCode` (số ít)
- ✅ Schema Prisma: `testCodes` (số nhiều)

## ✅ Đã sửa (Backend)

### 1. File: `src/validators/testCase.validate.ts`
Đã đổi tất cả `testCode` → `testCodes`

```typescript
// ✅ ĐÃ SỬA
export const createTestCaseSchema = Joi.object({
  lessonId: Joi.string().pattern(uuidPattern).required(),
  description: Joi.string().required().max(5000),
  input: Joi.string().optional().allow(null, "").max(5000),
  expectedOutput: Joi.string().optional().allow(null, "").max(5000),
  testCodes: Joi.string().optional().allow(null, ""),  // ✅ testCodes
})
```

## 🚨 CẦN SỬA (Frontend)

### Tìm file frontend gọi API `POST /api/test-cases/`

Theo error log, file có thể là:
- `LessonList.tsx` (dòng 995)
- Hoặc file service: `testCase.service.ts` (frontend)

### Cách sửa:

**TÌM đoạn code này:**
```typescript
// ❌ SAI
const data = {
  lessonId: "cddf551b-fa03-491a-898d-703beb441898",
  description: "Nhập xin chào với thẻ h1",
  input: "123",
  expectedOutput: "123",
  testCode: "function validateH1(html) {...}"  // ❌ SAI
}

await createTestCase(data);
```

**ĐỔI THÀNH:**
```typescript
// ✅ ĐÚNG
const data = {
  lessonId: "cddf551b-fa03-491a-898d-703beb441898",
  description: "Nhập xin chào với thẻ h1",
  input: "123",
  expectedOutput: "123",
  testCodes: "function validateH1(html) {...}"  // ✅ ĐÚNG
}

await createTestCase(data);
```

## 📋 API Test Case Reference

### POST `/api/test-cases/`

**Request Body:**
```json
{
  "lessonId": "uuid",
  "description": "Mô tả test case",
  "input": "Input data (optional)",
  "expectedOutput": "Expected output (optional)",
  "testCodes": "Code để test (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thêm mới thành công test case",
  "data": {
    "testCaseId": "uuid",
    "lessonId": "uuid",
    "description": "Mô tả test case",
    "input": "Input data",
    "expectedOutput": "Expected output",
    "testCodes": "Code để test",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
}
```

## 🔍 Cách tìm file cần sửa

### Option 1: Tìm trong VSCode
1. Mở frontend project
2. Nhấn `Ctrl + Shift + F` (Find in Files)
3. Tìm: `testCode:`
4. Đổi tất cả thành: `testCodes:`

### Option 2: Tìm bằng grep
```bash
# Tìm trong frontend project
grep -r "testCode:" ./src
```

## ✅ Checklist

- [x] Backend validator đã sửa (`src/validators/testCase.validate.ts`)
- [ ] Frontend service/component cần sửa
- [ ] Test lại API với Postman/Thunder Client
- [ ] Kiểm tra UI hoạt động đúng

## 📝 Lưu ý

1. **Tên trường phải là `testCodes`** (số nhiều) - theo Prisma schema
2. Tất cả các field `input`, `expectedOutput`, `testCodes` đều **optional**
3. Chỉ có `lessonId` và `description` là **required**

## 🧪 Test API

### Sử dụng cURL:
```bash
curl -X POST http://localhost:3000/api/test-cases/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "lessonId": "cddf551b-fa03-491a-898d-703beb441898",
    "description": "Nhập xin chào với thẻ h1",
    "input": "123",
    "expectedOutput": "123",
    "testCodes": "function validateH1(html) { return true; }"
  }'
```

### Sử dụng JavaScript (Frontend):
```typescript
const response = await fetch('/api/test-cases/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    lessonId: "cddf551b-fa03-491a-898d-703beb441898",
    description: "Nhập xin chào với thẻ h1",
    input: "123",
    expectedOutput: "123",
    testCodes: "function validateH1(html) { return true; }"
  })
});

const result = await response.json();
console.log(result);
```

---

**Tạo bởi:** Antigravity AI Assistant  
**Ngày:** 2025-12-12
