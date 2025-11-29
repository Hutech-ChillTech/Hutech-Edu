// ================== IMPORT ==================
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  List,
  Avatar,
  message,
  Spin,
  Modal,
  Form,
  Input,
  Select,
  Tabs,
  Badge,
  Upload
} from "antd";

import {
  UserOutlined,
  BookOutlined,
  HomeOutlined,
  LogoutOutlined,
  MessageOutlined,
  TrophyOutlined,
  LockOutlined,
  EditOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
  CameraOutlined
} from "@ant-design/icons";

import styles from "../../styles/UserProfile.module.css";
import axios from "axios";
import { uploadAvatarToCloudinary } from "../../utils/cloudinaryHelper";

const { Option } = Select;

// ================== INTERFACES ==================
interface User {
  userId: string;
  userName: string;
  email: string;
  avatarURL?: string;
  gender: string;
  level: string;
  created_at: string;
}

interface Course {
  courseId: string;
  courseName: string;
  description: string;
}

interface Enrollment {
  enrollmentId: string;
  enrollmentDate: string;
  status: string;
}

// ================== COMPONENT ==================
const UserProfile: React.FC = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);
  const [isUploading, setIsUploading] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("info");

  const [editForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  // ================== FETCH USER DATA ==================
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId || !token) {
        setLoading(false);
        setError("Vui lòng đăng nhập lại");
        return;
      }

      try {
        setError(null);
        const res = await axios.get(`/users/${userId}`);
        setUser(res.data.data);

        if (res.data.data.avatarURL) {
          setImageUrl(res.data.data.avatarURL);
        }

        await fetchEnrolledCourses();
      } catch (err) {
        console.error("Lỗi load user:", err);
        setError("Không thể tải thông tin người dùng!");
        message.error("Không thể tải thông tin người dùng!");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token]);

  // ================== FETCH ENROLLED COURSES ==================
  const fetchEnrolledCourses = async () => {
    if (!userId) return;

    try {
      setLoadingCourses(true);
      const courseRes = await axios.get(`/users/${userId}/courses`);
      setEnrolledCourses(courseRes.data.data || []);
    } catch (err) {
      console.error("Lỗi load khóa học:", err);
      message.error("Không thể tải danh sách khóa học!");
    } finally {
      setLoadingCourses(false);
    }
  };

  // ================== UPLOAD AVATAR ==================
  const beforeUpload = (file: File) => {
    const allowed = ["image/jpeg", "image/png"];
    if (!allowed.includes(file.type)) {
      message.error("Chỉ được upload JPG/PNG!");
      return Upload.LIST_IGNORE;
    }

    if (file.size / 1024 / 1024 > 3) {
      message.error("Ảnh phải nhỏ hơn 3MB!");
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const handleAvatarChange = async (info: any) => {
    if (info.file.originFileObj) {
      const file = info.file.originFileObj;
      setAvatarFile(file);

      const preview = URL.createObjectURL(file);
      setImageUrl(preview);

      try {
        setIsUploading(true);
        const uploadedUrl = await uploadAvatarToCloudinary(file);

        await axios.patch(`/users/${userId}/avatar`, {
          avatarURL: uploadedUrl,
        });

        setUser((prev) => prev ? { ...prev, avatarURL: uploadedUrl } : prev);
        message.success("Cập nhật avatar thành công!");
      } catch (err) {
        console.error("Lỗi upload avatar:", err);
        message.error("Không thể cập nhật avatar!");
        setImageUrl(user?.avatarURL || null);
      } finally {
        setIsUploading(false);
        // Revoke object URL để tránh memory leak
        URL.revokeObjectURL(preview);
      }
    }
  };

  // ================== UPDATE PROFILE ==================
  const handleUpdateUser = async (values: any) => {
    try {
      const res = await axios.put(`/users/${userId}`, values);
      setUser(res.data.data);
      message.success("Cập nhật thông tin thành công!");
      setIsEditModalVisible(false);
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      message.error("Lỗi cập nhật thông tin!");
    }
  };

  // ================== CHANGE PASSWORD ==================
  const handleChangePassword = async (values: any) => {
    try {
      await axios.patch(`/users/${userId}/change-password`, values);
      message.success("Đổi mật khẩu thành công!");
      setIsChangePasswordVisible(false);
      passwordForm.resetFields();
    } catch (err) {
      console.error("Lỗi đổi mật khẩu:", err);
      message.error("Lỗi đổi mật khẩu!");
    }
  };

  // ================== LOGOUT ==================
  const handleLogout = () => {
    localStorage.clear();
    message.success("Đã đăng xuất");
    navigate("/login");
  };

  // ================== LOADING ==================
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  // ================== ERROR STATE ==================
  if (error && !user) {
    return (
      <div className={styles.loadingContainer}>
        <p style={{ color: "red" }}>{error}</p>
        <Button type="primary" onClick={() => navigate("/login")}>
          Quay lại đăng nhập
        </Button>
      </div>
    );
  }

  // ================== MAIN UI ==================
  return (
    <div className={styles.profileContainer}>
      {/* SIDEBAR */}
      <div className={styles.sidebar}>
        <Card className={styles.userCard}>
          {/* AVATAR */}
          <Upload
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleAvatarChange}
          >
            <div className={styles.avatarWrapper}>
              <Avatar
                size={110}
                src={imageUrl || user?.avatarURL}
                icon={<UserOutlined />}
                className={styles.avatar}
              />
              <div className={styles.cameraIcon}>
                {isUploading ? <LoadingOutlined /> : <CameraOutlined />}
              </div>
            </div>
          </Upload>

          <h3 className={styles.username}>{user?.userName}</h3>

          <div className={styles.buttonGroup}>
            <Button icon={<HomeOutlined />} block onClick={() => navigate("/")}>
              Trang chủ
            </Button>
            <Button danger icon={<LogoutOutlined />} block onClick={handleLogout}>
              Đăng xuất
            </Button>
          </div>
        </Card>

        {/* MENU */}
        <Card className={styles.menuCard}>
          <List
            itemLayout="horizontal"
            dataSource={[
              { key: "info", icon: <UserOutlined />, text: "Thông tin cá nhân" },
              { key: "courses", icon: <BookOutlined />, text: `Khóa học (${enrolledCourses.length})` },
              { key: "roadmap", icon: <TrophyOutlined />, text: "Lộ trình" },
              { key: "messages", icon: <MessageOutlined />, text: "Tin nhắn" },
            ]}
            renderItem={(item) => (
              <List.Item
                className={`${styles.menuItem} ${
                  activeTab === item.key ? styles.active : ""
                }`}
                onClick={() => setActiveTab(item.key)}
              >
                {item.icon}
                <span style={{ marginLeft: 10 }}>{item.text}</span>
              </List.Item>
            )}
          />
        </Card>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        <Card className={styles.mainCard}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              {
                key: "info",
                label: "Thông tin cá nhân",
                children: (
                  <div>
                    <div className={styles.tabHeader}>
                      <h2>🎓 Thông tin cá nhân</h2>
                      <div>
                        <Button
                          icon={<EditOutlined />}
                          onClick={() => {
                            editForm.setFieldsValue(user);
                            setIsEditModalVisible(true);
                          }}
                        >
                          Chỉnh sửa
                        </Button>
                        <Button
                          icon={<LockOutlined />}
                          onClick={() => setIsChangePasswordVisible(true)}
                          style={{ marginLeft: 8 }}
                        >
                          Đổi mật khẩu
                        </Button>
                      </div>
                    </div>
                    <p><b>Tên:</b> {user?.userName}</p>
                    <p><b>Email:</b> {user?.email}</p>
                    <p><b>Giới tính:</b> {user?.gender}</p>
                    <p><b>Trình độ:</b> {user?.level}</p>
                    <p><b>Ngày tham gia:</b> {new Date(user!.created_at).toLocaleDateString("vi-VN")}</p>
                  </div>
                ),
              },
              {
                key: "courses",
                label: "Khóa học",
                children: (
                  <div>
                    <h2>📚 Khóa học của bạn</h2>
                    {loadingCourses ? (
                      <Spin size="large" />
                    ) : enrolledCourses.length === 0 ? (
                      <p>Chưa có khóa học nào.</p>
                    ) : (
                      <List
                        grid={{ gutter: 16, xs: 1, sm: 2, lg: 3 }}
                        dataSource={enrolledCourses}
                        renderItem={(course) => (
                          <List.Item>
                            <Card hoverable>
                              <b>{course.courseName}</b>
                              <p>{course.description?.slice(0, 80)}...</p>
                            </Card>
                          </List.Item>
                        )}
                      />
                    )}
                  </div>
                ),
              },
              {
                key: "roadmap",
                label: "Lộ trình",
                children: (
                  <div>
                    <h2>🏆 Lộ trình học tập</h2>
                    <p>Đang phát triển...</p>
                  </div>
                ),
              },
              {
                key: "messages",
                label: "Tin nhắn",
                children: (
                  <div>
                    <h2>💬 Thông báo</h2>
                    <p>Chưa có thông báo mới.</p>
                  </div>
                ),
              },
            ]}
          />
        </Card>
      </div>

      {/* MODAL EDIT */}
      <Modal
        title="Chỉnh sửa thông tin"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form form={editForm} layout="vertical" onFinish={handleUpdateUser}>
          <Form.Item name="userName" label="Tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="gender" label="Giới tính">
            <Select>
              <Option value="MALE">Nam</Option>
              <Option value="FEMALE">Nữ</Option>
            </Select>
          </Form.Item>

          <Form.Item name="level" label="Trình độ">
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Cập nhật
          </Button>
        </Form>
      </Modal>

      {/* MODAL PASSWORD */}
      <Modal
        title="Đổi mật khẩu"
        open={isChangePasswordVisible}
        onCancel={() => setIsChangePasswordVisible(false)}
        footer={null}
      >
        <Form form={passwordForm} layout="vertical" onFinish={handleChangePassword}>
          <Form.Item name="oldPassword" label="Mật khẩu cũ" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[{ required: true, min: 6 }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận"
            dependencies={["newPassword"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value === getFieldValue("newPassword"))
                    return Promise.resolve();
                  return Promise.reject("Mật khẩu không khớp!");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Đổi mật khẩu
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default UserProfile;