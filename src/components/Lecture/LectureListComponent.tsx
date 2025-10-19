import React, { useState } from "react";

interface LectureListProps {
    currentLesson: {
        chapterIndex: number;
        lessonIndex: number;
    };
    onSelectLesson: (chapterIndex: number, lessonIndex: number) => void;
    className?: string;
}

const mockChapters = [
    {
        title: "Chương 1: Cơ bản",
        lessons: [
            "Bài 1: Giới thiệu",
            "Bài 2: Biến và kiểu dữ liệu",
            "Bài 3: Cấu trúc điều kiện",
        ],
    },
    {
        title: "Chương 2: Nâng cao",
        lessons: [
            "Bài 4: Vòng lặp",
            "Bài 5: Hàm",
            "Bài 6: Đệ quy",
        ],
    },
    {
        title: "Chương 3: Ứng dụng",
        lessons: [
            "Bài 7: Làm việc với mảng",
            "Bài 8: Lập trình hướng đối tượng",
        ],
    },
];

const LectureListComponent: React.FC<LectureListProps> = ({
    currentLesson,
    onSelectLesson,
    className = "",
}) => {
    const [expandedChapters, setExpandedChapters] = useState<number[]>([0]); // mở chương đầu mặc định

    const toggleChapter = (index: number) => {
        setExpandedChapters((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index) // nếu có → ẩn
                : [...prev, index] // nếu chưa có → mở
        );
    };

    return (
        <div className={`col-12 col-md-2 bg-white p-3 overflow-auto ${className}`}>
            <h5 className="mb-3 py-2">Nội dung khóa học</h5>

            {mockChapters.map((chapter, cIdx) => {
                const isExpanded = expandedChapters.includes(cIdx);

                return (
                    <div key={cIdx} className="mb-2">
                        {/* Header chương */}
                        <div
                            className="d-flex justify-content-between align-items-center mb-1 py-1"
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleChapter(cIdx)}
                        >
                            <h6 className="fw-bold mb-0">{chapter.title}</h6>
                            <i
                                className={`bi ${
                                    isExpanded ? "bi-chevron-up" : "bi-chevron-down"
                                }`}
                            ></i>
                        </div>

                        {/* Danh sách bài học */}
                        {isExpanded && (
                            <ul className="list-group">
                                {chapter.lessons.map((lesson, lIdx) => {
                                    const isActive =
                                        currentLesson.chapterIndex === cIdx &&
                                        currentLesson.lessonIndex === lIdx;

                                    return (
                                        <li
                                            key={lIdx}
                                            className={`list-group-item list-group-item-action  ${
                                                isActive ? "active" : ""
                                            }`}
                                            onClick={() => onSelectLesson(cIdx, lIdx)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            {lesson}
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
