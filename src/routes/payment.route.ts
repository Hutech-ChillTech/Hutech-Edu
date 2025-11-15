import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { createPaymentSchema } from "../validators/payment.validate";
import {
  readLimiter,
  createLimiter,
} from "../middlewares/rateLimiter.middleware";

const router = Router();
const paymentController = new PaymentController();

// Tạo thanh toán mới
router.post(
  "/create",
  createLimiter,
  authenticate,
  validate(createPaymentSchema),
  paymentController.createPayment
);

// Callback từ MoMo
router.get("/momo/callback", paymentController.momoCallback);
router.post("/momo/callback", paymentController.momoCallback);

// IPN từ MoMo
router.post("/momo/ipn", paymentController.momoIPN);

// Callback từ VNPay
router.get("/vnpay/callback", paymentController.vnpayCallback);

// Lấy lịch sử thanh toán
router.get(
  "/history",
  readLimiter,
  authenticate,
  paymentController.getPaymentHistory
);

// Lấy chi tiết thanh toán
router.get(
  "/:paymentId",
  readLimiter,
  authenticate,
  paymentController.getPaymentDetail
);

export default router;
