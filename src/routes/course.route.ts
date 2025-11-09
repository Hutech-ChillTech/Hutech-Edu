import { Router } from "express";
import Prisma from "../configs/prismaClient";
import CourseRepository from "../repositories/course.repository";
import CourseService from "../services/course.service";
import CourseController from "../controllers/course.controller";
import { validate } from "../middlewares/validate";
import { authenticate, optionalAuth } from "../middlewares/auth.middleware";
import {
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

import { verifyFirebaseToken } from "../middlewares/verifyFirebaseToken";
import { verifyRole } from "../middlewares/verifyRole";

const courseRepository = new CourseRepository(Prisma, "courseId");
const courseService = new CourseService(courseRepository);
const courseController = new CourseController(courseService);

const router = Router();

router.get(
  "/",
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]),
  requirePermission([Permissions.COURSE_READ]),
  validate(paginationSchema, "query"),
  (req, res, next) => courseController.getAllCourses(req, res, next)
);

router.get(
  "/search",
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]),
  validate(searchCourseSchema, "query"),
  (req, res, next) => courseController.searchCourseByName(req, res, next)
);

router.get("/popular", 
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]), (req, res, next) =>
  courseController.getPopularCourses(req, res, next)
);

router.get(
  "/filter",
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]),
  validate(filterCourseSchema, "query"),
  (req, res, next) => courseController.filterCourses(req, res, next)
);

router.get("/count",
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]), (req, res, next) =>
  courseController.countCourses(req, res, next)
);

router.get(
  "/level/:level",
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]),
  validate(paginationSchema, "query"),
  (req, res, next) => courseController.getCoursesByLevel(req, res, next)
);

router.get("/:courseId", 
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]), (req, res, next) =>
  courseController.getCourseById(req, res, next)
);

router.get("/:courseId/details", 
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]), (req, res, next) =>
  courseController.getCourseWithDetails(req, res, next)
);

router.get("/:courseId/content", 
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]), (req, res, next) =>
  courseController.getCourseWithChaptersAndLessons(req, res, next)
);

router.get("/:courseId/stats", 
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]), (req, res, next) =>
  courseController.getCourseStats(req, res, next)
);

router.get(
  "/creator/:userId",
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]),
  validate(paginationSchema, "query"),
  (req, res, next) => courseController.getCoursesByCreator(req, res, next)
);

router.post(
  "/create",
  verifyFirebaseToken,
  verifyRole(["Admin"]),
  requirePermission([Permissions.COURSE_CREATE]),
  validate(createCourseSchema),
  (req, res, next) => courseController.createCourse(req, res, next)
);

router.put(
  "/update/:courseId",
  verifyFirebaseToken,
  verifyRole(["Admin"]),
  requirePermission([Permissions.COURSE_UPDATE]),
  validate(updateCourseSchema),
  (req, res, next) => courseController.updateCourse(req, res, next)
);

router.delete(
  "/delete/:courseId",
  verifyFirebaseToken,
  verifyRole(["Admin"]),
  requirePermission([Permissions.COURSE_DELETE]),
  (req, res, next) => courseController.deleteCourse(req, res, next)
);

export default router;
