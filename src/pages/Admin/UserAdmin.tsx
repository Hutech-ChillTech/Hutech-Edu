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
  Upload,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UpOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;
import { type User } from "../../types/database.types";
import { userService } from "../../service/user.service";
import { authService } from "../../service/auth.service";
import { uploadService } from "../../service/upload.service";

const UserAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const fetchUsers = useCallback(async () => {
    try {
      const res = await userService.getAllUsers();
      setUsers(res || []);
    } catch (err) {
      console.error("❌ Lỗi khi lấy danh sách người dùng:", err);
    }
  }, []);

  // 2. Gọi hàm trong useEffect
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Upload hình ảnh
  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true);
      const result = await uploadService.uploadImage(file, "user-avatars");
      setImageUrl(result.url);
      form.setFieldsValue({ avatarURL: result.url });
      message.success("✅ Upload ảnh thành công!");
      return false;
    } catch (error) {
      message.error("❌ Upload ảnh thất bại!");
      console.error(error);
      return false;
    } finally {
      setUploadingImage(false);
    }
  };

  // Thêm mới / Cập nhật user
  const handleFinish = async (values: any) => {
    console.log("🔥 Payload gửi lên:", values, "editingId:", editingId);
    try {
      // Payload cập nhật
      const payloadUpdate = {
        userName: values.userName,
        email: values.email,
        gender: values.gender,
        level: values.level,
        specialization: values.specialization || "",
        region: values.region || "",
        dateOfBirth: values.dateOfBirth || "",
        avatarURL: values.avatarURL || imageUrl || "",
      };

      // Payload tạo mới
      const payloadRegister = {
        userName: values.userName,
        email: values.email,
        password: values.password,
        gender: values.gender,
        level: values.level || "Basic",
        specialization: values.specialization || "",
        region: values.region || "",
        dateOfBirth: values.dateOfBirth || "",
        avatarURL: values.avatarURL || imageUrl || "",
      };

      if (editingId) {
        await userService.updateUser(editingId, payloadUpdate);
        message.success("✅ Cập nhật người dùng thành công!");
      } else {
        await authService.register(payloadRegister);
        message.success("✅ Thêm người dùng mới thành công!");
      }

      form.resetFields();
      setEditingId(null);
      setShowForm(false);
      setImageUrl("");

      // Gọi lại hàm fetchUsers để cập nhật bảng
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
        specialization: (user as any).specialization || "",
        region: (user as any).region || "",
        dateOfBirth: (user as any).dateOfBirth
          ? (user as any).dateOfBirth.split("T")[0]
          : "",
        avatarURL: (user as any).avatarURL || "",
      });
      setImageUrl((user as any).avatarURL || "");
      // Lưu ID của người đang được chọn để sửa
      setEditingId(user.userId); // Hoặc user.id tùy database của bạn
    },
    [form]
  );

  // Xóa user
  const handleDelete = useCallback(
    async (userIdToDelete: string) => {
      if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;
      try {
        // ⚠️ SỬA LỖI LOGIC: Dùng ID truyền vào, KHÔNG dùng uid của admin
        await userService.deleteUser(userIdToDelete);

        fetchUsers(); // Load lại bảng
        message.success("🗑️ Xóa người dùng thành công!");
      } catch (err) {
        message.error("❌ Không thể xóa người dùng!");
        console.error(err);
      }
    },
    [fetchUsers]
  );

  // Columns bảng
  const columns = useMemo(
    () => [
      {
        title: "#",
        render: (_: unknown, __: unknown, index: number) => index + 1,
        width: 50,
        fixed: "left" as const,
      },
      {
        title: "User ID",
        dataIndex: "userId",
        width: 280,
        ellipsis: true,
        render: (id: string) => (
          <span
            style={{ fontSize: 11, fontFamily: "monospace", color: "#666" }}
          >
            {id}
          </span>
        ),
      },
      {
        title: "Ảnh đại diện",
        dataIndex: "avatarURL",
        width: 100,
        align: "center" as const,
        render: (url: string) =>
          url ? (
            <img
              src={url}
              alt="avatar"
              style={{
                width: 50,
                height: 50,
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          ) : (
            <div
              style={{
                width: 50,
                height: 50,
                background: "#f0f0f0",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                color: "#999",
                margin: "0 auto",
              }}
            >
              N/A
            </div>
          ),
      },
      {
        title: "Tên đăng nhập",
        dataIndex: "userName",
        width: 150,
        ellipsis: true,
      },
      {
        title: "Email",
        dataIndex: "email",
        width: 200,
        ellipsis: true,
      },
      {
        title: "Giới tính",
        dataIndex: "gender",
        width: 100,
        align: "center" as const,
        render: (val: string) => (
          <span
            style={{
              padding: "2px 8px",
              borderRadius: 4,
              background: val === "MALE" ? "#e6f7ff" : "#fff0f6",
              color: val === "MALE" ? "#1890ff" : "#eb2f96",
              fontSize: 12,
            }}
          >
            {val === "MALE" ? "Nam" : "Nữ"}
          </span>
        ),
      },
      {
        title: "Trình độ",
        dataIndex: "level",
        width: 120,
        render: (level: string) => {
          const colors: Record<string, string> = {
            Basic: "#87d068",
            Intermediate: "#2db7f5",
            Advanced: "#f50",
          };
          return (
            <span
              style={{
                padding: "2px 8px",
                borderRadius: 4,
                background: colors[level] || "#d9d9d9",
                color: "white",
                fontSize: 12,
              }}
            >
              {level}
            </span>
          );
        },
      },
      {
        title: "Chuyên ngành",
        dataIndex: "specialization",
        width: 120,
        ellipsis: true,
        render: (val: string) => val || "-",
      },
      {
        title: "Khu vực",
        dataIndex: "region",
        width: 120,
        ellipsis: true,
        render: (val: string) => val || "-",
      },
      {
        title: "Ngày sinh",
        dataIndex: "dateOfBirth",
        width: 120,
        render: (val: string) =>
          val
            ? new Date(val).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "-",
      },
      {
        title: "Ngày tạo",
        dataIndex: "created_at",
        width: 120,
        render: (val: string) =>
          val
            ? new Date(val).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "N/A",
      },
      {
        title: "Cập nhật lần cuối",
        dataIndex: "updated_at",
        width: 120,
        render: (val: string) =>
          val
            ? new Date(val).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "N/A",
      },
      {
        title: "Thao tác",
        width: 150,
        fixed: "right" as const,
        render: (_: unknown, user: User) => (
          <Space>
            <Button
              type="primary"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEdit(user)}
            />
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => handleDelete(user.userId)}
            />
          </Space>
        ),
      },
    ],
    [handleEdit, handleDelete]
  );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", paddingBottom: 50 }}>
      <Title level={3} style={{ marginBottom: 24 }}>
        👤 Quản lý Học viên
      </Title>

      <div style={{ textAlign: "right", marginBottom: 12 }}>
        <Button
          type="primary"
          icon={showForm ? <UpOutlined /> : <PlusOutlined />}
          onClick={() => {
            setShowForm((prev) => !prev);
            if (!showForm) {
              setEditingId(null);
              form.resetFields();
              setImageUrl("");
            }
          }}
        >
          {showForm ? "Ẩn form" : "Thêm người dùng mới"}
        </Button>
      </div>

      {showForm && (
        <Card
          title={
            editingId ? "✏️ Chỉnh sửa người dùng" : "➕ Thêm người dùng mới"
          }
          variant="borderless"
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
                name="userName"
                label="Tên người dùng"
                rules={[
                  { required: true, message: "Vui lòng nhập tên người dùng" },
                  { min: 3, message: "Tên phải có ít nhất 3 ký tự" },
                ]}
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
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu" },
                    { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" },
                  ]}
                >
                  <Input.Password placeholder="Mật khẩu (tối thiểu 8 ký tự)..." />
                </Form.Item>
              )}

              <Form.Item
                name="gender"
                label="Giới tính"
                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
              >
                <Select placeholder="Chọn giới tính">
                  <Option value="MALE">Nam</Option>
                  <Option value="FEMALE">Nữ</Option>
                  <Option value="OTHER">Khác</Option>
                </Select>
              </Form.Item>

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

              <Form.Item name="specialization" label="Chuyên ngành">
                <Input placeholder="VD: CNTT, Marketing, Thiết kế..." />
              </Form.Item>

              <Form.Item name="region" label="Khu vực">
                <Input placeholder="VD: Hồ Chí Minh, Hà Nội..." />
              </Form.Item>

              <Form.Item name="dateOfBirth" label="Ngày sinh">
                <Input type="date" />
              </Form.Item>

              <Form.Item name="avatarURL" label="Ảnh đại diện">
                <div>
                  <Upload
                    beforeUpload={handleImageUpload}
                    showUploadList={false}
                    accept="image/*"
                  >
                    <Button icon={<UploadOutlined />} loading={uploadingImage}>
                      {uploadingImage ? "Đang tải..." : "Chọn ảnh"}
                    </Button>
                  </Upload>
                  {imageUrl && (
                    <div style={{ marginTop: 12 }}>
                      <img
                        src={imageUrl}
                        alt="Preview"
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: "cover",
                          borderRadius: "50%",
                          border: "2px solid #d9d9d9",
                        }}
                      />
                    </div>
                  )}
                </div>
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
                      setEditingId(null);
                      form.resetFields();
                      setShowForm(false);
                      setImageUrl("");
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
        style={{
          borderRadius: "1rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
        variant="borderless"
      >
        <Table
          columns={columns}
          dataSource={users}
          rowKey="userId"
          scroll={{ x: true }}
          bordered
        />
      </Card>
    </div>
  );
};

export default UserAdmin;
