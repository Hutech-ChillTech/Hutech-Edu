# 📁 Static Files Setup - Hutech-Edu

## 🎯 Tổng quan

Đã cấu hình Express để serve static files (ảnh, icon) từ thư mục `public/` cho cả Backend và Frontend.

---

## 📂 Cấu trúc thư mục

```
Hutech-Edu/
├── public/                    ← Thư mục chứa static files
│   ├── assest/               ← Ảnh courses và avatars
│   │   ├── admin.jpg
│   │   ├── user.png
│   │   ├── htmlcss.png
│   │   ├── javascript.png
│   │   ├── react.png
│   │   └── ... (các ảnh khóa học khác)
│   └── icon/                 ← Icon badges và achievements
│       ├── begin.png         (Level: Basic)
│       ├── mid.png           (Level: Intermediate)
│       ├── high.png          (Level: Advanced)
│       ├── firststeps.png    (Achievement)
│       ├── beginner.png      (Achievement)
│       └── ... (các icon achievement khác)
├── src/
│   ├── app.ts               ← Đã cấu hình express.static
│   └── scripts/
│       ├── seed-roles.ts    ← Đã cập nhật avatarURL
│       ├── seed-data.ts     ← Đã cập nhật avatarUrl
│       └── seed-gamification.ts ← Đã cập nhật badge & icon
└── package.json
```

---

## ⚙️ Cấu hình Express (src/app.ts)

```typescript
import path from "path";

// Serve static files từ thư mục public
app.use(express.static(path.join(__dirname, "../public")));
```

**Giải thích:**
- `__dirname`: Thư mục hiện tại (dist/src khi build)
- `"../public"`: Đi lên 1 cấp từ dist/src → dist → root, rồi vào public
- Khi build: `dist/src/app.js` → `../public` = `public/`

---

## 🔗 Đường dẫn trong Database

### ✅ ĐÚNG - Đường dẫn tuyệt đối (từ root public)

```typescript
// seed-roles.ts
avatarURL: "/assest/admin.jpg"
avatarURL: "/assest/user.png"

// seed-data.ts
avatarUrl: "/assest/htmlcss.png"
avatarUrl: "/assest/javascript.png"

// seed-gamification.ts
badge: "/icon/begin.png"
badge: "/icon/mid.png"
icon: "/icon/firststeps.png"
```

### ❌ SAI - Đường dẫn tương đối

```typescript
// ❌ KHÔNG dùng
avatarURL: "../assest/admin.jpg"
badge: "../assest/icon/begin.png"
```

---

## 🌐 Cách truy cập từ Frontend

Khi Frontend gọi API và nhận được đường dẫn, có thể hiển thị trực tiếp:

```typescript
// Response từ API
{
  "avatarURL": "/assest/user.png",
  "badge": "/icon/begin.png"
}

// Trong React/Vue/Angular
<img src={`http://localhost:3000${user.avatarURL}`} />
<img src={`${API_URL}${achievement.icon}`} />
```

**URL cuối cùng:**
- `http://localhost:3000/assest/user.png`
- `http://localhost:3000/icon/begin.png`

---

## 📊 Danh sách Files đã cập nhật

### 1. **src/app.ts**
- ✅ Thêm `import path from "path"`
- ✅ Thêm `app.use(express.static(path.join(__dirname, "../public")))`

### 2. **src/scripts/seed-roles.ts**
- ✅ Đổi `avatarURL: "../assest/admin.jpg"` → `"/assest/admin.jpg"`
- ✅ Đổi `avatarURL: "../assest/user.png"` → `"/assest/user.png"`

### 3. **src/scripts/seed-data.ts**
- ✅ Đổi tất cả `avatarUrl: "../assest/*.png"` → `"/assest/*.png"`
- ✅ Áp dụng cho 14 courses

### 4. **src/scripts/seed-gamification.ts**
- ✅ Đổi `badge: "../assest/icon/*.png"` → `"/icon/*.png"` (3 levels)
- ✅ Đổi `icon: "../assest/icon/*.png"` → `"/icon/*.png"` (13 achievements)

---

## 🧪 Kiểm tra

### 1. Build và chạy server
```bash
npm run build
npm start
```

### 2. Truy cập trực tiếp trong browser
```
http://localhost:3000/assest/admin.jpg
http://localhost:3000/assest/user.png
http://localhost:3000/icon/begin.png
http://localhost:3000/icon/mid.png
```

### 3. Kiểm tra trong database
```bash
npx ts-node src/scripts/seed-roles.ts
npx ts-node src/scripts/seed-data.ts
npx ts-node src/scripts/seed-gamification.ts
```

Sau đó query database để xem đường dẫn đã đúng chưa:
```sql
SELECT "avatarURL" FROM "User" LIMIT 5;
SELECT "avatarUrl" FROM "Course" LIMIT 5;
SELECT perks FROM "LevelRequirement";
SELECT icon FROM "Achievement" LIMIT 5;
```

---

## ✅ Kết luận

- ✅ Tất cả ảnh và icon đã được đặt trong `public/`
- ✅ Express đã được cấu hình serve static files
- ✅ Tất cả đường dẫn trong seed scripts đã được cập nhật
- ✅ Frontend có thể truy cập trực tiếp qua HTTP

**Lưu ý:** Nếu deploy lên production, nhớ cấu hình CDN hoặc cloud storage (S3, Cloudinary) để tối ưu performance! 🚀
