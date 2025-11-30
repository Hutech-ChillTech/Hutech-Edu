import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CloseCircleOutlined, HomeOutlined, ReloadOutlined } from "@ant-design/icons";
import styles from "../../styles/PaymentResult.module.css";

const PaymentFailedPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    const errorMessage = searchParams.get("message");

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.iconFailed}>
                    <CloseCircleOutlined />
                </div>

                <h1 className={styles.title}>Thanh toán thất bại!</h1>
                <p className={styles.message}>
                    {errorMessage || "Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại."}
                </p>

                {orderId && (
                    <div className={styles.orderInfo}>
                        <p><strong>Mã đơn hàng:</strong> {orderId}</p>
                    </div>
                )}

                <div className={styles.buttonGroup}>
                    <button
                        className={styles.primaryButton}
                        onClick={() => navigate(-1)}
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