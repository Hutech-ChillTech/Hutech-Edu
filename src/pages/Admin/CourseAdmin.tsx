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
  Upload,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UpOutlined,
  BookOutlined,
  ReadOutlined,
  UploadOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // npm install jwt-decode
import { uploadService } from "../../service/upload.service";

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
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
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

  //  Upload hình ảnh
  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true);
      const result = await uploadService.uploadImage(file, "course-avatars");
      setImageUrl(result.url);
      form.setFieldsValue({ avatarURL: result.url });
      message.success("Upload hình ảnh thành công!");
      return false; // Prevent default upload behavior
    } catch (error) {
      message.error("Upload hình ảnh thất bại!");
      return false;
    } finally {
      setUploadingImage(false);
    }
  };

  //  Thêm / Cập nhật khóa học
  const handleFinish = async (values: any) => {
    try {
      const payload = {
        courseName: values.courseName,
        courseDescription: values.courseDescription,
        coursePrice: values.coursePrice,
        discount: values.discount ? values.discount / 100 : 0,
        avatarURL: values.avatarURL || "",
        level: values.level,
        subLevel: values.subLevel || "",
        estimatedDuration: values.estimatedDuration || 0,
        specialization: values.specialization || "",
        tag: values.tag || "",
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

      if (!res.ok) {
        // Xử lý lỗi HTTP
        if (res.status === 404) {
          message.error(
            "❌ API endpoint không tồn tại. Vui lòng kiểm tra backend!"
          );
          return;
        }
        const errorText = await res.text();
        console.error("Error response:", errorText);
        message.error(`❌ Lỗi ${res.status}: ${res.statusText}`);
        return;
      }

      const data = await res.json();

      if (data.success) {
        message.success(
          editingId
            ? "✅ Cập nhật khóa học thành công!"
            : "✅ Thêm khóa học thành công!"
        );
        form.resetFields();
        setEditingId(null);
        setImageUrl("");
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
    (record: any) => {
      setShowForm(true);
      setImageUrl(record.avatarURL || "");
      form.setFieldsValue({
        courseName: record.courseName,
        courseDescription: record.courseDescription,
        coursePrice: record.coursePrice,
        discount: record.discount ? record.discount * 100 : 0,
        avatarURL: record.avatarURL || "",
        level: record.level,
        subLevel: record.subLevel || "",
        estimatedDuration: record.estimatedDuration || 0,
        specialization: record.specialization || "",
        tag: record.tag || "",
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
        width: 50,
        fixed: "left" as const,
      },
      {
        title: "Hình ảnh",
        dataIndex: "avatarURL",
        width: 100,
        render: (url: string) =>
          url ? (
            <img
              src={url}
              alt="Course"
              style={{
                width: 60,
                height: 40,
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
          ) : (
            <PictureOutlined style={{ fontSize: 24, color: "#d9d9d9" }} />
          ),
      },
      {
        title: "Tên khóa học",
        dataIndex: "courseName",
        width: 200,
        ellipsis: true,
      },
      {
        title: "Mô tả",
        dataIndex: "courseDescription",
        width: 250,
        ellipsis: true,
      },
      {
        title: "Giá gốc",
        dataIndex: "coursePrice",
        width: 120,
        render: (val: number) => val?.toLocaleString("vi-VN") + " ₫",
      },
      {
        title: "Giảm giá",
        dataIndex: "discount",
        width: 100,
        render: (val: number) => (val ? `${(val * 100).toFixed(1)}%` : "0%"),
      },
      {
        title: "Giá bán",
        width: 120,
        render: (_: unknown, record: any) => {
          const finalPrice = record.coursePrice * (1 - (record.discount || 0));
          return (
            <span style={{ fontWeight: "bold", color: "#52c41a" }}>
              {finalPrice.toLocaleString("vi-VN")} ₫
            </span>
          );
        },
      },
      {
        title: "Cấp độ",
        dataIndex: "level",
        width: 120,
        render: (level: string, record: any) => (
          <span>
            {level}
            {record.subLevel && (
              <span style={{ color: "#888", fontSize: 12 }}>
                {" "}
                ({record.subLevel})
              </span>
            )}
          </span>
        ),
      },
      {
        title: "Thời lượng",
        dataIndex: "estimatedDuration",
        width: 100,
        render: (val: number) => (val ? `${val}h` : "-"),
      },
      {
        title: "Chuyên ngành",
        dataIndex: "specialization",
        width: 120,
        ellipsis: true,
      },
      {
        title: "Tags",
        dataIndex: "tag",
        width: 150,
        ellipsis: true,
        render: (tags: string) => tags || "-",
      },
      {
        title: "Thao tác",
        width: 220,
        fixed: "right" as const,
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
                  { min: 5, message: "Tên khóa học phải có ít nhất 5 ký tự" },
                  { max: 200, message: "Tên khóa học tối đa 200 ký tự" },
                ]}
              >
                <Input
                  placeholder="Tên khóa học..."
                  prefix={<BookOutlined />}
                />
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
                  placeholder="Nhập giá (0 = miễn phí)..."
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                />
              </Form.Item>

              <Form.Item name="discount" label="Giảm giá (%)" initialValue={0}>
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  max={100}
                  step={0.01}
                  placeholder="VD: 10 = 10%, 5.5 = 5.5%"
                  addonAfter="%"
                />
              </Form.Item>

              <Form.Item label="Hình ảnh khóa học">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Upload
                    accept="image/*"
                    beforeUpload={handleImageUpload}
                    showUploadList={false}
                    disabled={uploadingImage}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      loading={uploadingImage}
                      block
                    >
                      {uploadingImage ? "Đang upload..." : "Chọn hình ảnh"}
                    </Button>
                  </Upload>
                  {imageUrl && (
                    <div style={{ textAlign: "center", marginTop: 8 }}>
                      <img
                        src={imageUrl}
                        alt="Preview"
                        style={{
                          maxWidth: "100%",
                          maxHeight: 200,
                          borderRadius: 8,
                          border: "1px solid #d9d9d9",
                        }}
                      />
                    </div>
                  )}
                </Space>
              </Form.Item>

              <Form.Item
                name="avatarURL"
                label="Hoặc nhập URL trực tiếp"
                hidden
              >
                <Input placeholder="https://example.com/image.jpg" />
              </Form.Item>

              <Form.Item
                name="level"
                label="Cấp độ"
                rules={[{ required: true, message: "Vui lòng chọn cấp độ" }]}
              >
                <Select placeholder="Chọn cấp độ">
                  <Option value="Basic">Basic (Cơ bản)</Option>
                  <Option value="Intermediate">Intermediate (Trung cấp)</Option>
                  <Option value="Advanced">Advanced (Nâng cao)</Option>
                </Select>
              </Form.Item>

              <Form.Item name="subLevel" label="Cấp độ phụ">
                <Select placeholder="Chọn cấp độ phụ (tùy chọn)">
                  <Option value="Low">Low</Option>
                  <Option value="Mid">Mid</Option>
                  <Option value="High">High</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="estimatedDuration"
                label="Thời lượng ước tính (giờ)"
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  placeholder="VD: 40"
                />
              </Form.Item>

              <Form.Item name="specialization" label="Chuyên ngành">
                <Input placeholder="VD: CNTT, Marketing, Thiết kế..." />
              </Form.Item>

              <Form.Item
                name="tag"
                label="Tags (phân cách bằng dấu phẩy)"
                tooltip="VD: JavaScript,React,Redux"
              >
                <Input placeholder="JavaScript,React,Redux" />
              </Form.Item>
            </div>

            <Form.Item
              name="courseDescription"
              label="Mô tả khóa học"
              rules={[
                { required: true, message: "Vui lòng nhập mô tả khóa học" },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Mô tả chi tiết về khóa học, nội dung, lợi ích học viên sẽ nhận được..."
              />
            </Form.Item>

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
