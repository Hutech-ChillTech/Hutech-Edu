// import React, { useState, type FormEvent } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "../styles/LoginPage.module.css";
// import { FcGoogle } from "react-icons/fc";
// import axiosClient from "../service/axiosClient";
// import { jwtDecode } from "jwt-decode";


// //  Kiểu dữ liệu trả về từ API (phù hợp với BE)
// export interface LoginResponse {
//   success: boolean;
//   data: {
//     uid: string;
//     userId: string;
//     roleId: string;
//     role: string;
//     email: string;
//     token: string;
//   };
//   message: string;
// }




// //  Dịch vụ xác thực
// export const authService = {
//   login: async (email: string, password: string): Promise<LoginResponse> => {

//     const backendURL = import.meta.env.VITE_BACKEND_URL;

//     const url = `${backendURL}/api/users/login`;


//     const response = await axiosClient.post(url, {
//       email,
//       password,
//       returnSecureToken: true,
//     });

//     const { idToken, refeshToken, localId, email: userEmail } = response.data;

//     localStorage.setItem("token: ", idToken);
//     localStorage.setItem("refeshToken: ", refeshToken);
//     localStorage.setItem("email:", userEmail);
//     localStorage.setItem("uid: ", localId);

//     return response.data;
//   },

//   logout: () => {
//     localStorage.clear();
//   },

//   getCurrentUser: () => {
//     const userStr = localStorage.getItem("user");
//     return userStr ? JSON.parse(userStr) : null;
//   },

//   isAuthenticated: () => !!localStorage.getItem("token"),

//   isAdmin: () => {
//     const user = authService.getCurrentUser();
//     return user?.role?.toLowerCase() === "admin";
//   },
// };

// //  Component LoginPage
// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   //  Xử lý đăng nhập
//   const handleLogin = async (e: FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await authService.login(email, password);
//       const userData = res.data;

//       console.log("User Data:", userData);

//       // Lưu token vào localStorage nếu cần
//       localStorage.setItem("token", userData.token);

//       alert(`✅ Đăng nhập thành công! Xin chào ${userData.email}`);

//       const normalizedRole = userData.role.trim().toLowerCase();

//       if (normalizedRole === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/");
//       }

//     } catch (error: any) {
//       console.error("❌ Lỗi đăng nhập:", error);
//       if (error.response) {
//         alert(
//           error.response.data?.message ||
//           "Email hoặc mật khẩu không đúng. Vui lòng thử lại!"
//         );
//       } else {
//         alert("Không thể kết nối đến server. Hãy kiểm tra lại backend!");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };


//   //  Tạm thời chưa dùng Google Login
//   const handleGoogleLogin = () => {
//     alert("Tính năng đăng nhập Google sẽ được cập nhật sau 🚀");
//   };

//   return (
//     <div className={styles["login-gradient-background"]}>
//       <div className={styles["login-container"]}>
//         <form className={styles["login-form"]} onSubmit={handleLogin}>
//           <h2 className={styles["login-title"]}>Đăng nhập</h2>

//           <input
//             type="email"
//             className={styles["login-input"]}
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             className={styles["login-input"]}
//             placeholder="Mật khẩu"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button type="submit" className={styles["login-button"]}>
//             {loading ? "Đang xử lý..." : "Đăng nhập"}
//           </button>

//           <button
//             type="button"
//             className={styles["google-button"]}
//             onClick={handleGoogleLogin}
//           >
//             <FcGoogle className={styles["google-icon"]} />
//             Đăng nhập với Google
//           </button>

//           <div className={styles["login-footer"]}>
//             <span>Bạn chưa có tài khoản? </span>
//             <Link to="/register">Đăng ký ngay</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/LoginPage.module.css";
import { FcGoogle } from "react-icons/fc";
import axiosClient from "../service/axiosClient";
import { jwtDecode } from "jwt-decode";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// ✅ Cấu hình Firebase (thay bằng thông tin thật của bạn)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

//  Kiểu dữ liệu trả về từ API
interface LoginResponse {
  success: boolean;
  data: string; // token JWT trả về từ backend
  message: string;
}

//  Kiểu dữ liệu trong token
interface DecodedToken {
  userId: string;
  email: string;
  roles?: string[];
  role?: string;
  iat: number;
  exp: number;
}

//  Dịch vụ xác thực đăng nhập thường (API backend)
export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axiosClient.post<LoginResponse>("/users/login", {
      email,
      password,
    });
    return response.data;
  },
  logout: () => {
    localStorage.clear();
  },
};

//  Component LoginPage
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Đăng nhập thường qua backend
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.login(email, password);
      const token = res.data;

      const decoded = jwtDecode<DecodedToken>(token);
      const role = decoded.roles?.[0] || decoded.role || "user";
      const normalizedRole = role.trim().toLowerCase();
      const userName = decoded.email?.split("@")[0] || "Người dùng";
      const userId = decoded.userId; // ✅ Lấy userId từ token

      // ✅ Lưu userId + token
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", normalizedRole);
      localStorage.setItem("username", userName);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: decoded.userId,
          email: decoded.email,
          role: normalizedRole,
          userName,
        })
      );

      alert(`✅ Đăng nhập thành công! Xin chào ${userName}`);
      navigate(normalizedRole === "admin" ? "/admin/dashboard" : "/");
    } catch (error: any) {
      console.error("❌ Lỗi đăng nhập:", error);
      alert(
        error.response?.data?.message ||
          "Email hoặc mật khẩu không đúng hoặc server không phản hồi!"
      );
    } finally {
      setLoading(false);
    }
  };

  // Đăng nhập Google (Firebase)
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      // Lưu thông tin
      localStorage.setItem("token", idToken);
      localStorage.setItem("email", user.email || "");
      localStorage.setItem("username", user.displayName || "");

      alert(`✅ Đăng nhập Google thành công! Xin chào ${user.displayName || user.email}`);

      navigate("/");
    } catch (error) {
      console.error("❌ Lỗi đăng nhập Google:", error);
      alert("Đăng nhập Google thất bại. Vui lòng thử lại!");
    }
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
