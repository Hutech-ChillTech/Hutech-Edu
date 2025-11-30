import { Request, Response, NextFunction } from "express";
import { validate as isUUID } from "uuid";
import createHttpError from "http-errors";
import LessonService from "../services/lesson.service";
import ChapterService from "../services/chapter.service";
import { uploadVideoToCloudinary } from "../services/upload.service";
import { sendEmpty, sendNotFound, sendSuccess } from "../utils/responseHelper";
import { create } from "axios";
import TestCaseService from "../services/testCase.service";

class LessonController {
  private readonly lessonService: LessonService;
  private readonly chapterService: ChapterService;
  private readonly testCaseService: TestCaseService;

  constructor(lessonService: LessonService, chapterService: ChapterService, testCaseService: TestCaseService) {
    this.lessonService = lessonService;
    this.chapterService = chapterService;
    this.testCaseService = testCaseService;
  }

  async getAllLessons(req: Request, res: Response, next: NextFunction) {
    try {
      const lessons = await this.lessonService.getAllLessons();

      if (!lessons) {
        sendEmpty(res, "Dữ liệu lesson đang rỗng");
        return;
      }
      return sendSuccess(res, lessons, "Lấy tất cả lesson thành công.");
    } catch (error) {
      return next(error);
    }
  }

  async getLessonById(req: Request, res: Response, next: NextFunction) {
    try {
      const { lessonId } = req.params;
      if (!isUUID(lessonId)) {
        return res.status(400).json({ message: "Invalid lesson ID" });
      }
      const lesson = await this.lessonService.getLessonById(lessonId);
      if (!lesson) {
        sendNotFound(res, "Không tìm thấy lesson cần tìm");
        return;
      }
      return sendSuccess(res, lesson, "Lấy dữ liệu lesson thành công.");
    } catch (error) {
      return next(error);
    }
  }

  async getChapterById(req: Request, res: Response, next: NextFunction) {
    try {
      const { chapterId } = req.params;
      if (!isUUID(chapterId)) {
        return res.status(400).json({ message: "Invalid chapter ID" });
      }
      const chapter = await this.chapterService.getLessonInChapterId(chapterId);
      if (!chapter) {
        sendNotFound(res, "Không tìm thấy chapter cần tìm");
        return;
      }
      return sendSuccess(res, chapter, "Lấy dữ liệu chapter theo lesson thành công.");
    } catch (error) {
      return next(error);
    }
  }

  async getTestCaseByLessonId(req: Request, res: Response, next: NextFunction) {
    try {
      const { lessonId } = req.params;
      if (!lessonId) {
        throw createHttpError(404, "Người dùng chưa chọn bài học");
      }

      const testCase = await this.testCaseService.getTestCaseByLessonId(lessonId);

      if (!testCase) {
        sendNotFound(res, 'Không tìm thấy TestCase cần tìm');
        return;
      }

      return sendSuccess(res, testCase, "Lấy thành công các testcase theo khóa học");

    } catch (error) {
      return next(error);
    }
  }

  async createLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const fileVideo = req.file;
      const { chapterId, lessonType, videoUrl, publicId } = req.body;
      const data = req.body;


      const isVideoLesson = !lessonType || lessonType === 'normal' || lessonType === 'Lesson';


      if (isVideoLesson && !fileVideo && !videoUrl) {
        throw createHttpError(400, "Bài học video yêu cầu tải lên file video hoặc đường dẫn video hợp lệ");
      }

      let finalVideoUrl = videoUrl;
      let finalPublicId = publicId;


      if (isVideoLesson && fileVideo) {
        const cloudResult = await uploadVideoToCloudinary(chapterId, fileVideo.buffer, 'course-videos');
        finalVideoUrl = cloudResult.url;
        finalPublicId = cloudResult.public_id;
      }


      let payloadLesson = {
        ...data,
        lessonType: lessonType || 'normal',
        videoUrl: isVideoLesson ? finalVideoUrl : null,
        publicId: isVideoLesson ? finalPublicId : null,
      };

      const lesson = await this.lessonService.createLesson(payloadLesson);

      return sendSuccess(res, lesson, "Thêm mới lesson thành công.");
    } catch (error) {
      return next(error);
    }
  }

  async updateLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const { lessonId } = req.params;
      if (!isUUID(lessonId)) {
        return res.status(400).json({ message: "Invalid lesson ID" });
      }
      const data = req.body;

      const lesson = await this.lessonService.updateLesson(lessonId, data);

      if (!lesson) {
        sendNotFound(res, "Không tìm thấy lesson cần tìm");
        return;
      }
      return sendSuccess(res, lesson, "Cập nhật dữ liệu lesson thành công.");
    } catch (error) {
      return next(error);
    }
  }

  async deleteLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const { lessonId } = req.params;

      if (!isUUID(lessonId)) {
        return res.status(400).json({ message: "Invalid lesson ID" });
      }

      const lesson = await this.lessonService.deleteLesson(lessonId);

      if (!lesson) {
        sendNotFound(res, "Không tìm thấy lesson cần tìm");
        return;
      }
      return sendSuccess(res, lesson, "Xóa thành công lesson.");
    } catch (error) {
      return next(error);
    }
  }
}

export default LessonController;
