const express = require("express");
const router = express.Router();
const khoahocController = require("../controllers/KhoaHocController.js");
const {
  validateCreateKhoaHoc,
  validateUpdateKhoaHoc,
  validateIdParam,
} = require("../middleware/validateKhoaHoc.js");

const { authenticateToken, authorizeRoles } = require("../middleware/auth");

router.get("/timkiem/:slug", khoahocController.timkiem);
router.get("/", khoahocController.getAllKhoaHoc);

router.get(
  "/timkiemkhoahoc/:id",
  authenticateToken,
  validateIdParam,
  khoahocController.getKhoaHocById
);

router.post(
  "/themkhoahoc",
  authenticateToken,
  authorizeRoles("Admin"),
  validateCreateKhoaHoc,
  khoahocController.createKhoaHoc
);

router.put(
  "/capnhatkhoahoc/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  validateUpdateKhoaHoc,
  khoahocController.updateKhoaHoc
);

router.delete(
  "/xoakhoahoc/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  validateIdParam,
  khoahocController.deleteKhoaHoc
);

module.exports = router;
