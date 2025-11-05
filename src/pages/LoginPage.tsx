import React, { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/LoginPage.module.css";
import { FcGoogle } from "react-icons/fc";
import axiosClient from "../service/axiosClient";
import { jwtDecode } from "jwt-decode";


//  Kiểu dữ liệu trả về từ API (phù hợp với BE)
export interface LoginResponse {
  success: boolean;
  data: {
    uid: string;
    userId: string;
    roleId: string;
    role: string;
    email: string;
    token: string;
  };
  message: string;
}




//  Dịch vụ xác thực
export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const url = `${backendURL}/api/users/login`;


    const response = await axiosClient.post(url, {
      email,
      password,
      returnSecureToken: true,
    });

    const { idToken, refeshToken, localId, email: userEmail } = response.data;

    localStorage.setItem("token: ", idToken);
    localStorage.setItem("refeshToken: ", refeshToken);
    localStorage.setItem("email:", userEmail);
    localStorage.setItem("uid: ", localId);

    return response.data;
  },

  logout: () => {
    localStorage.clear();
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => !!localStorage.getItem("token"),

  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.role?.toLowerCase() === "admin";
  },
};

//  Component LoginPage
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //  Xử lý đăng nhập
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authService.login(email, password);
      const userData = res.data;

      console.log("User Data:", userData);

      // Lưu token vào localStorage nếu cần
      localStorage.setItem("token", userData.token);

      alert(`✅ Đăng nhập thành công! Xin chào ${userData.email}`);

      const normalizedRole = userData.role.trim().toLowerCase();

      if (normalizedRole === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }

    } catch (error: any) {
      console.error("❌ Lỗi đăng nhập:", error);
      if (error.response) {
        alert(
          error.response.data?.message ||
          "Email hoặc mật khẩu không đúng. Vui lòng thử lại!"
        );
      } else {
        alert("Không thể kết nối đến server. Hãy kiểm tra lại backend!");
      }
    } finally {
      setLoading(false);
    }
  };


  //  Tạm thời chưa dùng Google Login
  const handleGoogleLogin = () => {
    alert("Tính năng đăng nhập Google sẽ được cập nhật sau 🚀");
  };

  return (
    <div className={styles["login-gradient-background"]}>
      <div className={styles["login-container"]}>
        <form className={styles["login-form"]} onSubmit={handleLogin}>
          <h2 className={styles["login-title"]}>Đăng nhập</h2>

          <input
            type="email"
            className={styles["login-input"]}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className={styles["login-input"]}
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className={styles["login-button"]}>
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>

          <button
            type="button"
            className={styles["google-button"]}
            onClick={handleGoogleLogin}
          >
            <FcGoogle className={styles["google-icon"]} />
            Đăng nhập với Google
          </button>

          <div className={styles["login-footer"]}>
            <span>Bạn chưa có tài khoản? </span>
            <Link to="/register">Đăng ký ngay</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
