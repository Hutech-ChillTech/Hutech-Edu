import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/Admin/DashboardPage";
import AdminUser from "../pages/Admin/UserAdmin";
import CourseAdmin from "../pages/Admin/CourseAdmin";
import ChapterList from "../pages/Admin/ChapterList";
import UserLayout from "../layouts/UserLayout";
import UserMain from "../pages/User/Main";


const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Admin */}
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/users" element={<AdminLayout><AdminUser /></AdminLayout>}/>
        <Route path="/admin/course" element={<AdminLayout><CourseAdmin /> </AdminLayout>}/>
        <Route path="/admin/chapters/:courseId" element={<AdminLayout><ChapterList/></AdminLayout>}/>

        {/* User */}
        <Route path="/user/" element={<UserLayout><UserMain/></UserLayout>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;