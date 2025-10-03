const { PrismaClient } = require("../generated/prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

class AuthController {
  // Đăng ký
  async register(req, res) {
    const { email, password, fullname, sex, phonenumber } = req.body;
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "Email đã được sử dụng" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          fullname, // hoặc bạn có thể tách riêng fullname nếu muốn
          sex,
          phonenumber,
        },
      });

      // Gán Role mặc định là "User"
      const userRole = await prisma.role.findUnique({
        where: { name: "User" },
      });
      if (userRole) {
        await prisma.userRole.create({
          data: {
            userId: user.id,
            roleId: userRole.id,
          },
        });
      }

      res.status(201).json({
        message: "✅ Đăng ký thành công",
        user: { id: user.id, email: user.email, name: user.name },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Lỗi server" });
    }
  }

  // Đăng nhập
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user)
        return res.status(400).json({ error: "Tài khoản không tồn tại" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ error: "Mật khẩu không đúng" });

      // Lấy role name từ bảng UserRole
      const roles = await prisma.userRole.findMany({
        where: { userId: user.id },
        include: { role: true },
      });
      const roleNames = roles.map((r) => r.role.name);

      // Tạo token JWT kèm roles
      const token = jwt.sign(
        { id: user.id, email: user.email, roles: roleNames },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        message: "✅ Đăng nhập thành công",
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          roles: roleNames,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Lỗi server" });
    }
  }
}

module.exports = new AuthController();
