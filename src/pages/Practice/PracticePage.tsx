import React, { useState } from "react";
import LectureListComponent from "../../components/Lecture/LectureListComponent";
import LessonDescriptionComponent from "../../components/Lecture/LectureDescriptionComponent";
import CompilerComponent from "../../components/Compiler/CompilerComponent";

const PracticePage: React.FC = () => {
    
    // ✅ currentLesson là object
    const [currentLesson, setCurrentLesson] = useState({
        chapterIndex: 0,
        lessonIndex: 0,
    });

    const [code, setCode] = useState("// Viết code của bạn ở đây");
    const [output, setOutput] = useState("Kết quả sẽ hiển thị ở đây");

    return (
        <div className="" style={{ height: "100vh" }}>
            <div className="row gx-3 h-100">
                {/* Danh sách bài học */}
                <LectureListComponent
                    currentLesson={currentLesson}
                    onSelectLesson={(chapterIdx, lessonIdx) => {
                        setCurrentLesson({ chapterIndex: chapterIdx, lessonIndex: lessonIdx });
                        setCode("// Viết code của bạn ở đây");
                        setOutput("Kết quả sẽ hiển thị ở đây");
                    }}
                />

                {/* Compiler */}
                <CompilerComponent
                    code={code}
                    setCode={setCode}
                    output={output}
                    setOutput={setOutput}
                />

                {/* Mô tả bài học */}
                <LessonDescriptionComponent
                    lessonIndex={currentLesson.lessonIndex}
                />
            </div>
        </div>
    );
};

export default PracticePage;
