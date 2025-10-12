import React, { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Popconfirm,
  Space,
  Table,
  Typography,
} from "antd";
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
  {
    lessonId: 1,
    lessonName: "Giới thiệu ReactJS",
    videoUrl: "https://youtu.be/Ke90Tje7VS0",
    chapterId: 1,
  },
  {
    lessonId: 2,
    lessonName: "Cấu trúc Component",
    videoUrl: "https://youtu.be/w7ejDZ8SWv8",
    chapterId: 1,
  },
  {
    lessonId: 3,
    lessonName: "JSX cơ bản",
    videoUrl: "https://youtu.be/DPnqb74Smug",
    chapterId: 2,
  },
  {
    lessonId: 4,
    lessonName: "TypeScript với React",
    videoUrl: "https://youtu.be/Z5iWr6Srsj8",
    chapterId: 3,
  },
];

const ChapterList: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [courseName, setCourseName] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (courseId) {
      const course = fakeCourses.find((c) => c.KhoaHocId === Number(courseId));
      if (course) setCourseName(course.TenKhoaHoc);
      const filtered = fakeChapters.filter((c) => c.courseId === Number(courseId));
      setChapters(filtered);
    }
  }, [courseId]);

  const onFinish = async () => {
  try {
    setLoading(true);
    if (editingId) {
      message.success("✅ Cập nhật chương thành công (fake)");
    } else {
      message.success("✅ Thêm chương mới thành công (fake)");
    }
    form.resetFields();
    setEditingId(null);
  } catch {
    message.error("❌ Lỗi khi lưu chương");
  } finally {
    setLoading(false);
  }
};



  const handleEdit = (record: Chapter) => {
    form.setFieldsValue({
      chapterName: record.chapterName,
    });
    setEditingId(record.chapterId);
  };

  const handleDelete = (id: number) => {
    message.success("🗑️ Đã xóa chương (fake)");
    setChapters((prev) => prev.filter((c) => c.chapterId !== id));
  };

  const handleViewLessons = (chapterId: number) => {
    const lessons = fakeLessons.filter((l) => l.chapterId === chapterId);
    navigate(`/admin/lessons/${chapterId}`, { state: { lessons } });
  };

  const handleBackToCourses = () => {
    navigate("/admin/course");
  };

  const columns: ColumnsType<Chapter> = [
    {
      title: "STT",
      render: (_text, _record, index) => index + 1,
      width: 60,
    },
    {
      title: "Tên chương",
      dataIndex: "chapterName",
      width: 300,
    },
    {
      title: "Tổng số bài học",
      dataIndex: "totalLesson",
      align: "center",
      width: 150,
      render: (_text, record) =>
        fakeLessons.filter((l) => l.chapterId === record.chapterId).length,
    },
    {
      title: "Thao tác",
      width: 260,
      render: (_text, record) => (
        <Space>
          <Button onClick={() => handleViewLessons(record.chapterId)}>📘 Xem bài học</Button>
          <Button type="primary" onClick={() => handleEdit(record)}>✏️ Sửa</Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa chương này?"
            onConfirm={() => handleDelete(record.chapterId)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger>🗑️ Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={handleBackToCourses}>⬅️ Quay lại khóa học</Button>
        <Title level={3}>📚 Khóa học: {courseName}</Title>
      </Space>

      <Card
        title={editingId ? "✏️ Cập nhật chương" : "➕ Thêm chương mới"}
        style={{ marginBottom: 24 }}
        hoverable
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Tên chương"
            name="chapterName"
            rules={[{ required: true, message: "Vui lòng nhập tên chương" }]}
          >
            <Input placeholder="Nhập tên chương" />
          </Form.Item>

          <Form.Item>
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
          </Form.Item>
        </Form>
      </Card>

      <Table
        columns={columns}
        dataSource={chapters}
        rowKey="chapterId"
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default ChapterList;
