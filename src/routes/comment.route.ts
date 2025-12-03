import { Router } from "express";
import CommentController from "../controllers/comment.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import {
  createCommentSchema,
  updateCommentSchema,
} from "../validators/comment.validate";

const router = Router();
const commentController = new CommentController();

/**
 * @route   GET /api/comments
 * @desc    Lấy tất cả comments (Admin)
 * @access  Private
 */
router.get("/", authenticate, commentController.getAllComments);

/**
 * @route   GET /api/comments/my-comments
 * @desc    Lấy comments của user hiện tại
 * @access  Private
 */
router.get("/my-comments", authenticate, commentController.getMyComments);

/**
 * @route   GET /api/comments/course/:courseId
 * @desc    Lấy tất cả comments của một khóa học
 * @access  Public
 */
router.get("/course/:courseId", commentController.getCommentsByCourse);

/**
 * @route   GET /api/comments/course/:courseId/rating
 * @desc    Lấy rating trung bình của khóa học
 * @access  Public
 */
router.get("/course/:courseId/rating", commentController.getCourseRating);

/**
 * @route   GET /api/comments/:commentId
 * @desc    Lấy comment theo ID
 * @access  Public
 */
router.get("/:commentId", commentController.getCommentById);

/**
 * @route   POST /api/comments
 * @desc    Tạo comment mới
 * @access  Private
 */
router.post(
  "/",
  authenticate,
  validate(createCommentSchema),
  commentController.createComment
);

/**
 * @route   PUT /api/comments/:commentId
 * @desc    Cập nhật comment
 * @access  Private (Owner only)
 */
router.put(
  "/:commentId",
  authenticate,
  validate(updateCommentSchema),
  commentController.updateComment
);

/**
 * @route   DELETE /api/comments/:commentId
 * @desc    Xóa comment
 * @access  Private (Owner only)
 */
router.delete("/:commentId", authenticate, commentController.deleteComment);

export default router;
