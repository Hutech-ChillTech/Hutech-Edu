import React from "react";
import styles from "../../styles/UserCoursePage.module.css";

const FeaturedCourses: React.FC = () => {
  const courses = [
    { id: 6, title: "ReactJS từ cơ bản đến nâng cao", image: "/images/course6.jpg", price: "499.000đ" },
    { id: 7, title: "Node.js và Express thực chiến", image: "/images/course7.jpg", price: "599.000đ" },
    { id: 8, title: "C# và ASP.NET Core Web API", image: "/images/course8.jpg", price: "699.000đ" },
    { id: 9, title: "Python cho người mới bắt đầu", image: "/images/course9.jpg", price: "399.000đ" },
    { id: 10, title: "SQL & Database Design", image: "/images/course10.jpg", price: "499.000đ" },
  ];

  return (
    <div className={styles["blog-main"]}>
      <div className={`container ${styles["course-section"]}`}>
        <div className={styles["section-header"]}>
          <h2>KHÓA HỌC NỔI BẬT</h2>
        </div>

        <div className={styles["course-grid"]}>
          {courses.map((course) => (
            <div className={styles["course-card"]} key={course.id}>
              <img src={course.image} alt={course.title} className={styles["course-img"]} />
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
    </div>
  );
};

export default FeaturedCourses;
