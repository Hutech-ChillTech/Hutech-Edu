import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/UserMain.module.css";
import { courseService } from "../../service/course.service";
import { type Course } from "../../types/database.types";

const Main: React.FC = () => {
  const navigate = useNavigate();
  const [apiCourses, setApiCourses] = useState<Course[]>([]);
  const [popularCourses, setPopularCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ["Frontend", "Backend", "Data", "AI", "DevOps"];

  const handleViewCourse = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  // === 1. Lấy toàn bộ khóa học ===
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await courseService.getAllCourses();
        if (res) {
          setApiCourses(res);
        } else {
          setError("Không thể tải danh sách khóa học.");
        }
      } catch (err) {
        console.error(err);
        setError("Lỗi kết nối đến server.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // === 2. Lấy khóa học nổi bật (popular) ===
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await courseService.getPopularCourses(5);

        // Data từ service trả về đã là Course[]
        if (res) {
          setPopularCourses(res);
        }
      } catch (err) {
        console.error("Lỗi khi tải khóa học nổi bật:", err);
      }
    };
    fetchPopular();
  }, []);

  // === Dữ liệu bài viết (giữ nguyên) ===
  const posts = [
    {
      title: "Làm quen với Frontend: HTML, CSS, JS",
      date: "01/05/2025",
      desc: "Bài viết hướng dẫn cơ bản về HTML, CSS, JS.",
      img: "/images/1.jpg",
      link: "https://example.com/frontend",
    },
    {
      title: "Hành trình trở thành Backend Developer",
      date: "28/04/2025",
      desc: "Khám phá công nghệ backend như Node.js, ASP.NET Core.",
      img: "/images/1.jpg",
      link: "https://example.com/backend",
    },
  ];

  return (
    <div className={styles["blog-main"]}>
      {/* === HERO SECTION === */}
      <div className={styles["hero-section"]}>
        <img
          src="/images/SkillCoder_Logo.png"
          alt="SkillCoder Logo"
          className={styles["hero-logo"]}
        />
        <h1 className={styles["hero-title"]}>SkillCoder</h1>
        <p className={styles["hero-subtitle"]}>
          Cùng bạn định hướng tương lai lập trình!
        </p>
      </div>

      {/* === CATEGORY BUTTONS === */}
      <div className={styles["category-list"]}>
        {categories.map((cat, index) => (
          <button className={styles["category-btn"]} key={index}>
            {cat}
          </button>
        ))}
      </div>

      {/* === KHÓA HỌC NỔI BẬT (TỪ API) === */}
      <div className={`container ${styles["course-section"]}`}>
        <div className={styles["section-header"]}>
          <h2>Khóa học Nổi bật</h2>
          <Link to="/user/featured-courses" className={styles["view-more-btn"]}>
            Xem thêm →
          </Link>
        </div>

        {popularCourses.length === 0 ? (
          <p className="text-center text-muted">
            Chưa có khóa học nổi bật nào.
          </p>
        ) : (
          <div className={styles["course-grid"]}>
            {popularCourses.map((course) => (
              <div className={styles["course-card"]} key={course.courseId}>
                <img
                  src={
                    course.avatarURL
                      ? course.avatarURL
                      : "/images/default-course.jpg"
                  }
                  alt={course.courseName}
                  className={styles["course-img"]}
                />
                <div className={styles["course-info"]}>
                  <h5 className={styles["course-title"]}>
                    {course.courseName}
                  </h5>
                  <p className={styles["course-price"]}>
                    {course.coursePrice.toLocaleString("vi-VN")}đ
                  </p>
                  <p className={styles["course-level"]}>
                    Trình độ: {course.level}
                  </p>
                  <div className={styles["course-buttons"]}>
                    <button
                      className={styles["btn-view"]}
                      onClick={() => handleViewCourse(course.courseId)}
                    >
                      Xem
                    </button>
                    <button
                      className={styles["btn-buy"]}
                      onClick={() => handleViewCourse(course.courseId)}
                    >
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* === CÁC KHÓA HỌC KHÁC === */}
      <div className={`container ${styles["course-section"]}`}>
        <div className={styles["section-header"]}>
          <h2>Các khóa học tại SkillCoder</h2>
          <Link to="/all-courses" className={styles["view-more-btn"]}>
            Xem thêm →
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-muted">Đang tải dữ liệu...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : apiCourses.length === 0 ? (
          <p className="text-center text-muted">
            Hiện chưa có khóa học nào được đăng.
          </p>
        ) : (
          <div className={styles["course-grid"]}>
            {apiCourses.map((course) => (
              <div className={styles["course-card"]} key={course.courseId}>
                <img
                  src={
                    course.avatarURL
                      ? course.avatarURL
                      : "/images/default-course.jpg"
                  }
                  alt={course.courseName}
                  className={styles["course-img"]}
                />
                <div className={styles["course-info"]}>
                  <h5 className={styles["course-title"]}>
                    {course.courseName}
                  </h5>
                  <p className={styles["course-price"]}>
                    {course.coursePrice.toLocaleString("vi-VN")}đ
                  </p>
                  <p className={styles["course-level"]}>
                    Trình độ: {course.level}
                  </p>
                  <div className={styles["course-buttons"]}>
                    <button className={styles["btn-view"]}>Xem</button>
                    <button className={styles["btn-buy"]}>Mua ngay</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* === FEATURED POSTS === */}
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-5">Bài Viết Nổi Bật</h2>
        <div className="row justify-content-center">
          {posts.map((post, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className={`${styles["blog-card"]} d-flex shadow-sm`}>
                <img
                  src={post.img}
                  className={styles["blog-img"]}
                  alt={post.title}
                />
                <div
                  className={`${styles["blog-content"]} p-3 d-flex flex-column justify-content-between`}
                >
                  <div>
                    <h5 className="fw-bold">{post.title}</h5>
                    <div className="text-muted mb-2">
                      Ngày đăng: {post.date}
                    </div>
                    <p style={{ fontSize: "0.95rem" }}>{post.desc}</p>
                  </div>
                  <a
                    href={post.link}
                    className="btn btn-outline-primary btn-sm mt-2 align-self-start"
                  >
                    Đọc thêm
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;