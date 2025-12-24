# 🐛 Hướng dẫn Debug Lỗi 400 khi tạo Blog Post

## ✅ Các thay đổi đã thực hiện:

### 1. **Sửa thứ tự routes trong `blog.route.ts`**
```typescript
// ❌ SAI (cũ):
router.get("/:id", blogController.getPostById);           
router.get("/slug/:slug", blogController.getPostBySlug);  

// ✅ ĐÚNG (mới):
router.get("/slug/:slug", blogController.getPostBySlug);  // Đặt trước
router.get("/:id", blogController.getPostById);           // Đặt sau
```

**Lý do:** Express match routes theo thứ tự khai báo. Route cụ thể (`/slug/:slug`) phải đặt trước route động (`/:id`).

### 2. **Thêm validation và error handling trong `blog.controller.ts`**

#### Validation:
- ✅ Kiểm tra `title` và `content` (required)
- ✅ Auto-generate `slug` nếu không được cung cấp
- ✅ Log chi tiết request data

#### Error Handling:
- ✅ Xử lý lỗi Prisma P2002 (Duplicate slug)
- ✅ Xử lý lỗi Prisma P2025 (Tag/Category not found)
- ✅ Log error stack trong development mode

---

## 🧪 Cách Test API

### Bước 1: Kiểm tra Backend Server đang chạy
Mở terminal và xem log có message gì không:
```bash
# Server nên đang chạy ở port 3000
```

### Bước 2: Test với Postman/Thunder Client

#### Test 1: Tạo Blog Post (Minimal - No Tags/Categories)
```http
POST http://localhost:3000/api/blog-posts
Headers:
  Authorization: Bearer <your_token>
  Content-Type: application/json

Body:
{
  "title": "Test Blog Post",
  "content": "This is test content"
}
```

**Expected Response:** 201 Created
```json
{
  "blogPostId": "...",
  "title": "Test Blog Post",
  "slug": "test-blog-post",  // Auto-generated
  "content": "This is test content",
  ...
}
```

#### Test 2: Tạo Blog với Tags và Categories
```http
POST http://localhost:3000/api/blog-posts
Headers:
  Authorization: Bearer <your_token>
  Content-Type: application/json

Body:
{
  "title": "Full Blog Post Example",
  "content": "Complete blog content here...",
  "excerpt": "Short summary",
  "status": "PUBLISHED",
  "tagIds": ["<valid-tag-uuid>", "<valid-tag-uuid>"],
  "categoryIds": ["<valid-category-uuid>"]
}
```

### Bước 3: Kiểm tra Console Logs

Sau khi gửi request, check backend terminal để xem logs:

```
Creating blog post with data: {
  title: 'Test Blog Post',
  slug: 'test-blog-post',
  status: undefined,
  authorId: '...',
  tagIds: [],
  categoryIds: []
}
```

---

## 🔍 Các Lỗi Thường Gặp và Cách Fix

### Lỗi 1: "Missing required fields"
```json
{
  "message": "Missing required fields",
  "errors": {
    "title": "Title is required",
    "content": "Content is required"
  }
}
```

**Fix:** Đảm bảo frontend gửi `title` và `content` trong request body.

---

### Lỗi 2: "A blog post with this slug already exists"
```json
{
  "message": "A blog post with this slug already exists",
  "field": "slug"
}
```

**Fix:** 
- Slug bị trùng. Thay đổi title hoặc tự đặt slug khác
- Hoặc thêm timestamp vào slug: `my-blog-${Date.now()}`

---

### Lỗi 3: "Referenced tag or category not found"
```json
{
  "message": "Referenced tag or category not found"
}
```

**Fix:** 
1. Get danh sách tags/categories hợp lệ:
```http
GET http://localhost:3000/api/tags
GET http://localhost:3000/api/categories
```

2. Copy UUID từ response và paste vào `tagIds`/`categoryIds`

---

### Lỗi 4: "Unauthorized: Missing author ID"
```json
{
  "message": "Unauthorized: Missing author ID. Please login."
}
```

**Fix:**
1. Đảm bảo đã login và có token
2. Thêm token vào header: `Authorization: Bearer <token>`
3. Check token còn hạn chưa (JWT expiration)

---

## 📋 Checklist Debug

- [ ] Backend server đang chạy (port 3000)
- [ ] Database có data tags và categories
- [ ] Đã login và có token hợp lệ
- [ ] Request body có `title` và `content`
- [ ] UUIDs của tags/categories là hợp lệ
- [ ] Slug không bị trùng với blog post khác
- [ ] Check console logs backend để xem error chi tiết

---

## 🚀 Test Frontend Integration

Nếu lỗi từ frontend (AdminBlogPage.tsx), kiểm tra:

### 1. Check Request Payload
Mở DevTools → Network → Click request `POST blog-posts` → Tab Payload

### 2. Check Response
Xem response status và message error

### 3. Validate Form Data
Đảm bảo frontend validation đang hoạt động:
```typescript
// Example validation
if (!formData.title || !formData.content) {
  message.error('Title và Content là bắt buộc!');
  return;
}
```

### 4. Check Token
```typescript
const token = localStorage.getItem('accessToken');
if (!token) {
  message.error('Vui lòng đăng nhập lại!');
  return;
}
```

---

## 📞 Nếu vẫn lỗi...

Gửi cho dev:
1. ✅ Request payload đầy đủ
2. ✅ Response error message
3. ✅ Backend console logs
4. ✅ Screenshot Network tab (DevTools)

Good luck! 🎉
