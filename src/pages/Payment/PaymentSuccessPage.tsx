import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircleOutlined, HomeOutlined, BookOutlined } from "@ant-design/icons";
import styles from "../../styles/PaymentResult.module.css";

const PaymentSuccessPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");

    useEffect(() => {
        // Có thể gọi API để verify payment status
        console.log("Payment successful for order:", orderId);
    }, [orderId]);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.iconSuccess}>
                    <CheckCircleOutlined />
                </div>

                <h1 className={styles.title}>Thanh toán thành công!</h1>
                <p className={styles.message}>
                    Cảm ơn bạn đã mua khóa học. Bạn có thể bắt đầu học ngay bây giờ.
                </p>

                {orderId && (
                    <div className={styles.orderInfo}>
                        <p><strong>Mã đơn hàng:</strong> {orderId}</p>
                    </div>
                )}

                <div className={styles.buttonGroup}>
                    <button
                        className={styles.primaryButton}
                        onClick={() => navigate("/user/profile")}
                    >
                        <BookOutlined /> Khóa học của tôi
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
