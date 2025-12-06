import React, { useEffect, useState } from "react";
import { Card, Avatar, Badge, Spin } from "antd";
import { TrophyOutlined, CrownOutlined } from "@ant-design/icons";
import {
  gamificationService,
  type LeaderboardUser,
} from "../../service/gamification.service";
import styles from "./Leaderboard.module.css";

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const data = await gamificationService.getLeaderboard(20);
      setLeaderboard(data);
    } catch (error) {
      console.error("Error loading leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <span className={styles.goldMedal}>🥇</span>;
      case 2:
        return <span className={styles.silverMedal}>🥈</span>;
      case 3:
        return <span className={styles.bronzeMedal}>🥉</span>;
      default:
        return <span className={styles.rank}>#{rank}</span>;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Basic":
        return "#52c41a";
      case "Intermediate":
        return "#1890ff";
      case "Advanced":
        return "#722ed1";
      default:
        return "#8c8c8c";
    }
  };

  return (
    <div className={styles.leaderboardContainer}>
      <Card className={styles.leaderboardCard} bordered={false}>
        <div className={styles.headerSection}>
          <TrophyOutlined className={styles.headerIcon} />
          <h2 className={styles.headerTitle}>Đường đua</h2>
          <p className={styles.headerSubtitle}>
            Top {leaderboard.length} học viên xuất sắc nhất
          </p>
        </div>

        {loading ? (
          <div className={styles.loadingContainer}>
            <Spin size="large" />
          </div>
        ) : leaderboard.length === 0 ? (
          <div className={styles.emptyState}>
            <TrophyOutlined className={styles.emptyIcon} />
            <p className={styles.emptyText}>Chưa có dữ liệu</p>
          </div>
        ) : (
          <div className={styles.listSection}>
            {leaderboard.map((user) => (
              <div
                key={user.userId}
                className={`${styles.listItem} ${
                  user.rank === 1 ? styles.firstPlace : ""
                }`}
              >
                <div className={styles.rankSection}>
                  {getRankIcon(user.rank)}
                </div>
                <Avatar
                  src={user.avatarURL || "/images/default-avatar.png"}
                  size={50}
                  className={styles.userAvatar}
                />
                <div className={styles.userDetails}>
                  <div className={styles.userNameRow}>
                    <span className={styles.userName}>{user.userName}</span>
                    {user.rank <= 3 && (
                      <CrownOutlined className={styles.crownIcon} />
                    )}
                  </div>
                  <Badge
                    count={user.level}
                    style={{
                      backgroundColor: getLevelColor(user.level),
                    }}
                  />
                </div>
                <div className={styles.xpSection}>
                  <span className={styles.xpAmount}>
                    {user.totalXP.toLocaleString()}
                  </span>
                  <span className={styles.xpLabel}>XP</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Leaderboard;
