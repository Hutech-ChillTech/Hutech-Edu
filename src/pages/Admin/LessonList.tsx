import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  Button,
  Input,
  Form,
  Space,
  Card,
  message,
  Typography,
  InputNumber,
  Popconfirm,
  Tabs,
  Radio,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  CodeOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const { Title } = Typography;

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number | null;
  required: boolean;
}

interface Lesson {
  lessonId: string;
  lessonName: string;
  lessonType: "normal" | "testcode" | "quiz";
  duration?: number;
  content?: string;
  chapterId: string;
  quiz?: {
    title: string;
    description: string;
    questions: QuizQuestion[];
  };
}

const LessonList: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"normal" | "testcode" | "quiz">("normal");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const chapterName = location.state?.chapterName || "Chương học";

  // Dữ liệu cho bài quiz - giống Google Form
  const [quizData, setQuizData] = useState<{
    title: string;
    description: string;
    questions: QuizQuestion[];
  }>({
    title: "Mẫu không có tiêu đề",
    description: "Mô tả biểu mẫu",
    questions: [
      {
        id: Date.now().toString(),
        question: "Câu hỏi không có tiêu đề",
        options: ["Tùy chọn 1"],
        correctAnswer: null,
        required: false,
      },
    ],
  });

  // Lấy danh sách bài học theo chapter ID
  const fetchLessons = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/api/lessons");
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        const filtered = data.data.filter((lesson: Lesson) => lesson.chapterId === chapterId);
        setLessons(filtered);
      }
    } catch (err) {
      console.error(err);
      message.error("Không thể tải danh sách bài học");
    }
  }, [chapterId]);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  // Thêm câu hỏi mới
  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      question: "Câu hỏi không có tiêu đề",
      options: ["Tùy chọn 1"],
      correctAnswer: null,
      required: false,
    };
    setQuizData({
      ...quizData,
      questions: [...quizData.questions, newQuestion],
    });
  };

  // Cập nhật câu hỏi
  const updateQuestion = (questionId: string, field: keyof QuizQuestion, value: any) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((q) =>
        q.id === questionId ? { ...q, [field]: value } : q
      ),
    });
  };

  // Xóa câu hỏi
  const deleteQuestion = (questionId: string) => {
    if (quizData.questions.length > 1) {
      setQuizData({
        ...quizData,
        questions: quizData.questions.filter((q) => q.id !== questionId),
      });
    }
  };

  // Sao chép câu hỏi
  const duplicateQuestion = (questionId: string) => {
    const questionToDuplicate = quizData.questions.find((q) => q.id === questionId);
    if (questionToDuplicate) {
      const newQuestion = {
        ...questionToDuplicate,
        id: Date.now().toString(),
      };
      const index = quizData.questions.findIndex((q) => q.id === questionId);
      const newQuestions = [...quizData.questions];
      newQuestions.splice(index + 1, 0, newQuestion);
      setQuizData({
        ...quizData,
        questions: newQuestions,
      });
    }
  };

  // Thêm tùy chọn
  const addOption = (questionId: string) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            options: [...q.options, `Tùy chọn ${q.options.length + 1}`],
          };
        }
        return q;
      }),
    });
  };

  // Cập nhật tùy chọn
  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((q) => {
        if (q.id === questionId) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      }),
    });
  };

  // Xóa tùy chọn
  const deleteOption = (questionId: string, optionIndex: number) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((q) => {
        if (q.id === questionId && q.options.length > 1) {
          return {
            ...q,
            options: q.options.filter((_, i) => i !== optionIndex),
            correctAnswer: q.correctAnswer === optionIndex ? null : q.correctAnswer,
          };
        }
        return q;
      }),
    });
  };

  // Thêm hoặc cập nhật bài học
  const handleFinish = async (values: any) => {
    if (!chapterId) return message.error("Thiếu chapterId!");

    const payload = {
      ...values,
      chapterId,
      lessonType: activeTab,
    };

    if (activeTab === "quiz") {
      // Kiểm tra quiz data
      if (!quizData.title || quizData.questions.length === 0) {
        return message.error("Vui lòng điền đầy đủ thông tin quiz!");
      }
      
      // Kiểm tra từng câu hỏi có đáp án chưa
      const hasInvalidQuestion = quizData.questions.some(
        (q) => !q.question || q.options.length === 0 || q.correctAnswer === null
      );
      
      if (hasInvalidQuestion) {
        return message.error("Vui lòng điền đầy đủ câu hỏi và chọn đáp án đúng!");
      }

      payload.quiz = quizData;
    }

    const url = editingId
      ? `http://localhost:3000/api/lessons/update/${editingId}`
      : "http://localhost:3000/api/lessons/create";

    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        message.success(editingId ? "Đã cập nhật bài học!" : "Thêm bài học thành công!");
        form.resetFields();
        setEditingId(null);
        setShowForm(false);
        setQuizData({
          title: "Mẫu không có tiêu đề",
          description: "Mô tả biểu mẫu",
          questions: [
            {
              id: Date.now().toString(),
              question: "Câu hỏi không có tiêu đề",
              options: ["Tùy chọn 1"],
              correctAnswer: null,
              required: false,
            },
          ],
        });
        fetchLessons();
      } else {
        message.error(data.message);
      }
    } catch (err) {
      console.error(err);
      message.error("Lỗi xử lý bài học!");
    }
  };

  // Sửa bài học
  const handleEdit = (record: Lesson) => {
    setEditingId(record.lessonId);
    setActiveTab(record.lessonType);
    form.setFieldsValue(record);
    if (record.lessonType === "quiz" && record.quiz) {
      setQuizData(record.quiz);
    }
    setShowForm(true);
  };

  // Xóa bài học
  const handleDelete = async (lessonId: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/lessons/delete/${lessonId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        message.success("Đã xóa bài học!");
        fetchLessons();
      } else {
        message.error(data.message || "Không thể xóa bài học");
      }
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi xóa bài học");
    }
  };

  const columns = [
    { title: "#", render: (_: any, __: any, i: number) => i + 1, width: 60 },
    { title: "Tên bài học", dataIndex: "lessonName" },
    {
      title: "Loại",
      dataIndex: "lessonType",
      render: (val: string) =>
        val === "testcode"
          ? "💻 Test Code"
          : val === "quiz"
          ? "❓ Trắc nghiệm"
          : "📘 Bài học",
    },
    { title: "Thời lượng", dataIndex: "duration", align: "center" as const },

    {
      title: "Thao tác",
      render: (_: unknown, record: Lesson) => (
        <Space>
          <Button
            onClick={() =>
              navigate(`/admin/lesson/detail/${record.lessonId}`, {
                state: { lessonName: record.lessonName },
              })
            }
          >
            Chi tiết
          </Button>

          <Button icon={<EditOutlined />} type="primary" onClick={() => handleEdit(record)} />

          <Popconfirm
            title="Xóa bài học này?"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => handleDelete(record.lessonId)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", paddingBottom: 50 }}>
      {/* Header */}
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={() => navigate(-1)}>⬅️ Quay lại</Button>
        <Title level={3}>📘 {chapterName}</Title>
      </Space>

      {/* Nút Thêm bài học */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowForm((p) => !p)}
        >
          {showForm ? "Ẩn form" : "Thêm bài học"}
        </Button>
      </div>

      {/* FORM */}
      {showForm && (
        <Card
          title={editingId ? "✏️ Sửa bài học" : "➕ Thêm bài học mới"}
          style={{
            borderRadius: "1rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            marginBottom: 20,
          }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key as any)}
            items={[
              {
                key: "normal",
                label: (
                  <span>
                    <FileTextOutlined /> Bài học
                  </span>
                ),
              },
              {
                key: "testcode",
                label: (
                  <span>
                    <CodeOutlined /> Test Code
                  </span>
                ),
              },
              {
                key: "quiz",
                label: (
                  <span>
                    <QuestionCircleOutlined /> Trắc nghiệm
                  </span>
                ),
              },
            ]}
          />

          <Form layout="vertical" form={form} onFinish={handleFinish}>
            {/* NORMAL LESSON */}
            {activeTab === "normal" && (
              <>
                <Form.Item
                  label="Tên bài học"
                  name="lessonTitle"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập tiêu đề bài học..." />
                </Form.Item>
                <Form.Item label="Nội dung" name="content">
                  <Input.TextArea rows={4} placeholder="Nhập nội dung bài học" />
                </Form.Item>
                <Form.Item label="Thời lượng (phút)" name="duration">
                  <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
              </>
            )}

            {/* TESTCODE */}
            {activeTab === "testcode" && (
              <>
                <Form.Item
                  label="Tên test code"
                  name="lessonTitle"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Tên bài kiểm tra code..." />
                </Form.Item>
                <Form.Item label="Input" name="input" rules={[{ required: true }]}>
                  <Input placeholder='VD: "2 3"' />
                </Form.Item>
                <Form.Item
                  label="Đáp án mong đợi"
                  name="expectedOutput"
                  rules={[{ required: true }]}
                >
                  <Input placeholder='VD: "5"' />
                </Form.Item>
                <Form.Item label="Mô tả" name="description">
                  <Input.TextArea rows={2} />
                </Form.Item>
              </>
            )}

            {/* QUIZ - GOOGLE FORM STYLE */}
            {activeTab === "quiz" && (
              <div style={{ marginTop: 20 }}>
                {/* Header Form */}
                <Card
                  style={{
                    borderLeft: "6px solid #3a49b7ff",
                    marginBottom: 16,
                    borderRadius: 8,
                  }}
                >
                  <Input
                    value={quizData.title}
                    onChange={(e) =>
                      setQuizData({ ...quizData, title: e.target.value })
                    }
                    placeholder="Tiêu đề bài trắc nghiệm"
                    style={{
                      fontSize: 24,
                      fontWeight: 500,
                      border: "none",
                      borderBottom: "1px solid #e0e0e0",
                      marginBottom: 12,
                    }}
                  />
                  <Input
                    value={quizData.description}
                    onChange={(e) =>
                      setQuizData({ ...quizData, description: e.target.value })
                    }
                    placeholder="Mô tả biểu mẫu"
                    style={{
                      fontSize: 14,
                      color: "#666",
                      border: "none",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  />
                </Card>

                {/* Questions */}
                {quizData.questions.map((question, qIndex) => (
                  <Card
                    key={question.id}
                    style={{
                      borderLeft: "6px solid #3a49b7ff",
                      marginBottom: 16,
                      borderRadius: 8,
                    }}
                  >
                    <div style={{ marginBottom: 16 }}>
                      <Input
                        value={question.question}
                        onChange={(e) =>
                          updateQuestion(question.id, "question", e.target.value)
                        }
                        placeholder={`Câu hỏi ${qIndex + 1}`}
                        style={{
                          fontSize: 16,
                          border: "none",
                          borderBottom: "1px solid #e0e0e0",
                          marginBottom: 12,
                        }}
                      />
                    </div>

                    {/* Options */}
                    <div style={{ marginBottom: 16 }}>
                      <Radio.Group
                        value={question.correctAnswer}
                        onChange={(e) =>
                          updateQuestion(question.id, "correctAnswer", e.target.value)
                        }
                        style={{ width: "100%" }}
                      >
                        <Space direction="vertical" style={{ width: "100%" }}>
                          {question.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              <Radio value={optIndex} />
                              <Input
                                value={option}
                                onChange={(e) =>
                                  updateOption(question.id, optIndex, e.target.value)
                                }
                                placeholder={`Tùy chọn ${optIndex + 1}`}
                                style={{ flex: 1 }}
                              />
                              {question.options.length > 1 && (
                                <Button
                                  type="text"
                                  danger
                                  icon={<CloseOutlined />}
                                  onClick={() => deleteOption(question.id, optIndex)}
                                />
                              )}
                            </div>
                          ))}
                        </Space>
                      </Radio.Group>

                      <Button
                        type="dashed"
                        onClick={() => addOption(question.id)}
                        style={{ marginTop: 12 }}
                      >
                        Thêm tùy chọn
                      </Button>
                    </div>

                    {/* Question Actions */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: 12,
                        borderTop: "1px solid #e0e0e0",
                      }}
                    >
                      <Space>
                        <Button
                          type="text"
                          icon={<PlusOutlined />}
                          onClick={() => duplicateQuestion(question.id)}
                        >
                          Sao chép
                        </Button>
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => deleteQuestion(question.id)}
                          disabled={quizData.questions.length === 1}
                        >
                          Xóa
                        </Button>
                      </Space>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 14, color: "#666" }}>Bắt buộc</span>
                        <Button
                          type={question.required ? "primary" : "default"}
                          size="small"
                          onClick={() =>
                            updateQuestion(question.id, "required", !question.required)
                          }
                        >
                          {question.required ? "Bật" : "Tắt"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Add Question Button */}
                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={addQuestion}
                    size="large"
                  >
                    Thêm câu hỏi
                  </Button>
                </div>
              </div>
            )}

            <div style={{ textAlign: "right", marginTop: 20 }}>
              <Space>
                <Button onClick={() => setShowForm(false)}>Hủy</Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  {editingId ? "Cập nhật" : "Lưu bài"}
                </Button>
              </Space>
            </div>
          </Form>
        </Card>
      )}

      {/* Bảng danh sách bài học */}
      <Card
        style={{
          borderRadius: "1rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <Table
          columns={columns}
          dataSource={lessons}
          rowKey="lessonId"
          bordered
          pagination={false}
          locale={{ emptyText: "Chưa có bài học nào" }}
        />
      </Card>
    </div>
  );
};

export default LessonList;