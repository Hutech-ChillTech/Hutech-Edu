import React from "react";

interface LessonDescriptionProps {
    lessonIndex: number;
}

const lessonDescriptions = [
    "Giới thiệu cơ bản về khóa học.",
    "Tìm hiểu biến và kiểu dữ liệu trong JS.",
    "Học cấu trúc điều kiện if/else.",
    "Vòng lặp for, while cơ bản.",
    "Hàm và cách sử dụng hàm.",
];

const LessonDescriptionComponent: React.FC<LessonDescriptionProps> = ({ lessonIndex }) => {
    return (
        <div className="col-12 col-md-4 bg-light p-3">
            <h5 className="mb-3 py-2">Mô tả bài học</h5>
            <p>{lessonDescriptions[lessonIndex]}</p>
        </div>
    );
};

export default LessonDescriptionComponent;
