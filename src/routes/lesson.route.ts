import { Router } from "express";
import Prisma from "../configs/prismaClient";
import LessonRepository from "../repositories/lesson.repository";
import TestCaseRepository from "../repositories/testcase.repository";
import ChapterRepository from "../repositories/chapter.repository";
import CourseRepository from "../repositories/course.repository";
import TestCaseService from "../services/testCase.service";
import ChapterService from "../services/chapter.service";
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
const testCaseRepository = new TestCaseRepository(Prisma, "testCaseId");
const chapterRepository = new ChapterRepository(Prisma, "chapterId");
const courseRepository = new CourseRepository(Prisma, "courseId");
const chapterService = new ChapterService(chapterRepository, courseRepository);
const testCaseService = new TestCaseService(testCaseRepository);
const lessonService = new LessonService(lessonRepository, chapterRepository);
const lessonController = new LessonController(lessonService, chapterService, testCaseService);

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

router.get("/:lessonId",
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]),
  requirePermission([Permissions.LESSON_READ]),
  (req, res, next) =>
    lessonController.getLessonById(req, res, next)
);

router.get("/testcase/:lessonId",
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]),
  requirePermission([Permissions.CHAPTER_READ]),
  (req, res, next) =>
    lessonController.getTestCaseByLessonId(req, res, next)
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
