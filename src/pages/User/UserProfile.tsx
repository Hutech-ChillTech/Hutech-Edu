import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, List, Avatar, message, Upload } from "antd";
import {
  SaveOutlined,
  UserOutlined,
  BookOutlined,
  HomeOutlined,
  MessageOutlined,
  SettingOutlined,
  TrophyOutlined,
  LoadingOutlined
} from "@ant-design/icons";

import styles from "../../styles/UserProfile.module.css";
import { type User } from "../../types/database.types";
import { userService } from "../../service/user.service";
import { uploadAvatarToCloudinary } from "../../utils/cloudinaryHelper";

const UserProfile: React.FC = () => {
  const uid = localStorage.getItem("uid");
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);
  
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    
    if (info.file.status === 'done' || info.file.originFileObj) {
      const file = info.file.originFileObj;
      
     
      setAvatarFile(file);

      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
      setLoading(false);
    }
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Bạn chỉ có thể upload file JPG/PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Ảnh phải nhỏ hơn 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!uid) {
          message.warning("⚠️ Bạn chưa đăng nhập!");
          return;
        }

        const res = await userService.getUserByUid(uid);
        setUser(res);

        if (res.avatarURL) {
            setImageUrl(res.avatarURL);
        }

      } catch (err) {
        console.error("Lỗi khi lấy thông tin người dùng:", err);
        message.error("Không thể tải thông tin người dùng!");
      }
    };
    fetchUser();
  }, [uid]);

  const handleSave = async (uid: string, values: User, fileToUpload?: File) => {
    try {
      let finalAvatarUrl = values.avatarURL;

      if (fileToUpload) {
        message.loading({ content: "Đang tải ảnh lên...", key: "uploading" });
        finalAvatarUrl = await uploadAvatarToCloudinary(fileToUpload, uid);
        message.success({ content: "Tải ảnh xong!", key: "uploading" });
      }

      const updateData: Partial<User> = {
        ...values,          
        avatarURL: finalAvatarUrl 
      };

      console.log("Dữ liệu chuẩn bị gửi về backend: ", updateData);

      const res = await userService.updateUser(uid, updateData);

      if (!res) {
        message.error("Cập nhật thất bại.");
        return;
      }

      message.success("Cập nhật thông tin thành công!");
    
      setUser(prev => prev ? ({...prev, avatarURL: finalAvatarUrl}) : null);

    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      message.error("Đã có lỗi xảy ra!");
    }
  };

  const handleBackHome = () => {
    navigate("/");
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.sidebar}>
        <Card className={styles.card}>
          <Upload
            name="avatar"
            listType="picture-circle"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            className={styles.uploadWrapper}
            customRequest={({ onSuccess }) => setTimeout(() => onSuccess && onSuccess("ok"), 0)}
          >
            {imageUrl ? (
              <Avatar size={100} src={imageUrl} className={styles.avatar} />
            ) : (
              <Avatar size={100} icon={loading ? <LoadingOutlined /> : <UserOutlined />} className={styles.avatar} />
            )}
          </Upload>
          <h3 className={styles.username}>{user?.userName || "Chưa đăng nhập"}</h3>
          <p className={styles.role}>HỌC VIÊN KHÓA HỌC ONLINE</p>

          <div className={styles.buttonGroup}>
            <Button type="primary" icon={<HomeOutlined />} className={styles.homeBtn} onClick={handleBackHome}>
              Trang chủ
            </Button>

            <Button
              danger
              icon={<SaveOutlined />}
              onClick={() => {
                if (uid && user) {
                    handleSave(uid, user, avatarFile);
                } else {
                    message.error("Chưa có thông tin user để lưu!");
                }
              }}
            >
              Lưu thay đổi
            </Button>
          </div>
        </Card>

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

      <div className={styles.content}>
        <Card className={styles.infoCard}>
          <h3>🎓 Chào mừng bạn đến với hệ thống khóa học trực tuyến HutechEdu</h3>
          {user ? (
            <ul className={styles.infoList}>
              <li><strong>Tên đăng nhập:</strong> {user.userName}</li>
              <li><strong>Email:</strong> {user.email}</li>
              <li><strong>Giới tính:</strong> {user.gender === "MALE" ? "Nam" : "Nữ"}</li>
              <li><strong>Trình độ học viên:</strong> {user.level}</li>
              <li><strong>Ngày tham gia:</strong> {user.created_at ? new Date(user.created_at).toLocaleDateString("vi-VN") : "N/A"}</li>
            </ul>
          ) : (
            <p>Đang tải thông tin...</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;