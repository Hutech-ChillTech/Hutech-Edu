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

// Lấy tất cả khóa học (có phân trang)
router.get(
  "/",
  optionalAuth,
  validate(paginationSchema, "query"),
  (req, res, next) => courseController.getAllCourses(req, res, next)
);

// Tìm kiếm khóa học theo tên (contains - không phân biệt hoa thường)
router.get(
  "/search",
  optionalAuth,
  validate(searchCourseSchema, "query"),
  (req, res, next) => courseController.searchCourseByName(req, res, next)
);

// Lấy khóa học phổ biến/nổi bật (sắp xếp theo số lượng người đăng ký)
router.get("/popular", optionalAuth, (req, res, next) =>
  courseController.getPopularCourses(req, res, next)
);

// Lọc khóa học theo nhiều tiêu chí (level, price range, searchTerm)
router.get(
  "/filter",
  optionalAuth,
  validate(filterCourseSchema, "query"),
  (req, res, next) => courseController.filterCourses(req, res, next)
);

// Đếm số lượng khóa học theo bộ lọc
router.get("/count", optionalAuth, (req, res, next) =>
  courseController.countCourses(req, res, next)
);

// Lấy khóa học theo cấp độ (Basic, Intermediate, Advanced)
router.get(
  "/level/:level",
  optionalAuth,
  validate(paginationSchema, "query"),
  (req, res, next) => courseController.getCoursesByLevel(req, res, next)
);

// Lấy thông tin cơ bản của khóa học theo ID
router.get("/:courseId", optionalAuth, (req, res, next) =>
  courseController.getCourseById(req, res, next)
);

// Lấy chi tiết khóa học (kèm creator, chapters, enrollments, comments)
router.get("/:courseId/details", optionalAuth, (req, res, next) =>
  courseController.getCourseWithDetails(req, res, next)
);

// Lấy nội dung khóa học (chapters + lessons của từng chapter)
router.get("/:courseId/content", optionalAuth, (req, res, next) =>
  courseController.getCourseWithChaptersAndLessons(req, res, next)
);

// Lấy thống kê khóa học (enrollments, chapters, comments, certificates)
router.get("/:courseId/stats", optionalAuth, (req, res, next) =>
  courseController.getCourseStats(req, res, next)
);

// Lấy tất cả khóa học của một creator/instructor
router.get(
  "/creator/:userId",
  authenticate,
  validate(paginationSchema, "query"),
  (req, res, next) => courseController.getCoursesByCreator(req, res, next)
);

// Tạo khóa học mới (cần quyền COURSE_CREATE)
router.post(
  "/create",
  authenticate,
  requirePermission([Permissions.COURSE_CREATE]),
  validate(createCourseSchema),
  (req, res, next) => courseController.createCourse(req, res, next)
);

// Cập nhật khóa học (chỉ creator hoặc admin)
router.put(
  "/update/:courseId",
  authenticate,
  requireCourseOwnerOrAdmin(),
  requirePermission([Permissions.COURSE_UPDATE]),
  validate(updateCourseSchema),
  (req, res, next) => courseController.updateCourse(req, res, next)
);

// Xóa khóa học (chỉ admin)
router.delete(
  "/delete/:courseId",
  authenticate,
  requireRole([UserRoles.ADMIN]),
  requirePermission([Permissions.COURSE_DELETE]),
  (req, res, next) => courseController.deleteCourse(req, res, next)
);

export default router;
