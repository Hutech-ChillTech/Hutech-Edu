import React, { useEffect, useState } from "react";
import { Spin, Progress, Card, Badge } from "antd";
import { TrophyOutlined, RocketOutlined } from "@ant-design/icons";
import {
  gamificationService,
  type UserStats,
} from "../../service/gamification.service";
import styles from "./UserStatsCard.module.css";

const UserStatsCard: React.FC = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await gamificationService.getUserStats();
      console.log("✅ Gamification stats loaded:", data);
      setStats(data);
      setError(null);
    } catch (error: any) {
      console.error("❌ Error loading gamification stats:", error);
      console.error("Error response:", error.response?.data);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Không thể tải dữ liệu gamification"
      );
    } finally {
      setLoading(false);
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

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "#52c41a";
      case "rare":
        return "#1890ff";
      case "epic":
        return "#722ed1";
      case "legendary":
        return "#fa8c16";
      default:
        return "#8c8c8c";
    }
  };

  if (loading) {
    return (
      <Card>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <Spin size="large" />
          <p style={{ marginTop: "1rem", color: "#666" }}>
            Đang tải dữ liệu...
          </p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
          <h3 style={{ color: "#f56565", marginBottom: "0.5rem" }}>
            Lỗi tải dữ liệu
          </h3>
          <p style={{ color: "#666", marginBottom: "1rem" }}>{error}</p>
          <button
            onClick={loadStats}
            style={{
              padding: "0.5rem 1.5rem",
              background: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Thử lại
          </button>
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              background: "#fef3c7",
              borderRadius: "8px",
              textAlign: "left",
            }}
          >
            <strong>💡 Hướng dẫn khắc phục:</strong>
            <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
              <li>Kiểm tra backend đã chạy chưa (port 3000)</li>
              <li>Kiểm tra API endpoint: /api/xp/stats</li>
              <li>Mở Console (F12) xem lỗi chi tiết</li>
              <li>Kiểm tra token trong localStorage</li>
            </ul>
          </div>
        </div>
      </Card>
    );
  }

  if (!stats) return null;

  return (
    <div className={styles.statsContainer}>
      {/* User Header with Gradient Background */}
      <Card className={styles.headerCard}>
        <div className={styles.userHeader}>
          <div className={styles.avatarWrapper}>
            <img
              src={stats.avatarURL || "/images/default-avatar.png"}
              alt={stats.userName}
              className={styles.avatar}
            />
            <div
              className={styles.levelBadgeOverlay}
              style={{ backgroundColor: getLevelColor(stats.level) }}
            >
              {stats.levelInfo.perks.badge}
            </div>
          </div>
          <div className={styles.userInfo}>
            <h2 className={styles.userName}>{stats.userName}</h2>
            <div className={styles.levelTag}>
              <span className={styles.levelText}>{stats.level}</span>
              <span className={styles.levelTitle}>{stats.levelInfo.title}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* XP Section */}
      <Card
        className={styles.xpCard}
        title={
          <>
            <RocketOutlined /> Experience Points
          </>
        }
      >
        <div className={styles.xpSection}>
          <p className={styles.xpTotal}>
            {stats.experiencePoints.toLocaleString()} XP
          </p>

          <div className={styles.levelProgress}>
            <Progress
              percent={stats.levelProgress}
              strokeColor={{
                from: getLevelColor(stats.level),
                to: getLevelColor(stats.levelInfo.nextLevel || stats.level),
              }}
              showInfo={false}
              strokeWidth={12}
            />
            <p className={styles.progressText}>
              {stats.currentLevelXP.toLocaleString()} /{" "}
              {stats.nextLevelXP.toLocaleString()} XP đến{" "}
              {stats.levelInfo.nextLevel || "Max Level"}
            </p>
          </div>

          {stats.levelInfo.perks.discount > 0 && (
            <div className={styles.perks}>
              <p>🎁 {stats.levelInfo.perks.description}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Achievements Section */}
      <Card
        className={styles.achievementsCard}
        title={
          <>
            <TrophyOutlined /> Thành tích
          </>
        }
      >
        <div className={styles.achievementsSection}>
          <p className={styles.achievementsSummary}>
            <strong>
              {stats.achievements.unlocked} / {stats.achievements.total}
            </strong>{" "}
            đã mở khóa
          </p>

          <div className={styles.achievementGrid}>
            {stats.achievements.list.slice(0, 6).map((userAchievement) => (
              <div
                key={userAchievement.id}
                className={styles.achievementBadge}
                title={userAchievement.achievement.description}
              >
                <div className={styles.achievementIconWrapper}>
                  <span className={styles.achievementIcon}>
                    {userAchievement.achievement.icon}
                  </span>
                  {userAchievement.progress === 100 && (
                    <span className={styles.unlockedBadge}>✅</span>
                  )}
                </div>
                <p className={styles.achievementName}>
                  {userAchievement.achievement.name}
                </p>
                <Badge
                  count={userAchievement.achievement.rarity}
                  style={{
                    backgroundColor: getRarityColor(
                      userAchievement.achievement.rarity
                    ),
                    fontSize: "0.7rem",
                    textTransform: "capitalize",
                  }}
                />
              </div>
            ))}
          </div>

          {stats.achievements.list.length > 6 && (
            <p className={styles.moreAchievements}>
              +{stats.achievements.list.length - 6} thành tích khác...
            </p>
          )}
        </div>
      </Card>

      {/* Stats Summary */}
      <Card className={styles.summaryCard}>
        <div className={styles.statsSummary}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>
              {stats.totalCoursesCompleted}
            </span>
            <span className={styles.statLabel}>Khóa học hoàn thành</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>
              {stats.achievements.unlocked}
            </span>
            <span className={styles.statLabel}>Thành tích</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{stats.recentXP.length}</span>
            <span className={styles.statLabel}>Hoạt động gần đây</span>
          </div>
        </div>
      </Card>

      {/* Recent XP */}
      {stats.recentXP.length > 0 && (
        <Card className={styles.recentXPCard} title="Hoạt động gần đây">
          <div className={styles.xpHistory}>
            {stats.recentXP.slice(0, 5).map((transaction) => (
              <div
                key={transaction.transactionId}
                className={styles.xpTransaction}
              >
                <div className={styles.transactionInfo}>
                  <span className={styles.transactionDescription}>
                    {transaction.description}
                  </span>
                  <span className={styles.transactionDate}>
                    {new Date(transaction.created_at).toLocaleDateString(
                      "vi-VN"
                    )}
                  </span>
                </div>
                <span className={styles.transactionAmount}>
                  +{transaction.amount} XP
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default UserStatsCard;
