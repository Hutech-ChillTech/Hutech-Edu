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
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const { Title } = Typography;

interface Chapter {
  chapterId: string;
  chapterName: string;
  totalLesson: number;
  courseId: string;
  created_at?: string;
  updated_at?: string;
}

interface DecodedToken {
  id?: string;
  userId?: string;
  role?: string;
}

interface Course {
  courseId: string;
  courseName: string;
}

const ChapterList: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [courseName, setCourseName] = useState<string>(location.state?.courseName || "");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const token = localStorage.getItem("token");

  // Giải mã token
  const decoded = useMemo(() => {
    if (!token) return null;
    try {
      return jwtDecode<DecodedToken>(token);
    } catch {
      return null;
    }
  }, [token]);

  // Lấy thông tin khóa học nếu chưa có
  const fetchCourseName = useCallback(async () => {
    if (!courseId || courseName) return;
    try {
      const res = await fetch(`http://localhost:3000/api/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.data?.courseName) {
        setCourseName(data.data.courseName);
      }
    } catch (err) {
      console.error(err);
    }
  }, [courseId, courseName, token]);

  // Lấy danh sách chương
  const fetchChapters = useCallback(async () => {
    if (!courseId) return;
    try {
      const res = await fetch(`http://localhost:3000/api/chapters/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setChapters(data.data);
      } else {
        message.warning(data.message || "Không thể tải danh sách chương!");
      }
    } catch (err) {
      console.error(err);
      message.error("❌ Lỗi khi tải danh sách chương!");
    }
  }, [courseId, token]);

  useEffect(() => {
    fetchCourseName();
    fetchChapters();
  }, [fetchCourseName, fetchChapters]);

  // Thêm / Cập nhật chương
  const handleFinish = async (values: any) => {
    if (!courseId) return;
    setLoading(true);
    try {
      const payload = {
        chapterName: values.chapterName,
        totalLesson: values.totalLesson || 0,
        courseId,
      };

      let url = "http://localhost:3000/api/chapters/create";
      let method: "POST" | "PUT" = "POST";

      if (editingId) {
        url = `http://localhost:3000/api/chapters/update/${editingId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        message.success(editingId ? "✅ Cập nhật chương thành công!" : "✅ Thêm chương mới thành công!");
        form.resetFields();
        setEditingId(null);
        setShowForm(false);
        fetchChapters();
      } else {
        message.error(data.message || "❌ Lỗi khi lưu chương!");
      }
    } catch (err) {
      console.error(err);
      message.error("❌ Lỗi khi lưu chương!");
    } finally {
      setLoading(false);
    }
  };

  // Sửa chương
  const handleEdit = (record: Chapter) => {
    form.setFieldsValue({
      chapterName: record.chapterName,
      totalLesson: record.totalLesson,
    });
    setEditingId(record.chapterId);
    setShowForm(true);
  };

  // Xóa chương
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/chapters/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        message.success("🗑️ Xóa chương thành công!");
        fetchChapters();
      } else {
        message.error(data.message || "❌ Không thể xóa chương!");
      }
    } catch (err) {
      console.error(err);
      message.error("❌ Lỗi khi xóa chương!");
    }
  };

  const columns = [
    { title: "#", render: (_: any, __: any, i: number) => i + 1, width: 60 },
    { title: "Tên chương", dataIndex: "chapterName" },
    {
      title: "Tổng số bài học",
      dataIndex: "totalLesson",
      align: "center" as const,
      render: (val: number) => val || 0,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      render: (val: string) => (val ? new Date(val).toLocaleDateString("vi-VN") : "-"),
    },
    {
      title: "Thao tác",
      render: (_: unknown, record: Chapter) => (
        <Space>
          <Button
            icon={<BookOutlined />}
            onClick={() => navigate(`/admin/lessons/${record.chapterId}`)}
          >
            Xem bài học
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa chương này?"
            onConfirm={() => handleDelete(record.chapterId)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", paddingBottom: 50 }}>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={() => navigate("/admin/course")}>⬅️ Quay lại</Button>
        <Title level={3}>📚 Khóa học: {courseName || "Đang tải..."}</Title>
      </Space>

      <div style={{ textAlign: "right", marginBottom: 12 }}>
        <Button
          type="primary"
          icon={showForm ? <UpOutlined /> : <PlusOutlined />}
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "Ẩn form" : "Thêm chương mới"}
        </Button>
      </div>

      {showForm && (
        <Card
          title={editingId ? "✏️ Cập nhật chương" : "➕ Thêm chương mới"}
          bordered={false}
          style={{ borderRadius: "1rem", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 20 }}
        >
          <Form layout="vertical" form={form} onFinish={handleFinish}>
            <Form.Item
              label="Tên chương"
              name="chapterName"
              rules={[{ required: true, message: "Vui lòng nhập tên chương" }]}
            >
              <Input placeholder="Nhập tên chương..." />
            </Form.Item>

            <Form.Item label="Tổng số bài học" name="totalLesson">
              <Input type="number" placeholder="Nhập số bài học (mặc định 0)" />
            </Form.Item>

            <div style={{ textAlign: "right", marginTop: 20 }}>
              <Space>
                <Button type="primary" htmlType="submit" loading={loading}>
                  {editingId ? "Cập nhật" : "Thêm mới"}
                </Button>
                {editingId && (
                  <Button onClick={() => { form.resetFields(); setEditingId(null); }}>
                    Hủy
                  </Button>
                )}
              </Space>
            </div>
          </Form>
        </Card>
      )}

      <Card
        style={{ borderRadius: "1rem", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
        bordered={false}
      >
        <Table columns={columns} dataSource={chapters} rowKey="chapterId" bordered scroll={{ x: true }} />
      </Card>
    </div>
  );
};

export default ChapterList;
