import Prisma from "../configs/prismaClient";
import { MoMoService } from "./momo.service";
import { VNPayService } from "./vnpay.service";

export interface CreatePaymentData {
  userId: string;
  courseId: string;
  amount: number;
  orderInfo: string;
  paymentMethod: "MOMO" | "VNPAY";
  ipAddr?: string;
  bankCode?: string;
}

export class PaymentService {
  private momoService: MoMoService;
  private vnpayService: VNPayService;

  constructor() {
    this.momoService = new MoMoService();
    this.vnpayService = new VNPayService();
  }

  /**
   * Tạo đơn thanh toán mới
   */
  async createPayment(data: CreatePaymentData) {
    const { userId, courseId, amount, orderInfo, paymentMethod } = data;

    // Kiểm tra course tồn tại
    const course = await Prisma.course.findUnique({
      where: { courseId },
      select: {
        courseId: true,
        courseName: true,
        coursePrice: true,
        discount: true,
      },
    });

    if (!course) {
      throw new Error("Khóa học không tồn tại");
    }

    // Kiểm tra user đã mua chưa
    const existingEnrollment = await Prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (existingEnrollment) {
      throw new Error("Bạn đã đăng ký khóa học này rồi");
    }

    // Tính giá sau discount
    let finalAmount = course.coursePrice;
    if (course.discount && course.discount > 0) {
      finalAmount = course.coursePrice * (1 - course.discount / 100);
    }

    console.log("\n=== Creating Payment ===");
    console.log("Course data:", JSON.stringify(course, null, 2));
    console.log(
      "Course price:",
      course.coursePrice,
      "Type:",
      typeof course.coursePrice
    );
    console.log("Discount:", course.discount);
    console.log("Final amount:", finalAmount, "Type:", typeof finalAmount);
    console.log("Payment method:", paymentMethod);

    // Tạo orderId unique
    const orderId = `ORDER_${Date.now()}_${userId.substring(0, 8)}`;

    // Tạo payment record trong DB
    const payment = await Prisma.payment.create({
      data: {
        userId,
        courseId,
        amount: finalAmount,
        currency: "VND",
        orderInfo,
        paymentMethod,
        paymentStatus: "PENDING",
        transactionId: orderId,
        metadata: {
          courseName: course.courseName,
          originalPrice: course.coursePrice,
          discount: course.discount,
        },
      },
    });

    console.log("✅ Payment created with ID:", payment.paymentId);
    console.log("✅ Payment amount in DB:", payment.amount);
    console.log("========================\n");

    return {
      payment,
      orderId,
      finalAmount,
    };
  }

  /**
   * Tạo payment URL cho MoMo
   */
  async createMoMoPayment(paymentId: string) {
    const payment = await Prisma.payment.findUnique({
      where: { paymentId },
      include: {
        user: {
          select: {
            userId: true,
            userName: true,
            email: true,
          },
        },
        course: {
          select: {
            courseId: true,
            courseName: true,
          },
        },
      },
    });

    if (!payment) {
      throw new Error("Thanh toán không tồn tại");
    }

    if (payment.paymentStatus !== "PENDING") {
      throw new Error("Thanh toán đã được xử lý");
    }

    const momoResponse = await this.momoService.createPayment({
      amount: payment.amount,
      orderInfo:
        payment.orderInfo ||
        `Thanh toán khóa học ${payment.course?.courseName}`,
      orderId: payment.transactionId!,
      extraData: paymentId, // Lưu paymentId để callback
    });

    if (momoResponse.resultCode === 0) {
      // Cập nhật payment với thông tin từ MoMo
      await Prisma.payment.update({
        where: { paymentId },
        data: {
          metadata: {
            ...(payment.metadata as any),
            momoRequestId: momoResponse.requestId,
            momoOrderId: momoResponse.orderId,
          },
        },
      });

      return {
        success: true,
        payUrl: momoResponse.payUrl,
        deeplink: momoResponse.deeplink,
        qrCodeUrl: momoResponse.qrCodeUrl,
        orderId: momoResponse.orderId,
      };
    } else {
      throw new Error(momoResponse.message || "Lỗi tạo thanh toán MoMo");
    }
  }

