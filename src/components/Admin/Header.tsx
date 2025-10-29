import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import styles from "../../styles/AdminStyle.module.css";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [username, setUsername] = useState<string>("");

  // Khi component load, lấy tên người dùng từ localStorage (hoặc sessionStorage)
  useEffect(() => {
    const storedName =
      localStorage.getItem("username") || sessionStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-light border-bottom px-4 ${
        styles["admin-header"] || ""
      }`}
    >
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

          <div className="dropdown d-flex align-items-center">
            {/* Hiển thị tên người dùng bên cạnh icon */}
            <span className="me-2 fw-bold text-primary">
              {username ? username : "Người dùng"}
            </span>

            <button
              className="btn btn-outline-primary dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <FaUser />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => {
                    localStorage.removeItem("username");
                    sessionStorage.removeItem("username");
                    window.location.reload(); // hoặc điều hướng về trang đăng nhập
                  }}
                >
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
