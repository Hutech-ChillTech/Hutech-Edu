import React, { useState, useEffect, useCallback, useMemo, use } from "react";
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
  Upload
} from "antd";
import type { TabsProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  PlusOutlined,
  CodeOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

// Khai báo các service
import { lessonService } from "../../service/lesson.service";
import { testCaseService } from "../../service/testCase.service";
import { quizService } from "../../service/quiz.service";
import { type Lesson } from "../../types/database.types";

const { Title } = Typography;

type LessonType = "normal" | "testcode" | "quiz";

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
  const chapterName = location.state?.chapterName || "Chương học";

  const beforeUpload = (file: File) => {
    const isVideo = file.type.startsWith("video/");
    if (!isVideo) {
      message.error("Chỉ được tải lên file video!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const columns: ColumnsType<Lesson> = useMemo(
    () => [
      { title: "#", render: (_record: unknown, _row: unknown, i: number) => i + 1 },
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
      { title: "Thời lượng (phút)", dataIndex: "duration", align: "center" },
    ],
    []
  );

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

          <Form.Item label="Upload video" name="videoFile" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload beforeUpload={beforeUpload} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Chọn file video</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Thời lượng (phút)" name="duration">
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
        </>
      );
    }

    if (activeTab === "testcode") {
      return (
        <>
          <Form.Item
            label="Tên test code"
            name="lessonName"
            rules={[{ required: true, message: "Nhập tên test code" }]}
          >
            <Input placeholder="Tên bài kiểm tra code..." />
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
  }, [activeTab]);

  // Gọi API lấy danh sách bài học  
  const fetchLessons = useCallback(async () => {
    if (!chapterId) {
      console.warn('LessonList: missing chapterId, skipping fetchLessons');
      return;
    }

    try {
      setIsTableLoading(true);
      const data = await lessonService.getLessonByChapterId(chapterId);
    
      setLessons(data || []);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      throw error;
    } finally {
      setIsTableLoading(false);
    }
  }, [chapterId]);

  useEffect(() =>{
    if(chapterId){
      console.log("Bắt đầu tải bài học cho Chapter: ", chapterId);
      fetchLessons();
    }
  }, [chapterId, fetchLessons]);

  //  Thêm bài học
  const handleFinish = async (values: LessonFormValues) => {
    try {
      setIsSubmitting(true);

      const lessonFormData = new FormData();

      lessonFormData.append("lessonName", values.lessonName?.trim() || "");
      lessonFormData.append("chapterId", chapterId || "");
      lessonFormData.append("isPreview", values.isPreview ? "true" : "false");

      if (activeTab === "normal") {
        if (values.content) lessonFormData.append("content", values.content);

        // Xử lý file video
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fileList = values.videoFile as any[];

        if (fileList && fileList.length > 0) {
          // Lấy file đầu tiên trong danh sách
          const fileObj = fileList[0];

          // Antd luôn bọc file gốc trong thuộc tính originFileObj
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

      if (!createdLesson) {
        throw new Error("Không nhận được phản hồi khi tạo bài học");
      }

      const newLessonId = (createdLesson as any).lessonId || (createdLesson as any).id;

      if (!newLessonId) {
        message.warning("Tạo bài học thành công nhưng không lấy được ID.");
        return;
      }

      if (activeTab === "testcode") {
        const testCasePayload = {
          description: values.description,
          input: values.input,
          expectedOutput: values.expectedOutput,
          lessonId: newLessonId
        };

        await testCaseService.createTestCase(testCasePayload);

        message.success("Thêm bài tập code thành công!");
      }

      else if (activeTab === "quiz") {
        // const quizPayload = {
        //   question: values.question,
        //   answer: values.answer,
        //   // Chuyển mảng options thành JSON string hoặc mảng tùy backend
        //   options: typeof values.options === 'string'
        //     ? values.options.split(';').map(s => s.trim()).filter(Boolean)
        //     : [],
        //   lessonId: newLessonId
        // };

        // Giả sử bạn có service tạo Quiz
        // await quizService.createQuiz(quizPayload);
        message.success("Thêm câu hỏi trắc nghiệm thành công!");
      }

      else {
        message.success("Thêm bài học video thành công!");
      }

      form.resetFields();

      // Tải lại danh sách bài học
      fetchLessons();

    } catch (err: any) {
      console.error(err);
      if (err.message === "Unauthorized") {
        message.error("Phiên đăng nhập hết hạn");
      } else {
        message.error(err.message || "Lỗi hệ thống");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", paddingBottom: 50 }}>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={() => navigate(-1)}>⬅️ Quay lại</Button>
        <Title level={3}>📘 {chapterName}</Title>
      </Space>

      <div style={{ textAlign: "right", marginBottom: 12 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "Ẩn form" : "Thêm bài học"}
        </Button>
      </div>

      {showForm && (
        <Card
          bordered={false}
          style={{
            borderRadius: "1rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            marginBottom: 20,
          }}
        >
          {/* 🧭 Menu chọn loại nội dung */}
          <Tabs
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key as LessonType)}
            items={TAB_ITEMS}
          />

          {/* 🧩 Form hiển thị động */}
          <Form layout="vertical" form={form} onFinish={handleFinish}>
            {renderFormFields()}
            <Form.Item
              label="Cho phép học thử?"
              name="isPreview"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <div style={{ textAlign: "right", marginTop: 20 }}>
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                {`Lưu ${activeTab === "normal"
                  ? "bài học"
                  : activeTab === "testcode"
                    ? "test code"
                    : "câu hỏi"
                  }`}
              </Button>
            </div>
          </Form>
        </Card>
      )}

      <Card
        bordered={false}
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
          loading={isTableLoading}
        />
      </Card>
    </div>
  );
};

export default LessonList;

