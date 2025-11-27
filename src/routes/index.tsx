import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";

// Pages
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/Admin/DashboardPage";
import AdminUser from "../pages/Admin/UserAdmin";
import CourseAdmin from "../pages/Admin/CourseAdmin";
import ChapterList from "../pages/Admin/ChapterList";
import UserMain from "../pages/User/Main";
import PracticePage from "../pages/Lesson/LessonDetailPage";
import NotFountPage from "../pages/Error/NotFoundPage";
import FeaturedCourses from "../pages/User/FeaturedCourses";
import AllCourses from "../pages/User/AllCourses";
import UserProfile from "../pages/User/UserProfile";
import CourseDetailPage from "../pages/User/CourseDetailPage";
import LessonList from "../pages/Admin/LessonList";
import LessonVideoPage from "../pages/User/LessonVideoPage";
import LearningPathMap from "../pages/LearningPathMap/LearningPathMap";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="users" element={<AdminUser />} />
          <Route path="course" element={<CourseAdmin />} />
          <Route path="chapters/:courseId" element={<ChapterList />} />
          <Route path="lessons/:chapterId" element={<LessonList />} />
        </Route>

        {/* User routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<UserMain />} />
          <Route path="practice/:courseId" element={<PracticePage />} />
          <Route path="featured-courses" element={<FeaturedCourses></FeaturedCourses>}></Route>
          <Route path="all-courses" element={<AllCourses></AllCourses>}></Route>
          <Route path="profile" element={<UserProfile />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route path="/course/:courseId/lesson-video/:lessonId" element={<LessonVideoPage />} />
          <Route path="/lesson-video" element={<LessonVideoPage />} /> {/* test lesson-video page*/}
          <Route path="/LearningPathMap" element={<LearningPathMap/>} />
          
        </Route>


        {/* Thông báo lỗi 404 khi người dùng truy cấp vào route không tồn tại */}
        <Route path="*" element={<NotFountPage></NotFountPage>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
