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
  Checkbox // 1. Import Checkbox
} from "antd";
import type { TabsProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  PlusOutlined,
  CodeOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
  ArrowRightOutlined // Import icon mới cho đẹp
} from "@ant-design/icons";
import { useParams, useNavigate, useLocation } from "react-router-dom";

// Khai báo các service
import { lessonService } from "../../service/lesson.service";
import { testCaseService } from "../../service/testCase.service";
import { type Lesson } from "../../types/database.types";

const { Title } = Typography;

type LessonType = "normal" | "testcode" | "quiz";

// ... (Giữ nguyên các hàm tiện ích và interface cũ) ...
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

interface LessonFormValues {
    // ... (Giữ nguyên interface cũ)
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
    hasTestCase?: boolean; // Thêm trường này vào interface
}
// ... (Giữ nguyên TAB_ITEMS) ...
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
  
  // 2. State mới: Check xem bài học có kèm testcase không
  const [hasTestCase, setHasTestCase] = useState(false);
  // 3. State mới: Lưu ID bài học vừa tạo (để dùng cho bước thêm testcase tiếp theo)
  const [tempLessonId, setTempLessonId] = useState<string | null>(null);

  const chapterName = location.state?.chapterName || "Chương học";

  // ... (Giữ nguyên beforeUpload và columns) ...
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
          {/* 4. Thêm Checkbox ở đây */}
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
                disabled={!!tempLessonId} // Disable nếu đang thêm testcase cho bài học vừa tạo
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

  useEffect(() =>{
    if(chapterId) fetchLessons();
  }, [chapterId, fetchLessons]);


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
          
          newLessonId = (createdLesson as any).lessonId || (createdLesson as any).id;


          if (activeTab === "normal" && hasTestCase) {
             message.success("Đã lưu bài học video. Vui lòng nhập thông tin Test Case.");
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
          lessonId: newLessonId
        };

        await testCaseService.createTestCase(testCasePayload);
        message.success("Thêm bài tập code thành công!");
      } 
      else if (activeTab === "quiz") {
         // Logic tạo quiz...
         message.success("Thêm câu hỏi trắc nghiệm thành công!");
      } 
      else if (activeTab === "normal" && !hasTestCase) {
        message.success("Thêm bài học video thành công!");
      }

      form.resetFields();
      setHasTestCase(false);
      setTempLessonId(null); 
      setActiveTab("normal"); 

    } catch (err: any) {
      console.error(err);
      message.error(err.message || "Lỗi hệ thống");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 6. Render Button Text
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

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", paddingBottom: 50 }}>
      {/* ... (Giữ nguyên Header) ... */}
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
        <Card bordered={false} style={{ borderRadius: "1rem", marginBottom: 20 }}>
          <Tabs
            activeKey={activeTab}
            onChange={(key) => {
                if (tempLessonId) {
                    message.warning("Vui lòng hoàn tất thêm Test Case trước khi chuyển tab.");
                    return;
                }
                setActiveTab(key as LessonType);
            }}
            items={TAB_ITEMS}
          />

          <Form layout="vertical" form={form} onFinish={handleFinish}>
            {renderFormFields()}
            
            {/* Chỉ hiện switch Preview ở tab normal */}
            {activeTab === 'normal' && (
                <Form.Item
                label="Cho phép học thử?"
                name="isPreview"
                valuePropName="checked"
                >
                <Switch />
                </Form.Item>
            )}

            <div style={{ textAlign: "right", marginTop: 20 }}>
              {/* 7. Sử dụng hàm lấy text cho Button */}
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={isSubmitting}
                icon={activeTab === 'normal' && hasTestCase ? <ArrowRightOutlined /> : <PlusOutlined />}
              >
                {getSubmitButtonText()}
              </Button>
            </div>
          </Form>
        </Card>
      )}

      {/* ... (Giữ nguyên Table) ... */}
      <Card bordered={false} style={{ borderRadius: "1rem" }}>
        <Table
          columns={columns}
          dataSource={lessons}
          rowKey="lessonId"
          bordered
          pagination={false}
          loading={isTableLoading}
        />
      </Card>
    </div>
  );
};

export default LessonList;