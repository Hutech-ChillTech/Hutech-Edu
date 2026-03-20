import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/AuthForm.module.css";

const RegisterUI: React.FC = () => {
    return (
        <div className={styles.formSectionWrapper}>
            <header className={styles.formHeader}>
                <h2>Bắt đầu thôi! 🚀</h2>
                <p>Tạo tài khoản để tham gia 50,000+ sinh viên ngay hôm nay.</p>
            </header>

            <form onSubmit={(e) => e.preventDefault()}>
                <div className={styles.inputGroup}>
                    <label htmlFor="userName">Tên người dùng</label>
                    <input
                        type="text"
                        id="userName"
                        placeholder="Ví dụ: nva_2003"
                        autoComplete="username"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email học thuật</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="name@example.com"
                        autoComplete="email"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Tối thiểu 8 ký tự"
                        autoComplete="new-password"
                    />
                </div>

                <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="level">Trình độ hiện tại</label>
                        <select id="level">
                            <option value="Basic">Cơ bản</option>
                            <option value="Intermediate">Trung bình</option>
                            <option value="Advanced">Nâng cao</option>
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="gender">Giới tính</label>
                        <select id="gender">
                            <option value="MALE">Nam</option>
                            <option value="FEMALE">Nữ</option>
                            <option value="OTHER">Khác</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className={styles.submitBtn}>
                    Đăng ký ngay
                </button>

                <div className={styles.divider}>
                    <span>Hoặc đăng ký với</span>
                </div>

                <button type="button" className={styles.socialBtn}>
                    Đăng ký bằng Google
                </button>

                <footer className={styles.footer}>
                    <span>Đã là thành viên? </span>
                    <Link to="/login">Đăng nhập tại đây</Link>
                </footer>
            </form>
        </div>
    );
};

export default RegisterUI;
