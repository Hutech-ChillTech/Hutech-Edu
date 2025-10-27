import { Request, Response, NextFunction, Router } from "express";
import Prisma from "../configs/prismaClient";
import UserRepository from "../repositories/user.repository";
import UserService from "../services/user.service";
import UserController from "../controllers/user.controller";

import { validateCreateUser, validateLogin } from "../validators/user.validate";
import { requireIdParam } from "../middlewares/validate";

const userRepository = new UserRepository(Prisma, "userId");
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = Router();

// Các route cố định / search / login / create
router.get("/search/name", (req, res, next) => userController.getUserByName(req, res, next));
router.get("/search/email", (req, res, next) => userController.getUserByEmail(req, res, next));
router.post("/login", validateLogin, (req, res, next) => userController.login(req, res, next));
router.post("/", validateCreateUser, (req, res, next) => userController.createUser(req, res, next));
router.get("/", (req, res, next) => userController.getAllUser(req, res, next));

// Các route dynamic
router.get("/:userId", requireIdParam("userId"), (req, res, next) => userController.getUserById(req, res, next));
router.put("/:userId", requireIdParam("userId"), (req, res, next) => userController.updateUser(req, res, next));
router.delete("/:userId", requireIdParam("userId"), (req, res, next) => userController.deleteUser(req, res, next));
router.patch("/:userId/change-password", requireIdParam("userId"), (req, res, next) => userController.changePasswordUser(req, res, next));

export default router;