  /**
   * Tạo payment URL cho VNPay
   */
  async createVNPayPayment(
    paymentId: string,
    ipAddr: string,
    bankCode?: string
  ) {
    const payment = await Prisma.payment.findUnique({
      where: { paymentId },
      include: {
        course: {
          select: {
            courseName: true,
          },
        },
      },
    });

    if (!payment) {
      throw new Error("Thanh toán không tồn tại");
    }

    if (payment.paymentStatus !== "PENDING") {
      throw new Error("Thanh toán đã được xử lý");
    }

    const paymentUrl = this.vnpayService.createPaymentUrl({
      amount: payment.amount,
      orderInfo:
        payment.orderInfo ||
        `Thanh toán khóa học ${payment.course?.courseName}`,
      orderId: payment.transactionId!,
      ipAddr,
      bankCode,
    });

    return {
      success: true,
      paymentUrl,
      orderId: payment.transactionId,
    };
  }

  /**
   * Xử lý callback từ MoMo
   */
  async handleMoMoCallback(callbackData: any) {
    console.log("\n=== MoMo Callback Received ===");
    console.log("Full callback data:", JSON.stringify(callbackData, null, 2));

    // Verify signature
    const isValid = this.momoService.verifyCallback(callbackData);
    console.log("Signature verification result:", isValid);

    if (!isValid) {
      console.error("❌ Invalid MoMo signature!");
      throw new Error("Invalid signature");
    }

    const { orderId, resultCode, extraData, transId } = callbackData;
    console.log("Order ID:", orderId);
    console.log("Result Code:", resultCode, "Type:", typeof resultCode);
    console.log("Trans ID:", transId);

    // Tìm payment
    const payment = await Prisma.payment.findFirst({
      where: {
        OR: [{ transactionId: orderId }, { paymentId: extraData }],
      },
      include: {
        user: true,
        course: true,
      },
    });

    if (!payment) {
      throw new Error("Payment not found");
    }

    console.log("✅ Found payment:", payment.paymentId);
    console.log("Payment amount:", payment.amount);

    // Cập nhật trạng thái - Handle both string "0" and number 0
    if (resultCode == 0 || resultCode === "0") {
      // Thanh toán thành công
      await Prisma.$transaction(async (tx) => {
        // Cập nhật payment
        await tx.payment.update({
          where: { paymentId: payment.paymentId },
          data: {
            paymentStatus: "COMPLETED",
            paidAt: new Date(),
            metadata: {
              ...(payment.metadata as any),
              momoTransId: transId,
              momoResultCode: resultCode,
            },
          },
        });

        // Tạo enrollment
        const enrollment = await tx.enrollment.create({
          data: {
            userId: payment.userId!,
            courseId: payment.courseId!,
          },
        });

        // Link payment với enrollment
        await tx.payment.update({
          where: { paymentId: payment.paymentId },
          data: { enrollmentId: enrollment.enrollmentId },
        });

        // Tạo notification
        await tx.notification.create({
          data: {
            userId: payment.userId!,
            type: "PAYMENT_SUCCESS",
            title: "Thanh toán thành công",
            message: `Bạn đã đăng ký thành công khóa học "${payment.course?.courseName}"`,
            link: `/courses/${payment.courseId}`,
          },
        });
      });

      return {
        success: true,
        message: "Thanh toán thành công",
        paymentId: payment.paymentId,
        amount: payment.amount,
        orderId: payment.transactionId,
        transId: transId,
        enrollmentCreated: true,
      };
    } else {
      // Thanh toán thất bại
      await Prisma.payment.update({
        where: { paymentId: payment.paymentId },
        data: {
          paymentStatus: "FAILED",
          metadata: {
            ...(payment.metadata as any),
            momoResultCode: resultCode,
            momoMessage: callbackData.message,
          },
        },
      });

      return {
        success: false,
        message: callbackData.message || "Thanh toán thất bại",
        paymentId: payment.paymentId,
        amount: payment.amount,
        orderId: payment.transactionId,
      };
    }
  }

