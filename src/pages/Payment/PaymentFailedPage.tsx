import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CloseCircleOutlined,
  HomeOutlined,
  ReloadOutlined,
  FileTextOutlined,
  CreditCardOutlined,
  DollarOutlined,
  InfoCircleOutlined,
  BookOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import styles from "../../styles/PaymentResult.module.css";
import { paymentService } from "../../service/payment.service";
import { courseService } from "../../service/course.service";
import { userService } from "../../service/user.service";
import type { Course } from "../../types/database.types";

const PaymentFailedPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Lấy các tham số từ URL
  const orderId = searchParams.get("orderId");
  const errorMessage = searchParams.get("message");
  const partnerCode = searchParams.get("partnerCode");
  const amount = searchParams.get("amount");
  const responseTime = searchParams.get("responseTime");
  const extraData = searchParams.get("extraData");
  const orderInfo = searchParams.get("orderInfo");
  const resultCode = searchParams.get("resultCode");

  const [course, setCourse] = useState<Course | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  // Debug: Log tất cả query params (DISABLED)
  // useEffect(() => {
  //   console.log("=== PAYMENT FAILED PAGE DEBUG ===");
  //   console.log("Current URL:", window.location.href);
  //   console.log("All Query Params:");
  //   searchParams.forEach((value, key) => {
  //     console.log(`  ${key}: ${value}`);
  //   });
  //   console.log("Extracted values:");
  //   console.log("  orderId:", orderId);
  //   console.log("  errorMessage:", errorMessage);
  //   console.log("  partnerCode:", partnerCode);
  //   console.log("  amount:", amount);
  //   console.log("  resultCode:", resultCode);
  //   console.log("=================================");
  // }, [searchParams]);

  useEffect(() => {
    const fetchDataAndVerifyPayment = async () => {
      try {
        // 1. Lấy thông tin User
        const storedUser = localStorage.getItem("user");
        const uid = localStorage.getItem("uid");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else if (uid) {
          const userData = await userService.getUserByUid(uid);
          setUser(userData);
        }

        // 2. Lấy paymentId từ localStorage để verify
        const pendingPaymentId = localStorage.getItem("pendingPaymentId");

        if (pendingPaymentId) {
          try {
            // 3. Gọi API verify để lấy thông tin payment (nếu có)
            const paymentData = await paymentService.verifyPaymentStatus(
              pendingPaymentId
            );

            setPaymentDetails(paymentData);

            // 4. Lấy thông tin khóa học
            if (paymentData.course?.courseId) {
              const courseData = await courseService.getCourseById(
                paymentData.course.courseId
              );
              setCourse(courseData);
            }

            // 5. Xóa pendingPaymentId vì đã thất bại
            localStorage.removeItem("pendingPaymentId");
          } catch (error: unknown) {
            // Fallback: Thử lấy thông tin từ extraData (courseId)
            if (extraData) {
              try {
                const courseData = await courseService.getCourseById(extraData);
                setCourse(courseData);
              } catch (err) {
                // Error fetching course
              }
            }
          }
        } else if (extraData) {
          // Không có paymentId, nhưng có courseId từ URL
          try {
            const courseData = await courseService.getCourseById(extraData);
            setCourse(courseData);
          } catch (err) {
            // Error fetching course
          }
        }
      } catch (error: unknown) {
        // Error in failed page
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndVerifyPayment();
  }, [extraData]);

  const formatCurrency = (value: string | number | null) => {
    if (!value) return "0đ";
    return Number(value).toLocaleString("vi-VN") + "đ";
  };

  const formatDate = (timestamp: string | null) => {
    if (!timestamp) return new Date().toLocaleString("vi-VN");
    return new Date(Number(timestamp)).toLocaleString("vi-VN");
  };

  const getPaymentMethodName = (code: string | null) => {
    if (code === "MOMO") return "Ví MoMo";
    if (code === "VNPAY") return "VNPay";
    return code || "Không xác định";
  };

  const getErrorMessage = () => {
    // Decode error message từ URL
    const decodedMessage = errorMessage
      ? decodeURIComponent(errorMessage)
      : null;

    // Map resultCode thành message người dùng hiểu được
    if (resultCode) {
      switch (resultCode) {
        case "1006":
          return "Giao dịch bị từ chối do vượt quá hạn mức thanh toán.";
        case "1":
        case "9000":
          return "Bạn đã hủy giao dịch.";
        case "1001":
          return "Giao dịch thất bại do lỗi từ nhà cung cấp.";
        case "1002":
          return "Giao dịch bị từ chối do số dư không đủ.";
        case "1004":
          return "Giao dịch thất bại do vượt quá số tiền cho phép.";
        case "1005":
          return "Giao dịch thất bại do URL hoặc QR code đã hết hạn.";
        case "1017":
          return "Tài khoản bị khóa hoặc chưa được kích hoạt.";
        case "24":
          return "Giao dịch bị hủy do không thực hiện thanh toán.";
        default:
          return (
            decodedMessage || "Đã có lỗi xảy ra trong quá trình thanh toán."
          );
      }
    }

    return decodedMessage || "Giao dịch không thành công. Vui lòng thử lại.";
  };

  const displayContent = () => {
    const baseContent = decodeURIComponent(orderInfo || "Thanh toán khóa học");
    if (course?.courseName && !baseContent.includes(course.courseName)) {
      return `${baseContent} "${course.courseName}"`;
    }
    return baseContent;
  };

  const handleRetry = () => {
    if (course?.courseId) {
      navigate(`/payment?courseId=${course.courseId}`);
    } else if (extraData) {
      navigate(`/payment?courseId=${extraData}`);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconFailed}>
          <CloseCircleOutlined />
        </div>

        <h1 className={styles.title}>Thanh toán thất bại!</h1>
        <p className={styles.message}>{getErrorMessage()}</p>

        {loading ? (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <Spin />
          </div>
        ) : (
          <>
            {(orderId || paymentDetails) && (
              <div className={styles.orderInfoContainer}>
                <div className={styles.detailCard}>
                  {orderId && (
                    <div className={styles.infoRow}>
                      <span className={styles.label}>
                        <FileTextOutlined /> Mã đơn hàng:
                      </span>
                      <span className={styles.value}>{orderId}</span>
                    </div>
                  )}

                  {partnerCode && (
                    <div className={styles.infoRow}>
                      <span className={styles.label}>
                        <CreditCardOutlined /> Phương thức:
                      </span>
                      <span className={styles.value}>
                        {getPaymentMethodName(partnerCode)}
                      </span>
                    </div>
                  )}

                  {amount && (
                    <div className={styles.infoRow}>
                      <span className={styles.label}>
                        <DollarOutlined /> Số tiền:
                      </span>
                      <span className={styles.value}>
                        {formatCurrency(amount)}
                      </span>
                    </div>
                  )}

                  {(orderInfo || course) && (
                    <div className={styles.infoRow}>
                      <span className={styles.label}>
                        <InfoCircleOutlined /> Nội dung:
                      </span>
                      <span className={styles.value}>{displayContent()}</span>
                    </div>
                  )}

                  {course && (
                    <div className={styles.infoRow}>
                      <span className={styles.label}>
                        <BookOutlined /> Khóa học:
                      </span>
                      <span className={styles.value}>{course.courseName}</span>
                    </div>
                  )}

                  {user && (
                    <div className={styles.infoRow}>
                      <span className={styles.label}>
                        <UserOutlined /> Người thanh toán:
                      </span>
                      <span className={styles.value}>
                        {user.fullName || user.email || "Khách"}
                      </span>
                    </div>
                  )}

                  {responseTime && (
                    <div className={styles.infoRow}>
                      <span className={styles.label}>🕒 Thời gian:</span>
                      <span className={styles.value}>
                        {formatDate(responseTime)}
                      </span>
                    </div>
                  )}

                  {resultCode && (
                    <div className={styles.infoRow}>
                      <span className={styles.label}>
                        <InfoCircleOutlined /> Mã lỗi:
                      </span>
                      <span className={styles.valueError}>{resultCode}</span>
                    </div>
                  )}

                  {paymentDetails?.paymentStatus && (
                    <div className={styles.infoRow}>
                      <span className={styles.label}>📊 Trạng thái:</span>
                      <span className={styles.valueError}>
                        {paymentDetails.paymentStatus === "FAILED"
                          ? "Thất bại"
                          : paymentDetails.paymentStatus}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className={styles.helpSection}>
              <h3>💡 Gợi ý xử lý:</h3>
              <ul>
                <li>Kiểm tra lại số dư tài khoản</li>
                <li>Đảm bảo thông tin thanh toán chính xác</li>
                <li>Thử lại với phương thức thanh toán khác</li>
                <li>Liên hệ hỗ trợ nếu vấn đề vẫn tiếp diễn</li>
              </ul>
            </div>
          </>
        )}

        <div className={styles.buttonGroup}>
          <button
            className={styles.primaryButton}
            onClick={handleRetry}
            disabled={loading}
          >
            <ReloadOutlined /> Thử lại
          </button>

          <button
            className={styles.secondaryButton}
            onClick={() => navigate("/")}
          >
            <HomeOutlined /> Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
