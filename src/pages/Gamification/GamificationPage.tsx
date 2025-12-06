import React from "react";
import { Tabs } from "antd";
import { TrophyOutlined, RocketOutlined } from "@ant-design/icons";
import UserStatsCard from "../../components/Gamification/UserStatsCard";
import Leaderboard from "../../components/Gamification/Leaderboard";
import styles from "./GamificationPage.module.css";

const GamificationPage: React.FC = () => {
  const items = [
    {
      key: "stats",
      label: (
        <span className={styles.tabLabel}>
          <RocketOutlined />
          Thống kê của tôi
        </span>
      ),
      children: <UserStatsCard />,
    },
    {
      key: "leaderboard",
      label: (
        <span className={styles.tabLabel}>
          <TrophyOutlined />
          Bảng xếp hạng
        </span>
      ),
      children: <Leaderboard />,
    },
  ];

  return (
    <div className={styles.gamificationPage}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroIcon}>
            <TrophyOutlined />
          </div>
          <h1 className={styles.heroTitle}>Gamification</h1>
          <p className={styles.heroSubtitle}>
            Theo dõi tiến độ học tập và so sánh với các học viên khác
          </p>
          <div className={styles.heroDivider}></div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <Tabs
          items={items}
          defaultActiveKey="stats"
          className={styles.gamificationTabs}
          size="large"
          centered
        />
      </div>
    </div>
  );
};

export default GamificationPage;
