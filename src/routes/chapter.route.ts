import { Router } from "express";
import Prisma from "../configs/prismaClient";
import ChapterRepository from "../repositories/chapter.repository";
import CourseRepository from "../repositories/course.repository";
import ChapterService from "../services/chapter.service";
import ChapterController from "../controllers/chapter.controller";
import { validate } from "../middlewares/validate";
import { authenticate, optionalAuth } from "../middlewares/auth.middleware";
import { requireRole, requirePermission } from "../middlewares/role.middleware";
import { UserRoles, Permissions } from "../constants/roles";
import {
  createChapterSchema,
  updateChapterSchema,
} from "../validators/chapter.validate";

const chapterRepository = new ChapterRepository(Prisma, "chapterId");
const courseRepository = new CourseRepository(Prisma, "courseId"); 
const chapterService = new ChapterService(chapterRepository, courseRepository);
const chapterController = new ChapterController(chapterService);

const router = Router();

router.get("/", optionalAuth, (req, res, next) =>
  chapterController.getAllChapter(req, res, next)
);

router.get("/:chapterId", optionalAuth, (req, res, next) =>
  chapterController.getChapterById(req, res, next)
);

router.post(
  "/",
  authenticate,
  requirePermission([Permissions.CHAPTER_CREATE]),
  validate(createChapterSchema),
  (req, res, next) => chapterController.createChapter(req, res, next)
);

router.put(
  "/:chapterId",
  authenticate,
  requirePermission([Permissions.CHAPTER_UPDATE]),
  validate(updateChapterSchema),
  (req, res, next) => chapterController.updateChapter(req, res, next)
);

router.delete(
  "/:chapterId",
  authenticate,
  requireRole([UserRoles.ADMIN]),
  requirePermission([Permissions.CHAPTER_DELETE]),
  (req, res, next) => chapterController.deleteChapter(req, res, next)
);

export default router;
