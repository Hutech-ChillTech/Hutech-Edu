import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { message } from "antd";
import styles from "../styles/RegisterPage.module.css";

interface RegisterForm {
  userName: string;
  password: string;
  email: string;
  level: string;
  gender: string;
}

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    userName: "",
    password: "",
    email: "",
    level: "Basic",
    gender: "MALE",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/users/register", form);
      message.success(
        "Đăng ký thành công! Đang chuyển đến trang đăng nhập... 🎉"
      );
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err: any) {
      message.error(
        err.response?.data?.message ||
          "Đăng ký thất bại! Vui lòng kiểm tra lại thông tin."
      );
    }
  };

  return (
    <div className={styles["register-gradient-background"]}>
      <div className={styles["register-container"]}>
        <h2 className={styles["register-title"]}>Đăng ký tài khoản</h2>

        <form onSubmit={handleRegister}>
          {/* Tên người dùng */}
          <input
            type="text"
            className={styles["register-input"]}
            name="userName"
            value={form.userName}
            onChange={handleChange}
            placeholder="Tên người dùng"
            required
          />

          {/* Email */}
          <input
            type="email"
            className={styles["register-input"]}
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />

          {/* Mật khẩu */}
          <input
            type="password"
            className={styles["register-input"]}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Mật khẩu"
            required
          />

          {/* 🎓 Level */}
          <select
            className={styles["register-select"]}
            name="level"
            value={form.level}
            onChange={handleChange}
          >
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Giới tính */}
          <select
            className={styles["register-select"]}
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="MALE">Nam</option>
            <option value="FEMALE">Nữ</option>
          </select>

          <button type="submit" className={styles["register-button"]}>
            Đăng ký
          </button>

          <div className={styles["register-footer"]}>
            Đã có tài khoản?{" "}
            <Link to="/login" className={styles["text-link"]}>
              Đăng nhập tại đây
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
