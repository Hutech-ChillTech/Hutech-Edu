import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/UserHeader.module.css";
import { FaUserCircle } from "react-icons/fa";
import {jwtDecode} from "jwt-decode";

// 🧩 Kiểu dữ liệu payload trong JWT
interface JWTPayload {
  userId: string;
  email: string;
  userName: string;
  exp?: number;
}

// 🧱 Component
const UserHeader: React.FC = () => {
  const [user, setUser] = useState<{ email?: string; userId?: string } | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // ✅ Giải mã token
        const decoded = jwtDecode<JWTPayload>(token);

        // ✅ Kiểm tra hạn token
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          console.warn("Token đã hết hạn. Đang đăng xuất...");
          handleLogout();
        } else {
          setUser({ email: decoded.email, userId: decoded.userId, userName: decoded.userName });
        }
      } catch (err) {
        console.error("Token không hợp lệ:", err);
        handleLogout();
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark ${styles["custom-navbar"]} px-4`}
    >
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/images/SkillCoder_Logo.png"
            alt="SkillCoder"
            className={`${styles["logo-img"]} me-2`}
          />
          <span className="fw-bold">SkillCoder</span>
        </Link>

        {/* Toggle cho mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className={`nav-link ${styles["nav-link"]}`} to="/">
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${styles["nav-link"]}`}
                to="/all-courses"
              >
                Khóa học
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${styles["nav-link"]}`}
                to="/about"
              >
                Giới thiệu
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${styles["nav-link"]}`}
                to="/contact"
              >
                Liên hệ
              </Link>
            </li>

            {/* Nếu chưa đăng nhập → Hiển thị nút Đăng nhập / Đăng ký */}
            {!user ? (
              <>
                <li className="nav-item ms-3">
                  <Link
                    to="/login"
                    className="btn btn-outline-light rounded-pill px-3"
                    style={{ borderColor: "white" }}
                  >
                    Đăng nhập
                  </Link>
                </li>
                <li className="nav-item ms-2">
                  <Link
                    to="/register"
                    className="btn btn-outline-light rounded-pill px-3"
                    style={{ borderColor: "white" }}
                  >
                    Đăng ký
                  </Link>
                </li>
              </>
            ) : (
              /* Nếu đã đăng nhập → Hiển thị tên người dùng + menu */
              <li className="nav-item dropdown ms-3">
                <button
                  className="btn btn-outline-light rounded-pill d-flex align-items-center dropdown-toggle"
                  data-bs-toggle="dropdown"
                  style={{ borderColor: "white" }}
                >
                  <FaUserCircle className="me-2" />
                  {user.userName || user.email}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/user/profile">
                      Hồ sơ
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default UserHeader;
