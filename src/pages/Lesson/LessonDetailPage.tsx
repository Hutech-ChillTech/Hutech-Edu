import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import LectureListComponent from "../../components/Lecture/LectureListComponent";
import LessonDescriptionComponent from "../../components/Lecture/LectureDescriptionComponent";
import CompilerComponent from "../../components/Compiler/CompilerComponent";
import VideoLessonPlayer from "../../components/video/videoLessonComponent";

// Import Types & Services
import { type Course, type Lesson, type TestCase } from '../../types/database.types';
import { courseService } from "../../service/course.service";
import { lessonService } from "../../service/lesson.service";

const PracticePage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();

    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

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

    const isCodingLesson = useMemo(() => {
        if (activeLesson?.lessonType === 'testcode') return true;
        if (lessonTestCases.length > 0) return true;
        return false;
    }, [activeLesson, lessonTestCases]);

    // --- NEW: Fetch full lesson details (including content) ---
    const [fullActiveLesson, setFullActiveLesson] = useState<Lesson | null>(null);

    useEffect(() => {
        const fetchFullLesson = async () => {
            if (!activeLesson) {
                setFullActiveLesson(null);
                return;
            }
            try {
                // Call the new service method to get full details
                const res = await lessonService.getLessonById(activeLesson.lessonId);
                setFullActiveLesson(res);
            } catch (error) {
                console.error("Error fetching full lesson details:", error);
                // Fallback to the partial lesson data if fetch fails
                setFullActiveLesson(activeLesson);
            }
        };
        fetchFullLesson();
    }, [activeLesson]);
    // --------------------------------------------------------

    if (loading) return <div>Loading...</div>;
    if (!course) return <div>Course not found</div>;

    return (
        <div className="container-fluid p-0" style={{ height: '100vh' }}>
            <div className="row gx-0 h-100">

                <LectureListComponent
                    chapters={course.chapters || []}
                    currentLesson={currentLessonPos}
                    onSelectLesson={(cIdx, lIdx) => {
                        setCurrentLessonPos({ chapterIndex: cIdx, lessonIndex: lIdx });
                    }}
                />

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
                    <div className="col-12 col-md-6 p-3 h-100 bg-dark d-flex flex-column justify-content-center">
                        {activeLesson?.videoUrl ? (
                            <VideoLessonPlayer
                                videoUrl={activeLesson.videoUrl}
                                lessonTitle={activeLesson.lessonName}
                                autoPlay={false}
                            />
                        ) : (
                            <div className="text-white text-center">
                                <h4>{activeLesson?.lessonName}</h4>
                                <p>Bài học này là lý thuyết (Không có video & bài tập).</p>
                            </div>
                        )}
                    </div>
                )}

                <div className="col-md-4 h-100 p-0" style={{ overflowY: 'auto' }}>
                    <LessonDescriptionComponent
                        key={fullActiveLesson?.lessonId || activeLesson?.lessonId}
                        lesson={fullActiveLesson || activeLesson}
                    />
                </div>
            </div>
        </div >
    );
};

export default PracticePage;