import { Router } from "express";
import { SubmissionController } from "../controllers/submission.controller";

const router = Router();
const submissionController = new SubmissionController();

/**
 * Nộp bài quiz
 * POST /api/submissions/submit
 * Body: { chapterQuizId, answers: { questionId: optionId } }
 * Yêu cầu: Authenticated
 */
router.post("/submit", submissionController.submitQuiz);

/**
 * Lấy kết quả submission của một quiz
 * GET /api/submissions/:chapterQuizId/result
 * Yêu cầu: Authenticated
 */
router.get("/:chapterQuizId/result", submissionController.getSubmissionResult);

/**
 * Lấy tất cả submissions của user trong một course
 * GET /api/submissions/course/:courseId
 * Yêu cầu: Authenticated
 */
router.get(
  "/course/:courseId",
  submissionController.getUserSubmissionsInCourse
);

/**
 * Kiểm tra tiến độ hoàn thành course
 * GET /api/submissions/course/:courseId/completion
 * Yêu cầu: Authenticated
 */
router.get(
  "/course/:courseId/completion",
  submissionController.checkCourseCompletion
);

/**
 * Lấy tất cả submissions của user
 * GET /api/submissions/my-submissions
 * Yêu cầu: Authenticated
 */
router.get("/my-submissions", submissionController.getAllUserSubmissions);

/**
 * Xóa submission (Admin only)
 * DELETE /api/submissions/:submissionId
 * Yêu cầu: Admin permission
 */
router.delete("/:submissionId", submissionController.deleteSubmission);

export default router;
