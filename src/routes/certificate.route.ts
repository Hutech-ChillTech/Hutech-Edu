import { Router } from "express";
import { CertificateController } from "../controllers/certificate.controller";
import {
  readLimiter,
  createLimiter,
} from "../middlewares/rateLimiter.middleware";

const router = Router();
const certificateController = new CertificateController();

/**
 * Yêu cầu cấp certificate cho course
 * POST /api/certificates/issue/:courseId
 * Yêu cầu: Authenticated, hoàn thành tất cả quiz với điểm >= 70%
 */
router.post(
  "/issue/:courseId",
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
  readLimiter,
  certificateController.getMyCertificates
);

/**
 * Lấy thống kê certificates của user
 * GET /api/certificates/stats
 * Yêu cầu: Authenticated
 */
router.get("/stats", readLimiter, certificateController.getCertificateStats);

/**
 * Lấy certificate theo ID
 * GET /api/certificates/:certificateId
 * Yêu cầu: Public (để share certificate)
 */
router.get(
  "/:certificateId",
  readLimiter,
  certificateController.getCertificateById
);

/**
 * Lấy certificate của user trong một course
 * GET /api/certificates/course/:courseId
 * Yêu cầu: Authenticated
 */
router.get(
  "/course/:courseId",
  readLimiter,
  certificateController.getCertificateInCourse
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
