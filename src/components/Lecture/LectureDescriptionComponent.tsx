import React from "react";
import { type Lesson } from "../../types/database.types";
import "./LectureDescriptionComponent.css";

interface LessonDescriptionProps {
    lesson: Lesson | null;
}

const LessonDescriptionComponent: React.FC<LessonDescriptionProps> = ({ lesson }) => {
    if (!lesson) {
        return (
            <div className="description-container p-4 align-items-center justify-content-center">
                <div className="empty-state">
                    <i className="bi bi-journal-code empty-icon"></i>
                    <p className="mb-0">Vui lòng chọn bài học để xem chi tiết.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="description-container p-4">
            <h5 className="description-header">{lesson.lessonName}</h5>

            <div className="description-content">
                {lesson.content ? (
                    <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                ) : (
                    <div className="empty-state" style={{ height: 'auto', padding: '2rem 0' }}>
                        <p>Chưa có nội dung mô tả.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LessonDescriptionComponent;