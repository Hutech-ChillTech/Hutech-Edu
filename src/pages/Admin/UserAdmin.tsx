import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Table,
  Button,
  Input,
  Form,
  Select,
  Typography,
  Space,
  message,
  Card,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
import axios from "../../service/axiosClient";

const { Title } = Typography;
const { Option } = Select;

interface User {
  userId: string;
  userName: string;
  email: string;
  gender: string;
  level: string;
  created_at: string;
}

const UserAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  // Lấy danh sách user
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users");
      setUsers(res.data.data || []);
    } catch (err) {
      console.error("❌ Lỗi khi lấy danh sách người dùng:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Thêm mới / Cập nhật user
  const handleFinish = async (values: any) => {
    console.log("🔥 Payload gửi lên:", values, "editingId:", editingId);
    try {
      // Payload đầy đủ cho cả thêm mới và cập nhật
      const payload = {
        userName: values.userName,
        email: values.email,
        gender: values.gender,
        level: values.level,
        // password chỉ gửi khi thêm mới
        ...(editingId ? {} : { password: values.password }),
      };

      if (editingId) {
        // Cập nhật user → đường dẫn tĩnh
        await axios.put(`http://localhost:3000/api/users/${editingId}`, payload);
        message.success("✅ Cập nhật người dùng thành công!");
      } else {
        // Thêm mới → đường dẫn tĩnh
        await axios.post("http://localhost:3000/api/users/register", payload);
        message.success("✅ Thêm người dùng mới thành công!");
      }

      form.resetFields();
      setEditingId(null);
      setShowForm(false);
      fetchUsers();
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.message) {
        message.error(`❌ ${err.response.data.message}`);
      } else {
        message.error("❌ Lỗi khi lưu người dùng!");
      }
    }
  };


  // Sửa user
  const handleEdit = useCallback(
    (user: User) => {
      setShowForm(true);
      form.setFieldsValue({
        userName: user.userName,
        email: user.email,
        gender: user.gender,
        level: user.level,
      });
      setEditingId(user.userId);
    },
    [form]
  );

  // Xóa user
  const handleDelete = useCallback(async (userId: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;
    try {
      await axios.delete(`/users/${userId}`);
      fetchUsers();
      message.success("🗑️ Xóa người dùng thành công!");
    } catch (err) {
      message.error("❌ Không thể xóa người dùng!");
      console.error(err);
    }
  }, []);

  // Columns bảng
  const columns = useMemo(
    () => [
      { title: "#", render: (_: unknown, __: unknown, index: number) => index + 1, width: 60 },
      { title: "Tên đăng nhập", dataIndex: "userName" },
      { title: "Email", dataIndex: "email" },
      { title: "Giới tính", dataIndex: "gender", render: (val: string) => (val === "MALE" ? "Nam" : "Nữ") },
      { title: "Cấp độ", dataIndex: "level" },
      {
        title: "Ngày tạo",
        dataIndex: "created_at",
        render: (val: string) =>
          new Date(val).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }),
      },
      {
        title: "Thao tác",
        render: (_: unknown, user: User) => (
          <Space>
            <Button type="primary" icon={<EditOutlined />} size="small" onClick={() => handleEdit(user)} />
            <Button danger icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(user.userId)} />
          </Space>
        ),
      },
    ],
    [handleEdit, handleDelete]
  );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", paddingBottom: 50 }}>
      <Title level={3} style={{ marginBottom: 24 }}>👤 Quản lý Người dùng</Title>

      {/* Nút toggle ẩn/hiện form */}
      <div style={{ textAlign: "right", marginBottom: 12 }}>
        <Button
          type="primary"
          icon={showForm ? <UpOutlined /> : <PlusOutlined />}
          onClick={() => setShowForm(prev => !prev)}
        >
          {showForm ? "Ẩn form" : "Thêm người dùng mới"}
        </Button>
      </div>

      {/* Form thêm/sửa */}
      {showForm && (
        <Card
          title={editingId ? "✏️ Chỉnh sửa người dùng" : "➕ Thêm người dùng mới"}
          bordered={false}
          style={{ borderRadius: "1rem", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 20 }}
        >
          <Form layout="vertical" form={form} onFinish={handleFinish}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <Form.Item
                name="userName"
                label="Tên người dùng"
                rules={[{ required: true, message: "Vui lòng nhập tên người dùng" }]}
              >
                <Input placeholder="Tên người dùng..." />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input placeholder="Email..." />
              </Form.Item>

              {!editingId && (
                <Form.Item
                  name="password"
                  label="Mật khẩu"
                  rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
                >
                  <Input.Password placeholder="Mật khẩu..." />
                </Form.Item>
              )}

              <Form.Item
                name="level"
                label="Trình độ"
                rules={[{ required: true, message: "Vui lòng chọn trình độ" }]}
              >
                <Select placeholder="Chọn trình độ">
                  <Option value="Basic">Basic</Option>
                  <Option value="Intermediate">Intermediate</Option>
                  <Option value="Advanced">Advanced</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="gender"
                label="Giới tính"
                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
              >
                <Select placeholder="Chọn giới tính">
                  <Option value="MALE">Nam</Option>
                  <Option value="FEMALE">Nữ</Option>
                </Select>
              </Form.Item>
            </div>

            <div style={{ textAlign: "right", marginTop: 20 }}>
              <Space>
                <Button type="primary" htmlType="submit">{editingId ? "Cập nhật" : "Thêm mới"}</Button>
                {editingId && (
                  <Button onClick={() => { setEditingId(null); form.resetFields(); }}>Hủy</Button>
                )}
              </Space>
            </div>
          </Form>
        </Card>
      )}

      {/* Bảng danh sách user */}
      <Card style={{ borderRadius: "1rem", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }} bordered={false}>
        <Table columns={columns} dataSource={users} rowKey="userId" scroll={{ x: true }} bordered />
      </Card>
    </div>
  );
};

export default UserAdmin;
