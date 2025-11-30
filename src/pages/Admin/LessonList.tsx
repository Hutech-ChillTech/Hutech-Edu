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
  Tabs,
  Switch,
  Upload,
  Checkbox,
  Popconfirm,
  Radio,
  Tag,
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
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate, useLocation } from "react-router-dom";

// Khai báo các service
import { lessonService } from "../../service/lesson.service";
import { testCaseService } from "../../service/testCase.service";
import { quizService } from "../../service/quiz.service";
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

interface ExtendedLesson extends Lesson {
  lessonType?: LessonType;
  quiz?: QuizQuestion[];
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
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<LessonType>("normal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingType, setEditingType] = useState<LessonType | null>(null);

  const [hasTestCase, setHasTestCase] = useState(false);
  const [tempLessonId, setTempLessonId] = useState<string | null>(null);

  // State cho bài quiz
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

  const chapterName = location.state?.chapterName || "Chương học";

  const beforeUpload = (file: File) => {
    const isVideo = file.type.startsWith("video/");
    if (!isVideo) {
      message.error("Chỉ được tải lên file video!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  // Fetch lessons
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

  // Fetch quizzes
  const fetchQuizzes = useCallback(async () => {
    if (!chapterId) return;
    try {
      const data = await quizService.getQuizzesByChapter(chapterId);
      setQuizzes(data || []);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  }, [chapterId]);

  useEffect(() => {
    if (chapterId) {
      fetchLessons();
      fetchQuizzes();
    }
  }, [chapterId, fetchLessons, fetchQuizzes]);

  // Quiz functions
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

  const deleteQuestion = (questionId: string) => {
    if (quizData.questions.length > 1) {
      setQuizData({
        ...quizData,
        questions: quizData.questions.filter((q) => q.id !== questionId),
      });
    }
  };

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

  // Handle form submit
  const handleFinish = async (values: LessonFormValues) => {
    try {
      setIsSubmitting(true);

      // ========== QUIZ TAB ==========
      if (activeTab === "quiz") {
        if (!quizData.title || quizData.title === "Mẫu không có tiêu đề") {
          message.error("Vui lòng nhập tiêu đề bài trắc nghiệm!");
          setIsSubmitting(false);
          return;
        }

        // Validate questions
        const hasInvalidQuestion = quizData.questions.some(
          (q) => !q.question || q.question === "Câu hỏi không có tiêu đề"
        );
        if (hasInvalidQuestion) {
          message.error("Vui lòng nhập nội dung cho tất cả câu hỏi!");
          setIsSubmitting(false);
          return;
        }

        // Validate correct answers
        const hasNoCorrectAnswer = quizData.questions.some(
          (q) => q.correctAnswer === null
        );
        if (hasNoCorrectAnswer) {
          message.error("Vui lòng chọn đáp án đúng cho tất cả câu hỏi!");
          setIsSubmitting(false);
          return;
        }

        if (editingId && editingType === "quiz") {
          // 1. Update thông tin cơ bản của Quiz
          await quizService.updateQuiz(editingId, {
            title: quizData.title,
            description: quizData.description,
          });

          // 2. Xóa tất cả câu hỏi cũ để tạo lại (Cách đơn giản nhất để đồng bộ)
          try {
            const oldQuestions = await quizService.getQuestionsByQuiz(editingId);
            if (Array.isArray(oldQuestions)) {
              for (const q of oldQuestions) {
                await quizService.deleteQuestion(q.quizQuestionId);
              }
            }
          } catch (e) {
            console.warn("Không thể xóa câu hỏi cũ hoặc không có câu hỏi cũ", e);
          }

          // 3. Tạo lại câu hỏi và đáp án từ Form
          for (const question of quizData.questions) {
            const createdQuestion = await quizService.createQuestion({
              chapterQuizId: editingId,
              questionText: question.question,
              questionType: "multiple_choice",
              required: question.required,
            });

            const questionId =
              (createdQuestion as any).quizQuestionId ||
              (createdQuestion as any).id;

            // Create options
            for (let i = 0; i < question.options.length; i++) {
              await quizService.createOption({
                quizQuestionId: questionId,
                optionText: question.options[i],
                isCorrect: question.correctAnswer === i,
              });
            }
          }

          message.success("Cập nhật bài trắc nghiệm thành công!");
        } else {
          // Create new quiz
          const createdQuiz = await quizService.createQuiz({
            title: quizData.title,
            chapterId: chapterId!,
            description: quizData.description,
          });

          const quizId =
            (createdQuiz as any).chapterQuizId || (createdQuiz as any).id;

          // Create questions
          for (const question of quizData.questions) {
            const createdQuestion = await quizService.createQuestion({
              chapterQuizId: quizId,
              questionText: question.question,
              questionType: "multiple_choice",
              required: question.required,
            });

            const questionId =
              (createdQuestion as any).quizQuestionId ||
              (createdQuestion as any).id;

            // Create options
            for (let i = 0; i < question.options.length; i++) {
              await quizService.createOption({
                quizQuestionId: questionId,
                optionText: question.options[i],
                isCorrect: question.correctAnswer === i,
              });
            }
          }

          message.success("Thêm bài trắc nghiệm thành công!");
        }

        // Reset form
        form.resetFields();
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
        setEditingId(null);
        setEditingType(null);
        setActiveTab("normal");
        setShowForm(false);
        fetchQuizzes();
        return;
      }

      // ========== NORMAL & TESTCODE TABS ==========
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
            // Nếu đang edit và không chọn video mới thì bỏ qua
            if (!editingId) {
              message.error("Vui lòng chọn video!");
              setIsSubmitting(false);
              return;
            }
          }
        }

        if (editingId && editingType === "normal") {
          // Update lesson
          await lessonService.updateLesson(
            editingId,
            lessonFormData
          );
          message.success("Cập nhật bài học thành công!");
          newLessonId = editingId;
        } else {
          // Create lesson
          const createdLesson = await lessonService.createLesson(
            lessonFormData
          );
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
      } else if (activeTab === "normal" && !hasTestCase) {
        message.success(
          editingId ? "Cập nhật bài học thành công!" : "Thêm bài học video thành công!"
        );
      }

      form.resetFields();
      setHasTestCase(false);
      setTempLessonId(null);
      setEditingId(null);
      setEditingType(null);
      setActiveTab("normal");
      setShowForm(false);
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

    if (editingId) {
      if (activeTab === "quiz") return "Cập nhật trắc nghiệm";
      return "Cập nhật bài học";
    }

    if (activeTab === "normal") {
      return hasTestCase ? "Lưu & Thêm Test Case" : "Lưu bài học";
    }
    if (activeTab === "testcode") {
      return tempLessonId ? "Hoàn tất & Lưu Test Case" : "Lưu Test Code";
    }
    return "Lưu câu hỏi";
  };

  const handleEdit = async (record: any, type: LessonType) => {
    setEditingId(type === "quiz" ? record.chapterQuizId : record.lessonId);
    setEditingType(type);
    setActiveTab(type);

    if (type === "quiz") {
      // Load quiz data
      try {
        // Lấy chi tiết questions của quiz
        const questions = await quizService.getQuestionsByQuiz(record.chapterQuizId);

        let formattedQuestions: QuizQuestion[] = [];

        if (Array.isArray(questions) && questions.length > 0) {
          // Với mỗi question, lấy options
          const questionsWithOpts = await Promise.all(questions.map(async (q: any) => {
            const options = await quizService.getOptionsByQuestion(q.quizQuestionId);
            const optsText = options.map((o: any) => o.optionText);
            const correctIndex = options.findIndex((o: any) => o.isCorrect);

            return {
              id: q.quizQuestionId,
              question: q.questionText,
              options: optsText.length > 0 ? optsText : ["Tùy chọn 1"],
              correctAnswer: correctIndex !== -1 ? correctIndex : null,
              required: q.required || false // Backend có thể chưa trả về field này
            };
          }));
          formattedQuestions = questionsWithOpts;
        } else {
          formattedQuestions = [
            {
              id: Date.now().toString(),
              question: "Câu hỏi mẫu",
              options: ["Tùy chọn 1"],
              correctAnswer: null,
              required: false,
            },
          ];
        }

        setQuizData({
          title: record.title || "",
          description: record.description || "",
          questions: formattedQuestions,
        });
      } catch (error) {
        console.error("Error loading quiz details:", error);
        message.error("Không thể tải chi tiết câu hỏi");
      }
    } else {
      form.setFieldsValue(record);
    }

    setShowForm(true);
  };

  const handleDelete = async (id: string, type: LessonType) => {
    try {
      if (type === "quiz") {
        await quizService.deleteQuiz(id);
        message.success("Đã xóa bài trắc nghiệm!");
        fetchQuizzes();
      } else {
        await lessonService.deleteLesson(id);
        message.success("Đã xóa bài học!");
        fetchLessons();
      }
    } catch (err: any) {
      console.error(err);
      message.error(err.message || "Lỗi khi xóa");
    }
  };

  // Combine lessons and quizzes for display
  const combinedData = useMemo(() => {
    const lessonsWithType = lessons.map((lesson) => ({
      ...lesson,
      type: "lesson" as const,
      key: `lesson-${lesson.lessonId}`,
    }));

    const quizzesWithType = quizzes.map((quiz) => ({
      ...quiz,
      type: "quiz" as const,
      key: `quiz-${quiz.chapterQuizId}`,
      lessonName: quiz.title,
    }));

    return [...lessonsWithType, ...quizzesWithType];
  }, [lessons, quizzes]);

  const columns: ColumnsType<any> = useMemo(
    () => [
      {
        title: "#",
        render: (_record: unknown, _row: unknown, i: number) => i + 1,
      },
      { title: "Tên bài học", dataIndex: "lessonName" },
      {
        title: "Loại bài",
        dataIndex: "type",
        render: (type: string) => {
          if (type === "quiz") return <Tag color="blue">Trắc nghiệm</Tag>;
          return <Tag color="green">Bài học</Tag>;
        },
      },
      {
        title: "Thời lượng (phút)",
        dataIndex: "duration",
        align: "center" as const,
        render: (val: any, record: any) => {
          if (record.type === "quiz") return "-";
          return val || "-";
        },
      },

      {
        title: "Thao tác",
        render: (_: unknown, record: any) => (
          <Space>
            {record.type === "lesson" && (
              <Button
                onClick={() =>
                  navigate(`/admin/lesson/detail/${record.lessonId}`, {
                    state: { lessonName: record.lessonName },
                  })
                }
              >
                Chi tiết
              </Button>
            )}

            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() =>
                handleEdit(
                  record,
                  record.type === "quiz" ? "quiz" : "normal"
                )
              }
            />

            <Popconfirm
              title={`Xóa ${record.type === "quiz" ? "bài trắc nghiệm" : "bài học"} này?`}
              okText="Xóa"
              cancelText="Hủy"
              onConfirm={() =>
                handleDelete(
                  record.type === "quiz"
                    ? record.chapterQuizId
                    : record.lessonId,
                  record.type === "quiz" ? "quiz" : "normal"
                )
              }
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [navigate]
  );

  // Render form fields based on active tab
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
            rules={
              !editingId
                ? [{ required: true, message: "Vui lòng chọn video!" }]
                : []
            }
          >
            <Upload beforeUpload={beforeUpload} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Chọn file video</Button>
            </Upload>
          </Form.Item>
          {!editingId && (
            <Form.Item name="hasTestCase" valuePropName="checked">
              <Checkbox
                onChange={(e) => setHasTestCase(e.target.checked)}
                style={{ fontWeight: 500 }}
              >
                Bài học này có bài tập thực hành code (Thêm Test Case)
              </Checkbox>
            </Form.Item>
          )}
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

    // Quiz tab
    if (activeTab === "quiz") {
      return (
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
                <div style={{ marginBottom: 8, fontWeight: 500, color: '#1890ff' }}>
                  Chọn đáp án đúng:
                </div>
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
                          padding: '8px',
                          borderRadius: '4px',
                          backgroundColor: question.correctAnswer === optIndex ? '#e6f7ff' : 'transparent',
                          border: question.correctAnswer === optIndex ? '1px solid #91d5ff' : '1px solid transparent'
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
                        {question.correctAnswer === optIndex && <CheckCircleOutlined style={{ color: '#52c41a' }} />}
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
                  <span style={{ fontSize: 14, color: "#666" }}>Bắt buộc</span>
                  <Switch
                    checked={question.required}
                    onChange={(checked) => updateQuestion(question.id, "required", checked)}
                  />
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
      );
    }

    return null;
  }, [activeTab, tempLessonId, hasTestCase, quizData, editingId]);

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
          onClick={() => {
            setShowForm((p) => !p);
            if (!showForm) {
              setEditingId(null);
              setEditingType(null);
              form.resetFields();
            }
          }}
        >
          {showForm ? "Ẩn form" : "Thêm bài học / Trắc nghiệm"}
        </Button>
      </div>

      {/* FORM */}
      {showForm && (
        <Card
          title={
            editingId
              ? `✏️ Sửa ${editingType === "quiz" ? "trắc nghiệm" : "bài học"}`
              : "➕ Thêm bài học mới"
          }
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

      {/* Bảng danh sách bài học & quiz */}
      <Card
        style={{
          borderRadius: "1rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <Table
          columns={columns}
          dataSource={combinedData}
          rowKey="key"
          bordered
          pagination={false}
          loading={isTableLoading}
          locale={{ emptyText: "Chưa có bài học hoặc trắc nghiệm nào" }}
        />
      </Card>
    </div>
  );
};

export default LessonList;