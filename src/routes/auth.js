const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const {
  validateRegister,
  validateLogin,
} = require("../middleware/validateAuth");

router.post("/register", validateRegister, AuthController.register);
router.post("/login", validateLogin, AuthController.login);

module.exports = router;
