import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  DownOutlined,
  UpOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
  BookOutlined,
} from "@ant-design/icons";
import styles from "../../styles/UserCourseDetail.module.css"; // 👈 import CSS Module

interface Lesson {
  lessonId: string;
  lessonName: string;
  lessonDuration?: string;
  previewURL?: string;
}

interface Chapter {
  chapterId: string;
  chapterName: string;
  totalLesson: number;
  lessons: Lesson[];
}

interface Course {
  courseId: string;
  courseName: string;
  courseDescription: string;
  coursePrice: number;
  discount?: number | null;
  avatarURL: string | null;
  level: string;
  chapters: Chapter[];
}

const CourseDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  const handleCourse = (courseId: string) => {
      navigate(`/practice/${courseId}`);
  }

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/courses/${id}/content`, {
          method: "GET",
          headers: getAuthHeaders(),
        });
        if (res.data.success) setCourse(res.data.data);

      } catch (err) {
        console.error("Lỗi khi tải chi tiết khóa học:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCourseDetail();
  }, [id]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapter(prev => (prev === chapterId ? null : chapterId));
  };

  if (loading)
    return <div className={styles.loading}>Đang tải dữ liệu khóa học...</div>;

  if (!course)
    return <div className={styles.notFound}>Không tìm thấy khóa học.</div>;

  const totalLessons =
    course.chapters?.reduce((acc, ch) => acc + (ch.totalLesson || 0), 0) || 0;

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.courseImageWrapper}>
            <img
              src={course.avatarURL || "/images/default-course.jpg"}
              alt={course.courseName}
              className={styles.courseImage}
            />
          </div>

          <div className={styles.courseInfo}>
            <div className={styles.levelBadge}>{course.level}</div>

            <h1 className={styles.courseTitle}>{course.courseName}</h1>
            <p className={styles.courseDescription}>{course.courseDescription}</p>

            <div className={styles.courseStats}>
              <div><BookOutlined /> {course.chapters?.length || 0} chương</div>
              <div><PlayCircleOutlined /> {totalLessons} bài học</div>
            </div>

            <div className={styles.priceBlock}>
              <div className={styles.coursePrice}>
                {course.coursePrice.toLocaleString("vi-VN")}đ
              </div>
              {course.discount && (
                <div className={styles.discount}>Giảm {course.discount}%</div>
              )}
            </div>

            <div className={styles.buttonGroup}>
              <button className={styles.tryButton} onClick={() => handleCourse(course.courseId)}>Học thử</button>
              <button className={styles.buyButton}>Mua ngay</button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content Section */}
      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Nội dung khóa học</h2>
        <p className={styles.sectionDesc}>
          {course.courseDescription || "Khóa học này đang được cập nhật nội dung."}
        </p>
      </div>

      {/* Chapters Section */}
      <div className={styles.chaptersSection}>
        <h2 className={styles.sectionTitle}>Chương trình học</h2>

        {course.chapters && course.chapters.length > 0 ? (
          course.chapters.map((chapter, index) => (
            <div key={chapter.chapterId} className={styles.chapterCard}>
              <div
                className={styles.chapterHeader}
                onClick={() => toggleChapter(chapter.chapterId)}
              >
                <div className={styles.chapterHeaderLeft}>
                  <div className={styles.chapterNumber}>{index + 1}</div>
                  <h4 className={styles.chapterTitle}>{chapter.chapterName}</h4>
                </div>

                <div className={styles.chapterHeaderRight}>
                  <span>{chapter.totalLesson} bài học</span>
                  {expandedChapter === chapter.chapterId ? (
                    <UpOutlined className={styles.icon} />
                  ) : (
                    <DownOutlined className={styles.icon} />
                  )}
                </div>
              </div>

              {expandedChapter === chapter.chapterId && (
                <div className={styles.lessonList}>
                  {chapter.lessons && chapter.lessons.length > 0 ? (
                    chapter.lessons.map((lesson) => (
                      <div key={lesson.lessonId} className={styles.lessonItem}>
                        <div className={styles.lessonLeft}>
                          <PlayCircleOutlined />
                          <span>{lesson.lessonName}</span>
                        </div>
                        <div className={styles.lessonRight}>
                          {lesson.lessonDuration && (
                            <span className={styles.duration}>
                              <ClockCircleOutlined /> {lesson.lessonDuration}
                            </span>
                          )}
                          {lesson.previewURL && (
                            <a
                              href={lesson.previewURL}
                              className={styles.previewButton}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Xem trước
                            </a>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.noLesson}>
                      Chương này đang được cập nhật bài học
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className={styles.noChapter}>
            <BookOutlined /> Hiện chưa có chương trình học.
          </div>
        )}
      </div>

      {/* Comments Section */}
      <div className={styles.commentSection}>
        <h2 className={styles.sectionTitle}>Bình luận khóa học</h2>

        <textarea
          placeholder="Chia sẻ suy nghĩ của bạn về khóa học này..."
          className={styles.commentBox}
        ></textarea>

        <button className={styles.commentButton}>Gửi bình luận</button>

        <div className={styles.noComment}>
          Chưa có bình luận nào. Hãy là người đầu tiên!
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
