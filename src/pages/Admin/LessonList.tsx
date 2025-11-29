import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  Tabs,
  Switch,
  Upload,
  Checkbox,
  Popconfirm,
  Radio,
} from "antd";
import type { TabsProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  PlusOutlined,
  CodeOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
  ArrowRightOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate, useLocation } from "react-router-dom";

// Khai báo các service
import { lessonService } from "../../service/lesson.service";
import { testCaseService } from "../../service/testCase.service";
import { type Lesson } from "../../types/database.types";

const { Title } = Typography;

type LessonType = "normal" | "testcode" | "quiz";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number | null;
  required: boolean;
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

interface LessonFormValues {
  lessonName?: string;
  isPreview?: boolean;
  content?: string;
  duration?: number | string;
  description?: string;
  input?: string;
  expectedOutput?: string;
  question?: string;
  options?: string | string[];
  answer?: string;
  videoFile?: unknown;
  hasTestCase?: boolean;
}

const TAB_ITEMS: TabsProps["items"] = [
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
] as const;

const LessonList: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<LessonType>("normal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [hasTestCase, setHasTestCase] = useState(false);
  const [tempLessonId, setTempLessonId] = useState<string | null>(null);

  const chapterName = location.state?.chapterName || "Chương học";

  const beforeUpload = (file: File) => {
    const isVideo = file.type.startsWith("video/");
    if (!isVideo) {
      message.error("Chỉ được tải lên file video!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const renderFormFields = useCallback(() => {
    if (activeTab === "normal") {
      return (
        <>
          <Form.Item
            label="Tên bài học"
            name="lessonName"
            rules={[{ required: true, message: "Nhập tên bài học" }]}
          >
            <Input placeholder="Nhập tiêu đề bài học..." />
          </Form.Item>
          <Form.Item label="Nội dung" name="content">
            <Input.TextArea rows={4} placeholder="Nhập nội dung bài học" />
          </Form.Item>

          <Form.Item
            label="Upload video"
            name="videoFile"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload beforeUpload={beforeUpload} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Chọn file video</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="hasTestCase" valuePropName="checked">
            <Checkbox
              onChange={(e) => setHasTestCase(e.target.checked)}
              style={{ fontWeight: 500 }}
            >
              Bài học này có bài tập thực hành code (Thêm Test Case)
            </Checkbox>
          </Form.Item>
        </>
      );
    }

    if (activeTab === "testcode") {
      return (
        <>
          <Form.Item
            label="Tên test code / Bài học"
            name="lessonName"
            rules={[{ required: !tempLessonId, message: "Nhập tên test code" }]}
          >
            <Input
              placeholder="Tên bài kiểm tra code..."
              disabled={!!tempLessonId}
            />
          </Form.Item>

          <Form.Item
            label="Đề bài"
            name="description"
            rules={[{ required: true, message: "Nhập đề bài" }]}
          >
            <Input.TextArea rows={4} placeholder="Nhập đề bài code..." />
          </Form.Item>
          <Form.Item
            label="Input"
            name="input"
            rules={[{ required: true, message: "Nhập dữ liệu vào" }]}
          >
            <Input.TextArea rows={4} placeholder="Nhập đầu vào..." />
          </Form.Item>
          <Form.Item label="Đáp án mẫu" name="expectedOutput">
            <Input.TextArea rows={3} placeholder="Kết quả mong đợi..." />
          </Form.Item>
        </>
      );
    }

    return (
      <>
        <Form.Item
          label="Tên bài quiz"
          name="lessonName"
          rules={[{ required: true, message: "Nhập tên bài quiz" }]}
        >
          <Input placeholder="Nhập tiêu đề bài quiz..." />
        </Form.Item>
        <Form.Item
          label="Câu hỏi"
          name="question"
          rules={[{ required: true, message: "Nhập câu hỏi" }]}
        >
          <Input.TextArea rows={3} placeholder="Nhập câu hỏi trắc nghiệm..." />
        </Form.Item>
        <Form.Item
          label="Các lựa chọn"
          name="options"
          rules={[{ required: true, message: "Nhập các lựa chọn" }]}
        >
          <Input.TextArea
            rows={3}
            placeholder="Nhập đáp án cách nhau bằng dấu ;"
          />
        </Form.Item>
        <Form.Item label="Đáp án đúng" name="answer">
          <Input placeholder="Nhập đáp án đúng..." />
        </Form.Item>
      </>
    );
  }, [activeTab, tempLessonId]);

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

  const fetchLessons = useCallback(async () => {
    if (!chapterId) return;
    try {
      setIsTableLoading(true);
      const data = await lessonService.getLessonByChapterId(chapterId);
      setLessons(data || []);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    } finally {
      setIsTableLoading(false);
    }
  }, [chapterId]);

  useEffect(() => {
    if (chapterId) fetchLessons();
  }, [chapterId, fetchLessons]);

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
  const updateQuestion = (
    questionId: string,
    field: keyof QuizQuestion,
    value: any
  ) => {
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
    const questionToDuplicate = quizData.questions.find(
      (q) => q.id === questionId
    );
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
  const updateOption = (
    questionId: string,
    optionIndex: number,
    value: string
  ) => {
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
            correctAnswer:
              q.correctAnswer === optionIndex ? null : q.correctAnswer,
          };
        }
        return q;
      }),
    });
  };

  const handleFinish = async (values: LessonFormValues) => {
    try {
      setIsSubmitting(true);

      let newLessonId = tempLessonId;

      if (!newLessonId) {
        const lessonFormData = new FormData();
        lessonFormData.append("lessonName", values.lessonName?.trim() || "");
        lessonFormData.append("chapterId", chapterId || "");
        lessonFormData.append("isPreview", values.isPreview ? "true" : "false");

        if (activeTab === "normal") {
          if (values.content) lessonFormData.append("content", values.content);

          const fileList = values.videoFile as any[];
          if (fileList && fileList.length > 0) {
            const fileObj = fileList[0];
            if (fileObj.originFileObj) {
              lessonFormData.append("video", fileObj.originFileObj);
            }
          } else {
            message.error("Vui lòng chọn video!");
            setIsSubmitting(false);
            return;
          }
        }

        const createdLesson = await lessonService.createLesson(lessonFormData);
        if (!createdLesson) throw new Error("Không tạo được bài học");

        newLessonId =
          (createdLesson as any).lessonId || (createdLesson as any).id;

        if (activeTab === "normal" && hasTestCase) {
          message.success(
            "Đã lưu bài học video. Vui lòng nhập thông tin Test Case."
          );
          setTempLessonId(newLessonId);
          setActiveTab("testcode");
          form.setFieldsValue({ lessonName: values.lessonName });
          setIsSubmitting(false);
          return;
        }
      }

      if (!newLessonId) {
        message.warning("Lỗi ID bài học.");
        return;
      }

      if (activeTab === "testcode") {
        const testCasePayload = {
          description: values.description,
          input: values.input,
          expectedOutput: values.expectedOutput,
          lessonId: newLessonId,
        };

        await testCaseService.createTestCase(testCasePayload);
        message.success("Thêm bài tập code thành công!");
      } else if (activeTab === "quiz") {
        message.success("Thêm câu hỏi trắc nghiệm thành công!");
      } else if (activeTab === "normal" && !hasTestCase) {
        message.success("Thêm bài học video thành công!");
      }

      form.resetFields();
      setHasTestCase(false);
      setTempLessonId(null);
      setActiveTab("normal");
      fetchLessons();
    } catch (err: any) {
      console.error(err);
      message.error(err.message || "Lỗi hệ thống");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSubmitButtonText = () => {
    if (isSubmitting) return "Đang xử lý...";

    if (activeTab === "normal") {
      return hasTestCase ? "Lưu & Thêm Test Case" : "Lưu bài học";
    }
    if (activeTab === "testcode") {
      return tempLessonId ? "Hoàn tất & Lưu Test Case" : "Lưu Test Code";
    }
    return "Lưu câu hỏi";
  };

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
      const res = await fetch(
        `http://localhost:3000/api/lessons/delete/${lessonId}`,
        {
          method: "DELETE",
        }
      );
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

  const columns: ColumnsType<Lesson> = useMemo(
    () => [
      {
        title: "#",
        render: (_record: unknown, _row: unknown, i: number) => i + 1,
      },
      { title: "Tên bài học", dataIndex: "lessonName" },
      {
        title: "Loại bài",
        dataIndex: "lessonType",
        render: (val: LessonType) => {
          if (val === "testcode") return "💻 Test Code";
          if (val === "quiz") return "❓ Trắc nghiệm";
          return "📘 Bài học";
        },
      },
      {
        title: "Thời lượng (phút)",
        dataIndex: "duration",
        align: "center" as const,
      },

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

            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => handleEdit(record)}
            />

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
    ],
    []
  );

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
            onChange={(key) => {
              if (tempLessonId) {
                message.warning(
                  "Vui lòng hoàn tất thêm Test Case trước khi chuyển tab."
                );
                return;
              }
              setActiveTab(key as LessonType);
            }}
            items={TAB_ITEMS}
          />

          <Form layout="vertical" form={form} onFinish={handleFinish}>
            {renderFormFields()}

            {activeTab === "normal" && (
              <Form.Item
                label="Cho phép học thử?"
                name="isPreview"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            )}

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
                          updateQuestion(
                            question.id,
                            "question",
                            e.target.value
                          )
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
                          updateQuestion(
                            question.id,
                            "correctAnswer",
                            e.target.value
                          )
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
                                  updateOption(
                                    question.id,
                                    optIndex,
                                    e.target.value
                                  )
                                }
                                placeholder={`Tùy chọn ${optIndex + 1}`}
                                style={{ flex: 1 }}
                              />
                              {question.options.length > 1 && (
                                <Button
                                  type="text"
                                  danger
                                  icon={<CloseOutlined />}
                                  onClick={() =>
                                    deleteOption(question.id, optIndex)
                                  }
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
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span style={{ fontSize: 14, color: "#666" }}>
                          Bắt buộc
                        </span>
                        <Button
                          type={question.required ? "primary" : "default"}
                          size="small"
                          onClick={() =>
                            updateQuestion(
                              question.id,
                              "required",
                              !question.required
                            )
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
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                icon={
                  activeTab === "normal" && hasTestCase ? (
                    <ArrowRightOutlined />
                  ) : (
                    <PlusOutlined />
                  )
                }
              >
                {getSubmitButtonText()}
              </Button>
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
          loading={isTableLoading}
          locale={{ emptyText: "Chưa có bài học nào" }}
        />
      </Card>
    </div>
  );
};

export default LessonList;
