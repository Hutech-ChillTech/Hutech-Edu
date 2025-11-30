import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useHtmlGrader } from "../../hooks/useHtmlGrader";
import { type TestCase } from "../../types/database.types";

interface CompilerProps {
    code: string;
    setCode: (value: string) => void;
    output: string;
    setOutput: (value: string) => void;
    testCases?: TestCase[];
}

const CompilerComponent: React.FC<CompilerProps> = ({
    code,
    setCode,
    output,
    setOutput,
    testCases = []
}) => {
    const [language, setLanguage] = useState("html");
    const [activeTab, setActiveTab] = useState<'html' | 'css'>('html');
    const [cssCode, setCssCode] = useState("");

    const { results, isAllPassed, runCodeCheck, resetGrader } = useHtmlGrader();

    useEffect(() => {
        resetGrader();
        setOutput("Kết quả sẽ hiển thị ở đây");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language]);

    const runCode = () => {
        if (language === "html") {
            runCodeCheck(code, cssCode, testCases);
            setOutput("Đang kiểm tra code HTML của bạn...");
        } else {
            setOutput(`Đang chạy code ${language} trên Server... (Chưa kết nối API)`);
        }
    };

    const resetCode = () => {
        setCode("");
        setCssCode("");
        resetGrader();
        setOutput("Đã reset");
    };

    const goPrevious = () => console.log("Previous clicked");
    const goNext = () => console.log("Next clicked");

    // --- STYLE CHO GIAO DIỆN TỐI ---
    const darkTheme = {
        containerBg: '#1e1e1e', // Màu nền chính (giống VS Code)
        toolbarBg: '#252526',   // Màu nền thanh công cụ
        consoleBg: '#1e1e1e',   // Màu nền console
        borderColor: '#333333', // Màu viền
        textColor: '#d4d4d4'    // Màu chữ chính
    };

    return (
        // 1. Đổi container chính sang nền tối và chữ sáng
        <div className="col-12 col-md-6 d-flex flex-column p-3" style={{ height: '100vh', backgroundColor: darkTheme.containerBg, color: darkTheme.textColor }}>

            {/* Control panel - Toolbar tối màu */}
            <div className="d-flex mb-2 gap-2 align-items-center p-2 rounded" style={{ backgroundColor: darkTheme.toolbarBg }}>
                <select
                    className="form-select w-auto bg-dark text-white border-secondary" // Select box tối màu
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    style={{ height: "38px" }}
                >
                    <option value="html">HTML/CSS</option>
                    <option value="javascript">JavaScript (NodeJS)</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                </select>

                {/* Nút Run - Giữ màu xanh cho nổi bật */}
                <button
                    className="btn btn-success d-flex align-items-center justify-content-center"
                    onClick={runCode}
                    title="Run code"
                    style={{ height: "38px", width: "40px" }}
                >
                    <i className="bi bi-play-fill"></i>
                </button>

                {/* Nút Reset - Đổi sang màu tối */}
                <button
                    className="btn btn-dark border-secondary d-flex align-items-center justify-content-center"
                    onClick={resetCode}
                    title="Reset code"
                    style={{ height: "38px", width: "40px" }}
                >
                    <i className="bi bi-arrow-counterclockwise"></i>
                </button>

                {/* Nút điều hướng - Đổi sang outline sáng */}
                <div className="ms-auto d-flex gap-2">
                    <button className="btn btn-outline-light border-secondary" onClick={goPrevious} style={{ height: "38px" }}>
                        Previous
                    </button>
                    <button className="btn btn-outline-light border-secondary" onClick={goNext} style={{ height: "38px" }}>
                        Next
                    </button>
                </div>
            </div>

            {/* Tabs cho HTML/CSS */}
            {language === 'html' && (
                <div className="d-flex border-bottom border-secondary mb-0">
                    <button
                        className={`btn btn-sm rounded-0 rounded-top ${activeTab === 'html' ? 'btn-dark text-white border border-bottom-0 border-secondary' : 'btn-secondary text-light'}`}
                        onClick={() => setActiveTab('html')}
                        style={{ minWidth: 80, backgroundColor: activeTab === 'html' ? darkTheme.containerBg : undefined }}
                    >
                        HTML
                    </button>
                    <button
                        className={`btn btn-sm rounded-0 rounded-top ${activeTab === 'css' ? 'btn-dark text-white border border-bottom-0 border-secondary' : 'btn-secondary text-light'}`}
                        onClick={() => setActiveTab('css')}
                        style={{ minWidth: 80, backgroundColor: activeTab === 'css' ? darkTheme.containerBg : undefined }}
                    >
                        CSS
                    </button>
                </div>
            )}

            {/* Monaco Editor - Đã dùng theme vs-dark sẵn */}
            <div className="flex-grow-1 mb-2" style={{ border: `1px solid ${darkTheme.borderColor}`, borderTop: language === 'html' ? 'none' : `1px solid ${darkTheme.borderColor}` }}>
                <Editor
                    height="50vh"
                    language={language === 'html' ? (activeTab === 'html' ? 'html' : 'css') : language}
                    theme="vs-dark" // Theme tối cho editor
                    value={language === 'html' ? (activeTab === 'html' ? code : cssCode) : code}
                    onChange={(value) => {
                        if (language === 'html') {
                            if (activeTab === 'html') setCode(value || "");
                            else setCssCode(value || "");
                        } else {
                            setCode(value || "");
                        }
                    }}
                    options={{ minimap: { enabled: false }, scrollBeyondLastLine: false }}
                />
            </div>

            {/* Khu vực hiển thị kết quả (Console/Preview) */}
            <div className="d-flex flex-column rounded" style={{ height: "35%", overflow: "hidden", backgroundColor: darkTheme.consoleBg, border: `1px solid ${darkTheme.borderColor}` }}>

                {/* 1. Tab Kết quả (Preview HTML) */}
                {language === 'html' && (
                    <div style={{ flex: 1, background: 'white', borderBottom: `1px solid ${darkTheme.borderColor}`, overflow: 'hidden' }}>
                        <iframe
                            title="preview"
                            srcDoc={`${code}<style>${cssCode}</style>`}
                            style={{ width: '100%', height: '100%', border: 'none' }}
                        />
                    </div>
                )}

                {/* 2. Tab Console / Test Results - Nền tối, chữ sáng */}
                <div className="p-2" style={{ height: language === 'html' ? '40%' : '100%', overflowY: "auto", color: darkTheme.textColor, fontFamily: 'monospace' }}>

                    {language === 'html' && results.length > 0 ? (
                        <div>
                            <div style={{ fontWeight: 'bold', marginBottom: 5, color: '#fff' }}>Kết quả kiểm tra:</div>
                            {results.map((res, idx) => (
                                <div key={idx} style={{ color: res.pass ? '#4caf50' : '#f44336', marginBottom: 2 }}>
                                    {res.pass ? '✅' : '❌'} Case {idx + 1}: {res.message}
                                </div>
                            ))}
                            {isAllPassed && <div style={{ color: '#4caf50', fontWeight: 'bold', marginTop: 5 }}>🎉 Chúc mừng! Bạn đã hoàn thành bài tập.</div>}
                        </div>
                    ) : (
                        <pre style={{ margin: 0, color: darkTheme.textColor }}>{output}</pre>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompilerComponent;