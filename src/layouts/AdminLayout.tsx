import React, { useState } from "react";
import Sidebar from "../components/Admin/Sidebar";
import Header from "../components/Admin/Header";
import "../styles/AdminStyle.css";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="d-flex" id="wrapper">
      {sidebarVisible && <Sidebar />}
      <div id="page-content-wrapper" className="flex-grow-1">
        <Header onToggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
        <div className="container-fluid mt-4">{children}</div>
      </div>
    </div>
    
  );
};

export default AdminLayout;

