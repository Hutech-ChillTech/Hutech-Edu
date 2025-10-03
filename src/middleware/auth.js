const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "secret_key"; // fallback nếu chưa khai báo

// ✅ Middleware xác thực token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "❌ Bạn chưa đăng nhập" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: "❌ Token không hợp lệ hoặc hết hạn" });

    req.user = user; // user: { id, email, roles: [...] }
    next();
  });
}

// ✅ Middleware phân quyền theo vai trò (có thể nhiều role)
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const userRoles = req.user.roles || [];
    const hasPermission = userRoles.some((role) => allowedRoles.includes(role));

    if (!hasPermission) {
      return res.status(403).json({
        message: `❌ Không có quyền. Yêu cầu: ${allowedRoles.join(", ")}`,
      });
    }

    next();
  };
}

module.exports = {
  authenticateToken,
  authorizeRoles,
};
