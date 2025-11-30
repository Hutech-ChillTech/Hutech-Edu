import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/User/Header";
import Footer from "../components/User/Footer";
import ChatBox from "../components/ChatBox/ChatBox";

const UserLayout: React.FC = () => {
  const location = useLocation();

  // Hide footer on lesson/practice pages
  const hideFooter = location.pathname.startsWith('/practice');

  return (
    <div className="user-wrapper">
      <Header />
      <main>
        <Outlet /> {/* Route con sẽ render ở đây */}
      </main>
      {!hideFooter && <Footer />}
      <ChatBox />
    </div>

  );
};

export default UserLayout;
