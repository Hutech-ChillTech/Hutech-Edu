import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    DownOutlined,
    UpOutlined,
    ClockCircleOutlined,
    PlayCircleOutlined,
    BookOutlined,
    QuestionCircleOutlined,
    StarFilled,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { Rate, message } from "antd";
import styles from "../../styles/UserCourseDetail.module.css";
import { quizService } from "../../service/quiz.service";
import { commentService } from "../../service/comment.service";
import type { Comment, CourseRating } from "../../service/comment.service";

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
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
    const [chapterQuizzes, setChapterQuizzes] = useState<{ [key: string]: boolean }>({});

    // Comment states
    const [comments, setComments] = useState<Comment[]>([]);
    const [courseRating, setCourseRating] = useState<CourseRating | null>(null);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(0);
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState("");
    const [editRating, setEditRating] = useState(0);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourseDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/courses/${id}/content`);
                if (res.data.success) {
                    setCourse(res.data.data);

                    // Fetch quizzes for each chapter
                    const quizMap: { [key: string]: boolean } = {};
                    for (const chapter of res.data.data.chapters || []) {
                        try {
                            const quizzes = await quizService.getQuizzesByChapter(chapter.chapterId);
                            quizMap[chapter.chapterId] = quizzes && quizzes.length > 0;
                        } catch {
                            quizMap[chapter.chapterId] = false;
                        }
                    }
                    setChapterQuizzes(quizMap);
                }
            } catch (err) {
                console.error("Lỗi khi tải chi tiết khóa học:", err);
            } finally {
                setLoading(false);
            }
        };

        const fetchComments = async () => {
            if (!id) return;
            try {
                const [commentsData, ratingData] = await Promise.all([
                    commentService.getCommentsByCourse(id),
                    commentService.getCourseRating(id),
                ]);
                setComments(commentsData);
                setCourseRating(ratingData);
            } catch (err) {
                console.error("Lỗi khi tải bình luận:", err);
            }
        };

        const fetchCurrentUser = () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const payload = JSON.parse(atob(token.split(".")[1]));
                    setCurrentUserId(payload.userId);
                } catch {
                    setCurrentUserId(null);
                }
            }
        };

        if (id) {
            fetchCourseDetail();
            fetchComments();
            fetchCurrentUser();
        }
    }, [id]);

    const toggleChapter = (chapterId: string) => {
        setExpandedChapter((prev) => (prev === chapterId ? null : chapterId));
    };

    const handleTryLesson = () => {
        if (course?.courseId) {
            navigate(`/practice/${course.courseId}`);
        }
    };

    const handleBuyNow = () => {
        if (course?.courseId) {
            navigate(`/payment?courseId=${course.courseId}`);
        }
    };

    const handleSubmitComment = async () => {
        if (!newComment.trim()) {
            message.warning("Vui lòng nhập nội dung bình luận");
            return;
        }

        if (!id) return;

        try {
            await commentService.createComment({
                courseId: id,
                content: newComment,
                rating: newRating || undefined,
            });

            message.success("Đã gửi bình luận thành công!");
            setNewComment("");
            setNewRating(0);

            // Refresh comments
            const [commentsData, ratingData] = await Promise.all([
                commentService.getCommentsByCourse(id),
                commentService.getCourseRating(id),
            ]);
            setComments(commentsData);
            setCourseRating(ratingData);
        } catch (err: any) {
            message.error(err.response?.data?.message || "Không thể gửi bình luận");
        }
    };

    const handleEditComment = (comment: Comment) => {
        setEditingCommentId(comment.commentId);
        setEditContent(comment.content);
        setEditRating(comment.rating || 0);
    };

    const handleUpdateComment = async (commentId: string) => {
        if (!editContent.trim()) {
            message.warning("Vui lòng nhập nội dung bình luận");
            return;
        }

        try {
            await commentService.updateComment(commentId, {
                content: editContent,
                rating: editRating || undefined,
            });

            message.success("Đã cập nhật bình luận!");
            setEditingCommentId(null);

            // Refresh comments
            if (id) {
                const [commentsData, ratingData] = await Promise.all([
                    commentService.getCommentsByCourse(id),
                    commentService.getCourseRating(id),
                ]);
                setComments(commentsData);
                setCourseRating(ratingData);
            }
        } catch (err: any) {
            message.error(err.response?.data?.message || "Không thể cập nhật bình luận");
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        try {
            await commentService.deleteComment(commentId);
            message.success("Đã xóa bình luận!");

            // Refresh comments
            if (id) {
                const [commentsData, ratingData] = await Promise.all([
                    commentService.getCommentsByCourse(id),
                    commentService.getCourseRating(id),
                ]);
                setComments(commentsData);
                setCourseRating(ratingData);
            }
        } catch (err: any) {
            message.error(err.response?.data?.message || "Không thể xóa bình luận");
        }
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
                            <div>
                                <BookOutlined /> {course.chapters?.length || 0} chương
                            </div>
                            <div>
                                <PlayCircleOutlined /> {totalLessons} bài học
                            </div>
                            {courseRating && (
                                <div>
                                    <StarFilled style={{ color: "#fadb14" }} />{" "}
                                    {courseRating.averageRating.toFixed(1)} ({courseRating.totalComments} đánh giá)
                                </div>
                            )}
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
                            <button className={styles.tryButton} onClick={handleTryLesson}>
                                Học thử
                            </button>
                            <button className={styles.buyButton} onClick={handleBuyNow}>
                                Mua ngay
                            </button>
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
                    course.chapters.map((chapter, index) => {
                        const hasQuiz = chapterQuizzes[chapter.chapterId];
                        const totalItems = chapter.totalLesson + (hasQuiz ? 1 : 0);

                        return (
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
                                        <span>{totalItems} bài học</span>
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
                                        ) : null}

                                        {hasQuiz && (
                                            <div className={`${styles.lessonItem} ${styles.quizItem}`}>
                                                <div className={styles.lessonLeft}>
                                                    <QuestionCircleOutlined />
                                                    <span>Bài trắc nghiệm</span>
                                                </div>
                                                <div className={styles.lessonRight}>
                                                    <span className={styles.quizBadge}>Quiz</span>
                                                </div>
                                            </div>
                                        )}

                                        {!chapter.lessons?.length && !hasQuiz && (
                                            <div className={styles.noLesson}>
                                                Chương này đang được cập nhật bài học
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className={styles.noChapter}>
                        <BookOutlined /> Hiện chưa có chương trình học.
                    </div>
                )}
            </div>

            {/* Comments Section */}
            <div className={styles.commentSection}>
                <h2 className={styles.sectionTitle}>
                    Bình luận khóa học
                    {courseRating && (
                        <span className={styles.ratingBadge}>
                            <StarFilled /> {courseRating.averageRating.toFixed(1)} / 5.0
                        </span>
                    )}
                </h2>

                {/* New Comment Form */}
                <div className={styles.commentForm}>
                    <div className={styles.ratingInput}>
                        <span>Đánh giá của bạn:</span>
                        <Rate value={newRating} onChange={setNewRating} />
                    </div>

                    <textarea
                        placeholder="Chia sẻ suy nghĩ của bạn về khóa học này..."
                        className={styles.commentBox}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />

                    <button className={styles.commentButton} onClick={handleSubmitComment}>
                        Gửi bình luận
                    </button>
                </div>

                {/* Comments List */}
                <div className={styles.commentsList}>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.commentId} className={styles.commentItem}>
                                <div className={styles.commentHeader}>
                                    <div className={styles.commentUser}>
                                        <img
                                            src={comment.user.avatarURL || "/images/default-avatar.png"}
                                            alt={comment.user.userName}
                                            className={styles.userAvatar}
                                        />
                                        <div>
                                            <div className={styles.userName}>{comment.user.userName}</div>
                                            <div className={styles.commentDate}>
                                                {new Date(comment.createdAt).toLocaleDateString("vi-VN")}
                                            </div>
                                        </div>
                                    </div>

                                    {currentUserId === comment.userId && (
                                        <div className={styles.commentActions}>
                                            <button onClick={() => handleEditComment(comment)}>
                                                <EditOutlined /> Sửa
                                            </button>
                                            <button onClick={() => handleDeleteComment(comment.commentId)}>
                                                <DeleteOutlined /> Xóa
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {comment.rating && (
                                    <div className={styles.commentRating}>
                                        <Rate disabled value={comment.rating} />
                                    </div>
                                )}

                                {editingCommentId === comment.commentId ? (
                                    <div className={styles.editForm}>
                                        <Rate value={editRating} onChange={setEditRating} />
                                        <textarea
                                            className={styles.commentBox}
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                        />
                                        <div className={styles.editActions}>
                                            <button
                                                className={styles.saveButton}
                                                onClick={() => handleUpdateComment(comment.commentId)}
                                            >
                                                Lưu
                                            </button>
                                            <button
                                                className={styles.cancelButton}
                                                onClick={() => setEditingCommentId(null)}
                                            >
                                                Hủy
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className={styles.commentContent}>{comment.content}</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className={styles.noComment}>
                            Chưa có bình luận nào. Hãy là người đầu tiên!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;
