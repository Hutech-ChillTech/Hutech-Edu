const express = require("express");
const baihocController = require("../controllers/BaiHocController");
const {
  validateCreateBaiHoc,
  validateUpdateBaiHoc,
  validateIdParam,
} = require("../middleware/validateBaiHoc");
const { authenticateToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.get("/timkiem/:slug", baihocController.timkiem);
router.get("/", baihocController.getAllBaiHoc);

router.get(
  "/timkiembaihoc/:id",
  authenticateToken,
  validateIdParam,
  baihocController.getBaiHocId
);

router.post(
  "/thembaihoc",
  authenticateToken,
  authorizeRoles("Admin"),
  validateCreateBaiHoc,
  baihocController.createBaiHoc
);

router.put(
  "/capnhatbaihoc/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  validateUpdateBaiHoc,
  baihocController.updateBaiHoc
);

router.delete(
  "/xoabaihoc/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  validateIdParam,
  baihocController.deleteBaiHoc
);

module.exports = router;
