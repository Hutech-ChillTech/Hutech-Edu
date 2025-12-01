import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircleOutlined, HomeOutlined, BookOutlined, UserOutlined, FileTextOutlined, CreditCardOutlined, DollarOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import styles from "../../styles/PaymentResult.module.css";
import { courseService } from "../../service/course.service";
import { userService } from "../../service/user.service";
import type { Course } from "../../types/database.types";

const PaymentSuccessPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Lấy các tham số từ URL
    const orderId = searchParams.get("orderId");
    const partnerCode = searchParams.get("partnerCode");
    const amount = searchParams.get("amount");
    const responseTime = searchParams.get("responseTime");
    const extraData = searchParams.get("extraData"); // Giả sử đây là courseId
    const orderInfo = searchParams.get("orderInfo");

    const [course, setCourse] = useState<Course | null>(null);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Lấy thông tin User từ LocalStorage hoặc API
                const storedUser = localStorage.getItem("user");
                const uid = localStorage.getItem("uid");

                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                } else if (uid) {
                    const userData = await userService.getUserByUid(uid);
                    setUser(userData);
                }

                // 2. Lấy thông tin Khóa học nếu có extraData (courseId)
                if (extraData) {
                    const courseData = await courseService.getCourseById(extraData);
                    setCourse(courseData);
                }
            } catch (error) {
                console.error("Error fetching payment details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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

    // Tạo nội dung hiển thị thông minh hơn
    const displayContent = () => {
        const baseContent = decodeURIComponent(orderInfo || "Thanh toán khóa học");
        if (course?.courseName && !baseContent.includes(course.courseName)) {
            return `${baseContent} "${course.courseName}"`;
        }
        return baseContent;
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.iconSuccess}>
                    <CheckCircleOutlined />
                </div>

                <h1 className={styles.title}>Thanh toán thành công!</h1>
                <p className={styles.message}>
                    Cảm ơn bạn đã đăng ký. Khóa học đã được kích hoạt và bạn có thể bắt đầu học ngay.
                </p>

                {loading ? (
                    <div style={{ textAlign: "center", margin: "20px 0" }}>
                        <Spin />
                    </div>
                ) : (
                    <div className={styles.orderInfoContainer}>
                        <div className={styles.detailCard}>
                            <div className={styles.infoRow}>
                                <span className={styles.label}><FileTextOutlined /> Mã đơn hàng:</span>
                                <span className={styles.value}>{orderId}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}><CreditCardOutlined /> Phương thức:</span>
                                <span className={styles.value}>{getPaymentMethodName(partnerCode)}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}><DollarOutlined /> Số tiền:</span>
                                <span className={styles.valueHighlight}>{formatCurrency(amount)}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}><InfoCircleOutlined /> Nội dung:</span>
                                <span className={styles.value}>{displayContent()}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}><BookOutlined /> Khóa học:</span>
                                <span className={styles.value}>{course?.courseName || "Đang cập nhật..."}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}><UserOutlined /> Người thanh toán:</span>
                                <span className={styles.value}>{user?.fullName || user?.email || "Khách"}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>🕒 Thời gian:</span>
                                <span className={styles.value}>{formatDate(responseTime)}</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.buttonGroup}>
                    <button
                        className={styles.primaryButton}
                        onClick={() => navigate("/user/profile")}
                    >
                        <BookOutlined /> Vào học ngay
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

export default PaymentSuccessPage;