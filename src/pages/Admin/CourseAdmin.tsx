import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Table,
  Button,
  Input,
  InputNumber,
  Form,
  Typography,
  Space,
  message,
  Card,
  Popconfirm,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UpOutlined,
  BookOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // npm install jwt-decode

const { Title } = Typography;
const { Option } = Select;

interface Course {
  courseId: string;
  courseName: string;
  courseDescription: string;
  coursePrice: number;
  level: string;
}

interface DecodedToken {
  id?: string;
  userId?: string;
  role?: string;
  exp?: number;
}

const CourseAdmin: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  //  Giải mã token để lấy thông tin admin
  const decoded = useMemo(() => {
    if (!token) return null;
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error("Token decode error:", error);
      return null;
    }
  }, [token]);

  const adminId = decoded?.userId || decoded?.id;

  //  Lấy danh sách khóa học
  const fetchCourses = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/api/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        //  Sắp xếp tăng dần theo ngày tạo (nếu có)
        const sorted = [...data.data].sort(
          (a: any, b: any) =>
            new Date(a.created_at || 0).getTime() -
            new Date(b.created_at || 0).getTime()
        );
        setCourses(sorted);
      } else {
        message.warning(data.message || "Không lấy được danh sách khóa học!");
      }
    } catch (error) {
      console.error(error);
      message.error("❌ Lỗi khi tải danh sách khóa học!");
    }
  }, [token]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  //  Thêm / Cập nhật khóa học
  const handleFinish = async (values: any) => {
    try {
      const payload = {
        courseName: values.courseName,
        courseDescription: values.courseDescription,
        coursePrice: values.coursePrice,
        level: values.level,
        createdBy: adminId,
      };

      let url = "http://localhost:3000/api/courses/create";
      let method = "POST";

      if (editingId) {
        url = `http://localhost:3000/api/courses/update/${editingId}`;
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
        message.success(
          editingId
            ? "✅ Cập nhật khóa học thành công!"
            : "✅ Thêm khóa học thành công!"
        );
        form.resetFields();
        setEditingId(null);
        setShowForm(false);
        fetchCourses();
      } else {
        message.error(data.message || "❌ Lỗi khi lưu khóa học!");
      }
    } catch (err) {
      console.error(err);
      message.error("❌ Lỗi khi lưu khóa học!");
    }
  };

  //  Sửa khóa học
  const handleEdit = useCallback(
    (record: Course) => {
      setShowForm(true);
      form.setFieldsValue({
        courseName: record.courseName,
        courseDescription: record.courseDescription,
        coursePrice: record.coursePrice,
        level: record.level,
      });
      setEditingId(record.courseId);
    },
    [form]
  );
  //  Xóa khóa học
  const handleDelete = useCallback(
    async (courseId: string) => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/courses/delete/${courseId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();

        if (data.success) {
          message.success("🗑️ Xóa khóa học thành công!");
          fetchCourses();
        } else {
          message.error(data.message || "❌ Lỗi khi xóa khóa học!");
        }
      } catch (err) {
        console.error(err);
        message.error("❌ Không thể xóa khóa học!");
      }
    },
    [fetchCourses, token]
  );

  //  Cấu hình bảng hiển thị
  const columns = useMemo(
    () => [
      {
        title: "#",
        render: (_: unknown, __: unknown, i: number) => i + 1,
        width: 60,
      },
      { title: "Tên khóa học", dataIndex: "courseName" },
      { title: "Mô tả", dataIndex: "courseDescription" },
      {
        title: "Giá (VNĐ)",
        dataIndex: "coursePrice",
        render: (val: number) => val?.toLocaleString("vi-VN") + " ₫",
      },
      { title: "Cấp độ", dataIndex: "level" },
      {
        title: "Thao tác",
        render: (_: unknown, record: Course) => (
          <Space>
            <Button
              type="default"
              icon={<ReadOutlined />}
              size="small"
              onClick={() => navigate(`/admin/chapters/${record.courseId}`)}
            >
              Chi tiết
            </Button>
            <Button
              type="primary"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEdit(record)}
            />
            <Popconfirm
              title="Bạn có chắc muốn xóa khóa học này?"
              onConfirm={() => handleDelete(record.courseId)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button danger icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [handleEdit, handleDelete, navigate]
  );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", paddingBottom: 50 }}>
      <Title level={3} style={{ marginBottom: 24 }}>
        🎓 Quản lý Khóa học
      </Title>

      <div style={{ textAlign: "right", marginBottom: 12 }}>
        <Button
          type="primary"
          icon={showForm ? <UpOutlined /> : <PlusOutlined />}
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "Ẩn form" : "Thêm khóa học mới"}
        </Button>
      </div>

      {showForm && (
        <Card
          title={editingId ? "✏️ Chỉnh sửa khóa học" : "➕ Thêm khóa học mới"}
          variant="borderless" // ✅ Thay bordered={false}
          style={{
            borderRadius: "1rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            marginBottom: 20,
          }}
        >
          <Form layout="vertical" form={form} onFinish={handleFinish}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <Form.Item
                name="courseName"
                label="Tên khóa học"
                rules={[
                  { required: true, message: "Vui lòng nhập tên khóa học" },
                ]}
              >
                <Input placeholder="Tên khóa học..." prefix={<BookOutlined />} />
              </Form.Item>

              <Form.Item
                name="coursePrice"
                label="Giá khóa học (VNĐ)"
                rules={[
                  { required: true, message: "Vui lòng nhập giá khóa học" },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  placeholder="Nhập giá..."
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                />
              </Form.Item>

              <Form.Item
                name="courseDescription"
                label="Mô tả"
                rules={[
                  { required: true, message: "Vui lòng nhập mô tả khóa học" },
                ]}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Mô tả ngắn về khóa học..."
                />
              </Form.Item>

              <Form.Item
                name="level"
                label="Cấp độ"
                rules={[
                  { required: true, message: "Vui lòng chọn cấp độ" },
                ]}
              >
                <Select placeholder="Chọn cấp độ">
                  <Option value="Basic">Beginner</Option>
                  <Option value="Intermediate">Intermediate</Option>
                  <Option value="Advanced">Advanced</Option>
                </Select>
              </Form.Item>
            </div>

            <div style={{ textAlign: "right", marginTop: 20 }}>
              <Space>
                <Button type="primary" htmlType="submit">
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

      <Card
        variant="borderless" // ✅ Thay bordered={false}
        style={{
          borderRadius: "1rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <Table
          columns={columns}
          dataSource={courses}
          rowKey="courseId"
          bordered
          scroll={{ x: true }}
          locale={{ emptyText: "Chưa có khóa học nào" }}
        />
      </Card>
    </div>
  );
};

export default CourseAdmin;