  /**
   * Xử lý callback từ VNPay
   */
  async handleVNPayCallback(callbackData: any) {
    console.log("\n=== VNPay Callback Received ===");
    console.log("Full callback data:", JSON.stringify(callbackData, null, 2));

    // Verify signature
    const verifyResult = this.vnpayService.verifyCallback(callbackData);
    console.log("Signature verification result:", verifyResult);

    if (!verifyResult.isValid) {
      console.error("❌ Invalid VNPay signature!");
      throw new Error("Invalid signature");
    }

    const { vnp_TxnRef, vnp_ResponseCode, vnp_TransactionNo, vnp_Amount } =
      callbackData;

    console.log("Order ID (vnp_TxnRef):", vnp_TxnRef);
    console.log(
      "Response Code:",
      vnp_ResponseCode,
      "Type:",
      typeof vnp_ResponseCode
    );
    console.log("Transaction No:", vnp_TransactionNo);
    console.log("Amount from VNPay:", vnp_Amount);
    console.log("Amount in VND:", parseInt(vnp_Amount) / 100);

    // Tìm payment
    const payment = await Prisma.payment.findFirst({
      where: { transactionId: vnp_TxnRef },
      include: {
        user: true,
        course: true,
      },
    });

    if (!payment) {
      console.error("❌ Payment not found for orderId:", vnp_TxnRef);
      throw new Error("Payment not found");
    }

    console.log("✅ Found payment:", payment.paymentId);
    console.log("Payment amount in DB:", payment.amount);

    // Cập nhật trạng thái - Handle both string "00" and number comparison
    if (vnp_ResponseCode === "00" || vnp_ResponseCode == 0) {
      console.log("✅ Payment successful, creating enrollment...");
      // Thanh toán thành công
      await Prisma.$transaction(async (tx) => {
        // Cập nhật payment
        await tx.payment.update({
          where: { paymentId: payment.paymentId },
          data: {
            paymentStatus: "COMPLETED",
            paidAt: new Date(),
            metadata: {
              ...(payment.metadata as any),
              vnpayTransactionNo: vnp_TransactionNo,
              vnpayResponseCode: vnp_ResponseCode,
              vnpayAmount: vnp_Amount,
            },
          },
        });

        // Tạo enrollment
        const enrollment = await tx.enrollment.create({
          data: {
            userId: payment.userId!,
            courseId: payment.courseId!,
          },
        });

        // Link payment với enrollment
        await tx.payment.update({
          where: { paymentId: payment.paymentId },
          data: { enrollmentId: enrollment.enrollmentId },
        });

        // Tạo notification
        await tx.notification.create({
          data: {
            userId: payment.userId!,
            type: "PAYMENT_SUCCESS",
            title: "Thanh toán thành công",
            message: `Bạn đã đăng ký thành công khóa học "${payment.course?.courseName}"`,
            link: `/courses/${payment.courseId}`,
          },
        });
      });

      return {
        success: true,
        message: this.vnpayService.getResponseMessage(vnp_ResponseCode),
        paymentId: payment.paymentId,
        amount: payment.amount,
        orderId: payment.transactionId,
        transactionNo: vnp_TransactionNo,
        enrollmentCreated: true,
      };
    } else {
      // Thanh toán thất bại
      await Prisma.payment.update({
        where: { paymentId: payment.paymentId },
        data: {
          paymentStatus: "FAILED",
          metadata: {
            ...(payment.metadata as any),
            vnpayResponseCode: vnp_ResponseCode,
            vnpayMessage:
              this.vnpayService.getResponseMessage(vnp_ResponseCode),
          },
        },
      });

      return {
        success: false,
        message: this.vnpayService.getResponseMessage(vnp_ResponseCode),
        paymentId: payment.paymentId,
        amount: payment.amount,
        orderId: payment.transactionId,
      };
    }
  }

