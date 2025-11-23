import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import styles from "../../styles/AdminStyle.module.css";
import { jwtDecode } from "jwt-decode";

interface HeaderProps {
  onToggleSidebar: () => void;
}

interface DecodedToken {
  userId: string;
  email: string;
  name?: string;
  role?: string;
  exp?: number;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [userInfo, setUserInfo] = useState<{ name?: string; email?: string }>({
    name: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUserInfo({
          name: decoded.name,
          email: decoded.email,
        });
      } catch (error) {
        console.error("Lỗi khi giải mã token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login"; // điều hướng về trang đăng nhập
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-light border-bottom px-4 ${
        styles["admin-header"] || ""
      }`}
    >
      <div className="container-fluid">
        {/* Nút toggle sidebar */}
        <button className="btn btn-primary" onClick={onToggleSidebar}>
          ☰
        </button>

        {/* Bên phải: thanh tìm kiếm + dropdown người dùng */}
        <div className="ms-auto d-flex align-items-center">
          <input
            type="text"
            className="form-control me-3"
            placeholder="Tìm kiếm..."
          />

          <div className="dropdown d-flex align-items-center">
            {/* Hiển thị tên hoặc email người dùng */}
            <span className="me-2 fw-bold text-primary">
              {userInfo.name || userInfo.email || "Admin"}
            </span>

            <button
              className="btn btn-outline-primary dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <FaUser />
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  Đăng Xuất
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
