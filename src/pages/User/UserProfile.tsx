import React, { useEffect, useState } from "react";
import { Card, Button, List, Avatar, message } from "antd";
import {
  UserOutlined,
  BookOutlined,
  HomeOutlined,
  LogoutOutlined,
  MessageOutlined,
  SettingOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import axios from "../../service/axiosClient";
import styles from "../../styles/UserProfile.module.css";

interface User {
  userId: string;
  userName: string;
  email: string;
  gender: string;
  level: string;
  created_at: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // Giả sử userId đã lưu khi đăng nhập
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) {
          message.warning("⚠️ Bạn chưa đăng nhập!");
          return;
        }
        const res = await axios.get(`/users/${userId}`);
        setUser(res.data.data);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin người dùng:", err);
        message.error("Không thể tải thông tin người dùng!");
      }
    };
    fetchUser();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    message.success("Đăng xuất thành công!");
    window.location.href = "/login";
  };

  return (
    <div className={styles.profileContainer}>
      {/* Cột trái */}
      <div className={styles.sidebar}>
        <Card className={styles.card}>
          <Avatar
            size={100}
            icon={<UserOutlined />}
            className={styles.avatar}
          />
          <h3 className={styles.username}>{user?.userName || "Chưa đăng nhập"}</h3>
          <p className={styles.role}>HỌC VIÊN KHÓA HỌC ONLINE</p>

          <div className={styles.buttonGroup}>
            <Button type="primary" icon={<HomeOutlined />} className={styles.homeBtn}>
              Trang chủ
            </Button>
            <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
              Thoát ra
            </Button>
          </div>
        </Card>

        {/* Menu trái */}
        <Card className={styles.menu}>
          <List
            itemLayout="horizontal"
            dataSource={[
              { icon: <SettingOutlined />, text: "Cập nhật thông tin cá nhân" },
              { icon: <BookOutlined />, text: "Khóa học của tôi" },
              { icon: <TrophyOutlined />, text: "Lộ trình học tập" },
              { icon: <MessageOutlined />, text: "Thông báo & Tin nhắn" },
            ]}
            renderItem={(item) => (
              <List.Item className={styles.menuItem}>
                <span className={styles.icon}>{item.icon}</span>
                <span>{item.text}</span>
              </List.Item>
            )}
          />
        </Card>
      </div>

      {/* Cột phải */}
      <div className={styles.content}>
        <Card className={styles.infoCard}>
          <h3>🎓 Chào mừng bạn đến với hệ thống khóa học trực tuyến HutechEdu</h3>
          {user ? (
            <ul className={styles.infoList}>
              <li><strong>Tên đăng nhập:</strong> {user.userName}</li>
              <li><strong>Email:</strong> {user.email}</li>
              <li><strong>Giới tính:</strong> {user.gender === "MALE" ? "Nam" : "Nữ"}</li>
              <li><strong>Trình độ học viên:</strong> {user.level}</li>
              <li><strong>Ngày tham gia:</strong> {new Date(user.created_at).toLocaleDateString("vi-VN")}</li>
            </ul>
          ) : (
            <p>Vui lòng đăng nhập để xem thông tin cá nhân của bạn.</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
