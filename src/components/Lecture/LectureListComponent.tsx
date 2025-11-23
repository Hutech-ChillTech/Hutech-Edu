import React, { useState, useEffect } from "react";

interface Lesson {
    lessonId: string;
    lessonName: string;
}

interface Chapter {
    chapterId: string;
    chapterName: string;
    lessons: Lesson[];
}

interface LectureListProps {
    chapters: Chapter[];    
    currentLesson: {
        chapterIndex: number;
        lessonIndex: number;
    };
    onSelectLesson: (chapterIndex: number, lessonIndex: number) => void;
    className?: string;
}

const LectureListComponent: React.FC<LectureListProps> = ({
    chapters,
    currentLesson,
    onSelectLesson,
    className = "",
}) => {
    const [expandedChapters, setExpandedChapters] = useState<number[]>([0]);
    const toggleChapter = (index: number) => {
        setExpandedChapters((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index) // đang mở → đóng lại
                : [...prev, index] // đang đóng → mở ra
        );

    };

    return (
        <div className={`col-12 col-md-2 bg-white p-3 overflow-auto ${className}`}>
            <h5 className="mb-3 py-2">Nội dung khóa học</h5>

            {chapters.map((chapter, cIdx) => {
                const isExpanded = expandedChapters.includes(cIdx);

                return (
                    <div key={chapter.chapterId} className="mb-2">
                        {/* Header chapter */}
                        <div
                            className="d-flex justify-content-between align-items-center mb-1 py-1"
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleChapter(cIdx)}
                        >
                            <h6 className="fw-bold mb-0">{chapter.chapterName}</h6>
                            <i
                                className={`bi ${
                                    isExpanded ? "bi-chevron-up" : "bi-chevron-down"
                                }`}
                            ></i>
                        </div>

                        {/* Lessons */}
                        {isExpanded && (
                            <ul className="list-group">
                                {chapter.lessons.map((lesson, lIdx) => {
                                    const isActive =
                                        currentLesson.chapterIndex === cIdx &&
                                        currentLesson.lessonIndex === lIdx;

                                    return (
                                        <li
                                            key={lesson.lessonId}
                                            className={`list-group-item list-group-item-action ${
                                                isActive ? "active" : ""
                                            }`}
                                            onClick={() => onSelectLesson(cIdx, lIdx)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            {lesson.lessonName}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default LectureListComponent;
