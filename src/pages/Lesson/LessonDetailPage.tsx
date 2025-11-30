import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import LectureListComponent from "../../components/Lecture/LectureListComponent";
import LessonDescriptionComponent from "../../components/Lecture/LectureDescriptionComponent";
import CompilerComponent from "../../components/Compiler/CompilerComponent";
import VideoLessonPlayer from "../../components/video/videoLessonComponent";
import styles from "../../styles/LessonDetailPage.module.css";

// Import Types & Services
import { type Course, type Lesson, type TestCase } from '../../types/database.types';
import { courseService } from "../../service/course.service";
import { lessonService } from "../../service/lesson.service";

const PracticePage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();

    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [recommendedCourses, setRecommendedCourses] = useState<any[]>([]);

    const [currentLessonPos, setCurrentLessonPos] = useState({
        chapterIndex: 0,
        lessonIndex: 0,
    });

    const [code, setCode] = useState("");
    const [output, setOutput] = useState("Kết quả sẽ hiển thị ở đây");
    const [lessonTestCases, setLessonTestCases] = useState<TestCase[]>([]);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                if (!courseId) throw new Error("Lỗi không tìm thấy ID");
                const res = await courseService.getCourseByIdContent(courseId);
                if (res) setCourse(res);
            } catch (error) {
                console.error("Lỗi fetch khóa học: ", error);
            } finally {
                setLoading(false);
            }
        };
        if (courseId) fetchCourse();
    }, [courseId]);

    // Fetch recommended courses
    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId || !courseId) return;

                const res = await fetch(
                    `http://localhost:3001/api/learning-speed/recommendations/${userId}/${courseId}`
                );
                const data = await res.json();

                if (data.success && data.data.courses) {
                    setRecommendedCourses(data.data.courses);
                }
            } catch (error) {
                console.error("Lỗi fetch gợi ý khóa học:", error);
            }
        };

        if (courseId) fetchRecommendations();
    }, [courseId]);

    const activeLesson: Lesson | null = useMemo(() => {
        if (!course || !course.chapters) return null;
        const chapter = course.chapters[currentLessonPos.chapterIndex];
        if (!chapter || !chapter.lessons) return null;
        return chapter.lessons[currentLessonPos.lessonIndex] || null;
    }, [course, currentLessonPos]);

    useEffect(() => {
        const fetchTestCases = async () => {
            if (!activeLesson) {
                console.log("LessonDetailPage: No active lesson");
                return;
            }

            console.log("LessonDetailPage: Fetching test cases for lesson:", activeLesson.lessonId, activeLesson.lessonName);
            setLessonTestCases([]);

            try {
                const res = await lessonService.getTestCaseByLessonId(activeLesson.lessonId);
                console.log("LessonDetailPage: Test cases response:", res);

                if (res && res.length > 0) {
                    setLessonTestCases(res as any as TestCase[]);
                } else {
                    console.log("LessonDetailPage: No test cases found (empty array)");
                }
            } catch (error) {
                console.log("Bài học này không có test case hoặc lỗi API", error);
            }
        };

        fetchTestCases();
    }, [activeLesson]);

    useEffect(() => {
        if (activeLesson) {
            const defaultCode = (activeLesson as any).starterCode || "";
            setCode(defaultCode);
            setOutput("Kết quả sẽ hiển thị ở đây");
        }
    }, [activeLesson]);

    const isCodingLesson = useMemo(() => {
        // Ưu tiên: Nếu có test case -> Là bài coding
        if (lessonTestCases.length > 0) return true;
        return false;
    }, [lessonTestCases]);

    // Navigation functions
    const goToPreviousLesson = () => {
        if (!course?.chapters) return;

        if (currentLessonPos.lessonIndex > 0) {
            // Previous lesson in same chapter
            setCurrentLessonPos({
                ...currentLessonPos,
                lessonIndex: currentLessonPos.lessonIndex - 1
            });
        } else if (currentLessonPos.chapterIndex > 0) {
            // Last lesson of previous chapter
            const prevChapter = course.chapters[currentLessonPos.chapterIndex - 1];
            setCurrentLessonPos({
                chapterIndex: currentLessonPos.chapterIndex - 1,
                lessonIndex: (prevChapter.lessons?.length || 1) - 1
            });
        }
    };

    const goToNextLesson = () => {
        if (!course?.chapters) return;

        const currentChapter = course.chapters[currentLessonPos.chapterIndex];
        const totalLessons = currentChapter.lessons?.length || 0;

        if (currentLessonPos.lessonIndex < totalLessons - 1) {
            // Next lesson in same chapter
            setCurrentLessonPos({
                ...currentLessonPos,
                lessonIndex: currentLessonPos.lessonIndex + 1
            });
        } else if (currentLessonPos.chapterIndex < course.chapters.length - 1) {
            // First lesson of next chapter
            setCurrentLessonPos({
                chapterIndex: currentLessonPos.chapterIndex + 1,
                lessonIndex: 0
            });
        }
    };

    const isFirstLesson = currentLessonPos.chapterIndex === 0 && currentLessonPos.lessonIndex === 0;
    const isLastLesson = course?.chapters &&
        currentLessonPos.chapterIndex === course.chapters.length - 1 &&
        currentLessonPos.lessonIndex === (course.chapters[currentLessonPos.chapterIndex].lessons?.length || 1) - 1;

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p className={styles.loadingText}>Đang tải khóa học...</p>
            </div>
        );
    }

    if (!course) {
        return (
            <div className={styles.errorContainer}>
                <div className={styles.errorIcon}>⚠️</div>
                <h2 className={styles.errorText}>Không tìm thấy khóa học</h2>
                <p className={styles.errorSubtext}>Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ</p>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.mainContent}>
                {/* Floating Toggle Button (shows when collapsed) */}
                {sidebarCollapsed && (
                    <button
                        className={styles.floatingToggle}
                        onClick={() => setSidebarCollapsed(false)}
                        title="Mở menu"
                    >
                        ☰
                    </button>
                )}

                {/* Sidebar */}
                <div className={`${styles.sidebarWrapper} ${sidebarCollapsed ? styles.collapsed : ''}`}>
                    <LectureListComponent
                        chapters={course.chapters || []}
                        currentLesson={currentLessonPos}
                        onSelectLesson={(cIdx, lIdx) => {
                            setCurrentLessonPos({ chapterIndex: cIdx, lessonIndex: lIdx });
                        }}
                        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                        isCollapsed={sidebarCollapsed}
                    />
                </div>

                {/* Main Content Area */}
                <div className={styles.contentWrapper}>
                    {isCodingLesson ? (
                        <CompilerComponent
                            key={activeLesson?.lessonId}
                            code={code}
                            setCode={setCode}
                            output={output}
                            setOutput={setOutput}
                            testCases={lessonTestCases}
                        />
                    ) : (
                        <div className={styles.videoMainSection}>
                            {/* Video Player */}
                            <div className={styles.videoPlayerWrapper}>
                                {activeLesson?.videoUrl ? (
                                    <div className={styles.videoContainer}>
                                        <VideoLessonPlayer
                                            videoUrl={activeLesson.videoUrl}
                                            lessonTitle={activeLesson.lessonName}
                                            autoPlay={false}
                                        />
                                    </div>
                                ) : (
                                    <div className={styles.theoryPlaceholder}>
                                        <div className={styles.theoryIcon}>📚</div>
                                        <h4 className={styles.theoryTitle}>{activeLesson?.lessonName}</h4>
                                        <p className={styles.theoryText}>
                                            Bài học này là lý thuyết. Vui lòng xem nội dung chi tiết ở bên phải.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Lesson Info & Navigation */}
                            <div className={styles.lessonInfoSection}>
                                <div className={styles.lessonHeader}>
                                    <h2 className={styles.lessonTitle}>{activeLesson?.lessonName}</h2>
                                    <p className={styles.lessonMeta}>
                                        Chương {currentLessonPos.chapterIndex + 1} -
                                        Bài {currentLessonPos.lessonIndex + 1}
                                    </p>
                                </div>

                                {/* Navigation Buttons */}
                                <div className={styles.navigationButtons}>
                                    <button
                                        className={styles.navButton}
                                        onClick={goToPreviousLesson}
                                        disabled={isFirstLesson}
                                    >
                                        <span className={styles.navIcon}>←</span>
                                        <span>Bài trước</span>
                                    </button>
                                    <button
                                        className={styles.navButton}
                                        onClick={goToNextLesson}
                                        disabled={isLastLesson}
                                    >
                                        <span>Bài tiếp theo</span>
                                        <span className={styles.navIcon}>→</span>
                                    </button>
                                </div>

                                {/* Course Recommendations */}
                                <div className={styles.recommendationsSection}>
                                    <div className={styles.recommendHeader}>
                                        <h3 className={styles.recommendTitle}>Khóa học được gợi ý cho bạn</h3>
                                        <p className={styles.recommendSubtitle}>
                                            Dựa trên tốc độ học tập và trình độ hiện tại của bạn
                                        </p>
                                    </div>

                                    {recommendedCourses.length > 0 ? (
                                        <div className={styles.carouselWrapper}>
                                            <button
                                                className={`${styles.carouselButton} ${styles.prev}`}
                                                onClick={() => {
                                                    const container = document.getElementById('course-carousel');
                                                    if (container) container.scrollLeft -= 320;
                                                }}
                                            >
                                                ‹
                                            </button>

                                            <div className={styles.carouselContainer} id="course-carousel">
                                                {recommendedCourses.map((course: any) => (
                                                    <div key={course.courseId} className={styles.recommendCard}>
                                                        <div className={styles.recommendImage}>
                                                            <img
                                                                src={course.avatarURL || "/images/default-course.jpg"}
                                                                alt={course.courseName}
                                                            />
                                                            <div className={styles.levelBadge}>
                                                                {course.level}
                                                            </div>
                                                        </div>
                                                        <div className={styles.recommendInfo}>
                                                            <h4>{course.courseName}</h4>
                                                            <p>{course.courseDescription || "Khóa học chất lượng cao"}</p>
                                                            <div className={styles.coursePrice}>
                                                                {course.coursePrice?.toLocaleString('vi-VN')}đ
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <button
                                                className={`${styles.carouselButton} ${styles.next}`}
                                                onClick={() => {
                                                    const container = document.getElementById('course-carousel');
                                                    if (container) container.scrollLeft += 320;
                                                }}
                                            >
                                                ›
                                            </button>
                                        </div>
                                    ) : (
                                        <div className={styles.noRecommendations}>
                                            <p>Chưa có gợi ý khóa học. Hãy hoàn thành khóa học này để nhận gợi ý!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Description Panel */}
                    <div className={styles.descriptionPanel}>
                        <LessonDescriptionComponent
                            lesson={activeLesson}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PracticePage;