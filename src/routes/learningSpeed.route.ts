import { Router } from "express";
import LearningSpeedController from "../controllers/learningSpeed.controller";

const router = Router();

/**
 * POST /api/learning-speed/calculate
 * Tính toán learning speed sau khi hoàn thành khóa học
 * Body: { userId, courseId }
 */
router.post("/calculate", LearningSpeedController.calculateSpeed);

/**
 * GET /api/learning-speed/recommendations/:userId/:courseId
 * Lấy gợi ý khóa học dựa trên learning speed
 */
router.get(
  "/recommendations/:userId/:courseId",
  LearningSpeedController.getRecommendations
);

/**
 * GET /api/learning-speed/history/:userId
 * Lấy lịch sử learning speed của user
 */
router.get("/history/:userId", LearningSpeedController.getHistory);

/**
 * POST /api/learning-speed/manual
 * Tính toán learning speed thủ công (để test)
 * Body: { userId, courseId, totalScore, estimatedDuration, totalLearningTime }
 */
router.post("/manual", LearningSpeedController.calculateManual);

export default router;
