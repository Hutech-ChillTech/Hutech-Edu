import { Router } from "express";
import Prisma from "../configs/prismaClient";
import LessonRepository from "../repositories/lesson.repository";
import LessonService from "../services/lesson.service";
import LessonController from "../controllers/lesson.controller";
import { validate } from "../middlewares/validate";
import { authenticate, optionalAuth } from "../middlewares/auth.middleware";
import { requireRole, requirePermission } from "../middlewares/role.middleware";
import { UserRoles, Permissions } from "../constants/roles";
import {
  createLessonSchema,
  updateLessonSchema,
} from "../validators/lesson.validate";

const lessonRepository = new LessonRepository(Prisma, "lessonId");
const lessonService = new LessonService(lessonRepository);
const lessonController = new LessonController(lessonService);

const router = Router();

router.get("/", optionalAuth, (req, res, next) =>
  lessonController.getAllLessons(req, res, next)
);

router.get("/:lessonId", optionalAuth, (req, res, next) =>
  lessonController.getLessonById(req, res, next)
);

router.post(
  "/create",
  authenticate,
  requirePermission([Permissions.LESSON_CREATE]),
  validate(createLessonSchema),
  (req, res, next) => lessonController.createLesson(req, res, next)
);

router.put(
  "/update/:lessonId",
  authenticate,
  requirePermission([Permissions.LESSON_UPDATE]),
  validate(updateLessonSchema),
  (req, res, next) => lessonController.updateLesson(req, res, next)
);

router.delete(
  "/delete/:lessonId",
  authenticate,
  requireRole([UserRoles.ADMIN]),
  requirePermission([Permissions.LESSON_DELETE]),
  (req, res, next) => lessonController.deleteLesson(req, res, next)
);

export default router;
