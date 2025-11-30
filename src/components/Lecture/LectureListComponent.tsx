import React, { useState } from "react";
import { type Chapter } from '../../types/database.types';
import './LectureListComponent.css'; // Ensure CSS is imported

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
    // Nếu chapters bị undefined từ cha truyền xuống, mặc định là mảng rỗng
    const safeChapters = chapters || [];

    const [expandedChapters, setExpandedChapters] = useState<number[]>([0]);

    const toggleChapter = (index: number) => {
        setExpandedChapters((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    return (
        <div className={`col-12 col-md-2 lecture-sidebar p-3 overflow-auto ${className}`}>
            <h5 className="mb-4 py-2 lecture-title">Nội dung khóa học</h5>

            {safeChapters.map((chapter, cIdx) => {
                const isExpanded = expandedChapters.includes(cIdx);

                return (
                    <div key={chapter.chapterId} className="chapter-item">

                        <div
                            className="chapter-header d-flex justify-content-between align-items-center"
                            onClick={() => toggleChapter(cIdx)}
                        >
                            <h6 className="chapter-title mb-0">{chapter.chapterName}</h6>
                            <i
                                className={`bi bi-chevron-down transition-arrow ${isExpanded ? "rotate" : ""}`}
                            ></i>
                        </div>

                        <div className={`collapse-container ${isExpanded ? "open" : ""}`}>
                            <ul className="list-group lesson-list">
                                {(chapter.lessons || []).map((lesson, lIdx) => {
                                    const isActive =
                                        currentLesson.chapterIndex === cIdx &&
                                        currentLesson.lessonIndex === lIdx;

                                    return (
                                        <li
                                            key={lesson.lessonId}
                                            className={`lesson-item ${isActive ? "active" : ""}`}
                                            onClick={() => onSelectLesson(cIdx, lIdx)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            {lesson.lessonName}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default LectureListComponent;