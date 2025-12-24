import { Router } from "express";
import { CertificateController } from "../controllers/certificate.controller";
import {
  readLimiter,
  createLimiter,
} from "../middlewares/rateLimiter.middleware";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
const certificateController = new CertificateController();

/**
 * Yêu cầu cấp certificate cho course
 * POST /api/certificates/issue/:courseId
 * Yêu cầu: Authenticated, hoàn thành tất cả quiz với điểm >= 70%
 */
router.post(
  "/issue/:courseId",
  authenticate,
  createLimiter,
  certificateController.issueCertificate
);

/**
 * Lấy tất cả certificates của user
 * GET /api/certificates/my-certificates
 * Yêu cầu: Authenticated
 */
router.get(
  "/my-certificates",
  authenticate,
  readLimiter,
  certificateController.getMyCertificates
);

/**
 * Lấy thống kê certificates của user
 * GET /api/certificates/stats
 * Yêu cầu: Authenticated
 */
router.get(
  "/stats",
  authenticate,
  readLimiter,
  certificateController.getCertificateStats
);

/**
 * Lấy certificate của user trong một course
 * GET /api/certificates/course/:courseId
 * Yêu cầu: Authenticated
 * QUAN TRỌNG: Route này phải ĐẶT TRƯỚC /:certificateId
 */
router.get(
  "/course/:courseId",
  authenticate,
  readLimiter,
  certificateController.getCertificateInCourse
);

/**
 * Lấy certificate theo ID
 * GET /api/certificates/:certificateId
 * Yêu cầu: Public (để share certificate)
 * QUAN TRỌNG: Route này phải ĐẶT SAU /course/:courseId
 */
router.get(
  "/:certificateId",
  readLimiter,
  certificateController.getCertificateById
);

/**
 * Lấy danh sách certificates của course (Admin/Creator)
 * GET /api/certificates/course/:courseId/all
 * Yêu cầu: Admin hoặc Course Creator
 */
router.get(
  "/course/:courseId/all",
  readLimiter,
  certificateController.getCourseCertificates
);

/**
 * Cập nhật URL certificate (sau khi generate PDF)
 * PATCH /api/certificates/:certificateId/url
 * Body: { certificateURL }
 * Yêu cầu: Admin hoặc System
 */
router.patch(
  "/:certificateId/url",
  createLimiter,
  certificateController.updateCertificateURL
);

/**
 * Xóa certificate (Admin only)
 * DELETE /api/certificates/:certificateId
 * Yêu cầu: Admin permission
 */
router.delete(
  "/:certificateId",
  createLimiter,
  certificateController.deleteCertificate
);

export default router;
