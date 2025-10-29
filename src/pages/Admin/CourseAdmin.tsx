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

const { Title } = Typography;

interface Course {
  KhoaHocId: number;
  TenKhoaHoc: string;
  MoTa: string;
  Gia: number;
}

const CourseAdmin: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const navigate = useNavigate();

  // Lấy danh sách khóa học (fake data)
  const fetchCourses = useCallback(() => {
    setCourses([
      { KhoaHocId: 1, TenKhoaHoc: "React cơ bản", MoTa: "Học React từ A-Z", Gia: 1000000 },
      { KhoaHocId: 2, TenKhoaHoc: "TypeScript nâng cao", MoTa: "Thành thạo TS", Gia: 1200000 },
    ]);
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Thêm / cập nhật khóa học
  const handleFinish = async (values: any) => {
    try {
      if (editingId) {
        message.success("✅ Cập nhật khóa học thành công! (Fake)");
      } else {
        message.success("✅ Thêm khóa học mới thành công! (Fake)");
      }
      form.resetFields();
      setEditingId(null);
      setShowForm(false);
      fetchCourses();
    } catch (err) {
      console.error(err);
      message.error("❌ Lỗi khi lưu khóa học!");
    }
  };

  // Sửa khóa học
  const handleEdit = useCallback(
    (record: Course) => {
      setShowForm(true);
      form.setFieldsValue({
        TenKhoaHoc: record.TenKhoaHoc,
        MoTa: record.MoTa,
        Gia: record.Gia,
      });
      setEditingId(record.KhoaHocId);
    },
    [form]
  );

  // Xóa khóa học
  const handleDelete = useCallback(async (KhoaHocId: number) => {
    try {
      message.success("🗑️ Xóa khóa học thành công! (Fake)");
      fetchCourses();
    } catch (err) {
      console.error(err);
      message.error("❌ Lỗi khi xóa khóa học!");
    }
  }, [fetchCourses]);

  // Cột của bảng
  const columns = useMemo(
    () => [
      { title: "#", render: (_: unknown, __: unknown, i: number) => i + 1, width: 60 },
      { title: "Tên khóa học", dataIndex: "TenKhoaHoc" },
      { title: "Mô tả", dataIndex: "MoTa" },
      {
        title: "Giá (VNĐ)",
        dataIndex: "Gia",
        render: (val: number) => val?.toLocaleString("vi-VN") + " ₫",
      },
      {
        title: "Thao tác",
        render: (_: unknown, record: Course) => (
          <Space>
            <Button
              type="default"
              icon={<ReadOutlined />}
              size="small"
              onClick={() => navigate(`/admin/chapters/${record.KhoaHocId}`)}
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
              onConfirm={() => handleDelete(record.KhoaHocId)}
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

      {/* Nút toggle ẩn/hiện form */}
      <div style={{ textAlign: "right", marginBottom: 12 }}>
        <Button
          type="primary"
          icon={showForm ? <UpOutlined /> : <PlusOutlined />}
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "Ẩn form" : "Thêm khóa học mới"}
        </Button>
      </div>

      {/* Form thêm / sửa */}
      {showForm && (
        <Card
          title={editingId ? "✏️ Chỉnh sửa khóa học" : "➕ Thêm khóa học mới"}
          bordered={false}
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
                name="TenKhoaHoc"
                label="Tên khóa học"
                rules={[{ required: true, message: "Vui lòng nhập tên khóa học" }]}
              >
                <Input placeholder="Tên khóa học..." prefix={<BookOutlined />} />
              </Form.Item>

              <Form.Item
                name="Gia"
                label="Giá khóa học (VNĐ)"
                rules={[{ required: true, message: "Vui lòng nhập giá" }]}
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
                name="MoTa"
                label="Mô tả"
                rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
              >
                <Input.TextArea rows={3} placeholder="Mô tả ngắn về khóa học..." />
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

      {/* Bảng danh sách khóa học */}
      <Card
        style={{
          borderRadius: "1rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
        bordered={false}
      >
        <Table
          columns={columns}
          dataSource={courses}
          rowKey="KhoaHocId"
          scroll={{ x: true }}
          bordered
        />
      </Card>
    </div>
  );
};

export default CourseAdmin;
