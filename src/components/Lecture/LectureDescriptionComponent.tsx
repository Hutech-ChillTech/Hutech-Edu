import React from "react";
import { type Lesson } from "../../types/database.types";
import styles from '../../styles/LessonDescription.module.css';

interface LessonDescriptionProps {
    lesson: Lesson | null;
}

const LessonDescriptionComponent: React.FC<LessonDescriptionProps> = ({ lesson }) => {
    if (!lesson) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📝</div>
                <p className={styles.emptyText}>Vui lòng chọn bài học để xem chi tiết</p>
            </div>
        );
    }

    return (
        <div className={styles.descriptionContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>{lesson.lessonName}</h1>

                <div className={styles.metadata}>
                    {(lesson as any).lessonDuration && (
                        <div className={styles.metaItem}>
                            <span className={styles.metaIcon}>⏱</span>
                            <span>{(lesson as any).lessonDuration}</span>
                        </div>
                    )}
                    {(lesson as any).difficulty && (
                        <div className={styles.metaItem}>
                            <span className={styles.metaIcon}>📊</span>
                            <span className={`${styles.badge} ${styles[(lesson as any).difficulty.toLowerCase()]}`}>
                                {(lesson as any).difficulty}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.content}>
                {lesson.content ? (
                    <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                ) : (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>📄</div>
                        <p className={styles.emptyText}>Chưa có nội dung mô tả cho bài học này</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LessonDescriptionComponent;