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
    // Verify signature
    const isValid = this.momoService.verifyCallback(callbackData);

    if (!isValid) {
      throw new Error("Invalid signature");
    }

    const { orderId, resultCode, extraData, transId } = callbackData;

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

    // Cập nhật trạng thái
    if (resultCode === 0) {
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
      };
    }
  }

  /**
   * Xử lý callback từ VNPay
   */
  async handleVNPayCallback(callbackData: any) {
    // Verify signature
    const verifyResult = this.vnpayService.verifyCallback(callbackData);

    if (!verifyResult.isValid) {
      throw new Error("Invalid signature");
    }

    const { vnp_TxnRef, vnp_ResponseCode, vnp_TransactionNo, vnp_Amount } =
      callbackData;

    // Tìm payment
    const payment = await Prisma.payment.findFirst({
      where: { transactionId: vnp_TxnRef },
      include: {
        user: true,
        course: true,
      },
    });

    if (!payment) {
      throw new Error("Payment not found");
    }

    // Cập nhật trạng thái
    if (vnp_ResponseCode === "00") {
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
    return await Prisma.payment.findUnique({
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
  }
}
