import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/User/Header";
import Footer from "../components/User/Footer";

const UserLayout: React.FC = () => {
  return (
    <div className="user-wrapper">
      <Header />
      <main>
        <Outlet /> {/* Route con sẽ render ở đây */}
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
