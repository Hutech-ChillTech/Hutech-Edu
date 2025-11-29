import React from "react";
import { type Lesson } from "../../types/database.types";

interface LessonDescriptionProps {
    lesson: Lesson | null;
}

const LessonDescriptionComponent: React.FC<LessonDescriptionProps> = ({ lesson }) => {
    if (!lesson) {
        return (
            <div className="bg-light p-3 h-100 d-flex align-items-center justify-content-center">
                <p className="text-muted">Vui lòng chọn bài học để xem chi tiết.</p>
            </div>
        );
    }

    return (
        <div className="bg-light p-3 h-100" style={{ overflowY: "auto" }}>
            <h5 className="mb-3 py-2 text-primary">{lesson.lessonName}</h5>

            <div className="lesson-content">
                {lesson.content ? (
                    <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                ) : (
                    <p>Chưa có nội dung mô tả.</p>
                )}
            </div>
        </div>
    );
};

export default LessonDescriptionComponent;