import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/AuthForm.module.css";
import { GoogleOutlined } from "@ant-design/icons";

const LoginUI: React.FC = () => {
    return (
        <div className={styles.formSectionWrapper}>
            <header className={styles.formHeader}>
                <h2>Chào mừng trở lại! 👋</h2>
                <p>Vui lòng đăng nhập để bắt đầu học tập cùng Hutech Edu.</p>
            </header>

            <form onSubmit={(e) => e.preventDefault()}>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="name@company.com"
                        autoComplete="email"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <label htmlFor="password" style={{ marginBottom: 0 }}>Mật khẩu</label>
                        <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: '#fb923c', fontWeight: 600, textDecoration: 'none' }}>
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                    />
                </div>

                <button type="submit" className={styles.submitBtn}>
                    Đăng nhập ngay
                </button>

                <div className={styles.divider}>
                    <span>Hoặc đăng nhập với</span>
                </div>

                <button type="button" className={styles.socialBtn}>
                    <GoogleOutlined style={{ fontSize: '1.2rem', color: '#ea4335' }} />
                    Google
                </button>

                <footer className={styles.footer}>
                    <span>Bạn mới biết đến Hutech Edu? </span>
                    <Link to="/register">Đăng ký tài khoản</Link>
                </footer>
            </form>
        </div>
    );
};

export default LoginUI;
