import { Router } from "express";
import Prisma from "../configs/prismaClient";
import CourseRepository from "../repositories/course.repository";
import CourseService from "../services/course.service";
import CourseController from "../controllers/course.controller";

const courseRepository = new CourseRepository(Prisma, "courseId");
const courseService = new CourseService(courseRepository);
const courseController = new CourseController(courseService)

const router = Router();

router.get('/', (req, res, next) => courseController.getAllCourses(req, res, next));

router.get('/:courseId', (req, res, next) => courseController.getCourseById(req, res, next));

router.post('/', (req, res, next) => courseController.createCourse(req, res, next));

router.put('/:courseId', (req, res, next) => courseController.updateCourse(req, res, next));

router.delete('/:courseId', (req, res, next) => courseController.deleteCourse(req, res, next));

export default router;