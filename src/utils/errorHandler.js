// utils/errorHandler.js

// Middleware xử lý lỗi tập trung
function errorHandler(err, req, res, next) {
  console.error("🔥 Error:", err);

  // Xác định mã lỗi trả về
  const statusCode = err.statusCode || 500;

  // Trả về JSON thống nhất
  res.status(statusCode).json({
    success: false,
    message: err.message || "Lỗi máy chủ",
    errors: err.errors || null,
  });
}

module.exports = errorHandler;
