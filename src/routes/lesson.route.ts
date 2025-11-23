import { Router } from "express";
import Prisma from "../configs/prismaClient";
import LessonRepository from "../repositories/lesson.repository";
import ChapterRepository from "../repositories/chapter.repository";
import LessonService from "../services/lesson.service";
import LessonController from "../controllers/lesson.controller";
import { validate } from "../middlewares/validate";
import { requirePermission } from "../middlewares/role.middleware";
import { UserRoles, Permissions } from "../constants/roles";
import { uploadVideo } from "../middlewares/upload.middleware";
import {
  createLessonSchema,
  updateLessonSchema,
} from "../validators/lesson.validate";

import { verifyFirebaseToken } from "../middlewares/verifyFirebaseToken";
import { verifyRole } from "../middlewares/verifyRole";

const lessonRepository = new LessonRepository(Prisma, "lessonId");
const chapterRepository = new ChapterRepository(Prisma, "chapterId");
const lessonService = new LessonService(lessonRepository, chapterRepository);
const lessonController = new LessonController(lessonService, chapterRepository);

const router = Router();

router.get("/",
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]),
  requirePermission([Permissions.LESSON_READ]),
  (req, res, next) =>
    lessonController.getAllLessons(req, res, next)
);

router.get("/:lessonId",
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]),
  requirePermission([Permissions.LESSON_READ]),
  (req, res, next) =>
    lessonController.getLessonById(req, res, next)
);

router.get("/chapter/:chapterId",
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]),
  requirePermission([Permissions.CHAPTER_READ]),
  (req, res, next) =>
    lessonController.getChapterById(req, res, next)
);

router.post(
  "/",
  verifyFirebaseToken,
  verifyRole(["Admin"]),
  requirePermission([Permissions.LESSON_CREATE]),
  uploadVideo.single('video'),
  validate(createLessonSchema),
  (req, res, next) => lessonController.createLesson(req, res, next)
);

router.put(
  "/:lessonId",
  verifyFirebaseToken,
  verifyRole(["Admin"]),
  requirePermission([Permissions.LESSON_UPDATE]),
  validate(updateLessonSchema),
  (req, res, next) => lessonController.updateLesson(req, res, next)
);

router.delete(
  "/:lessonId",
  verifyFirebaseToken,
  verifyRole(["Admin"]),
  requirePermission([Permissions.LESSON_DELETE]),
  (req, res, next) => lessonController.deleteLesson(req, res, next)
);

export default router;
