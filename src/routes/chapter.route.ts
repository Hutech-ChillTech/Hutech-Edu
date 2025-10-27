import { Request, Response, NextFunction, Router } from "express";
import Prisma from "../configs/prismaClient";
import ChapterRepository from "../repositories/chapter.repository";
import ChapterService from "../services/chapter.service";
import ChapterController from "../controllers/chapter.controller";

const chapterRepository = new ChapterRepository(Prisma, "chapterId");
const chapterService = new ChapterService(chapterRepository);
const chapterController = new ChapterController(chapterService)

import { requireFields, requireIdParam } from "../middlewares/validate";

const router = Router();

router.get('/', (req, res, next) => chapterController.getAllChapter(req, res, next));

router.get('/:chapterId', requireIdParam("id"), (req, res, next) => chapterController.getChapterById(req, res, next));

router.post('/chapters', requireFields(["chapterName, totalLesson"]), (req, res, next) => chapterController.createChapter(req, res, next));

router.put('/:chapterId', requireIdParam("id"), (req, res, next) => chapterController.updateChapter(req, res, next));

router.delete('/:chapterId', requireIdParam("id"), (req, res, next) => chapterController.deleteChapter(req, res, next));

export default router;