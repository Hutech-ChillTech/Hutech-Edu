import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Table,
  Button,
  Input,
  Form,
  Typography,
  Space,
  message,
  Card,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UpOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

const { Title } = Typography;

interface Chapter {
  chapterId: number;
  chapterName: string;
  totalLesson: number;
  courseId: number;
}

interface Course {
  KhoaHocId: number;
  TenKhoaHoc: string;
}

const fakeCourses: Course[] = [
  { KhoaHocId: 1, TenKhoaHoc: "React cơ bản" },
  { KhoaHocId: 2, TenKhoaHoc: "TypeScript nâng cao" },
];

const fakeChapters: Chapter[] = [
  { chapterId: 1, chapterName: "Giới thiệu React", totalLesson: 4, courseId: 1 },
  { chapterId: 2, chapterName: "JSX & Component", totalLesson: 5, courseId: 1 },
  { chapterId: 3, chapterName: "Type nâng cao", totalLesson: 3, courseId: 2 },
  { chapterId: 4, chapterName: "Interface & Generic", totalLesson: 2, courseId: 2 },
];

const fakeLessons = [
  { lessonId: 1, lessonName: "Giới thiệu ReactJS", videoUrl: "", chapterId: 1 },
  { lessonId: 2, lessonName: "Cấu trúc Component", videoUrl: "", chapterId: 1 },
  { lessonId: 3, lessonName: "JSX cơ bản", videoUrl: "", chapterId: 2 },
  { lessonId: 4, lessonName: "TypeScript với React", videoUrl: "", chapterId: 3 },
];

const ChapterList: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [courseName, setCourseName] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  // Lấy danh sách chương theo khóa học
  useEffect(() => {
    if (courseId) {
      const course = fakeCourses.find((c) => c.KhoaHocId === Number(courseId));
      if (course) setCourseName(course.TenKhoaHoc);
      const filtered = fakeChapters.filter((c) => c.courseId === Number(courseId));
      setChapters(filtered);
    }
  }, [courseId]);

  // Submit form thêm/sửa chương
  const handleFinish = async (values: any) => {
    try {
      setLoading(true);
      if (editingId) {
        message.success("✅ Cập nhật chương thành công (fake)");
      } else {
        message.success("✅ Thêm chương mới thành công (fake)");
      }
      form.resetFields();
      setEditingId(null);
      setShowForm(false);
    } catch {
      message.error("❌ Lỗi khi lưu chương");
    } finally {
      setLoading(false);
    }
  };

  // Sửa chương
  const handleEdit = useCallback(
    (record: Chapter) => {
      form.setFieldsValue({
        chapterName: record.chapterName,
      });
      setEditingId(record.chapterId);
      setShowForm(true);
    },
    [form]
  );

  // Xóa chương
  const handleDelete = useCallback((id: number) => {
    message.success("🗑️ Đã xóa chương (fake)");
    setChapters((prev) => prev.filter((c) => c.chapterId !== id));
  }, []);

  // Xem danh sách bài học
  const handleViewLessons = (chapterId: number) => {
    const lessons = fakeLessons.filter((l) => l.chapterId === chapterId);
    navigate(`/admin/lessons/${chapterId}`, { state: { lessons } });
  };

  // Quay lại trang khóa học
  const handleBackToCourses = () => {
    navigate("/admin/course");
  };

  // Cột bảng
  const columns = useMemo(
    () => [
      { title: "#", render: (_: unknown, __: unknown, index: number) => index + 1, width: 60 },
      { title: "Tên chương", dataIndex: "chapterName" },
      {
        title: "Tổng số bài học",
        dataIndex: "totalLesson",
        align: "center" as const,
        render: (_: any, record: Chapter) =>
          fakeLessons.filter((l) => l.chapterId === record.chapterId).length,
      },
      {
        title: "Thao tác",
        render: (_: unknown, record: Chapter) => (
          <Space>
            <Button icon={<BookOutlined />} onClick={() => handleViewLessons(record.chapterId)}>
              Xem bài học
            </Button>
            <Button
              type="primary"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEdit(record)}
            />
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa chương này?"
              onConfirm={() => handleDelete(record.chapterId)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button danger icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [handleEdit, handleDelete]
  );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", paddingBottom: 50 }}>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={handleBackToCourses}>⬅️ Quay lại</Button>
        <Title level={3}>📚 Khóa học: {courseName}</Title>
      </Space>

      {/* Nút toggle ẩn/hiện form */}
      <div style={{ textAlign: "right", marginBottom: 12 }}>
        <Button
          type="primary"
          icon={showForm ? <UpOutlined /> : <PlusOutlined />}
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "Ẩn form" : "Thêm chương mới"}
        </Button>
      </div>

      {/* Form thêm/sửa chương */}
      {showForm && (
        <Card
          title={editingId ? "✏️ Cập nhật chương" : "➕ Thêm chương mới"}
          bordered={false}
          style={{
            borderRadius: "1rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            marginBottom: 20,
          }}
        >
          <Form layout="vertical" form={form} onFinish={handleFinish}>
            <Form.Item
              label="Tên chương"
              name="chapterName"
              rules={[{ required: true, message: "Vui lòng nhập tên chương" }]}
            >
              <Input placeholder="Nhập tên chương..." />
            </Form.Item>

            <div style={{ textAlign: "right", marginTop: 20 }}>
              <Space>
                <Button type="primary" htmlType="submit" loading={loading}>
                  {editingId ? "Cập nhật" : "Thêm mới"}
                </Button>
                {editingId && (
                  <Button
                    onClick={() => {
                      form.resetFields();
                      setEditingId(null);
                    }}
                  >
                    Hủy
                  </Button>
                )}
              </Space>
            </div>
          </Form>
        </Card>
      )}

      {/* Bảng danh sách chương */}
      <Card
        style={{ borderRadius: "1rem", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
        bordered={false}
      >
        <Table columns={columns} dataSource={chapters} rowKey="chapterId" bordered />
      </Card>
    </div>
  );
};

export default ChapterList;
