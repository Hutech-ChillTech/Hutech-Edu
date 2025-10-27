import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/UserHeader.module.css";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = () => {
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
          <ul className="navbar-nav ms-auto">
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
