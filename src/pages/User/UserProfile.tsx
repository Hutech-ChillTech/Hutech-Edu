import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, List, Avatar, message, Spin, Modal, Form, Input, Select, Tabs, Badge } from "antd";
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
} from "@ant-design/icons";
import axios from "../../service/axiosClient"; // Import axios client của bạn
import styles from "../../styles/UserProfile.module.css";

const { Option } = Select;
const { TabPane } = Tabs;

interface User {
  userId: string;
  userName: string;
  email: string;
  gender: string;
  level: string;
  created_at: string;
}

interface Course {
  courseId: string;
  courseName: string;
  description: string;
  thumbnail?: string;
  progress?: number;
}

interface Enrollment {
  enrollmentId: string;
  enrollmentDate: string;
  status: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  
  const [editForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ============ FETCH DATA ============
  useEffect(() => {
    // Nếu không có userId hoặc token, không fetch
    if (!userId || !token) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // API 1: GET /users/:userId - Lấy thông tin cơ bản
        const userRes = await axios.get(`/users/${userId}`);
        setUser(userRes.data.data);

        // API 2: GET /users/:userId/details - Lấy thông tin chi tiết với relations
        try {
          await axios.get(`/users/${userId}/details`);
        } catch (err) {
          console.warn("Không thể lấy chi tiết user:", err);
        }

        // API 3: GET /users/:userId/courses - Lấy danh sách khóa học đã đăng ký
        try {
          const coursesRes = await axios.get(`/users/${userId}/courses`);
          setEnrolledCourses(coursesRes.data.data || []);
        } catch (err) {
          console.warn("Không thể lấy khóa học:", err);
        }

      } catch (err: any) {
        console.error("Lỗi khi lấy thông tin:", err);
        if (err.response?.status === 401) {
          message.error("Phiên đăng nhập hết hạn!");
          localStorage.clear();
          navigate("/login");
        } else {
          message.error("Không thể tải thông tin người dùng!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token, navigate]);

  // ============ UPDATE USER ============
  // API: PUT /users/:userId
  const handleUpdateUser = async (values: any) => {
    try {
      const res = await axios.put(`/users/${userId}`, values);
      setUser(res.data.data);
      message.success("✅ Cập nhật thông tin thành công!");
      setIsEditModalVisible(false);
      editForm.resetFields();
    } catch (err: any) {
      console.error("Lỗi cập nhật:", err);
      message.error(err.response?.data?.message || "Cập nhật thất bại!");
    }
  };

  // ============ CHANGE PASSWORD ============
  // API: PATCH /users/:userId/change-password
  const handleChangePassword = async (values: any) => {
    try {
      await axios.patch(`/users/${userId}/change-password`, {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      message.success("✅ Đổi mật khẩu thành công!");
      setIsChangePasswordVisible(false);
      passwordForm.resetFields();
    } catch (err: any) {
      console.error("Lỗi đổi mật khẩu:", err);
      message.error(err.response?.data?.message || "Đổi mật khẩu thất bại!");
    }
  };

  // ============ CHECK ENROLLMENT ============
  // API: GET /users/:userId/enrollment/:courseId
  const checkEnrollment = async (courseId: string) => {
    try {
      const res = await axios.get(`/users/${userId}/enrollment/${courseId}`);
      const enrollment: Enrollment = res.data.data;
      
      if (enrollment) {
        message.info(`Bạn đã đăng ký khóa học này vào ${new Date(enrollment.enrollmentDate).toLocaleDateString("vi-VN")}`);
      } else {
        message.warning("Bạn chưa đăng ký khóa học này!");
      }
    } catch (err) {
      console.error("Lỗi kiểm tra enrollment:", err);
    }
  };

  // ============ LOGOUT ============
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    message.success("Đăng xuất thành công!");
    navigate("/login");
  };

  // ============ OPEN EDIT MODAL ============
  const openEditModal = () => {
    editForm.setFieldsValue({
      userName: user?.userName,
      email: user?.email,
      gender: user?.gender,
      level: user?.level,
    });
    setIsEditModalVisible(true);
  };

  // ============ LOADING STATE ============
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
        <p style={{ marginTop: 16, color: "#888" }}>Đang tải thông tin...</p>
      </div>
    );
  }

  // ============ NOT LOGGED IN STATE ============
  if (!userId || !token || !user) {
    return (
      <div className={styles.loadingContainer}>
        <p style={{ fontSize: 18, color: "#d32f2f" }}>⚠️ Vui lòng đăng nhập để xem hồ sơ cá nhân</p>
        <Button 
          type="primary" 
          size="large" 
          style={{ marginTop: 16 }}
          onClick={() => navigate("/login")}
        >
          Đi tới trang đăng nhập
        </Button>
      </div>
    );
  }

  // ============ RENDER ============
  return (
    <div className={styles.profileContainer}>
      {/* ========== SIDEBAR ========== */}
      <div className={styles.sidebar}>
        <Card className={styles.userCard}>
          <Avatar size={100} icon={<UserOutlined />} className={styles.avatar} />
          <h3 className={styles.username}>{user?.userName || "Chưa đăng nhập"}</h3>
          <p className={styles.role}>HỌC VIÊN KHÓA HỌC ONLINE</p>
          
          <div className={styles.buttonGroup}>
            <Button type="primary" icon={<HomeOutlined />} block>
              Trang chủ
            </Button>
            <Button danger icon={<LogoutOutlined />} onClick={handleLogout} block>
              Thoát ra
            </Button>
          </div>
        </Card>

        <Card className={styles.menuCard}>
          <List
            itemLayout="horizontal"
            dataSource={[
              { key: "info", icon: <UserOutlined />, text: "Thông tin cá nhân" },
              { key: "courses", icon: <BookOutlined />, text: "Khóa học của tôi", badge: enrolledCourses.length },
              { key: "roadmap", icon: <TrophyOutlined />, text: "Lộ trình học tập" },
              { key: "messages", icon: <MessageOutlined />, text: "Thông báo & Tin nhắn" },
            ]}
            renderItem={(item) => (
              <List.Item 
                className={`${styles.menuItem} ${activeTab === item.key ? styles.active : ""}`}
                onClick={() => setActiveTab(item.key)}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span>{item.text}</span>
                {item.badge && <Badge count={item.badge} style={{ marginLeft: "auto" }} />}
              </List.Item>
            )}
          />
        </Card>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className={styles.content}>
        <Card className={styles.mainCard}>
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            
            {/* ========== TAB 1: Thông tin cá nhân ========== */}
            <TabPane tab="Thông tin cá nhân" key="info">
              <div className={styles.tabHeader}>
                <h2>🎓 Thông tin cá nhân</h2>
                <div>
                  <Button 
                    type="primary" 
                    icon={<EditOutlined />} 
                    onClick={openEditModal}
                    style={{ marginRight: 10 }}
                  >
                    Chỉnh sửa
                  </Button>
                  <Button 
                    icon={<LockOutlined />} 
                    onClick={() => setIsChangePasswordVisible(true)}
                  >
                    Đổi mật khẩu
                  </Button>
                </div>
              </div>
              
              <div className={styles.infoList}>
                <p><strong>Tên đăng nhập:</strong> {user.userName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Giới tính:</strong> {user.gender === "MALE" ? "Nam" : "Nữ"}</p>
                <p><strong>Trình độ học viên:</strong> {user.level}</p>
                <p><strong>Ngày tham gia:</strong> {new Date(user.created_at).toLocaleDateString("vi-VN")}</p>
              </div>
            </TabPane>

            {/* ========== TAB 2: Khóa học của tôi ========== */}
            <TabPane tab={`Khóa học của tôi (${enrolledCourses.length})`} key="courses">
              <h2>📚 Khóa học đã đăng ký</h2>
              {enrolledCourses.length > 0 ? (
                <List
                  grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3 }}
                  dataSource={enrolledCourses}
                  renderItem={(course) => (
                    <List.Item>
                      <Card
                        hoverable
                        className={styles.courseCard}
                        cover={
                          <div className={styles.courseCover}>
                            <BookOutlined style={{ fontSize: 48, color: "white" }} />
                          </div>
                        }
                        actions={[
                          <Button type="link" onClick={() => checkEnrollment(course.courseId)}>
                            <CheckCircleOutlined /> Xem chi tiết
                          </Button>,
                        ]}
                      >
                        <Card.Meta 
                          title={course.courseName} 
                          description={course.description?.substring(0, 100) + "..." || "Không có mô tả"}
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              ) : (
                <p className={styles.emptyText}>Bạn chưa đăng ký khóa học nào.</p>
              )}
            </TabPane>

            {/* ========== TAB 3: Lộ trình học tập ========== */}
            <TabPane tab="Lộ trình học tập" key="roadmap">
              <h2>🏆 Lộ trình học tập của bạn</h2>
              <p className={styles.emptyText}>Tính năng đang phát triển...</p>
            </TabPane>

            {/* ========== TAB 4: Thông báo ========== */}
            <TabPane tab="Thông báo" key="messages">
              <h2>💬 Thông báo & Tin nhắn</h2>
              <p className={styles.emptyText}>Bạn chưa có thông báo mới.</p>
            </TabPane>
          </Tabs>
        </Card>
      </div>

      {/* ========== MODAL: Edit User ========== */}
      <Modal
        title="Chỉnh sửa thông tin cá nhân"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        centered
      >
        <Form form={editForm} onFinish={handleUpdateUser} layout="vertical">
          <Form.Item 
            label="Tên đăng nhập" 
            name="userName" 
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          
          <Form.Item 
            label="Email" 
            name="email" 
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" }
            ]}
          >
            <Input prefix={<MessageOutlined />} />
          </Form.Item>
          
          <Form.Item label="Giới tính" name="gender">
            <Select>
              <Option value="MALE">Nam</Option>
              <Option value="FEMALE">Nữ</Option>
            </Select>
          </Form.Item>
          
          <Form.Item label="Trình độ" name="level">
            <Input placeholder="VD: Beginner, Intermediate, Advanced" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Cập nhật thông tin
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* ========== MODAL: Change Password ========== */}
      <Modal
        title="Đổi mật khẩu"
        open={isChangePasswordVisible}
        onCancel={() => setIsChangePasswordVisible(false)}
        footer={null}
        centered
      >
        <Form form={passwordForm} onFinish={handleChangePassword} layout="vertical">
          <Form.Item 
            label="Mật khẩu cũ" 
            name="oldPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          
          <Form.Item 
            label="Mật khẩu mới" 
            name="newPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          
          <Form.Item 
            label="Xác nhận mật khẩu" 
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserProfile;