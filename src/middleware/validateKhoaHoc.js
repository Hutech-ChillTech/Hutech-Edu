const { body, param, validationResult } = require("express-validator");

// Validate khi tạo khóa học
const validateCreateKhoaHoc = [
  body("TenKhoaHoc")
    .notEmpty()
    .withMessage("Tên khóa học không được để trống")
    .isString()
    .withMessage("Tên khóa học phải là chuỗi"),

  body("MoTa").optional().isString().withMessage("Mô tả phải là chuỗi"),

  body("Gia")
    .notEmpty()
    .withMessage("Giá không được để trống")
    .isFloat({ min: 0 })
    .withMessage("Giá phải là số không âm"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validate khi cập nhật khóa học
const validateUpdateKhoaHoc = [
  param("id").isInt({ gt: 0 }).withMessage("ID không hợp lệ"),

  body("TenKhoaHoc")
    .notEmpty()
    .withMessage("Tên khóa học không được để trống")
    .isString()
    .withMessage("Tên khóa học phải là chuỗi"),

  body("MoTa").optional().isString().withMessage("Mô tả phải là chuỗi"),

  body("Gia")
    .notEmpty()
    .withMessage("Giá không được để trống")
    .isFloat({ min: 0 })
    .withMessage("Giá phải là số không âm"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validate ID từ param (dùng cho get/delete by id)
const validateIdParam = [
  param("id").isInt({ gt: 0 }).withMessage("ID không hợp lệ"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateCreateKhoaHoc,
  validateUpdateKhoaHoc,
  validateIdParam,
};
