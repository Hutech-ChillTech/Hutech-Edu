import React from "react";
import styles from "../../styles/UserCoursePage.module.css";

const AllCourses: React.FC = () => {
  const courses = [
    { id: 11, title: "Java căn bản", image: "/images/course11.jpg", price: "399.000đ" },
    { id: 12, title: "HTML, CSS & JavaScript Pro", image: "/images/course12.jpg", price: "499.000đ" },
    { id: 13, title: "Phân tích dữ liệu với Python", image: "/images/course13.jpg", price: "599.000đ" },
    { id: 14, title: "Thiết kế UI/UX cho người mới", image: "/images/course14.jpg", price: "449.000đ" },
    { id: 15, title: "Spring Boot và Microservices", image: "/images/course15.jpg", price: "799.000đ" },
  ];

  return (
    <div className={styles["blog-main"]}>
      <div className={`container ${styles["course-section"]}`}>
        <div className={styles["section-header"]}>
          <h2>DANH SÁCH CÁC KHÓA HỌC</h2>
        </div>

        <div className={styles["course-grid"]}>
          {courses.map((course) => (
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
    </div>
  );
};

export default AllCourses;
