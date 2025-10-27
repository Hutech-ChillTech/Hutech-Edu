import React from "react";
import { FaUser } from "react-icons/fa";
import styles from "../../styles/AdminStyle.module.css";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light border-bottom px-4 ${styles["admin-header"] || ""}`}>
      <div className="container-fluid">
        <button className="btn btn-primary" onClick={onToggleSidebar}>
          ☰
        </button>

        <div className="ms-auto d-flex align-items-center">
          <input
            type="text"
            className="form-control me-3"
            placeholder="Tìm kiếm..."
          />

          <div className="dropdown">
            <button
              className="btn btn-outline-primary dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <FaUser />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#">
                  Đăng Xuất
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
