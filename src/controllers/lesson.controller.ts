import { Request, Response, NextFunction } from "express";
import { validate as isUUID } from "uuid";
import createHttpError from "http-errors";
import LessonService from "../services/lesson.service";
import ChapterRepository from "../repositories/chapter.repository";
import {uploadVideoToCloudinary} from "../services/upload.service"; 
import { sendEmpty, sendNotFound, sendSuccess } from "../utils/responseHelper";
import { create } from "axios";

class LessonController {
  private readonly lessonService: LessonService;
  private readonly chapterRepository: ChapterRepository;

  constructor(lessonService: LessonService, chapterRepository: ChapterRepository) {
    this.lessonService = lessonService;
    this.chapterRepository = chapterRepository;
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

  async getChapterById(req: Request, res: Response, next: NextFunction){
    try {
      const {chapterId} = req.params;
      if (!isUUID(chapterId)) {
        return res.status(400).json({ message: "Invalid chapter ID" });
      }
      const chapter = await this.chapterRepository.getById(chapterId);
      if (!chapter) {
        sendNotFound(res, "Không tìm thấy chapter cần tìm");
        return;
      }
      return sendSuccess(res, chapter, "Lấy dữ liệu chapter theo lesson thành công.");
    } catch (error) {
      return next(error);
    }
  }

  async createLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const fileVideo = req.file;
      const data = req.body;

      if(!fileVideo){
        throw createHttpError(404, "Video chưa được tải lên");
      }

      const cloudResult = await uploadVideoToCloudinary(data.lessonId, fileVideo.buffer, 'course-videos');


       const payloadLesson = {
        ...data,
        videoUrl: cloudResult.url,
        publicIdVideo: cloudResult.public_id
      }

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
