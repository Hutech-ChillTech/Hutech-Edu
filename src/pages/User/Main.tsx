import React from "react";
import "../../styles/UserMain.css";

interface Course {
  id: number;
  title: string;
  image: string;
  price: string;
}

const Main: React.FC = () => {
  const categories = ["Frontend", "Backend", "Data", "AI", "DevOps"];
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

  const courseSections = [
    {
      title: "Gợi ý khóa học theo lộ trình",
      courses: [
        { id: 1, title: "Lộ trình Frontend Developer", image: "/images/course1.jpg", price: "499.000đ" },
        { id: 2, title: "Lộ trình Backend Developer", image: "/images/course2.jpg", price: "599.000đ" },
        { id: 3, title: "Fullstack Web Developer", image: "/images/course3.jpg", price: "799.000đ" },
        { id: 4, title: "Cơ bản về AI & Machine Learning", image: "/images/course4.jpg", price: "699.000đ" },
        { id: 5, title: "DevOps cho người mới bắt đầu", image: "/images/course5.jpg", price: "499.000đ" },
      ],
    },
    {
      title: "Khóa học Nổi bật",
      courses: [
        { id: 6, title: "ReactJS từ cơ bản đến nâng cao", image: "/images/course6.jpg", price: "499.000đ" },
        { id: 7, title: "Node.js và Express thực chiến", image: "/images/course7.jpg", price: "599.000đ" },
        { id: 8, title: "C# và ASP.NET Core Web API", image: "/images/course8.jpg", price: "699.000đ" },
        { id: 9, title: "Python cho người mới bắt đầu", image: "/images/course9.jpg", price: "399.000đ" },
        { id: 10, title: "SQL & Database Design", image: "/images/course10.jpg", price: "499.000đ" },
      ],
    },
    {
      title: "Các khóa học tại SkillCoder",
      courses: [
        { id: 11, title: "Java căn bản", image: "/images/course11.jpg", price: "399.000đ" },
        { id: 12, title: "HTML, CSS & JavaScript Pro", image: "/images/course12.jpg", price: "499.000đ" },
        { id: 13, title: "Phân tích dữ liệu với Python", image: "/images/course13.jpg", price: "599.000đ" },
        { id: 14, title: "Thiết kế UI/UX cho người mới", image: "/images/course14.jpg", price: "449.000đ" },
        { id: 15, title: "Spring Boot và Microservices", image: "/images/course15.jpg", price: "799.000đ" },
      ],
    },
  ];

  return (
    <div className="blog-main">
      {/* === HERO SECTION === */}
      <div className="hero-section text-center">
        <img
          src="/images/SkillCoder_Logo.png"
          alt="SkillCoder Logo"
          className="hero-logo"
        />
        <h1 className="hero-title">SkillCoder</h1>
        <p className="hero-subtitle">Cùng bạn định hướng tương lai lập trình!</p>
      </div>

      {/* === CATEGORY BUTTONS === */}
      <div className="category-list">
        {categories.map((cat, index) => (
          <button className="category-btn" key={index}>
            {cat}
          </button>
        ))}
      </div>

        {/* COURSE SECTIONS */}
      {courseSections.map((section, index) => (
        <div key={index} className="course-section container">
          <div className="section-header">
            <h2>{section.title}</h2>
            <button className="view-more-btn">Xem thêm →</button>
          </div>

          <div className="course-grid">
            {section.courses.map((course) => (
              <div className="course-card" key={course.id}>
                <img src={course.image} alt={course.title} className="course-img" />
                <div className="course-info">
                  <h5 className="course-title">{course.title}</h5>
                  <p className="course-price">{course.price}</p>
                  <div className="course-buttons">
                    <button className="btn-view">Xem</button>
                    <button className="btn-buy">Mua ngay</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* === FEATURED POSTS === */}
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-5">Bài Viết Nổi Bật</h2>
        <div className="row justify-content-center">
          {posts.map((post, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="blog-card d-flex shadow-sm">
                <img src={post.img} className="blog-img" alt={post.title} />
                <div className="blog-content p-3 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="fw-bold">{post.title}</h5>
                    <div className="text-muted mb-2">Ngày đăng: {post.date}</div>
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
