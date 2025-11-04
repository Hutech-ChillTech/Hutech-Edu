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
  Tabs,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CodeOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const { Title } = Typography;

interface Lesson {
  lessonId: string;
  lessonTitle: string;
  lessonType: "normal" | "testcode" | "quiz";
  duration?: number;
  content?: string;
  chapterId: string;
}

const LessonList: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"normal" | "testcode" | "quiz">(
    "normal"
  );
  const [loading, setLoading] = useState(false);
  const chapterName = location.state?.chapterName || "Chương học";

  //  Giả lập fetch (bạn thay bằng API thật)
  const fetchLessons = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/lessons/${chapterId}`);
      const data = await res.json();
      if (data.success) setLessons(data.data);
    } catch (err) {
      console.error(err);
      message.error("Không thể tải danh sách bài học");
    }
  }, [chapterId]);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  //  Thêm bài học
  const handleFinish = async (values: any) => {
    const payload = {
      ...values,
      lessonType: activeTab,
      chapterId,
    };
    console.log("Thêm mới:", payload);

    try {
      const res = await fetch("http://localhost:3000/api/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        message.success("Thêm bài học thành công!");
        form.resetFields();
        fetchLessons();
      }
    } catch (err) {
      message.error("Lỗi khi thêm bài học");
    }
  };

  const columns = [
    { title: "#", render: (_: any, __: any, i: number) => i + 1 },
    { title: "Tên bài học", dataIndex: "lessonTitle" },
    {
      title: "Loại bài",
      dataIndex: "lessonType",
      render: (val: string) => {
        if (val === "testcode") return "💻 Test Code";
        if (val === "quiz") return "❓ Trắc nghiệm";
        return "📘 Bài học";
      },
    },
    { title: "Thời lượng (phút)", dataIndex: "duration", align: "center" },
  ];

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

          {/* 🧩 Form hiển thị động */}
          <Form layout="vertical" form={form} onFinish={handleFinish}>
            {activeTab === "normal" && (
              <>
                <Form.Item
                  label="Tên bài học"
                  name="lessonTitle"
                  rules={[{ required: true, message: "Nhập tên bài học" }]}
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

            {activeTab === "testcode" && (
              <>
                <Form.Item
                  label="Tên test code"
                  name="lessonTitle"
                  rules={[{ required: true, message: "Nhập tên test code" }]}
                >
                  <Input placeholder="Tên bài kiểm tra code..." />
                </Form.Item>
                <Form.Item
                  label="Đề bài"
                  name="problem"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea rows={4} placeholder="Nhập đề bài code..." />
                </Form.Item>
                <Form.Item label="Đáp án mẫu" name="expectedOutput">
                  <Input.TextArea rows={3} placeholder="Kết quả mong đợi..." />
                </Form.Item>
              </>
            )}

            {activeTab === "quiz" && (
              <>
                <Form.Item
                  label="Câu hỏi"
                  name="question"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea rows={3} placeholder="Nhập câu hỏi trắc nghiệm..." />
                </Form.Item>
                <Form.Item
                  label="Các lựa chọn"
                  name="options"
                  rules={[{ required: true }]}
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
            )}

            <div style={{ textAlign: "right", marginTop: 20 }}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Lưu {activeTab === "normal"
                  ? "bài học"
                  : activeTab === "testcode"
                  ? "test code"
                  : "câu hỏi"}
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
        />
      </Card>
    </div>
  );
};

export default LessonList;
