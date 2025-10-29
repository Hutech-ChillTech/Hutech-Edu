import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/UserHeader.module.css";
import { FaUserCircle } from "react-icons/fa";

const UserHeader: React.FC = () => {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${styles["custom-navbar"]} px-4`}>
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
              <Link className={`nav-link ${styles["nav-link"]}`} to="/user">
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles["nav-link"]}`} to="/user/all-courses">
                Khóa học
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles["nav-link"]}`} to="/user/about">
                Giới thiệu
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles["nav-link"]}`} to="/user/contact">
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
                  className="btn btn-outline-light rounded-pill d-flex align-items-center dropdown-toggle "
                  data-bs-toggle="dropdown"
                  style={{ borderColor: "white" }}
                >
                  <FaUserCircle className="me-2" />
                  {user.name || user.email}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/user/profile">
                      Hồ sơ
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
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
