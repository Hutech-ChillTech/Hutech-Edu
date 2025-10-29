import React, { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/LoginPage.module.css";
import { FcGoogle } from "react-icons/fc";
import axiosClient from "../../service/axiosClient";
import { jwtDecode } from "jwt-decode";

// 🧩 Kiểu dữ liệu trả về từ API (phù hợp với BE)
interface LoginResponse {
  success: boolean;
  data: string; // chính là token
  message: string;
}

// 🧩 Kiểu dữ liệu payload trong JWT
interface JWTPayload {
  userId: string;
  email: string;
  roles?: string[];
  exp?: number;
  iat?: number;
}

// 🧠 Dịch vụ xác thực
export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axiosClient.post<LoginResponse>("/users/login", {
      email,
      password,
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  isAuthenticated: () => !!localStorage.getItem("token"),

  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.role?.toLowerCase() === "admin";
  },
};

// 🧱 Component LoginPage
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Xử lý đăng nhập
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authService.login(email, password);
      const token = res.data; // BE trả token ở đây

      // ✅ Giải mã token thật thay vì tạo fakeUser
      const decoded = jwtDecode<JWTPayload>(token);
      const userRole =
        decoded.roles && decoded.roles.length > 0
          ? decoded.roles[0]
          : "User";
      const userName = decoded.email.split("@")[0];

      // 🧱 Lưu token & thông tin vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(decoded));
      localStorage.setItem("role", userRole);
      localStorage.setItem("username", userName);

      alert(`✅ Đăng nhập thành công! Xin chào ${userName}`);

      // 🔀 Điều hướng theo vai trò trong token
      if (userRole.toLowerCase() === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user");
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

  // ⚙️ Tạm thời chưa dùng Google Login
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
