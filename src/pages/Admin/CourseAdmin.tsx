
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Space,
  Table,
  Typography,
  message,
  Popconfirm,
  Card,
} from "antd";
import { useNavigate } from "react-router-dom"; // ✅ thêm dòng này để điều hướng
// import AdminLayout from "../../layouts/AdminLayout";

const { Title } = Typography;

interface Course {
  KhoaHocId: number;
  TenKhoaHoc: string;
  MoTa: string;
  Gia: number;
}

const CourseAdmin: React.FC = () => {
  const [form] = Form.useForm();
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ dùng để chuyển trang

  const fetchCourses = async () => {
    try {
      setCourses([
        { KhoaHocId: 1, TenKhoaHoc: "React cơ bản", MoTa: "Học React", Gia: 1000000 },
        { KhoaHocId: 2, TenKhoaHoc: "TypeScript nâng cao", MoTa: "TS nâng cao", Gia: 1200000 },
      ]);
    } catch (err) {
      message.error("❌ Lỗi khi lấy danh sách khóa học");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const onFinish = async () => {
    try {
      setLoading(true);
      if (editingId) {
        message.success("✅ Cập nhật khóa học thành công! (Fake)");
      } else {
        message.success("✅ Thêm khóa học thành công! (Fake)");
      }
      setEditingId(null);
      form.resetFields();
      fetchCourses();
    } catch (err) {
      message.error("❌ Có lỗi xảy ra khi lưu khóa học!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record: Course) => {
    form.setFieldsValue({
      TenKhoaHoc: record.TenKhoaHoc,
      MoTa: record.MoTa,
      Gia: record.Gia,
    });
    setEditingId(record.KhoaHocId);
  };

  const handleDelete = async () => {
    try {
      message.success("🗑️ Xóa khóa học thành công! (Fake)");
      fetchCourses();
    } catch (err) {
      message.error("❌ Lỗi khi xóa khóa học");
      console.error(err);
    }
  };

  const columns = [
    { title: "#", render: (_: unknown, __: unknown, i: number) => i + 1, width: 50 },
    { title: "Tên khóa học", dataIndex: "TenKhoaHoc", width: 200 },
    { title: "Mô tả", dataIndex: "MoTa", width: 300 },
    {
      title: "Giá",
      dataIndex: "Gia",
      width: 120,
      render: (gia: number) => (gia ? gia.toLocaleString("vi-VN") + " đ" : ""),
    },
    {
      title: "Thao tác",
      width: 260,
      render: (_: unknown, record: Course) => (
        <Space>
          {/* ✅ Nút mới để xem danh sách chương */}
          <Button onClick={() => navigate(`/admin/chapters/${record.KhoaHocId}`)}>
            Chi tiết chương
          </Button>

          <Button type="primary" onClick={() => handleEdit(record)}>
            Sửa
          </Button>

          <Popconfirm
            title="Bạn có chắc chắn muốn xóa khóa học này?"
            onConfirm={() => handleDelete()}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="fade-in" style={{ padding: 20 }}>
      <Title level={3}>🎓 Quản lý Khóa học</Title>

      <Card
        title={editingId ? "✏️ Cập nhật khóa học" : "➕ Thêm khóa học"}
        style={{ marginBottom: 24 }}
        hoverable
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Tên khóa học"
            name="TenKhoaHoc"
            rules={[{ required: true, message: "Vui lòng nhập tên khóa học" }]}
          >
            <Input placeholder="Nhập tên khóa học" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="MoTa"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea rows={3} placeholder="Nhập mô tả khóa học" />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="Gia"
            rules={[{ required: true, message: "Vui lòng nhập giá khóa học" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="Nhập giá"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            />
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
        dataSource={courses}
        rowKey="KhoaHocId"
        pagination={{ pageSize: 5 }}
        bordered
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default CourseAdmin;
