import { Router } from "express";
import Prisma from "../configs/prismaClient";
import CourseRepository from "../repositories/course.repository";
import CourseService from "../services/course.service";
import CourseController from "../controllers/course.controller";
import { validate } from "../middlewares/validate";
import { authenticate, optionalAuth } from "../middlewares/auth.middleware";
import {
  requireRole,
  requirePermission,
  requireCourseOwnerOrAdmin,
} from "../middlewares/role.middleware";
import { UserRoles, Permissions } from "../constants/roles";
import {
  createCourseSchema,
  updateCourseSchema,
  filterCourseSchema,
  searchCourseSchema,
  paginationSchema,
} from "../validators/course.validate";

const courseRepository = new CourseRepository(Prisma, "courseId");
const courseService = new CourseService(courseRepository);
const courseController = new CourseController(courseService);

const router = Router();

router.get(
  "/",
  optionalAuth,
  validate(paginationSchema, "query"),
  (req, res, next) => courseController.getAllCourses(req, res, next)
);

router.get(
  "/search",
  optionalAuth,
  validate(searchCourseSchema, "query"),
  (req, res, next) => courseController.searchCourseByName(req, res, next)
);

router.get("/popular", optionalAuth, (req, res, next) =>
  courseController.getPopularCourses(req, res, next)
);

router.get(
  "/filter",
  optionalAuth,
  validate(filterCourseSchema, "query"),
  (req, res, next) => courseController.filterCourses(req, res, next)
);

router.get("/count", optionalAuth, (req, res, next) =>
  courseController.countCourses(req, res, next)
);

router.get(
  "/level/:level",
  optionalAuth,
  validate(paginationSchema, "query"),
  (req, res, next) => courseController.getCoursesByLevel(req, res, next)
);

router.get("/:courseId", optionalAuth, (req, res, next) =>
  courseController.getCourseById(req, res, next)
);

router.get("/:courseId/details", optionalAuth, (req, res, next) =>
  courseController.getCourseWithDetails(req, res, next)
);

router.get("/:courseId/content", optionalAuth, (req, res, next) =>
  courseController.getCourseWithChaptersAndLessons(req, res, next)
);

router.get("/:courseId/stats", optionalAuth, (req, res, next) =>
  courseController.getCourseStats(req, res, next)
);

router.get(
  "/creator/:userId",
  authenticate,
  validate(paginationSchema, "query"),
  (req, res, next) => courseController.getCoursesByCreator(req, res, next)
);

router.post(
  "/create",
  authenticate,
  requirePermission([Permissions.COURSE_CREATE]),
  validate(createCourseSchema),
  (req, res, next) => courseController.createCourse(req, res, next)
);

router.put(
  "/update/:courseId",
  authenticate,
  requireCourseOwnerOrAdmin(),
  requirePermission([Permissions.COURSE_UPDATE]),
  validate(updateCourseSchema),
  (req, res, next) => courseController.updateCourse(req, res, next)
);

router.delete(
  "/delete/:courseId",
  authenticate,
  requireRole([UserRoles.ADMIN]),
  requirePermission([Permissions.COURSE_DELETE]),
  (req, res, next) => courseController.deleteCourse(req, res, next)
);

export default router;
