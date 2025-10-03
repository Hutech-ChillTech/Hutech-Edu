const express = require("express");
const cauhoiController = require("../controllers/CauHoiController");
const {
  validateCreateCauHoi,
  validateUpdateCauHoi,
  validateIdParam,
} = require("../middleware/validateCauHoi");
const { authenticateToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.get("/timkiem/:slug", cauhoiController.timkiem);
router.get("/", cauhoiController.getAllCauHoi);

router.get(
  "/timkiemcauhoi/:id",
  authenticateToken,
  validateIdParam,
  cauhoiController.getCauHoiById
);

router.post(
  "/themcauhoi",
  authenticateToken,
  authorizeRoles("Admin"),
  validateCreateCauHoi,
  cauhoiController.createCauHoi
);

router.put(
  "/capnhatcauhoi/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  validateUpdateCauHoi,
  cauhoiController.updateCauHoi
);

router.delete(
  "/xoacauhoi/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  validateIdParam,
  cauhoiController.deleteCauHoi
);

module.exports = router;
