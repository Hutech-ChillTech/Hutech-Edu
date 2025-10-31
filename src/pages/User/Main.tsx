import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/UserMain.module.css";

interface Course {
  courseId: string;
  courseName: string;
  courseDescription: string;
  coursePrice: number;
  avatarURL: string | null;
  level: string;
}

const Main: React.FC = () => {
  const [apiCourses, setApiCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ["Frontend", "Backend", "Data", "AI", "DevOps"];

  // === Gọi API để lấy danh sách khóa học thật ===
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/courses");
        if (res.data.success) {
          setApiCourses(res.data.data);
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

  // === Mock data cho 2 phần đầu ===
  const courseSections = [
    {
      title: "Gợi ý khóa học theo lộ trình",
      link: "/user/featured-courses",
      courses: [
        {
          id: 1,
          title: "Lộ trình Frontend Developer",
          image: "/images/course1.jpg",
          price: "499.000đ",
        },
        {
          id: 2,
          title: "Lộ trình Backend Developer",
          image: "/images/course2.jpg",
          price: "599.000đ",
        },
        {
          id: 3,
          title: "Fullstack Web Developer",
          image: "/images/course3.jpg",
          price: "799.000đ",
        },
        {
          id: 4,
          title: "Cơ bản về AI & Machine Learning",
          image: "/images/course4.jpg",
          price: "699.000đ",
        },
        {
          id: 5,
          title: "DevOps cho người mới bắt đầu",
          image: "/images/course5.jpg",
          price: "499.000đ",
        },
      ],
    },
    {
      title: "Khóa học Nổi bật",
      link: "/user/featured-courses",
      courses: [
        {
          id: 6,
          title: "ReactJS từ cơ bản đến nâng cao",
          image: "/images/course6.jpg",
          price: "499.000đ",
        },
        {
          id: 7,
          title: "Node.js và Express thực chiến",
          image: "/images/course7.jpg",
          price: "599.000đ",
        },
        {
          id: 8,
          title: "C# và ASP.NET Core Web API",
          image: "/images/course8.jpg",
          price: "699.000đ",
        },
        {
          id: 9,
          title: "Python cho người mới bắt đầu",
          image: "/images/course9.jpg",
          price: "399.000đ",
        },
        {
          id: 10,
          title: "SQL & Database Design",
          image: "/images/course10.jpg",
          price: "499.000đ",
        },
      ],
    },
  ];

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

      {/* === 1. GỢI Ý KHÓA HỌC THEO LỘ TRÌNH === */}
      {courseSections.map((section, index) => (
        <div key={index} className={`container ${styles["course-section"]}`}>
          <div className={styles["section-header"]}>
            <h2>{section.title}</h2>
            <Link to={section.link} className={styles["view-more-btn"]}>
              Xem thêm →
            </Link>
          </div>

          <div className={styles["course-grid"]}>
            {section.courses.map((course) => (
              <div className={styles["course-card"]} key={course.id}>
                <img
                  src={course.image}
                  alt={course.title}
                  className={styles["course-img"]}
                />
                <div className={styles["course-info"]}>
                  <h5 className={styles["course-title"]}>{course.title}</h5>
                  <p className={styles["course-price"]}>{course.price}</p>
                  <div className={styles["course-buttons"]}>
                    <button className={styles["btn-view"]}>Xem</button>
                    <button className={styles["btn-buy"]}>Mua ngay</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* === 3. CÁC KHÓA HỌC THẬT TỪ API === */}
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
