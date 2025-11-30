import { Request, Response, NextFunction } from 'express';
import UserService from "../services/user.service.js";
import LessonService from '../services/lesson.service.js';
import { uploadImageToFirebase, uploadVideoToCloudinary } from '../services/upload.service.js';
import { sendSuccess, sendNotFound } from '../utils/responseHelper.js';
import createHttpError from 'http-errors';
import { ppid, send } from 'process';

class MediaController {
    private readonly userService: UserService;
    private readonly lessonService: LessonService;
    constructor(userService: UserService, lessonService: LessonService) {
        this.userService = userService;
        this.lessonService = lessonService;
    }

    async uploadUserAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            const file = req.file;
            const userId = req.params.userId;
            if (!file) {
                throw createHttpError(404, "Hình ảnh chưa được tải lên");
            }

            const avatarUrl = await uploadImageToFirebase(userId, file, 'avatars');

            const payload = {
                avatarURL: avatarUrl
            }

            await this.userService.updateUser(payload, userId);

            return sendSuccess(res, { avatarUrl }, "Tải ảnh đại diện lên thành công");
        } catch (error) {
            console.error('Error uploading user avatar:', error);
            return next(error);
        }
    }


}

export default MediaController;