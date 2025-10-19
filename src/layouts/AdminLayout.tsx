import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
import Header from "../components/Admin/Header";

const AdminLayout: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="d-flex" id="wrapper">
      {sidebarVisible && <Sidebar />}
      <div id="page-content-wrapper" className="flex-grow-1">
        <Header onToggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
        <div className="container-fluid mt-4">
          <Outlet /> {/* Route con sẽ render ở đây */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
