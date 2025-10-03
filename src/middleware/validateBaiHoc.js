const { body, param, validationResult } = require("express-validator");

const validateCreateBaiHoc = [
  body("TieuDe").notEmpty().withMessage("Tiêu đề không được để trống"),
  body("NoiDung").notEmpty().withMessage("Nội dung không được để trống"),
  body("KhoaHocId")
    .isInt({ gt: 0 })
    .withMessage("KhoaHocId phải là số nguyên dương"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUpdateBaiHoc = [
  param("id").isInt().withMessage("ID phải là số nguyên"),
  body("TieuDe").notEmpty().withMessage("Tiêu đề không được để trống"),
  body("NoiDung").notEmpty().withMessage("Nội dung không được để trống"),
  body("KhoaHocId")
    .isInt({ gt: 0 })
    .withMessage("KhoaHocId phải là số nguyên dương"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateIdParam = [
  param("id").isInt().withMessage("ID phải là số nguyên"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateCreateBaiHoc,
  validateUpdateBaiHoc,
  validateIdParam,
};
