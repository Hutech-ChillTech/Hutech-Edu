import { Request, Response, NextFunction, Router } from "express";
import Prisma from "../configs/prismaClient";
import UserRepository from "../repositories/user.repository";
import UserService from "../services/user.service";
import UserController from "../controllers/user.controller";

import { validateCreateUser, validateLogin } from "../validators/user.validate";
import { requireIdParam } from "../middlewares/validate";

const userRepository = new UserRepository(Prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = Router();

// Đăng nhập
router.post("/login", validateLogin, userController.login);

// Dăng ký
router.post("/", validateCreateUser, userController.createUser);

// Lấy tất cả user (có thể phân trang qua query)
router.get("/", userController.getAllUser);

// Lấy user theo tên
router.get("/search/name", userController.getUserByName);

// Lấy user theo email
router.get("/search/email", userController.getUserByEmail);

// Lấy user theo id
router.get("/:userId", requireIdParam("userId"), userController.getUserById);

// Cập nhật user
router.put("/:userId", requireIdParam("userId"), userController.updateUser);

// Xóa user
router.delete("/:userId", requireIdParam("userId"), userController.deleteUser);

// Đổi mật khẩu user
router.patch(
  "/:userId/change-password",
  requireIdParam("userId"),
  userController.changePasswordUser
);

export default router;