# Hutech-Edu - Learning Management System (LMS)

🎓 **Hệ thống quản lý học tập trực tuyến** được xây dựng với Node.js, Express, TypeScript và PostgreSQL.

---

## 📋 **MỤC LỤC**

- [Tổng quan](#tổng-quan)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Kiến trúc hệ thống](#kiến-trúc-hệ-thống)
- [Tính năng hiện có](#tính-năng-hiện-có)
- [Cấu trúc Database](#cấu-trúc-database)
- [API Endpoints](#api-endpoints)
- [Phân quyền RBAC](#phân-quyền-rbac)
- [Cài đặt](#cài-đặt)
- [Sử dụng](#sử-dụng)

---

## 🎯 **TỔNG QUAN**

Hutech-Edu là một nền tảng học tập trực tuyến đầy đủ tính năng, hỗ trợ:

- ✅ Quản lý khóa học, chương, bài học
- ✅ Hệ thống quiz với auto-grading
- ✅ Theo dõi tiến độ học tập
- ✅ Đăng ký khóa học (enrollment)
- ✅ Phân quyền người dùng (RBAC)
- ✅ Xác thực JWT
- ✅ Validation dữ liệu với Joi

---

## 🛠️ **CÔNG NGHỆ SỬ DỤNG**

### **Backend:**

- **Runtime:** Node.js
- **Framework:** Express 5.1.0
- **Language:** TypeScript 5.9.3
- **Database:** PostgreSQL
- **ORM:** Prisma 6.16.3

### **Authentication & Security:**

- **JWT:** jsonwebtoken 9.0.2
- **Password Hashing:** argon2 0.44.0
- **Validation:** Joi 18.0.1
- **CORS:** cors 2.8.5

### **Development Tools:**

- **Process Manager:** nodemon
- **Type Checking:** TypeScript
- **Code Quality:** ESLint, Prettier

---

## 🏗️ **KIẾN TRÚC HỆ THỐNG**

```
src/
├── configs/           # Cấu hình database, Prisma client
├── constants/         # Roles, Permissions
├── controllers/       # Request handlers
├── middlewares/       # Auth, RBAC, Validation, Error handling
├── repositories/      # Data access layer (Prisma)
├── routes/            # API routes
├── services/          # Business logic
├── utils/             # Helpers, response formatters
├── validators/        # Joi schemas
├── scripts/           # Seed data scripts
├── app.ts            # Express app setup
└── server.ts         # Server entry point
```

### **Design Pattern:**

```
Request → Route → Middleware (Auth/RBAC/Validate) → Controller → Service → Repository → Database
```

---

## ✨ **TÍNH NĂNG HIỆN CÓ**

### **1. Authentication & Authorization**

- ✅ Đăng ký tài khoản với auto-assign USER role
- ✅ Đăng nhập với JWT token
- ✅ RBAC với 2 roles: ADMIN và USER
- ✅ 30+ permissions chi tiết
- ✅ 3 tài khoản ADMIN mặc định (seed script)

### **2. User Management**

- ✅ Quản lý thông tin người dùng
- ✅ Đổi mật khẩu
- ✅ Tìm kiếm, lọc người dùng
- ✅ Phân quyền (chỉ ADMIN)

### **3. Course Management**

- ✅ Tạo, sửa, xóa khóa học
- ✅ Upload avatar khóa học
- ✅ Giảm giá (discount 0-1)
- ✅ Phân cấp độ: Basic, Intermediate, Advanced
- ✅ Xem khóa học theo creator
- ✅ Tìm kiếm, lọc khóa học

### **4. Chapter Management**

- ✅ Quản lý chương học
- ✅ Liên kết với khóa học
- ✅ Đếm tổng số bài học

### **5. Lesson Management**

- ✅ Quản lý bài học
- ✅ Video URL
- ✅ Nội dung text
- ✅ Preview mode cho bài học miễn phí

### **6. Enrollment System**

- ✅ Đăng ký khóa học
- ✅ Xem khóa học đã đăng ký
- ✅ Kiểm tra enrollment status
- ✅ Hủy đăng ký
- ✅ Thống kê enrollment (ADMIN)
- ✅ Bulk enrollment (ADMIN)

### **7. Quiz System** (3 bảng liên kết)

- ✅ **ChapterQuiz:** Tạo bài kiểm tra cho chương
- ✅ **QuizQuestion:** Thêm câu hỏi (4 loại: multiple_choice, true_false, short_answer, essay)
- ✅ **QuizOption:** Đáp án cho câu hỏi (có đánh dấu đúng/sai)
- ✅ Public xem quiz (optionalAuth)
- ✅ ADMIN tạo/sửa/xóa quiz, questions, options

---

## 🗄️ **CẤU TRÚC DATABASE**

### **Models đã triển khai:**

| Model            | Mô tả                 | Trạng thái    |
| ---------------- | --------------------- | ------------- |
| **User**         | Thông tin người dùng  | ✅ Hoàn thành |
| **Role**         | Vai trò (ADMIN, USER) | ✅ Hoàn thành |
| **UserRole**     | Mapping User-Role     | ✅ Hoàn thành |
| **RoleClaim**    | Permissions của Role  | ✅ Hoàn thành |
| **Course**       | Khóa học              | ✅ Hoàn thành |
| **Chapter**      | Chương học            | ✅ Hoàn thành |
| **Lesson**       | Bài học               | ✅ Hoàn thành |
| **Enrollment**   | Đăng ký khóa học      | ✅ Hoàn thành |
| **ChapterQuiz**  | Bài kiểm tra          | ✅ Hoàn thành |
| **QuizQuestion** | Câu hỏi               | ✅ Hoàn thành |
| **QuizOption**   | Đáp án                | ✅ Hoàn thành |

### **Models chưa triển khai:**

| Model                  | Mô tả                | Ưu tiên         |
| ---------------------- | -------------------- | --------------- |
| **Submission**         | Bài nộp quiz/bài tập | ⭐⭐⭐ Cao      |
| **UserLessonProgress** | Tiến độ học tập      | ⭐⭐⭐ Cao      |
| **Comment**            | Bình luận khóa học   | ⭐⭐⭐ Cao      |
| **Certificate**        | Chứng chỉ hoàn thành | ⭐⭐ Trung bình |
| **Notification**       | Thông báo            | ⭐⭐ Trung bình |
| **Payment**            | Thanh toán           | ⭐⭐ Trung bình |
| **TestCode**           | Test cases cho code  | ⭐ Thấp         |
| **UserCoursePreview**  | Xem trước khóa học   | ⭐ Thấp         |

---

## 🔌 **API ENDPOINTS**

### **Base URL:** `http://localhost:3000/api`

---

### **1. User Routes** (`/api/users`)

#### **Authentication:**

| Method | Endpoint    | Quyền  | Mô tả                                              |
| ------ | ----------- | ------ | -------------------------------------------------- |
| POST   | `/register` | Public | Đăng ký tài khoản mới (auto-assign USER role)      |
| POST   | `/login`    | Public | Đăng nhập (trả về JWT token + user info với roles) |

#### **User Management:**

| Method | Endpoint                   | Quyền         | Mô tả                                                             |
| ------ | -------------------------- | ------------- | ----------------------------------------------------------------- |
| GET    | `/`                        | ADMIN         | Lấy tất cả users (có phân trang)                                  |
| GET    | `/search`                  | ADMIN         | Tìm kiếm users theo username (contains)                           |
| GET    | `/search/name`             | ADMIN         | Lấy users theo tên chính xác                                      |
| GET    | `/search/email`            | ADMIN         | Lấy user theo email                                               |
| GET    | `/:userId`                 | Authenticated | Xem thông tin user theo ID                                        |
| GET    | `/:userId/details`         | Owner/ADMIN   | Xem chi tiết user (kèm roles, courses, enrollments, certificates) |
| PUT    | `/:userId`                 | Owner/ADMIN   | Cập nhật thông tin user                                           |
| PATCH  | `/:userId/change-password` | Owner/ADMIN   | Đổi mật khẩu user                                                 |
| DELETE | `/:userId`                 | ADMIN         | Xóa user                                                          |

#### **User Courses & Enrollment:**

| Method | Endpoint                        | Quyền       | Mô tả                                           |
| ------ | ------------------------------- | ----------- | ----------------------------------------------- |
| GET    | `/:userId/courses`              | Owner/ADMIN | Xem danh sách khóa học đã đăng ký của user      |
| GET    | `/:userId/enrollment/:courseId` | Owner/ADMIN | Kiểm tra user có enroll vào course cụ thể không |

| GET | `/:userId/enrollment/:courseId` | Owner/ADMIN | Kiểm tra user có enroll vào course cụ thể không |

---

### **2. Course Routes** (`/api/courses`)

#### **Public Course Access:**

| Method | Endpoint             | Quyền                 | Mô tả                                                                 |
| ------ | -------------------- | --------------------- | --------------------------------------------------------------------- |
| GET    | `/`                  | Public (optionalAuth) | Lấy tất cả khóa học (có phân trang: skip, take)                       |
| GET    | `/search`            | Public (optionalAuth) | Tìm kiếm khóa học theo tên (contains)                                 |
| GET    | `/popular`           | Public (optionalAuth) | Lấy khóa học phổ biến (sắp xếp theo số lượng người đăng ký)           |
| GET    | `/filter`            | Public (optionalAuth) | Lọc khóa học theo level, price range, searchTerm                      |
| GET    | `/count`             | Public (optionalAuth) | Đếm số lượng khóa học theo bộ lọc                                     |
| GET    | `/level/:level`      | Public (optionalAuth) | Lấy khóa học theo cấp độ (Basic/Intermediate/Advanced)                |
| GET    | `/:courseId`         | Public (optionalAuth) | Xem thông tin cơ bản của khóa học                                     |
| GET    | `/:courseId/details` | Public (optionalAuth) | Xem chi tiết khóa học (kèm creator, chapters, enrollments, comments)  |
| GET    | `/:courseId/content` | Public (optionalAuth) | Xem nội dung khóa học (chapters + lessons)                            |
| GET    | `/:courseId/stats`   | Public (optionalAuth) | Xem thống kê khóa học (enrollments, chapters, comments, certificates) |

#### **Creator/Instructor:**

| Method | Endpoint           | Quyền         | Mô tả                                          |
| ------ | ------------------ | ------------- | ---------------------------------------------- |
| GET    | `/creator/:userId` | Authenticated | Xem tất cả khóa học của một creator/instructor |

#### **Course Management (ADMIN/Creator):**

| Method | Endpoint            | Quyền                       | Mô tả                                      |
| ------ | ------------------- | --------------------------- | ------------------------------------------ |
| POST   | `/create`           | COURSE_CREATE               | Tạo khóa học mới                           |
| PUT    | `/update/:courseId` | Owner/ADMIN + COURSE_UPDATE | Cập nhật khóa học (chỉ creator hoặc admin) |
| DELETE | `/delete/:courseId` | ADMIN + COURSE_DELETE       | Xóa khóa học (chỉ admin)                   |

---

### **3. Chapter Routes** (`/api/chapters`)

| Method | Endpoint      | Quyền                  | Mô tả                                   |
| ------ | ------------- | ---------------------- | --------------------------------------- |
| GET    | `/`           | Public (optionalAuth)  | Xem tất cả chapters                     |
| GET    | `/:chapterId` | Public (optionalAuth)  | Xem chi tiết chapter theo ID            |
| POST   | `/`           | CHAPTER_CREATE         | Tạo chapter mới (liên kết với courseId) |
| PUT    | `/:chapterId` | CHAPTER_UPDATE         | Cập nhật thông tin chapter              |
| DELETE | `/:chapterId` | ADMIN + CHAPTER_DELETE | Xóa chapter (chỉ admin)                 |

---

### **4. Lesson Routes** (`/api/lessons`)

| Method | Endpoint            | Quyền                 | Mô tả                                          |
| ------ | ------------------- | --------------------- | ---------------------------------------------- |
| GET    | `/`                 | Public (optionalAuth) | Xem tất cả lessons                             |
| GET    | `/:lessonId`        | Public (optionalAuth) | Xem chi tiết lesson (video URL, content)       |
| POST   | `/create`           | LESSON_CREATE         | Tạo lesson mới (liên kết với chapterId)        |
| PUT    | `/update/:lessonId` | LESSON_UPDATE         | Cập nhật lesson (videoUrl, content, isPreview) |
| DELETE | `/delete/:lessonId` | ADMIN + LESSON_DELETE | Xóa lesson (chỉ admin)                         |

---

### **5. Enrollment Routes** (`/api/enrollments`)

#### **Student Enrollment:**

| Method | Endpoint                | Quyền             | Mô tả                                               |
| ------ | ----------------------- | ----------------- | --------------------------------------------------- |
| GET    | `/my-enrollments`       | Authenticated     | Xem danh sách khóa học đã đăng ký của mình          |
| GET    | `/my-stats`             | Authenticated     | Thống kê enrollment của bản thân                    |
| POST   | `/enroll`               | ENROLLMENT_CREATE | Đăng ký vào khóa học (userId + courseId)            |
| GET    | `/check/:courseId`      | Authenticated     | Kiểm tra đã enroll vào course chưa (trả về boolean) |
| GET    | `/:enrollmentId`        | Authenticated     | Xem chi tiết một enrollment                         |
| DELETE | `/delete/:enrollmentId` | ENROLLMENT_DELETE | Hủy enrollment (owner hoặc admin)                   |

#### **Admin Enrollment Management:**

| Method | Endpoint                  | Quyền                     | Mô tả                                             |
| ------ | ------------------------- | ------------------------- | ------------------------------------------------- |
| GET    | `/`                       | ADMIN                     | Xem tất cả enrollments trong hệ thống             |
| GET    | `/user/:userId`           | ADMIN                     | Xem tất cả enrollments của một user cụ thể        |
| GET    | `/course/:courseId`       | ADMIN                     | Xem tất cả học viên đã enroll vào course          |
| GET    | `/course/:courseId/stats` | ADMIN                     | Thống kê enrollment của course (tổng số học viên) |
| POST   | `/create`                 | ADMIN + ENROLLMENT_CREATE | Bulk enrollment (admin tạo enrollment cho users)  |

| POST | `/create` | ADMIN + ENROLLMENT_CREATE | Bulk enrollment (admin tạo enrollment cho users) |

---

### **6. Quiz Routes** (`/api/quizzes`)

#### **A. Quiz Management:**

**Public Access:**
| Method | Endpoint | Quyền | Mô tả |
| ------ | --------------------- | --------------------- | -------------------------------------------- |
| GET | `/` | Public (optionalAuth) | Xem tất cả quizzes trong hệ thống |
| GET | `/chapter/:chapterId` | Public (optionalAuth) | Xem tất cả quizzes của một chapter |
| GET | `/:chapterQuizId` | Public (optionalAuth) | Xem chi tiết quiz (kèm questions và options)|

**Quiz CRUD (ADMIN/Instructor):**
| Method | Endpoint | Quyền | Mô tả |
| ------ | ----------------- | ----------- | ---------------------------------------------- |
| POST | `/` | QUIZ_CREATE | Tạo quiz mới cho chapter (quizName, duration, passingScore) |
| PUT | `/:chapterQuizId` | QUIZ_UPDATE | Cập nhật thông tin quiz |
| DELETE | `/:chapterQuizId` | ADMIN + QUIZ_DELETE | Xóa quiz (chỉ admin) |

---

#### **B. Question Management:**

**Public Access:**
| Method | Endpoint | Quyền | Mô tả |
| ------ | ---------------------------- | --------------------- | ---------------------------------------- |
| GET | `/:chapterQuizId/questions` | Public (optionalAuth) | Xem tất cả câu hỏi của quiz |
| GET | `/questions/:quizQuestionId` | Public (optionalAuth) | Xem chi tiết câu hỏi (kèm options) |

**Question CRUD (ADMIN/Instructor):**
| Method | Endpoint | Quyền | Mô tả |
| ------ | ---------------------------- | ----------- | --------------------------------------------------------- |
| POST | `/questions` | QUIZ_CREATE | Tạo câu hỏi mới (type: multiple_choice, true_false, short_answer, essay) |
| PUT | `/questions/:quizQuestionId` | QUIZ_UPDATE | Cập nhật câu hỏi (questionText, points) |
| DELETE | `/questions/:quizQuestionId` | ADMIN + QUIZ_DELETE | Xóa câu hỏi (chỉ admin) |

---

#### **C. Option Management (Đáp án):**

**Public Access:**
| Method | Endpoint | Quyền | Mô tả |
| ------ | ------------------------------------ | --------------------- | ------------------------------------ |
| GET | `/questions/:quizQuestionId/options` | Public (optionalAuth) | Xem tất cả đáp án của câu hỏi |
| GET | `/options/:quizOptionId` | Public (optionalAuth) | Xem chi tiết một đáp án |

**Option CRUD (ADMIN/Instructor):**
| Method | Endpoint | Quyền | Mô tả |
| ------ | ------------------------ | ----------- | ------------------------------------------------- |
| POST | `/options` | QUIZ_CREATE | Tạo đáp án mới (optionText, isCorrect) |
| PUT | `/options/:quizOptionId` | QUIZ_UPDATE | Cập nhật đáp án (optionText, isCorrect) |
| DELETE | `/options/:quizOptionId` | ADMIN + QUIZ_DELETE | Xóa đáp án (chỉ admin) |

---

## 📊 **API Response Format**

### **Success Response:**

```json
{
  "success": true,
  "message": "Thành công",
  "data": {
    // Dữ liệu trả về
  }
}
```

### **Error Response:**

```json
{
  "success": false,
  "message": "Lỗi hệ thống",
  "errors": [
    {
      "field": "email",
      "message": "Email already exists"
    }
  ]
}
```

### **Validation Error (Joi):**

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "\"email\" must be a valid email"
    }
  ]
}
```

---

## 🔑 **Authentication Header**

Tất cả routes cần authentication phải gửi kèm JWT token trong header:

```http
Authorization: Bearer <your-jwt-token>
```

**Ví dụ:**

```bash
GET http://localhost:3000/api/courses/creator/user-id-123
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🔐 **PHÂN QUYỀN RBAC**

### **Roles:**

- **ADMIN:** Quản trị viên (full access)
- **USER:** Người dùng thông thường (read-only + own actions)

### **Permissions:**

#### **USER Permissions (6 permissions):**

```typescript
-COURSE_READ - // Xem khóa học
  COURSE_LIST - // Xem danh sách khóa học
  CHAPTER_READ - // Xem chương học
  LESSON_READ - // Xem bài học
  ENROLLMENT_READ - // Xem enrollment của mình
  QUIZ_READ; // Xem quiz
```

#### **ADMIN Permissions (31 permissions):**

```typescript
// User Management
-USER_CREATE,
  USER_READ,
  USER_UPDATE,
  USER_DELETE,
  USER_LIST -
    // Course Management
    COURSE_CREATE,
  COURSE_READ,
  COURSE_UPDATE,
  COURSE_DELETE - COURSE_LIST,
  COURSE_PUBLISH -
    // Chapter Management
    CHAPTER_CREATE,
  CHAPTER_READ,
  CHAPTER_UPDATE,
  CHAPTER_DELETE -
    // Lesson Management
    LESSON_CREATE,
  LESSON_READ,
  LESSON_UPDATE,
  LESSON_DELETE -
    // Enrollment Management
    ENROLLMENT_CREATE,
  ENROLLMENT_READ,
  ENROLLMENT_DELETE -
    // Quiz Management
    QUIZ_CREATE,
  QUIZ_READ,
  QUIZ_UPDATE,
  QUIZ_DELETE -
    // Role Management
    ROLE_CREATE,
  ROLE_READ,
  ROLE_UPDATE,
  ROLE_DELETE,
  ROLE_ASSIGN;
```

### **3 Tài khoản ADMIN mặc định:**

```
Email: admin1@hutech.edu.vn | Password: Admin@123
Email: admin2@hutech.edu.vn | Password: Admin@123
Email: admin3@hutech.edu.vn | Password: Admin@123
```

---

## 📥 **CÀI ĐẶT**

### **1. Yêu cầu hệ thống:**

- Node.js >= 18.x
- PostgreSQL >= 14.x
- npm hoặc yarn

### **2. Clone repository:**

```bash
git clone https://github.com/Hutech-ChillTech/Hutech-Edu.git
cd Hutech-Edu
```

### **3. Cài đặt dependencies:**

```bash
npm install
```

### **4. Cấu hình môi trường:**

Tạo file `.env` với nội dung:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/hutech_edu"

# JWT
JWT_SECRET="your-super-secret-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV="development
```

### **5. Setup Database:**

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npm run migrate

# Seed roles, permissions và 3 ADMIN accounts
npm run seed
```

### **6. Khởi chạy server:**

**Development mode:**

```bash
npm run dev
```

**Production mode:**

```bash
npm run build
npm start
```

Server sẽ chạy tại: `http://localhost:3000`

---

## 🚀 **SỬ DỤNG**

### **1. Test Authentication:**

**Đăng ký user mới:**

```bash
POST http://localhost:3000/api/users/register
Content-Type: application/json

{
  "userName": "testuser",
  "email": "test@example.com",
  "password": "Test@123",
  "gender": "MALE",
  "dateOfBirth": "2000-01-01"
}
```

**Đăng nhập:**

```bash
POST http://localhost:3000/api/users/login
Content-Type: application/json

{
  "email": "admin1@hutech.edu.vn",
  "password": "Admin@123"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "userId": "...",
      "email": "admin1@hutech.edu.vn",
      "userName": "Admin1"
    }
  }
}
```

### **2. Sử dụng JWT Token:**

Thêm header vào các request cần authentication:

```
Authorization: Bearer <your-jwt-token>
```

### **3. Test RBAC:**

**USER - Xem khóa học (được phép):**

```bash
GET http://localhost:3000/api/courses
Authorization: Bearer <user-token>
```

**USER - Tạo khóa học (bị từ chối):**

```bash
POST http://localhost:3000/api/courses/create
Authorization: Bearer <user-token>
```

→ Response: 403 Forbidden

**ADMIN - Tạo khóa học (được phép):**

```bash
POST http://localhost:3000/api/courses/create
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "courseName": "Node.js Advanced",
  "courseDescription": "Learn advanced Node.js",
  "coursePrice": 199000,
  "level": "Advanced"
}
```

---

## 📝 **SCRIPTS**

```json
{
  "dev": "nodemon src/server.ts", // Dev mode với auto-reload
  "build": "tsc", // Build TypeScript
  "start": "node dist/server.js", // Production mode
  "seed:roles": "ts-node src/scripts/seed-roles.ts" // Seed roles & admins
}
```

---

## 🔧 **MIDDLEWARE FLOW**

### **1. Authentication Middleware:**

```typescript
// authenticate: Bắt buộc phải đăng nhập
// optionalAuth: Optional, không bắt buộc (cho public routes)

router.get("/", optionalAuth, controller.getAll); // Public
router.post("/", authenticate, controller.create); // Cần login
```

### **2. Authorization Middleware:**

```typescript
// requireRole: Kiểm tra role
// requirePermission: Kiểm tra permission
// requireOwnerOrAdmin: Owner hoặc Admin

router.delete(
  "/:id",
  authenticate, // 1. Phải đăng nhập
  requireRole([UserRoles.ADMIN]), // 2. Phải là ADMIN
  requirePermission([Permissions.COURSE_DELETE]), // 3. Có quyền DELETE
  controller.delete
);
```

### **3. Validation Middleware:**

```typescript
// validate(schema, source) - source: "body" | "query" | "params"

router.post(
  "/",
  authenticate,
  validate(createCourseSchema), // Validate req.body
  controller.create
);
```

---

## 🐛 **ERROR HANDLING**

Tất cả errors được xử lý tập trung qua `errorHandler` middleware:

```typescript
// Custom error format
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Email already exists"
    }
  ]
}
```

---

## 📚 **TÀI LIỆU THAM KHẢO**

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [JWT Documentation](https://jwt.io/)
- [Joi Validation](https://joi.dev/)

---

## 👥 **TEAM**

- **Hutech-ChillTech**
- Repository: [Hutech-Edu](https://github.com/Hutech-ChillTech/Hutech-Edu)
- Branch: `haidang`

---

## 📄 **LICENSE**

This project is licensed under the MIT License.

---

## 🔮 **ROADMAP**

### **Phase 1: ✅ HOÀN THÀNH**

- [x] Authentication & Authorization (RBAC)
- [x] User Management
- [x] Course, Chapter, Lesson Management
- [x] Enrollment System
- [x] Quiz System (Quiz, Question, Option)

### **Phase 2: 🚧 ĐANG PHÁT TRIỂN**

- [ ] Submission System (Auto-grading)
- [ ] User Lesson Progress Tracking
- [ ] Comment System

### **Phase 3: 📋 KẾ HOẠCH**

- [ ] Certificate Generation
- [ ] Notification System
- [ ] Payment Integration
- [ ] Test Code for Coding Exercises
- [ ] Course Preview System

---

## 💬 **LIÊN HỆ**

Nếu có câu hỏi hoặc góp ý, vui lòng tạo issue trên GitHub repository.

**Happy Learning! 🎓**
