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
  Checkbox
} from "antd";
import type { TabsProps } from "antd";
import { Popconfirm, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  PlusOutlined,
  CodeOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
  ArrowRightOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { useParams, useNavigate, useLocation } from "react-router-dom";

// Khai báo các service
import { lessonService } from "../../service/lesson.service";
import { testCaseService } from "../../service/testCase.service";
import { uploadService } from "../../service/upload.service";
import { type Lesson, type TestCase } from "../../types/database.types";

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

  const handleEdit = async (record: Lesson) => {
    try {
      setShowForm(true);
      setTempLessonId(record.lessonId);

      const type = (record.lessonType as LessonType) || "normal";
      setActiveTab(type);

      form.setFieldsValue({
        lessonName: record.lessonName,
        content: record.content,
        isPreview: record.isPreview,
        videoFile: [], // Reset file list khi edit
      });

      if (type === 'testcode') {
        setHasTestCase(true);
      } else {
        setHasTestCase(false);
      }

      message.success("Đang sửa bài học: " + record.lessonName);
    } catch (error) {
      console.error(error);
      message.error("Lỗi khi chuẩn bị sửa");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await lessonService.deleteLesson(id);
      console.log("Delete lesson res:", res);
      message.success("Xóa thành công!");
      fetchLessons();
    } catch (error) {
      message.error("Xóa thất bại");
    }
  };

  const columns: ColumnsType<Lesson> = useMemo(
    () => [
      { title: "#", render: (_record, _row, i) => i + 1, width: 50 },
      { title: "Tên bài học", dataIndex: "lessonName" },
      {
        title: "Loại bài",
        dataIndex: "lessonType",
        width: 150,
        render: (val: string) => {
          if (val === "testcode") return "💻 Test Code";
          if (val === "quiz") return "❓ Trắc nghiệm";
          return "📘 Bài học";
        },
      },
      {
        title: "Hành động",
        key: "action",
        align: "center",
        width: 120,
        render: (_, record) => (
          <Space size="middle">
            <Tooltip title="Sửa">
              <Button
                type="primary"
                ghost
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
              />
            </Tooltip>

            <Popconfirm
              title="Xóa bài học này?"
              description="Hành động này không thể hoàn tác."
              onConfirm={() => handleDelete(record.lessonId)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Tooltip title="Xóa">
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    []
  );

  const renderFormFields = useCallback(() => {
    if (activeTab === "normal") {
      return (
        <>
          <Form.Item name="hasTestCase" valuePropName="checked">
            <Checkbox
              onChange={(e) => setHasTestCase(e.target.checked)}
              style={{ fontWeight: 500 }}
            >
              Bài học này có bài tập thực hành code (Thêm Test Case)
            </Checkbox>
          </Form.Item>

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

          {!hasTestCase && (
            <Form.Item label="Upload video" name="videoFile" valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload beforeUpload={beforeUpload} maxCount={1} listType="picture">
                <Button icon={<UploadOutlined />}>Chọn file video</Button>
              </Upload>
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

          <Form.Item label="Đoạn mã kiểm tra (Chỉ dành cho dạng bài HTML/CSS)" name="testCode">
            <Input.TextArea rows={3} placeholder="Đoạn mã kiểm tra HTML/CSS.." />
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
  }, [activeTab, tempLessonId, hasTestCase]);


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


  const handleFinish = async (values: LessonFormValues) => {
    try {
      if (!chapterId || chapterId === "undefined") {
        message.error("Lỗi: Không tìm thấy ID chương! Vui lòng quay lại và chọn chương đúng.");
        return;
      }
      setIsSubmitting(true);

      let newLessonId = tempLessonId;

      if (!newLessonId) {
        const lessonFormData = new FormData();
        lessonFormData.append("lessonName", values.lessonName?.trim() || "");
        lessonFormData.append("chapterId", chapterId || "");
        lessonFormData.append("isPreview", values.isPreview ? "true" : "false");
        lessonFormData.append("lessonType", activeTab);

        if (activeTab === "normal") {
          if (values.content) lessonFormData.append("content", values.content);

          if (!hasTestCase) {
            const fileList = values.videoFile as any[];

            if (fileList && fileList.length > 0) {
              const fileObj = fileList[0];
              if (fileObj.originFileObj) {
                try {
                  message.loading({ content: "Đang upload video lên Cloud... Vui lòng đợi!", key: 'uplo', duration: 0 });

                  const cloudData = await uploadService.uploadVideo(fileObj.originFileObj);

                  const { secure_url, public_id } = cloudData;

                  lessonFormData.append("videoUrl", secure_url);
                  lessonFormData.append("publicId", public_id);

                  message.success({ content: "Upload video thành công!", key: 'uplo' });
                } catch (uErr) {
                  console.error(uErr);
                  message.error({ content: "Upload video thất bại! Vui lòng thử lại.", key: 'uplo' });
                  setIsSubmitting(false);
                  return;
                }
              }
            }
          }
        }

        const createdLesson = await lessonService.createLesson(lessonFormData);
        if (!createdLesson) throw new Error("Không tạo được bài học");

        newLessonId = (createdLesson as any).lessonId || (createdLesson as any).id;

        // Nếu có Test Case, chuyển tab để nhập tiếp
        if (activeTab === "normal" && hasTestCase) {
          message.success("Đã lưu bài học video. Vui lòng nhập thông tin Test Case.");
          setTempLessonId(newLessonId);
          setActiveTab("testcode");
          form.setFieldsValue({ lessonName: values.lessonName }); // Copy tên qua tab mới
          setIsSubmitting(false);
          return;
        }
      }

      // Kiểm tra lại ID lần nữa cho chắc
      if (!newLessonId) {
        message.warning("Lỗi ID bài học.");
        return;
      }

      if (activeTab === "testcode") {
        const testCasePayload: Partial<TestCase> = {
          lessonId: newLessonId,
          description: values.description,
          input: values.input,
          expectedOutput: values.expectedOutput,
          testCode: (values as any).testCode,
        };

        await testCaseService.createTestCase(testCasePayload);
        message.success("Thêm Test Case thành công!");

        form.resetFields();
        setHasTestCase(false);
        setTempLessonId(null);
        setActiveTab("normal");
        fetchLessons(); // Load lại bảng
        return;
      }

      message.success("Lưu bài học thành công!");
      setShowForm(false);
      form.resetFields();
      setTempLessonId(null);
      fetchLessons();

    } catch (error) {
      console.error(error);
      message.error("Có lỗi xảy ra khi lưu bài học");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSubmitButtonText = () => {
    if (activeTab === "normal") {
      return hasTestCase ? "Lưu video & Tiếp tục thêm Test Code" : "Lưu bài học";
    }
    if (activeTab === "testcode") return "Lưu Test Code";
    return "Lưu Quiz";
  };

  return (
    <div style={{ padding: 24 }}>
      <Card
        title={
          <Space>
            <Button
              icon={<ArrowRightOutlined style={{ transform: "rotate(180deg)" }} />}
              onClick={() => navigate(-1)}
            />
            <Title level={4} style={{ margin: 0 }}>
              Quản lý bài học - {chapterName}
            </Title>
          </Space>
        }
        extra={
          !showForm && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setShowForm(true);
                setTempLessonId(null);
                form.resetFields();
                setActiveTab("normal");
              }}
            >
              Thêm bài học mới
            </Button>
          )
        }
      >
        {showForm ? (
          <div>
            <Tabs
              activeKey={activeTab}
              items={TAB_ITEMS}
              onChange={(key) => setActiveTab(key as LessonType)}
              type="card"
              style={{ marginBottom: 24 }}
            />

            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              initialValues={{ isPreview: false }}
            >
              {renderFormFields()}

              <Form.Item name="isPreview" valuePropName="checked">
                <Switch checkedChildren="Xem trước" unCheckedChildren="Khóa" />
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                  >
                    {getSubmitButtonText()}
                  </Button>
                  <Button
                    onClick={() => {
                      setShowForm(false);
                      setTempLessonId(null);
                    }}
                  >
                    Hủy
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        ) : (
          <Table
            rowKey="lessonId"
            columns={columns}
            dataSource={lessons}
            loading={isTableLoading}
            pagination={{ pageSize: 10 }}
          />
        )}
      </Card>
    </div>
  );
};

export default LessonList;