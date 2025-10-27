import { validate as isUUID } from "uuid";
import { Request, Response, NextFunction } from "express";
import { sendNotFound, sendSuccess, sendEmpty } from "../utils/responseHelper";
import CourseService from "../services/course.service";

class CourseController {
    private readonly courseService: CourseService;
    constructor(courseService: CourseService) {
        this.courseService = courseService;
    }

    async getAllCourses(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const courses = await this.courseService.getAllCourse();
            if (!courses) {
                sendEmpty(res, 'Chưa có dữ liệu được thêm vào.');
                return;
            }
            sendSuccess(res, courses, 'Lấy tất cả courses thành công.');
            return;
        } catch (error) {
            return next(error);
        }
    }


    async getCourseById(req: Request, res: Response, next: NextFunction) {
        try {
            const { courseId } = req.params;
            if (!isUUID(courseId)) {
                return res.status(400).json({ message: "Invalid user ID" });
            }
            const course = await this.courseService.getCourseById(courseId);
            if (!course) {
                sendNotFound(res, 'Không tìm thấy course cần tìm');
                return;
            }
            return sendSuccess(res, course, 'Lấy thành công course cần tìm');
        } catch (error) {
            return next(error);
        }
    }

    async createCourse(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body;
            const course = await this.courseService.createCourse(data);

            return sendSuccess(res, course, 'Thêm mới course thành công.');
        } catch (error) {
            return next(error);
        }
    }

    async updateCourse(req: Request, res: Response, next: NextFunction) {
        try {
            const { courseId } = req.params;
            if (!isUUID(courseId)) {
                return res.status(400).json({ message: "Invalid user ID" });
            }
            const data = req.body;
            const course = await this.courseService.updateCourse(courseId, data);

            if (!course) {
                sendNotFound(res, 'Không tìm thấy course cần cập nhật');
                return;
            }

            return sendSuccess(res, course, 'Cập nhật course thành công.');
        } catch (error) {
            return next(error);
        }
    }


    async deleteCourse(req: Request, res: Response, next: NextFunction) {
        try {
            const { courseId } = req.params;
            if (!isUUID(courseId)) {
                return res.status(400).json({ message: "Invalid user ID" });
            }
            const course = await this.courseService.deleteCourse(courseId);

            if (!course) {
                sendNotFound(res, 'Không tìm thấy course cần xóa');
                return;
            }

            return sendSuccess(res, course, 'Xóa course thành công.');
        } catch (error) {
            return next(error);
        }
    }

    async getCourseByName(req: Request, res: Response, next: NextFunction) {
        try {
            const { courseName } = req.body;
            const course = await this.courseService.getCourseByName(courseName);
            return sendSuccess(res, course, 'Lấy khóa học theo tên thành công.')
        } catch (error) {
            return next(error);

        }
    }

    async getCourseByNamePrefix(req: Request, res: Response) {
        try {
        } catch { }
    }
}

export default CourseController;