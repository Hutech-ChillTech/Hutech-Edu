import { validate as isUUID } from "uuid";
import { Request, Response, NextFunction } from "express";
import { sendNotFound, sendSuccess, sendEmpty } from "../utils/responseHelper";
import CourseService from "../services/course.service";
import { Level } from "@prisma/client";

class CourseController {
  private readonly courseService: CourseService;
  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }

  async getAllCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const skip = parseInt(req.query.skip as string) || 0;
      const take = parseInt(req.query.take as string) || 20;
      const courses = await this.courseService.getAllCourse(skip, take);
      if (!courses || courses.length === 0) {
        sendEmpty(res, "Chưa có dữ liệu được thêm vào.");
        return;
      }
      sendSuccess(res, courses, "Lấy tất cả courses thành công.");
    } catch (error) {
      return next(error);
    }
  }

  async getCourseById(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params;
      if (!isUUID(courseId)) {
        return res.status(400).json({ message: "Invalid course ID" });
      }
      const course = await this.courseService.getCourseById(courseId);
      if (!course) {
        sendNotFound(res, "Không tìm thấy course cần tìm");
        return;
      }
      sendSuccess(res, course, "Lấy thành công course cần tìm");
    } catch (error) {
      return next(error);
    }
  }

  async getCourseWithDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params;
      if (!isUUID(courseId)) {
        return res.status(400).json({ message: "Invalid course ID" });
      }
      const course = await this.courseService.getCourseWithDetails(courseId);
      if (!course) {
        sendNotFound(res, "Không tìm thấy course");
        return;
      }
      sendSuccess(res, course, "Lấy thông tin chi tiết course thành công");
    } catch (error) {
      return next(error);
    }
  }

  async getCourseWithChaptersAndLessons(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { courseId } = req.params;
      if (!isUUID(courseId)) {
        return res.status(400).json({ message: "Invalid course ID" });
      }
      const course = await this.courseService.getCourseWithChaptersAndLessons(
        courseId
      );
      if (!course) {
        sendNotFound(res, "Không tìm thấy course");
        return;
      }
      sendSuccess(res, course, "Lấy nội dung course thành công");
    } catch (error) {
      return next(error);
    }
  }

  async searchCourseByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { search } = req.query;
      const limit = parseInt(req.query.limit as string) || 20;
      const courses = await this.courseService.searchCourseByName(
        search as string,
        limit
      );
      sendSuccess(res, courses, "Tìm kiếm course thành công");
    } catch (error) {
      return next(error);
    }
  }

  async getCourseByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseName } = req.query;
      const courses = await this.courseService.getCourseByName(
        courseName as string
      );
      sendSuccess(res, courses, "Lấy khóa học theo tên thành công");
    } catch (error) {
      return next(error);
    }
  }

  async getCourseByNamePrefix(req: Request, res: Response, next: NextFunction) {
    try {
      const { prefix } = req.query;
      const courses = await this.courseService.getCourseByNamePrefix(
        prefix as string
      );
      sendSuccess(res, courses, "Lấy khóa học theo prefix thành công");
    } catch (error) {
      return next(error);
    }
  }

  async getCoursesByLevel(req: Request, res: Response, next: NextFunction) {
    try {
      const { level } = req.params;
      const skip = parseInt(req.query.skip as string) || 0;
      const take = parseInt(req.query.take as string) || 20;

      const courses = await this.courseService.getCoursesByLevel(
        level as Level,
        skip,
        take
      );
      sendSuccess(res, courses, "Lấy khóa học theo level thành công");
    } catch (error) {
      return next(error);
    }
  }

  async getCoursesByCreator(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const skip = parseInt(req.query.skip as string) || 0;
      const take = parseInt(req.query.take as string) || 20;

      if (!isUUID(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const courses = await this.courseService.getCoursesByCreator(
        userId,
        skip,
        take
      );
      sendSuccess(res, courses, "Lấy khóa học của giảng viên thành công");
    } catch (error) {
      return next(error);
    }
  }

  async getPopularCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const courses = await this.courseService.getPopularCourses(limit);
      sendSuccess(res, courses, "Lấy khóa học phổ biến thành công");
    } catch (error) {
      return next(error);
    }
  }

  async getCourseStats(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params;
      if (!isUUID(courseId)) {
        return res.status(400).json({ message: "Invalid course ID" });
      }
      const stats = await this.courseService.getCourseStats(courseId);
      sendSuccess(res, stats, "Lấy thống kê course thành công");
    } catch (error) {
      return next(error);
    }
  }

  async filterCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const { level, minPrice, maxPrice, searchTerm } = req.query;
      const skip = parseInt(req.query.skip as string) || 0;
      const take = parseInt(req.query.take as string) || 20;

      const filters: any = { skip, take };

      if (level) filters.level = level as Level;
      if (minPrice) filters.minPrice = parseFloat(minPrice as string);
      if (maxPrice) filters.maxPrice = parseFloat(maxPrice as string);
      if (searchTerm) filters.searchTerm = searchTerm as string;

      const courses = await this.courseService.filterCourses(filters);
      sendSuccess(res, courses, "Lọc khóa học thành công");
    } catch (error) {
      return next(error);
    }
  }

  async countCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const { level, minPrice, maxPrice, searchTerm } = req.query;

      const filters: any = {};
      if (level) filters.level = level as Level;
      if (minPrice) filters.minPrice = parseFloat(minPrice as string);
      if (maxPrice) filters.maxPrice = parseFloat(maxPrice as string);
      if (searchTerm) filters.searchTerm = searchTerm as string;

      const count = await this.courseService.countCourses(filters);
      sendSuccess(res, { count }, "Đếm số lượng khóa học thành công");
    } catch (error) {
      return next(error);
    }
  }

  async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const course = await this.courseService.createCourse(data);
      sendSuccess(res, course, "Thêm mới course thành công");
    } catch (error) {
      return next(error);
    }
  }

  async updateCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params;
      if (!isUUID(courseId)) {
        return res.status(400).json({ message: "Invalid course ID" });
      }
      const data = req.body;
      const course = await this.courseService.updateCourse(courseId, data);

      if (!course) {
        sendNotFound(res, "Không tìm thấy course cần cập nhật");
        return;
      }

      sendSuccess(res, course, "Cập nhật course thành công");
    } catch (error) {
      return next(error);
    }
  }

  async deleteCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params;
      if (!isUUID(courseId)) {
        return res.status(400).json({ message: "Invalid course ID" });
      }
      const course = await this.courseService.deleteCourse(courseId);

      if (!course) {
        sendNotFound(res, "Không tìm thấy course cần xóa");
        return;
      }

      sendSuccess(res, course, "Xóa course thành công");
    } catch (error) {
      return next(error);
    }
  }
}

export default CourseController;
