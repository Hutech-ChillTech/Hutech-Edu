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
      console.log("\n========================================");
      console.log("🔔 MoMo Callback Received");
      console.log("Method:", req.method);
      console.log("Query params:", JSON.stringify(req.query, null, 2));
      console.log("Body params:", JSON.stringify(req.body, null, 2));
      console.log("========================================\n");

      const callbackData = req.method === "GET" ? req.query : req.body;

      const result = await this.paymentService.handleMoMoCallback(callbackData);

      console.log("\n✅ MoMo callback processed successfully");
      console.log("Result:", result);
      console.log("Result.success:", result.success);

      // Redirect về frontend với query parameters
      if (result.success) {
        console.log("🎯 Redirecting to frontend success page");

        const frontendUrl =
          process.env.FRONTEND_SUCCESS_URL ||
          "http://localhost:5173/payment/success";

        // Redirect trực tiếp với query params (sessionStorage không work với redirect từ payment gateway)
        const redirectUrl = `${frontendUrl}?paymentId=${
          result.paymentId
        }&orderId=${result.orderId}&amount=${
          result.amount
        }&partnerCode=MOMO&transId=${result.transId || ""}&status=success`;

        console.log("🔗 Full redirect URL:", redirectUrl);
        console.log("📦 Payment details being sent:");
        console.log("  - paymentId:", result.paymentId);
        console.log("  - orderId:", result.orderId);
        console.log("  - amount:", result.amount);
        console.log("  - transId:", result.transId);

        return res.redirect(redirectUrl);

        /* HTML approach không work vì browser security policy
        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Redirecting...</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              }
              .loader {
                text-align: center;
                color: white;
              }
              .spinner {
                border: 4px solid rgba(255,255,255,0.3);
                border-top: 4px solid white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            </style>
          </head>
          <body>
            <div class="loader">
              <div class="spinner"></div>
              <p>Đang xử lý thanh toán...</p>
            </div>
            <script>
              try {
                console.log('💾 Saving payment data to sessionStorage...');
                
                const paymentData = {
                  orderId: '${result.orderId || callbackData.orderId}',
                  paymentId: '${result.paymentId || ""}',
                  amount: ${result.amount || 0},
                  partnerCode: 'MOMO',
                  transId: '${result.transId || ""}',
                  message: '${(result.message || "")
                    .replace(/'/g, "\\'")
                    .replace(/"/g, '\\"')}',
                  paidAt: '${new Date().toISOString()}',
                  enrollmentCreated: ${result.enrollmentCreated || false}
                };
                
                console.log('Payment data to save:', paymentData);
                
                // Lưu dữ liệu vào sessionStorage
                sessionStorage.setItem('paymentData', JSON.stringify(paymentData));
                
                // Verify data đã lưu
                const saved = sessionStorage.getItem('paymentData');
                console.log('✅ Saved to sessionStorage:', saved);
                
                // Delay 500ms để đảm bảo sessionStorage được lưu
                setTimeout(() => {
                  console.log('🚀 Redirecting to:', '${
                    frontendUrl.split("?")[0]
                  }');
                  window.location.href = '${frontendUrl.split("?")[0]}';
                }, 500);
                
              } catch (error) {
                console.error('❌ SessionStorage error:', error);
                // Fallback: redirect với URL params
                window.location.href = '${frontendUrl}?paymentId=${
          result.paymentId || ""
        }';
              }
            </script>
          </body>
          </html>
        `;
        return res.send(html);
        */
      } else {
        // Thất bại - redirect với message
        console.log("⚠️ Payment FAILED - redirecting to failed page");
        console.log("Result object:", JSON.stringify(result, null, 2));

        const failedUrl = `${
          process.env.FRONTEND_FAILED_URL ||
          "http://localhost:5173/payment/failed"
        }?message=${encodeURIComponent(result.message)}`;

        console.log("Redirecting to failed page:", failedUrl);
        return res.redirect(failedUrl);
      }
    } catch (error: any) {
      console.error("\n❌ MoMo Callback Error:");
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);

      const redirectUrl = `${
        process.env.FRONTEND_FAILED_URL ||
        "http://localhost:5173/payment/failed"
      }?message=${encodeURIComponent(error.message)}`;

      console.log("Redirecting to error page:", redirectUrl);
      return res.redirect(redirectUrl);
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

      // Redirect trực tiếp với query params
      if (result.success) {
        const frontendUrl =
          process.env.FRONTEND_SUCCESS_URL ||
          "http://localhost:5173/payment/success";

        const redirectUrl = `${frontendUrl}?paymentId=${
          result.paymentId
        }&orderId=${result.orderId}&amount=${
          result.amount
        }&partnerCode=VNPAY&transactionNo=${
          result.transactionNo || ""
        }&status=success`;

        console.log("🔗 Full VNPay redirect URL:", redirectUrl);
        console.log("📦 VNPay payment details being sent:");
        console.log("  - paymentId:", result.paymentId);
        console.log("  - orderId:", result.orderId);
        console.log("  - amount:", result.amount);
        console.log("  - transactionNo:", result.transactionNo);

        return res.redirect(redirectUrl);

        /* HTML approach không work
        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Redirecting...</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              }
              .loader {
                text-align: center;
                color: white;
              }
              .spinner {
                border: 4px solid rgba(255,255,255,0.3);
                border-top: 4px solid white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            </style>
          </head>
          <body>
            <div class="loader">
              <div class="spinner"></div>
              <p>Đang xử lý thanh toán...</p>
            </div>
            <script>
              try {
                console.log('💾 Saving VNPay payment data to sessionStorage...');
                
                const paymentData = {
                  orderId: '${result.orderId || callbackData.vnp_TxnRef}',
                  paymentId: '${result.paymentId || ""}',
                  amount: ${result.amount || 0},
                  partnerCode: 'VNPAY',
                  transactionNo: '${result.transactionNo || ""}',
                  message: '${(result.message || "")
                    .replace(/'/g, "\\'")
                    .replace(/"/g, '\\"')}',
                  paidAt: '${new Date().toISOString()}',
                  enrollmentCreated: ${result.enrollmentCreated || false}
                };
                
                console.log('Payment data to save:', paymentData);
                
                // Lưu dữ liệu vào sessionStorage
                sessionStorage.setItem('paymentData', JSON.stringify(paymentData));
                
                // Verify data đã lưu
                const saved = sessionStorage.getItem('paymentData');
                console.log('✅ Saved to sessionStorage:', saved);
                
                // Delay 500ms để đảm bảo sessionStorage được lưu
                setTimeout(() => {
                  console.log('🚀 Redirecting to:', '${
                    frontendUrl.split("?")[0]
                  }');
                  window.location.href = '${frontendUrl.split("?")[0]}';
                }, 500);
                
              } catch (error) {
                console.error('❌ SessionStorage error:', error);
                // Fallback: redirect với URL params
                window.location.href = '${frontendUrl}?paymentId=${
          result.paymentId || ""
        }';
              }
            </script>
          </body>
          </html>
        `;
        return res.send(html);
        */
      } else {
        // Thất bại - redirect với message
        const failedUrl = `${
          process.env.FRONTEND_FAILED_URL ||
          "http://localhost:5173/payment/failed"
        }?message=${encodeURIComponent(result.message)}`;

        return res.redirect(failedUrl);
      }
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
      // Dashboard admin: trả về toàn bộ top courses, không giới hạn số lượng
      const topCourses = await this.paymentService.getTopSellingCourses();
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

  /**
   * Thống kê top học viên chi tiêu nhiều nhất
   * GET /api/payment/statistics/top-spenders?limit=10
   */
  getTopSpendingStudents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { limit } = req.query;
      const studentLimit = limit ? parseInt(limit as string) : 10;

      const topSpenders = await this.paymentService.getTopSpendingStudents(
        studentLimit
      );
      sendSuccess(res, topSpenders, "Lấy top học viên chi tiêu thành công");
    } catch (error: any) {
      sendError(res, error.message, 500);
    }
  };
}
