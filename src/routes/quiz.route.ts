import { Router } from "express";
import Prisma from "../configs/prismaClient";
import ChapterQuizRepository from "../repositories/chapterQuiz.repository";
import QuizQuestionRepository from "../repositories/quizQuestion.repository";
import QuizOptionRepository from "../repositories/quizOption.repository";
import QuizService from "../services/quiz.service";
import QuizController from "../controllers/quiz.controller";
import { validate } from "../middlewares/validate";
import { authenticate, optionalAuth } from "../middlewares/auth.middleware";
import { requireRole, requirePermission } from "../middlewares/role.middleware";
import { UserRoles, Permissions } from "../constants/roles";
import {
  createQuizSchema,
  updateQuizSchema,
  createQuestionSchema,
  updateQuestionSchema,
  createOptionSchema,
  updateOptionSchema,
} from "../validators/quiz.validate";

const chapterQuizRepository = new ChapterQuizRepository(
  Prisma,
  "chapterQuizId"
);
const quizQuestionRepository = new QuizQuestionRepository(
  Prisma,
  "quizQuestionId"
);
const quizOptionRepository = new QuizOptionRepository(Prisma, "quizOptionId");
const quizService = new QuizService(
  chapterQuizRepository,
  quizQuestionRepository,
  quizOptionRepository
);
const quizController = new QuizController(quizService);

const router = Router();

router.get("/", optionalAuth, (req, res, next) =>
  quizController.getAllQuizzes(req, res, next)
);

router.get("/chapter/:chapterId", optionalAuth, (req, res, next) =>
  quizController.getQuizzesByChapter(req, res, next)
);

router.get("/:chapterQuizId", optionalAuth, (req, res, next) =>
  quizController.getQuizById(req, res, next)
);

router.post(
  "/",
  authenticate,
  requirePermission([Permissions.QUIZ_CREATE]),
  validate(createQuizSchema),
  (req, res, next) => quizController.createQuiz(req, res, next)
);

router.put(
  "/:chapterQuizId",
  authenticate,
  requirePermission([Permissions.QUIZ_UPDATE]),
  validate(updateQuizSchema),
  (req, res, next) => quizController.updateQuiz(req, res, next)
);

router.delete(
  "/:chapterQuizId",
  authenticate,
  requireRole([UserRoles.ADMIN]),
  requirePermission([Permissions.QUIZ_DELETE]),
  (req, res, next) => quizController.deleteQuiz(req, res, next)
);

router.get("/:chapterQuizId/questions", optionalAuth, (req, res, next) =>
  quizController.getQuestionsByQuiz(req, res, next)
);

router.post(
  "/questions",
  authenticate,
  requirePermission([Permissions.QUIZ_CREATE]),
  validate(createQuestionSchema),
  (req, res, next) => quizController.createQuestion(req, res, next)
);

router.get("/questions/:quizQuestionId", optionalAuth, (req, res, next) =>
  quizController.getQuestionById(req, res, next)
);

router.put(
  "/questions/:quizQuestionId",
  authenticate,
  requirePermission([Permissions.QUIZ_UPDATE]),
  validate(updateQuestionSchema),
  (req, res, next) => quizController.updateQuestion(req, res, next)
);

router.delete(
  "/questions/:quizQuestionId",
  authenticate,
  requireRole([UserRoles.ADMIN]),
  requirePermission([Permissions.QUIZ_DELETE]),
  (req, res, next) => quizController.deleteQuestion(req, res, next)
);

router.get(
  "/questions/:quizQuestionId/options",
  optionalAuth,
  (req, res, next) => quizController.getOptionsByQuestion(req, res, next)
);

router.post(
  "/options",
  authenticate,
  requirePermission([Permissions.QUIZ_CREATE]),
  validate(createOptionSchema),
  (req, res, next) => quizController.createOption(req, res, next)
);

router.get("/options/:quizOptionId", optionalAuth, (req, res, next) =>
  quizController.getOptionById(req, res, next)
);

router.put(
  "/options/:quizOptionId",
  authenticate,
  requirePermission([Permissions.QUIZ_UPDATE]),
  validate(updateOptionSchema),
  (req, res, next) => quizController.updateOption(req, res, next)
);

router.delete(
  "/options/:quizOptionId",
  authenticate,
  requireRole([UserRoles.ADMIN]),
  requirePermission([Permissions.QUIZ_DELETE]),
  (req, res, next) => quizController.deleteOption(req, res, next)
);

export default router;
