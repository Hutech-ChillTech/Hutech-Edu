# 🛠️ Dự Án Back-End (Make by PDLK)

Một dự án Node.js sử dụng PostgreSQL và Prisma để quản lý dữ liệu. Hướng dẫn bên dưới sẽ giúp bạn thiết lập môi trường và chạy server một cách dễ dàng.

---

## 🚀 Bắt đầu chạy

### ⚙️ Cấu hình để chạy dự án

#### Bước 1: Mở file `package.json`

#### Bước 2: Kiểm tra đã install những file nằm trong "dependencies" và "devDependencies"

#### Bước 3: Mở file `.env`

Cập nhật thông tin `DATABASE_URL` cho phù hợp với tài khoản PostgreSQL của bạn:

DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database-name>?schema=public

> 🔑 Thay `<username>`, `<password>`, và `<database-name>` bằng thông tin thật.

#### Bước 4: 🛠️ Migrate cơ sở dữ liệu

Sau khi cập nhật `.env`, chạy lệnh sau để tạo các bảng trong CSDL:

npm `run migrate`

#### Bước 5: Khởi chạy server

npm `start`
