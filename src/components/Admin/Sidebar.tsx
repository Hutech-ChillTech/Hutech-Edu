import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/AdminStyle.css";

const Sidebar: React.FC = () => {
  return (
    <div className="border-end bg-white" id="sidebar-wrapper">
      <div className="sidebar-heading text-center p-3">
        <img 
          src="../../../public/images/SkillCoder_Logo.png" 
          alt="Logo" 
          style={{ width: 40, height: 40, objectFit: "contain" }} 
        />
      </div>
      <div className="list-group list-group-flush">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${isActive ? "active" : ""}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/course"
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${isActive ? "active" : ""}`
          }
        >
          Khóa học
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${isActive ? "active" : ""}`
          }
        >
          Học viên
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
