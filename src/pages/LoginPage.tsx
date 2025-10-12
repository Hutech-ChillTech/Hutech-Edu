import React from "react";
import { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import { FcGoogle } from "react-icons/fc";


// 🧠 Interface mô tả dữ liệu trả về từ API
interface User {
  id: number;
  email: string;
  name?: string;
  role?: string;
  roles?: string[];
}

interface LoginResponse {
  user: User;
  token: string;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post<LoginResponse>("http://localhost:3000/api/users/login", {
        email,
        password,
      });

      const user = res.data.user;
      const role = user?.role ?? user?.roles?.[0] ?? "User";

      // 🧱 Lưu localStorage
      localStorage.setItem("user", JSON.stringify({ ...user, role }));
      localStorage.setItem("token", res.data.token);

      alert("Đăng nhập thành công!");

       navigate(role === "Admin" ? "/admin/dashboard" : "/");
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
  // ⚙️ Xử lý đăng nhập Google (chưa có API thật)
  const handleGoogleLogin = () => {
    alert("Tính năng đăng nhập Google sẽ được cập nhật sau 🚀");
    // 👉 Sau này bạn có thể redirect đến endpoint Google OAuth ở đây
  };
  return (
    <div className="login-gradient-background">
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2 className="login-title">Đăng nhập</h2>

          <input
            type="email"
            className="login-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="login-input"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button 
            type="submit" 
            className="login-button">
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
          {/* 🔹 Nút đăng nhập Google */}
          <button
            type="button"
            className="google-button"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="google-icon" />
            Đăng nhập với Google
          </button>
          <div className="login-footer">
            <span>Bạn chưa có tài khoản? </span>
            <Link to="/register">Đăng ký ngay</Link>
          </div>
          </form>
          
          </div>

          
         
      </div>
  );
};

export default LoginPage;
