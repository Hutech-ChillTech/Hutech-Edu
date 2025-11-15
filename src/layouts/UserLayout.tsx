import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/User/Header";
import Footer from "../components/User/Footer";
import ChatBox from "../components/ChatBox/ChatBox";

const UserLayout: React.FC = () => {
  return (
    <div className="user-wrapper">
      <Header />
      <main>
        <Outlet /> {/* Route con sẽ render ở đây */}
      </main>
      <Footer />
      <ChatBox />
    </div>
    
  );
};

export default UserLayout;
