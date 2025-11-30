import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../styles/AdminStyle.module.css";

const Sidebar: React.FC = () => {
  return (
    <div className={`border-end bg-white ${styles["sidebar-wrapper"]}`} id={styles["sidebar-wrapper"]}>
      <div className={`text-center p-3 ${styles["sidebar-heading"]}`}>
        <img
          src="/images/SkillCoder_Logo.png"
          alt="Logo"
          style={{ width: 40, height: 40, objectFit: "contain" }}
        />
      </div>

      <div className="list-group list-group-flush">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${isActive ? styles["active"] : ""}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/course"
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${isActive ? styles["active"] : ""}`
          }
        >
          Khóa học
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${isActive ? styles["active"] : ""}`
          }
        >
          Học viên
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