  /**
   * Lấy lịch sử thanh toán của user
   */
  async getPaymentHistory(userId: string) {
    return await Prisma.payment.findMany({
      where: { userId },
      include: {
        course: {
          select: {
            courseId: true,
            courseName: true,
            avatarURL: true,
          },
        },
        enrollment: {
          select: {
            enrollmentId: true,
            createdAt: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });
  }

  /**
   * Lấy chi tiết thanh toán
   */
  async getPaymentDetail(paymentId: string) {
    const payment = await Prisma.payment.findUnique({
      where: { paymentId },
      include: {
        user: {
          select: {
            userId: true,
            userName: true,
            email: true,
          },
        },
        course: {
          select: {
            courseId: true,
            courseName: true,
            coursePrice: true,
            avatarURL: true,
          },
        },
        enrollment: true,
      },
    });

    console.log("📋 Payment detail retrieved:", {
      paymentId: payment?.paymentId,
      amount: payment?.amount,
      coursePrice: payment?.course?.coursePrice,
      paymentStatus: payment?.paymentStatus,
    });

    return payment;
  }

  /**
   * Admin manually confirm payment (khi callback fail hoặc cần xác nhận thủ công)
   */
  async confirmPayment(paymentId: string, adminUserId: string) {
    const payment = await Prisma.payment.findUnique({
      where: { paymentId },
      include: {
        user: true,
        course: true,
        enrollment: true,
      },
    });

    if (!payment) {
      throw new Error("Thanh toán không tồn tại");
    }

    if (payment.paymentStatus === "COMPLETED") {
      throw new Error("Thanh toán đã được xác nhận trước đó");
    }

    // Kiểm tra đã có enrollment chưa
    if (payment.enrollment) {
      throw new Error("Enrollment đã tồn tại cho thanh toán này");
    }

    await Prisma.$transaction(async (tx) => {
      // Cập nhật payment
      await tx.payment.update({
        where: { paymentId },
        data: {
          paymentStatus: "COMPLETED",
          paidAt: new Date(),
          metadata: {
            ...(payment.metadata as any),
            manualConfirm: true,
            confirmedBy: adminUserId,
            confirmedAt: new Date().toISOString(),
          },
        },
      });

      // Tạo enrollment
      const enrollment = await tx.enrollment.create({
        data: {
          userId: payment.userId!,
          courseId: payment.courseId!,
        },
      });

      // Link payment với enrollment
      await tx.payment.update({
        where: { paymentId },
        data: { enrollmentId: enrollment.enrollmentId },
      });

      // Tạo notification
      await tx.notification.create({
        data: {
          userId: payment.userId!,
          type: "PAYMENT_SUCCESS",
          title: "Thanh toán được xác nhận",
          message: `Thanh toán của bạn cho khóa học "${payment.course?.courseName}" đã được xác nhận. Bạn có thể bắt đầu học ngay!`,
          link: `/courses/${payment.courseId}`,
        },
      });
    });

    return {
      success: true,
      message: "Xác nhận thanh toán thành công",
    };
  }

  /**
   * Admin manually reject payment
   */
  async rejectPayment(paymentId: string, adminUserId: string, reason?: string) {
    const payment = await Prisma.payment.findUnique({
      where: { paymentId },
      include: { user: true, course: true },
    });

    if (!payment) {
      throw new Error("Thanh toán không tồn tại");
    }

    if (payment.paymentStatus === "COMPLETED") {
      throw new Error("Không thể từ chối thanh toán đã hoàn thành");
    }

    if (payment.paymentStatus === "FAILED") {
      throw new Error("Thanh toán đã bị từ chối trước đó");
    }

    await Prisma.$transaction(async (tx) => {
      // Cập nhật payment
      await tx.payment.update({
        where: { paymentId },
        data: {
          paymentStatus: "FAILED",
          metadata: {
            ...(payment.metadata as any),
            manualReject: true,
            rejectedBy: adminUserId,
            rejectedAt: new Date().toISOString(),
            rejectReason: reason || "Từ chối bởi admin",
          },
        },
      });

      // Tạo notification
      await tx.notification.create({
        data: {
          userId: payment.userId!,
          type: "PAYMENT_FAILED",
          title: "Thanh toán bị từ chối",
          message: `Thanh toán của bạn cho khóa học "${
            payment.course?.courseName
          }" đã bị từ chối. Lý do: ${reason || "Không rõ"}`,
        },
      });
    });

    return {
      success: true,
      message: "Từ chối thanh toán thành công",
    };
  }

  /**
   * User kiểm tra lại trạng thái thanh toán (retry callback)
   */
  async verifyPaymentStatus(paymentId: string, userId: string) {
    const payment = await Prisma.payment.findUnique({
      where: { paymentId },
      include: {
        enrollment: true,
        course: {
          select: {
            courseId: true,
            courseName: true,
          },
        },
      },
    });

    if (!payment) {
      throw new Error("Thanh toán không tồn tại");
    }

    if (payment.userId !== userId) {
      throw new Error("Không có quyền truy cập thanh toán này");
    }

    return {
      paymentId: payment.paymentId,
      transactionId: payment.transactionId,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      paymentStatus: payment.paymentStatus,
      paidAt: payment.paidAt,
      created_at: payment.created_at,
      course: payment.course,
      enrollment: payment.enrollment
        ? {
            enrollmentId: payment.enrollment.enrollmentId,
            enrolledAt: payment.enrollment.createdAt,
          }
        : null,
    };
  }

  /**
   * Thống kê tổng quan (Dashboard Admin)
   */
  async getStatisticsOverview() {
    // Tổng doanh thu
    const totalRevenue = await Prisma.payment.aggregate({
      where: { paymentStatus: "COMPLETED" },
      _sum: { amount: true },
      _count: true,
    });

    // Số giao dịch thành công
    const successfulTransactions = await Prisma.payment.count({
      where: { paymentStatus: "COMPLETED" },
    });

    // Số giao dịch thất bại
    const failedTransactions = await Prisma.payment.count({
      where: { paymentStatus: "FAILED" },
    });

    // Số giao dịch đang chờ
    const pendingTransactions = await Prisma.payment.count({
      where: { paymentStatus: "PENDING" },
    });

    // Doanh thu theo phương thức thanh toán
    const revenueByMethod = await Prisma.payment.groupBy({
      by: ["paymentMethod"],
      where: { paymentStatus: "COMPLETED" },
      _sum: { amount: true },
      _count: true,
    });

    // Doanh thu tháng này
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyRevenue = await Prisma.payment.aggregate({
      where: {
        paymentStatus: "COMPLETED",
        paidAt: { gte: startOfMonth },
      },
      _sum: { amount: true },
      _count: true,
    });

    // Doanh thu hôm nay
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const dailyRevenue = await Prisma.payment.aggregate({
      where: {
        paymentStatus: "COMPLETED",
        paidAt: { gte: startOfDay },
      },
      _sum: { amount: true },
      _count: true,
    });

    return {
      totalRevenue: totalRevenue._sum.amount || 0,
      totalTransactions: totalRevenue._count || 0,
      successfulTransactions,
      failedTransactions,
      pendingTransactions,
      revenueByMethod: revenueByMethod.map((item) => ({
        method: item.paymentMethod,
        revenue: item._sum.amount || 0,
        count: item._count,
      })),
      monthlyRevenue: {
        revenue: monthlyRevenue._sum.amount || 0,
        count: monthlyRevenue._count || 0,
      },
      dailyRevenue: {
        revenue: dailyRevenue._sum.amount || 0,
        count: dailyRevenue._count || 0,
      },
    };
  }

  /**
   * Thống kê doanh thu theo thời gian
   */
  async getRevenueByPeriod(
    startDate: Date,
    endDate: Date,
    groupBy: "day" | "month" | "year" = "day"
  ) {
    const payments = await Prisma.payment.findMany({
      where: {
        paymentStatus: "COMPLETED",
        paidAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        amount: true,
        paidAt: true,
        paymentMethod: true,
      },
      orderBy: { paidAt: "asc" },
    });

    // Group theo period
    const grouped: {
      [key: string]: { revenue: number; count: number; methods: any };
    } = {};

    payments.forEach((payment) => {
      if (!payment.paidAt) return;

      let key: string;
      const date = new Date(payment.paidAt);

      switch (groupBy) {
        case "day":
          key = date.toISOString().split("T")[0]; // YYYY-MM-DD
          break;
        case "month":
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )}`; // YYYY-MM
          break;
        case "year":
          key = String(date.getFullYear()); // YYYY
          break;
      }

      if (!grouped[key]) {
        grouped[key] = { revenue: 0, count: 0, methods: {} };
      }

      grouped[key].revenue += payment.amount;
      grouped[key].count += 1;

      // Count by method
      const method = payment.paymentMethod || "UNKNOWN";
      grouped[key].methods[method] =
        (grouped[key].methods[method] || 0) + payment.amount;
    });

    return Object.entries(grouped).map(([period, data]) => ({
      period,
      revenue: data.revenue,
      count: data.count,
      methods: data.methods,
    }));
  }

  /**
   * Top khóa học bán chạy
   */
  async getTopSellingCourses(limit: number = 10) {
    const topCourses = await Prisma.payment.groupBy({
      by: ["courseId"],
      where: {
        paymentStatus: "COMPLETED",
        courseId: { not: null },
      },
      _sum: { amount: true },
      _count: true,
      orderBy: { _count: { courseId: "desc" } },
      take: limit,
    });

    // Lấy thông tin chi tiết khóa học
    const courseIds = topCourses
      .map((item) => item.courseId)
      .filter((id): id is string => id !== null);

    const courses = await Prisma.course.findMany({
      where: { courseId: { in: courseIds } },
      select: {
        courseId: true,
        courseName: true,
        coursePrice: true,
        avatarURL: true,
        user: {
          select: {
            userName: true,
          },
        },
      },
    });

    // Merge data
    return topCourses.map((item) => {
      const course = courses.find((c) => c.courseId === item.courseId);
      return {
        courseId: item.courseId,
        courseName: course?.courseName || "N/A",
        avatarURL: course?.avatarURL,
        instructor: course?.user?.userName,
        totalRevenue: item._sum.amount || 0,
        totalSales: item._count,
      };
    });
  }

  /**
   * Thống kê doanh thu theo khóa học
   */
  async getRevenueByCourse(courseId: string) {
    const stats = await Prisma.payment.aggregate({
      where: {
        courseId,
        paymentStatus: "COMPLETED",
      },
      _sum: { amount: true },
      _count: true,
    });

    const paymentsByMethod = await Prisma.payment.groupBy({
      by: ["paymentMethod"],
      where: {
        courseId,
        paymentStatus: "COMPLETED",
      },
      _sum: { amount: true },
      _count: true,
    });

    return {
      courseId,
      totalRevenue: stats._sum.amount || 0,
      totalSales: stats._count || 0,
      paymentMethods: paymentsByMethod.map((item) => ({
        method: item.paymentMethod,
        revenue: item._sum.amount || 0,
        count: item._count,
      })),
    };
  }

  /**
   * Thống kê doanh thu theo user (instructor)
   */
  async getRevenueByInstructor(userId: string) {
    // Lấy tất cả courses của instructor
    const courses = await Prisma.course.findMany({
      where: { createdBy: userId },
      select: { courseId: true },
    });

    const courseIds = courses.map((c) => c.courseId);

    const stats = await Prisma.payment.aggregate({
      where: {
        courseId: { in: courseIds },
        paymentStatus: "COMPLETED",
      },
      _sum: { amount: true },
      _count: true,
    });

    const courseStats = await Prisma.payment.groupBy({
      by: ["courseId"],
      where: {
        courseId: { in: courseIds },
        paymentStatus: "COMPLETED",
      },
      _sum: { amount: true },
      _count: true,
    });

    return {
      instructorId: userId,
      totalRevenue: stats._sum.amount || 0,
      totalSales: stats._count || 0,
      courseCount: courses.length,
      topCourses: courseStats
        .sort((a, b) => (b._sum.amount || 0) - (a._sum.amount || 0))
        .slice(0, 5)
        .map((item) => ({
          courseId: item.courseId,
          revenue: item._sum.amount || 0,
          sales: item._count,
        })),
    };
  }

  /**
   * Danh sách tất cả giao dịch (Admin)
   */
  async getAllPayments(options: {
    status?: string;
    method?: string;
    startDate?: Date;
    endDate?: Date;
    page?: number;
    limit?: number;
  }) {
    const {
      status,
      method,
      startDate,
      endDate,
      page = 1,
      limit = 20,
    } = options;

    const where: any = {};

    if (status) {
      where.paymentStatus = status;
    }

    if (method) {
      where.paymentMethod = method;
    }

    if (startDate || endDate) {
      where.created_at = {};
      if (startDate) where.created_at.gte = startDate;
      if (endDate) where.created_at.lte = endDate;
    }

    const [payments, total] = await Promise.all([
      Prisma.payment.findMany({
        where,
        include: {
          user: {
            select: {
              userId: true,
              userName: true,
              email: true,
            },
          },
          course: {
            select: {
              courseId: true,
              courseName: true,
            },
          },
        },
        orderBy: { created_at: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      Prisma.payment.count({ where }),
    ]);

    return {
      payments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Thống kê chi tiêu theo học viên (Top Spenders)
   */
  async getTopSpendingStudents(limit: number = 10) {
    // Group payments by userId and calculate total spent
    const topSpenders = await Prisma.payment.groupBy({
      by: ["userId"],
      where: {
        paymentStatus: "COMPLETED",
        userId: { not: null },
      },
      _sum: { amount: true },
      _count: true,
      orderBy: { _sum: { amount: "desc" } },
      take: limit,
    });

    // Get user details
    const userIds = topSpenders
      .map((item) => item.userId)
      .filter((id): id is string => id !== null);

    const users = await Prisma.user.findMany({
      where: { userId: { in: userIds } },
      select: {
        userId: true,
        userName: true,
        email: true,
        avatarURL: true,
      },
    });

    // Merge data
    return topSpenders.map((item) => {
      const user = users.find((u) => u.userId === item.userId);
      return {
        userId: item.userId,
        userName: user?.userName || "N/A",
        email: user?.email || "N/A",
        avatarURL: user?.avatarURL,
        totalSpent: item._sum.amount || 0,
        transactionCount: item._count,
      };
    });
  }
}
