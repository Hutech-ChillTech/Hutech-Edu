import { Request, Response, NextFunction } from "express";
import { PaymentService } from "../services/payment.service";
import { sendSuccess, sendError } from "../utils/responseHelper";

export class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  /**
   * Tạo thanh toán mới
   * POST /api/payment/create
   */
  createPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, paymentMethod, bankCode } = req.body;
      const userId = (req as any).user?.userId;

      if (!userId) {
        return sendError(res, "Unauthorized", 401);
      }

      // Lấy IP address
      const ipAddr =
        (req.headers["x-forwarded-for"] as string) ||
        req.socket.remoteAddress ||
        "127.0.0.1";

      // Tạo payment record
      const { payment, orderId, finalAmount } =
        await this.paymentService.createPayment({
          userId,
          courseId,
          amount: 0, // Will be calculated in service
          orderInfo: `Thanh toán khóa học`,
          paymentMethod: paymentMethod.toUpperCase(),
          ipAddr,
          bankCode,
        });

      // Tạo payment URL tùy theo method
      let paymentUrl;
      if (paymentMethod.toUpperCase() === "MOMO") {
        const momoResult = await this.paymentService.createMoMoPayment(
          payment.paymentId
        );
        paymentUrl = momoResult.payUrl;
      } else if (paymentMethod.toUpperCase() === "VNPAY") {
        const vnpayResult = await this.paymentService.createVNPayPayment(
          payment.paymentId,
          ipAddr,
          bankCode
        );
        paymentUrl = vnpayResult.paymentUrl;
      } else {
        return sendError(res, "Phương thức thanh toán không hợp lệ", 400);
      }

      sendSuccess(
        res,
        {
          paymentId: payment.paymentId,
          orderId,
          amount: finalAmount,
          paymentUrl,
        },
        "Tạo thanh toán thành công",
        201
      );
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  };

  /**
   * Callback từ MoMo
   * GET/POST /api/payment/momo/callback
   */
  momoCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const callbackData = req.method === "GET" ? req.query : req.body;

      const result = await this.paymentService.handleMoMoCallback(callbackData);

      // Redirect về frontend với kết quả
      const redirectUrl = result.success
        ? `${
            process.env.FRONTEND_URL || "http://localhost:3001"
          }/payment/success?orderId=${callbackData.orderId}`
        : `${
            process.env.FRONTEND_URL || "http://localhost:3001"
          }/payment/failed?orderId=${
            callbackData.orderId
          }&message=${encodeURIComponent(result.message)}`;

      res.redirect(redirectUrl);
    } catch (error: any) {
      const redirectUrl = `${
        process.env.FRONTEND_URL || "http://localhost:3001"
      }/payment/error?message=${encodeURIComponent(error.message)}`;
      res.redirect(redirectUrl);
    }
  };

  /**
   * IPN từ MoMo (Instant Payment Notification)
   * POST /api/payment/momo/ipn
   */
  momoIPN = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ipnData = req.body;

      await this.paymentService.handleMoMoCallback(ipnData);

      // Trả về response cho MoMo
      res.status(200).json({
        status: 0,
        message: "Success",
      });
    } catch (error: any) {
      console.error("MoMo IPN Error:", error.message);
      res.status(200).json({
        status: -1,
        message: error.message,
      });
    }
  };

  /**
   * Callback từ VNPay
   * GET /api/payment/vnpay/callback
   */
  vnpayCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const callbackData = req.query;

      const result = await this.paymentService.handleVNPayCallback(
        callbackData
      );

      // Redirect về frontend với kết quả
      const redirectUrl = result.success
        ? `${
            process.env.FRONTEND_URL || "http://localhost:3001"
          }/payment/success?orderId=${callbackData.vnp_TxnRef}`
        : `${
            process.env.FRONTEND_URL || "http://localhost:3001"
          }/payment/failed?orderId=${
            callbackData.vnp_TxnRef
          }&message=${encodeURIComponent(result.message)}`;

      res.redirect(redirectUrl);
    } catch (error: any) {
      const redirectUrl = `${
        process.env.FRONTEND_URL || "http://localhost:3001"
      }/payment/error?message=${encodeURIComponent(error.message)}`;
      res.redirect(redirectUrl);
    }
  };

  /**
   * Lấy lịch sử thanh toán
   * GET /api/payment/history
   */
  getPaymentHistory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = (req as any).user?.userId;

      if (!userId) {
        return sendError(res, "Unauthorized", 401);
      }

      const payments = await this.paymentService.getPaymentHistory(userId);

      sendSuccess(res, payments, "Lấy lịch sử thanh toán thành công");
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  };

  /**
   * Lấy chi tiết thanh toán
   * GET /api/payment/:paymentId
   */
  getPaymentDetail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { paymentId } = req.params;
      const userId = (req as any).user?.userId;

      if (!userId) {
        return sendError(res, "Unauthorized", 401);
      }

      const payment = await this.paymentService.getPaymentDetail(paymentId);

      if (!payment) {
        return sendError(res, "Thanh toán không tồn tại", 404);
      }

      // Kiểm tra quyền truy cập
      if (
        payment.userId !== userId &&
        !(req as any).user?.roles?.includes("ADMIN")
      ) {
        return sendError(res, "Không có quyền truy cập", 403);
      }

      sendSuccess(res, payment, "Lấy chi tiết thanh toán thành công");
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  };

  /**
   * Thống kê tổng quan (Admin Dashboard)
   * GET /api/payment/statistics/overview
   */
  getStatisticsOverview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const stats = await this.paymentService.getStatisticsOverview();
      sendSuccess(res, stats, "Lấy thống kê tổng quan thành công");
    } catch (error: any) {
      sendError(res, error.message, 500);
    }
  };

  /**
   * Thống kê doanh thu theo thời gian
   * GET /api/payment/statistics/revenue?startDate=...&endDate=...&groupBy=day|month|year
   */
  getRevenueByPeriod = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { startDate, endDate, groupBy } = req.query;

      if (!startDate || !endDate) {
        return sendError(res, "Vui lòng cung cấp startDate và endDate", 400);
      }

      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return sendError(res, "Định dạng ngày không hợp lệ", 400);
      }

      const validGroupBy = ["day", "month", "year"];
      const group =
        groupBy && validGroupBy.includes(groupBy as string)
          ? (groupBy as "day" | "month" | "year")
          : "day";

      const revenue = await this.paymentService.getRevenueByPeriod(
        start,
        end,
        group
      );
      sendSuccess(res, revenue, "Lấy thống kê doanh thu thành công");
    } catch (error: any) {
      sendError(res, error.message, 500);
    }
  };

  /**
   * Top khóa học bán chạy
   * GET /api/payment/statistics/top-courses?limit=10
   */
  getTopSellingCourses = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { limit } = req.query;
      const courseLimit = limit ? parseInt(limit as string) : 10;

      const topCourses = await this.paymentService.getTopSellingCourses(
        courseLimit
      );
      sendSuccess(res, topCourses, "Lấy top khóa học bán chạy thành công");
    } catch (error: any) {
      sendError(res, error.message, 500);
    }
  };

  /**
   * Thống kê doanh thu theo khóa học
   * GET /api/payment/statistics/course/:courseId
   */
  getRevenueByCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { courseId } = req.params;

      const stats = await this.paymentService.getRevenueByCourse(courseId);
      sendSuccess(res, stats, "Lấy thống kê khóa học thành công");
    } catch (error: any) {
      sendError(res, error.message, 500);
    }
  };

  /**
   * Thống kê doanh thu theo instructor
   * GET /api/payment/statistics/instructor/:userId
   */
  getRevenueByInstructor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.params;

      const stats = await this.paymentService.getRevenueByInstructor(userId);
      sendSuccess(res, stats, "Lấy thống kê giảng viên thành công");
    } catch (error: any) {
      sendError(res, error.message, 500);
    }
  };

  /**
   * Danh sách tất cả giao dịch (Admin)
   * GET /api/payment/admin/all?status=...&method=...&page=1&limit=20
   */
  getAllPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, method, startDate, endDate, page, limit } = req.query;

      const options: any = {
        status: status as string,
        method: method as string,
        page: page ? parseInt(page as string) : 1,
        limit: limit ? parseInt(limit as string) : 20,
      };

      if (startDate) {
        options.startDate = new Date(startDate as string);
      }

      if (endDate) {
        options.endDate = new Date(endDate as string);
      }

      const result = await this.paymentService.getAllPayments(options);
      sendSuccess(res, result, "Lấy danh sách giao dịch thành công");
    } catch (error: any) {
      sendError(res, error.message, 500);
    }
  };

  /**
   * Admin manually confirm payment
   * POST /api/payment/admin/confirm/:paymentId
   */
  confirmPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paymentId } = req.params;
      const adminUserId = (req as any).user?.userId;

      if (!adminUserId) {
        return sendError(res, "Unauthorized", 401);
      }

      const result = await this.paymentService.confirmPayment(
        paymentId,
        adminUserId
      );
      sendSuccess(res, result, "Xác nhận thanh toán thành công");
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  };

  /**
   * Admin manually reject payment
   * POST /api/payment/admin/reject/:paymentId
   */
  rejectPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paymentId } = req.params;
      const { reason } = req.body;
      const adminUserId = (req as any).user?.userId;

      if (!adminUserId) {
        return sendError(res, "Unauthorized", 401);
      }

      const result = await this.paymentService.rejectPayment(
        paymentId,
        adminUserId,
        reason
      );
      sendSuccess(res, result, "Từ chối thanh toán thành công");
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  };

  /**
   * User verify payment status
   * GET /api/payment/verify/:paymentId
   */
  verifyPaymentStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { paymentId } = req.params;
      const userId = (req as any).user?.userId;

      if (!userId) {
        return sendError(res, "Unauthorized", 401);
      }

      const result = await this.paymentService.verifyPaymentStatus(
        paymentId,
        userId
      );
      sendSuccess(res, result, "Lấy trạng thái thanh toán thành công");
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  };
}
