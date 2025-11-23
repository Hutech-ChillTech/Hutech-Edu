import { Router } from "express";
import Prisma from "../configs/prismaClient";
import UserRepository from "../repositories/user.repository";
import UserRoleRepository from "../repositories/userRole.repository";
import RoleRepository from "../repositories/role.repository";
import UserService from "../services/user.service";
import UserController from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { authenticate } from "../middlewares/auth.middleware";
import {
  requireOwnerOrAdmin,
} from "../middlewares/role.middleware";
import {
  loginSchema,
  createUserSchema,
  updateUserSchema,
  changePasswordSchema,
  searchUserSchema,
  getUserByNameSchema,
  getUserByEmailSchema,
  paginationSchema,
} from "../validators/user.validate";
import { uploadImage } from "../middlewares/upload.middleware";
import { verifyFirebaseToken } from "../middlewares/verifyFirebaseToken";
import { verifyRole } from "../middlewares/verifyRole";


const roleRepository = new RoleRepository(Prisma, "roleId");
const userRoleRepository = new UserRoleRepository(Prisma, "userRole");
const userRepository = new UserRepository(Prisma, "userId");
const userService = new UserService(userRepository, roleRepository, userRoleRepository);
const userController = new UserController(userService);

const router = Router();

router.post("/login", validate(loginSchema), (req, res, next) =>
  userController.login(req, res, next)
);

router.post("/register", validate(createUserSchema), (req, res, next) =>
  userController.register(req, res, next)
);

router.get(
  "/search",
  authenticate,
  validate(searchUserSchema, "query"),
  (req, res, next) => userController.searchUserByName(req, res, next)
);

router.get(
  "/search/name",
  authenticate,
  validate(getUserByNameSchema, "query"),
  (req, res, next) => userController.getUserByName(req, res, next)
);

router.get(
  "/search/email",
  authenticate,
  validate(getUserByEmailSchema, "query"),
  (req, res, next) => userController.getUserByEmail(req, res, next)
);

router.get(
  "/",
  authenticate,
  validate(paginationSchema, "query"),
  (req, res, next) => userController.getAllUser(req, res, next)
);

router.get("/:userId", verifyFirebaseToken, verifyRole(["Admin", "User"]), (req, res, next) =>
  userController.getUserById(req, res, next)
);

router.get("/uid/:uid", verifyFirebaseToken, verifyRole(["Admin", "User"]), (req, res, next) =>
  userController.getUserByUid(req, res, next)
);

router.get(
  "/:userId/details",
  authenticate,
  requireOwnerOrAdmin((req) => req.params.userId),
  (req, res, next) => userController.getUserWithRelations(req, res, next)
);

router.get(
  "/:userId/courses",
  authenticate,
  requireOwnerOrAdmin((req) => req.params.userId),
  (req, res, next) => userController.getUserEnrolledCourses(req, res, next)
);

router.get(
  "/:userId/enrollment/:courseId",
  authenticate,
  requireOwnerOrAdmin((req) => req.params.userId),
  (req, res, next) => userController.checkEnrollment(req, res, next)
);

router.put(
  "/:userId",
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]),
  uploadImage.single('avatar'),
  validate(updateUserSchema),
  (req, res, next) => userController.updateUser(req, res, next)
);


router.put(
  "/uid/:uid",
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]),
  uploadImage.single('avatar'),
  validate(updateUserSchema),
  (req, res, next) => userController.updateUserByUid(req, res, next)
);

router.delete(
  "/:userId",
  authenticate,
  (req, res, next) => userController.deleteUser(req, res, next)
);

router.patch(
  "/:userId/change-password",
  authenticate,
  requireOwnerOrAdmin((req) => req.params.userId),
  validate(changePasswordSchema),
  (req, res, next) => userController.changePasswordUser(req, res, next)
);

export default router;
