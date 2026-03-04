# Hướng Dẫn Deploy Backend & Frontend — Lỗi Thường Gặp & Giải Pháp

> **Dự án:** Hutech-Edu  
> **Cập nhật:** Tháng 3, 2026

---

## Mục Lục

1. [Tổng Quan Kiến Trúc Deploy](#1-tổng-quan-kiến-trúc-deploy)
2. [Deploy Backend (Node.js + Prisma + PostgreSQL)](#2-deploy-backend)
3. [Deploy Frontend (React/Vite)](#3-deploy-frontend)
4. [Các Lỗi Thường Gặp & Giải Pháp](#4-các-lỗi-thường-gặp--giải-pháp)
5. [Checklist Trước Khi Deploy](#5-checklist-trước-khi-deploy)
6. [Lưu Ý Quan Trọng Cần Tránh](#6-lưu-ý-quan-trọng-cần-tránh)

---

## 1. Tổng Quan Kiến Trúc Deploy

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│   Backend    │────▶│  PostgreSQL   │
│  (Vercel/    │     │  (Render/    │     │  (Supabase/   │
│   Netlify)   │     │   Railway)   │     │   Neon/AWS)   │
└──────────────┘     └──────┬───────┘     └──────────────┘
                            │
                     ┌──────┴───────┐
                     │    Redis     │
                     │  (Upstash/   │
                     │   Redis Cloud)│
                     └──────────────┘
```

---

## 2. Deploy Backend

### 2.1 Chuẩn Bị

#### Environment Variables (bắt buộc)

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require

# Redis
REDIS_URL=redis://default:password@host:6379

# JWT
JWT_SECRET=your-super-secret-key-here

# Firebase
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...

# CORS - URL frontend (nhiều domain cách nhau bằng dấu phẩy)
CORS_ORIGIN=https://your-frontend.vercel.app
FRONTEND_URL=https://your-frontend.vercel.app

# Node Environment
NODE_ENV=production
PORT=10000
```

> **⚠️ QUAN TRỌNG:** Tất cả env vars phải được set trên hosting platform (Render Dashboard > Environment), KHÔNG dựa vào file `.env` trên server.

#### Build Command

```bash
npm run build
# Tương đương: tsc && prisma generate
```

#### Start Command (CHUẨN)

```bash
npm start
# Tương đương: prisma migrate deploy && node dist/scripts/seed-roles.js && node dist/server.js
```

### 2.2 Deploy trên Render

1. **Tạo Web Service** → chọn repo GitHub
2. **Build Command:** `npm install && npm run build`
3. **Start Command:** `npm start` (**KHÔNG phải** `node dist/server.js`)
4. **Environment:** Thêm tất cả env vars
5. **Region:** Chọn gần database nhất (cùng region với PostgreSQL)

### 2.3 Deploy trên Railway

1. **New Project** → Deploy from GitHub
2. Railway tự nhận `package.json`
3. Đảm bảo **Start Command** là `npm start`
4. Thêm env vars trong Settings > Variables

### 2.4 Quy Trình Start Server Chuẩn

```
npm start
  │
  ├── 1. prisma migrate deploy     ← Áp dụng migrations vào database
  │
  ├── 2. node dist/scripts/seed-roles.js   ← Seed roles, permissions, admin
  │
  └── 3. node dist/server.js       ← Khởi động Express server
            │
            └── autoSeedOnStartup()  ← Kiểm tra & tự seed nếu thiếu (backup)
```

> **Tại sao có auto-seed trong server.ts?**  
> Đây là lớp bảo vệ bổ sung. Nếu hosting chỉ chạy `node dist/server.js` (bỏ qua seed script), server vẫn tự động tạo roles và admin account. Đây là lý do dự án Hutech-Edu bị lỗi Google Login — Render chạy `node dist/server.js` thay vì `npm start`.

---

## 3. Deploy Frontend

### 3.1 Deploy trên Vercel

1. **Import Git Repository**
2. **Framework Preset:** Vite
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. **Environment Variables:**
   ```env
   VITE_API_URL=https://your-backend.onrender.com/api
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   ```

### 3.2 Deploy trên Netlify

1. **Import from Git**
2. **Build Command:** `npm run build`
3. **Publish Directory:** `dist`
4. Thêm file `netlify.toml`:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```
   > Bắt buộc cho SPA (Single Page Application) — nếu không sẽ bị lỗi 404 khi refresh trang.

### 3.3 Lưu Ý Quan Trọng cho Frontend

- **API URL phải dùng HTTPS** khi deploy production
- **CORS_ORIGIN trên backend** phải match chính xác URL frontend (kể cả trailing slash)
- **Environment variables** trong Vite phải có prefix `VITE_`
- **Sau mỗi lần thay đổi env vars** trên Vercel/Netlify → phải **Redeploy**

---

## 4. Các Lỗi Thường Gặp & Giải Pháp

### 4.1 Backend Errors

#### ❌ Lỗi: "Role mặc định 'User' chưa được khởi tạo"

**Nguyên nhân:** Seed script không chạy → database không có roles  
**Giải pháp:**

- Đảm bảo Start Command là `npm start` (không phải `node dist/server.js`)
- Hoặc dùng auto-seed trong `server.ts` (đã được thêm vào dự án)
- Chạy seed thủ công: `node dist/scripts/seed-roles.js`

#### ❌ Lỗi: "ERR_HTTP_HEADERS_SENT: Cannot set headers after they are sent"

**Nguyên nhân:** Controller gửi response 2 lần — vừa `res.json()` vừa `next(error)`  
**Giải pháp:**

```typescript
// ❌ SAI — gửi response rồi lại gọi next(error)
catch (error) {
  res.status(500).json({ message: "Error" }); // gửi response lần 1
  return next(error); // errorHandler gửi response lần 2 → CRASH
}

// ✅ ĐÚNG — chỉ dùng next(error), để errorHandler xử lý
catch (error) {
  return next(error);
}
```

#### ❌ Lỗi: "prisma: Can't reach database server"

**Nguyên nhân:** `DATABASE_URL` sai hoặc database chưa chạy  
**Giải pháp:**

- Kiểm tra `DATABASE_URL` trên hosting (đúng host, port, password)
- Thêm `?sslmode=require` nếu dùng hosted PostgreSQL
- Kiểm tra database có đang chạy: `pg_isready -h host -p 5432`
- Đảm bảo IP của server được whitelist trong database firewall

#### ❌ Lỗi: "P3009: migrate found failed migrations"

**Nguyên nhân:** Migration trước đó thất bại, database ở trạng thái không nhất quán  
**Giải pháp:**

```bash
# Đánh dấu migration đã applied (dùng khi chắc chắn schema đúng)
npx prisma migrate resolve --applied "20251229033227_extend"

# Hoặc reset database (MẤT HẾT DATA!)
npx prisma migrate reset
```

#### ❌ Lỗi: "CORS policy: origin not allowed"

**Nguyên nhân:** `CORS_ORIGIN` trên backend không match URL frontend  
**Giải pháp:**

```env
# Hỗ trợ nhiều origins
CORS_ORIGIN=https://app.vercel.app,https://app.netlify.app,http://localhost:5173
```

#### ❌ Lỗi: Slow requests (>1000ms)

**Nguyên nhân:** Cold start, database xa server, không có cache  
**Giải pháp:**

- Deploy backend và database **cùng region**
- Bật Redis cache cho các query nặng
- Render free tier có cold start ~30s — upgrade lên paid hoặc dùng cron job ping

#### ❌ Lỗi: "Firebase Admin SDK initialization failed"

**Nguyên nhân:** Thiếu `serviceAccountKey.json` hoặc thiếu env vars Firebase  
**Giải pháp:**

- Upload `serviceAccountKey.json` vào repo (HOẶC dùng env var)
- Hoặc set `FIREBASE_SERVICE_ACCOUNT` env var chứa JSON string
- Kiểm tra project ID match giữa client và admin SDK

#### ❌ Lỗi: "Module not found" khi start

**Nguyên nhân:** Build chưa chạy hoặc TypeScript compile lỗi  
**Giải pháp:**

- Đảm bảo Build Command: `npm install && npm run build`
- Kiểm tra `tsconfig.json` có `outDir: "dist"`
- Kiểm tra import paths (case-sensitive trên Linux!)

### 4.2 Frontend Errors

#### ❌ Lỗi: 404 khi refresh trang (Netlify/Nginx)

**Nguyên nhân:** SPA routing — server không biết route `/courses/123`  
**Giải pháp:**

- **Netlify:** Thêm `_redirects` file: `/* /index.html 200`
- **Nginx:** Thêm `try_files $uri $uri/ /index.html;`
- **Vercel:** Thêm `vercel.json`:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```

#### ❌ Lỗi: "Mixed Content" (HTTP/HTTPS)

**Nguyên nhân:** Frontend HTTPS gọi API HTTP  
**Giải pháp:** API URL phải luôn dùng HTTPS:

```env
VITE_API_URL=https://your-backend.onrender.com/api  # ✅
# KHÔNG dùng: http://your-backend.onrender.com/api   # ❌
```

#### ❌ Lỗi: Environment variables undefined

**Nguyên nhân:** Vite chỉ expose biến có prefix `VITE_`  
**Giải pháp:**

```env
VITE_API_URL=...     # ✅ Accessible trong code
API_URL=...          # ❌ KHÔNG accessible trong browser code
```

> **Sau khi thay đổi env vars → phải rebuild & redeploy.**

#### ❌ Lỗi: "Network Error" hoặc "Failed to fetch"

**Nguyên nhân:** CORS, API URL sai, hoặc backend chưa sẵn sàng  
**Giải pháp:**

1. Kiểm tra `VITE_API_URL` đúng chưa
2. Kiểm tra CORS_ORIGIN trên backend có chứa URL frontend
3. Thử truy cập API URL trực tiếp trên browser
4. Render free tier: backend có thể đang cold start → chờ 30s

---

## 5. Checklist Trước Khi Deploy

### Backend Checklist

- [ ] **`DATABASE_URL`** đã set trên hosting, với `?sslmode=require`
- [ ] **`REDIS_URL`** đã set (hoặc disable Redis nếu không cần)
- [ ] **`JWT_SECRET`** đã set (phải dùng key mạnh, không dùng "supersecret")
- [ ] **`CORS_ORIGIN`** chứa đúng URL(s) frontend production
- [ ] **`NODE_ENV=production`** đã set
- [ ] **Start Command** là `npm start` (KHÔNG phải `node dist/server.js`)
- [ ] **Build Command** là `npm install && npm run build`
- [ ] **Firebase service account** đã config đúng
- [ ] `prisma migrate deploy` chạy trước server start
- [ ] Seed script chạy trước server start
- [ ] Không có `console.log` chứa thông tin nhạy cảm (passwords, tokens)
- [ ] Rate limiting đã bật cho production

### Frontend Checklist

- [ ] **`VITE_API_URL`** trỏ đúng backend production URL (HTTPS)
- [ ] **Firebase config** dùng production keys
- [ ] **SPA redirect** đã config (Netlify `_redirects` hoặc Vercel `rewrites`)
- [ ] Build thành công không có lỗi TypeScript
- [ ] Kiểm tra trang trên mobile view
- [ ] Không có hardcoded `localhost` URLs trong code

---

## 6. Lưu Ý Quan Trọng Cần Tránh

### 🚫 KHÔNG BAO GIỜ

| #   | Sai Lầm                                    | Hậu Quả                              | Giải Pháp                                                |
| --- | ------------------------------------------ | ------------------------------------ | -------------------------------------------------------- |
| 1   | Commit `.env` file lên Git                 | Lộ database password, API keys       | Thêm `.env` vào `.gitignore`, dùng env vars trên hosting |
| 2   | Dùng `JWT_SECRET="supersecret"`            | Bất kỳ ai cũng có thể tạo fake JWT   | Dùng key ngẫu nhiên ≥32 ký tự: `openssl rand -hex 32`    |
| 3   | Hardcode `localhost` trong production code | API gọi không hoạt động              | Luôn dùng env vars: `process.env.API_URL`                |
| 4   | Skip prisma migrate khi deploy             | Database schema không match code     | Luôn chạy `prisma migrate deploy` trong start command    |
| 5   | Start command: `node dist/server.js`       | Seed không chạy → thiếu roles, admin | Dùng `npm start` để chạy full pipeline                   |
| 6   | Gửi response + gọi next(error)             | `ERR_HTTP_HEADERS_SENT` crash        | Chỉ dùng 1 trong 2: `res.json()` HOẶC `next(error)`      |
| 7   | Dùng HTTP cho API URL production           | Mixed Content error, không bảo mật   | Luôn dùng HTTPS                                          |
| 8   | Không set CORS_ORIGIN                      | 403 Forbidden từ frontend            | Set chính xác domain frontend                            |
| 9   | Deploy backend và DB khác region           | Latency cao (>500ms mỗi query)       | Đặt cùng region (vd: cả 2 ở us-east)                     |
| 10  | Không kiểm tra `res.headersSent`           | Error handler crash server           | Thêm guard `if (res.headersSent) return next(error)`     |

### 🔒 Bảo Mật

- **KHÔNG** để `serviceAccountKey.json` public (thêm vào `.gitignore` nếu cần)
- **KHÔNG** log passwords hay tokens ra console trong production
- **KHÔNG** dùng `*` cho CORS origin trong production
- **MÃ HÓA** tất cả passwords bằng argon2/bcrypt trước khi lưu database
- **SET** rate limiting để tránh brute-force attacks

### 📦 Package & Dependencies

- **KHÔNG** để `devDependencies` trong `dependencies` (tốn bộ nhớ khi deploy)
- **LOCK** versions: commit `package-lock.json` lên Git
- **KIỂM TRA** security: `npm audit` trước khi deploy

### 🔄 CI/CD Best Practices

- Dùng GitHub Actions / GitLab CI để tự động: build → test → deploy
- Tách branch: `main` (production), `develop` (staging)
- Mỗi PR phải pass lint + build trước khi merge

---

## Tóm Tắt Các Lỗi Đã Fix Trong Dự Án Hutech-Edu

| Lỗi                                           | File                         | Nguyên Nhân                               | Cách Fix                                       |
| --------------------------------------------- | ---------------------------- | ----------------------------------------- | ---------------------------------------------- |
| Role 'User' chưa khởi tạo → Google Login fail | `server.ts`                  | Seed script không chạy trên hosting       | Thêm `autoSeedOnStartup()` vào server startup  |
| ERR_HTTP_HEADERS_SENT                         | `user.controller.ts`         | `res.json()` + `next(error)` gọi cùng lúc | Chỉ dùng `next(error)` trong catch block       |
| Error handler không check headersSent         | `errorHandler.middleware.ts` | Gửi lại response khi đã gửi rồi           | Thêm `if (res.headersSent) return next(error)` |
| Admin không truy cập được                     | `seed-roles.ts`              | Seed không chạy → không có admin account  | Auto-seed đảm bảo admin luôn tồn tại           |

---

## Tài Liệu Tham Khảo

- [Render Deploy Guide](https://render.com/docs/deploy-node-express-app)
- [Vercel CLI Docs](https://vercel.com/docs/cli)
- [Prisma Deploy Migrations](https://www.prisma.io/docs/orm/prisma-migrate/workflows/deploy-migration)
- [Express Error Handling](https://expressjs.com/en/guide/error-handling.html)
