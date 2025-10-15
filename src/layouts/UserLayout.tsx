import React from "react";
import Header from "../components/User/Header";
import Footer from "../components/User/Footer";

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="user-wrapper">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default UserLayout;
