import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser } from "react-icons/fa";
import "../../styles/AdminStyle.css";

const Header: React.FC<{ onToggleSidebar: () => void }> = ({ onToggleSidebar }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom px-4">
      <div className="container-fluid">
        <button className="btn btn-primary" onClick={onToggleSidebar}>☰</button>
        <div className="ms-auto d-flex align-items-center">
          <input type="text" className="form-control me-3" placeholder="Tìm kiếm..." />
          <div className="dropdown">
            <button
              className="btn btn-outline-primary dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <FaUser />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item" href="#">Đăng Xuất</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
