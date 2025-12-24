# 🔧 Fix: Ảnh không hiển thị trên Frontend

## ❌ Vấn đề

Frontend hiển thị ảnh mặc định `/images/default-course.jpg` thay vì ảnh thật từ database:

```html
<img alt="Python cơ bản" src="/images/default-course.jpg">
```

## 🔍 Nguyên nhân

**Seed scripts đã định nghĩa đường dẫn ảnh NHƯNG KHÔNG LƯU VÀO DATABASE!**

### 1. **seed-data.ts** - Thiếu `avatarURL` khi create Course
```typescript
// ❌ TRƯỚC - Không có avatarURL
const created = await Prisma.course.create({
  data: {
    courseName: course.name,
    courseDescription: course.desc,
    coursePrice: course.price,
    // ... các field khác
    // ❌ THIẾU: avatarURL
  },
});
```

### 2. **seed-roles.ts** - Thiếu `avatarURL` khi create User
```typescript
// ❌ TRƯỚC - Không có avatarURL
const user = await Prisma.user.create({
  data: {
    userName: adminData.userName,
    email: adminData.email,
    password: hashedPassword,
    // ... các field khác
    // ❌ THIẾU: avatarURL
  },
});
```

---

## ✅ Giải pháp đã áp dụng

### 1. **Sửa seed-data.ts**
Thêm `avatarURL` vào phần create course:

```typescript
// ✅ SAU - Đã thêm avatarURL
const created = await Prisma.course.create({
  data: {
    courseName: course.name,
    courseDescription: course.desc,
    coursePrice: course.price,
    discount: i % 3 === 0 ? 0.2 : i % 2 === 0 ? 0.1 : 0,
    avatarURL: course.avatarUrl,  // ✅ THÊM DÒNG NÀY
    level: course.level,
    subLevel: course.subLevel,
    estimatedDuration: course.duration,
    specialization: course.specialization,
    tag: course.tag,
    createdBy: firstUser.userId,
  },
});
```

### 2. **Sửa seed-roles.ts**
Thêm `avatarURL` vào phần create user (cả ADMIN và USER):

```typescript
// ✅ SAU - Đã thêm avatarURL
const user = await Prisma.user.create({
  data: {
    userName: adminData.userName,
    email: adminData.email,
    password: hashedPassword,
    gender: adminData.gender,
    region: adminData.region,
    level: adminData.level,
    specialization: adminData.specialization,
    dateOfBirth: adminData.dateOfBirth,
    avatarURL: adminData.avatarURL,  // ✅ THÊM DÒNG NÀY
  },
});
```

### 3. **Cập nhật tất cả đường dẫn**
Đổi từ đường dẫn tương đối sang tuyệt đối:

```typescript
// ❌ TRƯỚC
avatarURL: "../assest/admin.jpg"
avatarUrl: "../assest/python.png"

// ✅ SAU
avatarURL: "/assest/admin.jpg"
avatarUrl: "/assest/python.png"
```

---

## 📊 Tổng kết các file đã sửa

### ✅ **src/scripts/seed-roles.ts**
- ✅ Thêm `avatarURL: adminData.avatarURL` vào create ADMIN (line 175)
- ✅ Thêm `avatarURL: userData.avatarURL` vào create USER (line 222)
- ✅ Đổi tất cả `"../assest/"` → `"/assest/"` (6 chỗ)

### ✅ **src/scripts/seed-data.ts**
- ✅ Thêm `avatarURL: course.avatarUrl` vào create Course (line 190)
- ✅ Đổi tất cả `"../assest/"` → `"/assest/"` (14 courses)

### ✅ **src/scripts/seed-gamification.ts**
- ✅ Đổi tất cả `"../assest/icon/"` → `"/icon/"` (3 levels + 13 achievements)

### ✅ **src/app.ts**
- ✅ Thêm `import path from "path"`
- ✅ Thêm `app.use(express.static(path.join(__dirname, "../public")))`

---

## 🧪 Cách kiểm tra

### 1. **Xóa dữ liệu cũ** (nếu cần)
```bash
npx prisma migrate reset
```

### 2. **Chạy lại seed scripts**
```bash
npx ts-node src/scripts/seed-roles.ts
npx ts-node src/scripts/seed-data.ts
npx ts-node src/scripts/seed-gamification.ts
```

### 3. **Kiểm tra database**
```sql
-- Kiểm tra User avatars
SELECT "userName", "avatarURL" FROM "User" LIMIT 5;

-- Kiểm tra Course avatars
SELECT "courseName", "avatarURL" FROM "Course" LIMIT 5;

-- Kiểm tra Level badges
SELECT level, perks FROM "LevelRequirement";

-- Kiểm tra Achievement icons
SELECT name, icon FROM "Achievement" LIMIT 5;
```

**Kết quả mong đợi:**
```
userName  | avatarURL
----------|------------------
admin1    | /assest/admin.jpg
user1     | /assest/user.png

courseName        | avatarURL
------------------|------------------------
HTML & CSS Cơ Bản | /assest/htmlcss.png
Python cơ bản     | /assest/python.png
```

### 4. **Khởi động server và test**
```bash
npm run dev
```

Truy cập:
- `http://localhost:3000/assest/admin.jpg` ✅
- `http://localhost:3000/assest/python.png` ✅
- `http://localhost:3000/icon/begin.png` ✅

### 5. **Kiểm tra Frontend**
Sau khi gọi API, Frontend sẽ nhận được:
```json
{
  "courseName": "Python cơ bản",
  "avatarURL": "/assest/python.png"
}
```

Và hiển thị:
```html
<img alt="Python cơ bản" src="http://localhost:3000/assest/python.png">
```

---

## 🎯 Kết luận

**Vấn đề:** Seed scripts chỉ định nghĩa đường dẫn nhưng không lưu vào database.

**Giải pháp:** 
1. ✅ Thêm `avatarURL` vào phần create User và Course
2. ✅ Cập nhật tất cả đường dẫn từ tương đối sang tuyệt đối
3. ✅ Cấu hình Express serve static files từ `public/`

**Kết quả:** Frontend sẽ hiển thị đúng ảnh từ database! 🎉
