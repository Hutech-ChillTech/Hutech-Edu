import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/RegisterPage.module.css";
import { type Register } from "../types/login.types";
import { authService } from "../service/auth.service";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const [form, setForm] = useState<Register>({
    userName: "",
    password: "",
    email: "",
    level: "Basic", 
    gender: "MALE",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
   
      await authService.register(form);
      
      alert("✅ Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (err: any) {
      console.error("❌ Lỗi đăng ký:", err);
     
      alert(err.message || "Đăng ký thất bại! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["register-gradient-background"]}>
      <div className={styles["register-container"]}>
        <h2 className={styles["register-title"]}>Đăng ký tài khoản</h2>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            className={styles["register-input"]}
            name="userName"
            value={form.userName}
            onChange={handleChange}
            placeholder="Tên người dùng"
            required
          />

          <input
            type="email"
            className={styles["register-input"]}
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />

          <input
            type="password"
            className={styles["register-input"]}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Mật khẩu"
            required
          />

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

          <button 
            type="submit" 
            className={styles["register-button"]}
            disabled={loading} // Disable nút khi đang loading
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
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