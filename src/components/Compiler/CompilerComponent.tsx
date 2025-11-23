import React, { useState } from "react";
import Editor from "@monaco-editor/react";

interface CompilerProps {
    code: string;
    setCode: (value: string) => void;
    output: string;
    setOutput: (value: string) => void;
}

const CompilerComponent: React.FC<CompilerProps> = ({ code, setCode, output, setOutput }) => {
    const [language, setLanguage] = useState("javascript");

    const runCode = () => {
        setOutput("Kết quả demo sẽ hiển thị ở đây. Sau này kết nối Judge0 API.");
    };

    const resetCode = () => {
        setCode("// Viết code của bạn ở đây");
        setOutput("Kết quả sẽ hiển thị ở đây");
    };

    const goPrevious = () => {
        console.log("Previous clicked");
        // TODO: Thêm logic chuyển bài trước
    };

    const goNext = () => {
        console.log("Next clicked");
        // TODO: Thêm logic chuyển bài sau
    };

    return (
        <div className="col-12 col-md-6 d-flex flex-column bg-light p-3">
            {/* Control panel */}
            <div className="d-flex mb-2 gap-2 align-items-center">
                {/* Language select */}
                <select
                    className="form-select w-auto"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    style={{ height: "38px" }} // chiều cao chuẩn Bootstrap
                >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                </select>

                {/* Run button */}
                <button
                    className="btn btn-success d-flex align-items-center justify-content-center"
                    onClick={runCode}
                    title="Run code"
                    style={{ height: "38px", width: "40px" }}
                >
                    <i className="bi bi-play-fill"></i>
                </button>

                {/* Reset button */}
                <button
                    className="btn btn-secondary d-flex align-items-center justify-content-center"
                    onClick={resetCode}
                    title="Reset code"
                    style={{ height: "38px", width: "40px" }}
                >
                    <i className="bi bi-arrow-counterclockwise"></i>
                </button>

                {/* Previous & Next buttons */}
                <div className="ms-auto d-flex gap-2">
                    <button
                        className="btn btn-outline-primary"
                        onClick={goPrevious}
                        style={{ height: "38px" }}
                    >
                        Previous
                    </button>
                    <button
                        className="btn btn-outline-primary"
                        onClick={goNext}
                        style={{ height: "38px" }}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-grow-1 mb-2">
                <Editor
                    height="60vh"
                    language={language}
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || "")}
                />
            </div>

            {/* Output console */}
            <div
                className="bg-dark text-white p-2 rounded"
                style={{ height: "150px", overflowY: "auto" }}
            >
                <pre>{output}</pre>
            </div>
        </div>
    );
};

export default CompilerComponent;
