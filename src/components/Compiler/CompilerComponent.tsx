import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { message } from "antd";
import { useHtmlGrader } from "../../hooks/useHtmlGrader";
import { codeExecutionService, LANGUAGE_IDS } from "../../service/codeExecution.service";
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
    const [isRunning, setIsRunning] = useState(false);
    const [testResults, setTestResults] = useState<any[]>([]);

    const { results, isAllPassed, runCodeCheck, resetGrader } = useHtmlGrader();

    useEffect(() => {
        resetGrader();
        setTestResults([]);
        setOutput("Kết quả sẽ hiển thị ở đây");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language]);

    // Map language to Judge0 language ID
    const getLanguageId = (lang: string): number => {
        switch (lang) {
            case 'javascript': return LANGUAGE_IDS.JAVASCRIPT;
            case 'python': return LANGUAGE_IDS.PYTHON;
            case 'cpp': return LANGUAGE_IDS.CPP;
            default: return LANGUAGE_IDS.JAVASCRIPT;
        }
    };

    const runCode = async () => {
        if (!code.trim()) {
            message.warning('Vui lòng nhập code trước khi chạy!');
            return;
        }

        if (language === "html") {
            // HTML/CSS: Dùng grader hiện tại
            runCodeCheck(code, cssCode, testCases);
            setOutput("Đang kiểm tra code HTML của bạn...");
        } else {
            // JavaScript, Python, C++: Dùng Judge0
            setIsRunning(true);
            setTestResults([]);
            setOutput("Đang chạy code trên server...");

            try {
                if (testCases && testCases.length > 0) {
                    // Có test cases: Chạy từng test case
                    const results = [];

                    for (let i = 0; i < testCases.length; i++) {
                        const testCase = testCases[i];

                        const payload = {
                            source_code: code,
                            language_id: getLanguageId(language),
                            stdin: testCase.input || '',
                            expected_output: testCase.expectedOutput || '',
                            testCaseId: testCase.testCaseId,
                        };

                        const result = await codeExecutionService.runCode(payload);

                        // Kiểm tra kết quả
                        const isPassed = result.status.id === 3 && // Accepted
                            result.stdout?.trim() === testCase.expectedOutput?.trim();

                        results.push({
                            testCaseIndex: i + 1,
                            description: testCase.description,
                            input: testCase.input,
                            expectedOutput: testCase.expectedOutput,
                            actualOutput: result.stdout,
                            isPassed,
                            status: result.status,
                            time: result.time,
                            memory: result.memory,
                            stderr: result.stderr,
                            compile_output: result.compile_output,
                        });
                    }

                    setTestResults(results);

                    // Tính tổng kết
                    const passedCount = results.filter(r => r.isPassed).length;
                    const totalCount = results.length;

                    if (passedCount === totalCount) {
                        setOutput(`✅ Tất cả ${totalCount} test case đều PASS!`);
                        message.success(`Chúc mừng! ${passedCount}/${totalCount} test cases passed`);
                    } else {
                        setOutput(`⚠️ ${passedCount}/${totalCount} test case PASS`);
                        message.warning(`${passedCount}/${totalCount} test cases passed`);
                    }
                } else {
                    // Không có test case: Chạy code thông thường
                    const payload = {
                        source_code: code,
                        language_id: getLanguageId(language),
                    };

                    const result = await codeExecutionService.runCode(payload);

                    if (result.status.id === 3) {
                        setOutput(result.stdout || '(no output)');
                        message.success('Code chạy thành công!');
                    } else if (result.stderr) {
                        setOutput(`Error:\n${result.stderr}`);
                        message.error(result.status.description);
                    } else if (result.compile_output) {
                        setOutput(`Compile Error:\n${result.compile_output}`);
                        message.error('Compile error');
                    } else {
                        setOutput(`Status: ${result.status.description}\n${result.message || ''}`);
                        message.error(result.status.description);
                    }
                }
            } catch (error: any) {
                console.error('Error running code:', error);
                setOutput(`Error: ${error.message || 'Không thể chạy code'}`);
                message.error('Lỗi khi chạy code');
            } finally {
                setIsRunning(false);
            }
        }
    };

    const resetCode = () => {
        setCode("");
        setCssCode("");
        resetGrader();
        setTestResults([]);
        setOutput("Đã reset");
    };

    const goPrevious = () => console.log("Previous clicked");
    const goNext = () => console.log("Next clicked");

    // --- STYLE CHO GIAO DIỆN TỐI ---
    const darkTheme = {
        containerBg: '#1e1e1e',
        toolbarBg: '#252526',
        consoleBg: '#1e1e1e',
        borderColor: '#333333',
        textColor: '#d4d4d4'
    };

    return (
        <div className="col-12 col-md-6 d-flex flex-column p-3" style={{ height: '100vh', backgroundColor: darkTheme.containerBg, color: darkTheme.textColor }}>

            {/* Control panel */}
            <div className="d-flex mb-2 gap-2 align-items-center p-2 rounded" style={{ backgroundColor: darkTheme.toolbarBg }}>
                <select
                    className="form-select w-auto bg-dark text-white border-secondary"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    style={{ height: "38px" }}
                    disabled={isRunning}
                >
                    <option value="html">HTML/CSS</option>
                    <option value="javascript">JavaScript (NodeJS)</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                </select>

                <button
                    className="btn btn-success d-flex align-items-center justify-content-center"
                    onClick={runCode}
                    title="Run code"
                    style={{ height: "38px", width: "40px" }}
                    disabled={isRunning}
                >
                    {isRunning ? (
                        <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                        <i className="bi bi-play-fill"></i>
                    )}
                </button>

                <button
                    className="btn btn-dark border-secondary d-flex align-items-center justify-content-center"
                    onClick={resetCode}
                    title="Reset code"
                    style={{ height: "38px", width: "40px" }}
                    disabled={isRunning}
                >
                    <i className="bi bi-arrow-counterclockwise"></i>
                </button>

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

            {/* Monaco Editor */}
            <div className="flex-grow-1 mb-2" style={{ border: `1px solid ${darkTheme.borderColor}`, borderTop: language === 'html' ? 'none' : `1px solid ${darkTheme.borderColor}` }}>
                <Editor
                    height="50vh"
                    language={language === 'html' ? (activeTab === 'html' ? 'html' : 'css') : language}
                    theme="vs-dark"
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

            {/* Khu vực hiển thị kết quả */}
            <div className="d-flex flex-column rounded" style={{ height: "35%", overflow: "hidden", backgroundColor: darkTheme.consoleBg, border: `1px solid ${darkTheme.borderColor}` }}>

                {/* Preview HTML */}
                {language === 'html' && (
                    <div style={{ flex: 1, background: 'white', borderBottom: `1px solid ${darkTheme.borderColor}`, overflow: 'hidden' }}>
                        <iframe
                            title="preview"
                            srcDoc={`${code}<style>${cssCode}</style>`}
                            style={{ width: '100%', height: '100%', border: 'none' }}
                        />
                    </div>
                )}

                {/* Console / Test Results */}
                <div className="p-2" style={{ height: language === 'html' ? '40%' : '100%', overflowY: "auto", color: darkTheme.textColor, fontFamily: 'monospace', fontSize: '13px' }}>

                    {/* HTML Test Results */}
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
                    ) : testResults.length > 0 ? (
                        /* Other Languages Test Results */
                        <div>
                            <div style={{ fontWeight: 'bold', marginBottom: 8, color: '#fff' }}>📊 Kết quả Test Cases:</div>
                            {testResults.map((result, index) => (
                                <div
                                    key={index}
                                    style={{
                                        padding: 10,
                                        marginBottom: 8,
                                        border: `1px solid ${result.isPassed ? '#4caf50' : '#f44336'}`,
                                        borderRadius: 4,
                                        backgroundColor: result.isPassed ? '#1a3a1a' : '#3a1a1a',
                                    }}
                                >
                                    <div style={{ marginBottom: 4, fontWeight: 'bold' }}>
                                        {result.isPassed ? '✅' : '❌'} Test Case #{result.testCaseIndex}
                                        <span style={{ marginLeft: 8, fontSize: 11, color: '#999' }}>
                                            {result.time && `⏱️ ${result.time}s`}
                                            {result.memory && ` | 💾 ${result.memory}KB`}
                                        </span>
                                    </div>

                                    {result.description && (
                                        <div style={{ fontSize: 12, color: '#aaa', marginBottom: 4 }}>
                                            {result.description}
                                        </div>
                                    )}

                                    {result.input && (
                                        <div style={{ fontSize: 11, marginBottom: 2 }}>
                                            <span style={{ color: '#888' }}>Input:</span> {result.input}
                                        </div>
                                    )}

                                    <div style={{ fontSize: 11, marginBottom: 2 }}>
                                        <span style={{ color: '#888' }}>Expected:</span> {result.expectedOutput}
                                    </div>

                                    <div style={{ fontSize: 11, color: result.isPassed ? '#4caf50' : '#f44336' }}>
                                        <span style={{ color: '#888' }}>Got:</span> {result.actualOutput || '(empty)'}
                                    </div>

                                    {result.stderr && (
                                        <div style={{ fontSize: 11, color: '#ff6b6b', marginTop: 4 }}>
                                            ❌ Error: {result.stderr}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Default Output */
                        <pre style={{ margin: 0, color: darkTheme.textColor, whiteSpace: 'pre-wrap' }}>{output}</pre>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompilerComponent;