import React, { useEffect, useRef } from "react";
import StatCard from "../../components/Admin/StatCard";
import Chart from "chart.js/auto";
import styles from "../../styles/AdminStyle.module.css";

const DashboardPage: React.FC = () => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = document.getElementById("salesChart") as HTMLCanvasElement;
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6"],
        datasets: [
          {
            label: "Doanh thu (triệu VNĐ)",
            data: [10, 15, 8, 12, 20, 18],
            borderColor: "#007bff",
            tension: 0.3,
          },
        ],
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <div className={`${styles["row"]}`}>
        <StatCard title="DOANH THU HÔM NAY" value="0" color="primary" />
        <StatCard title="HỌC VIÊN MỚI" value="0" color="success" />
        <StatCard title="KHÓA HỌC MỚI" value="0" color="danger" />
        <StatCard title="TỔNG DOANH THU" value="0" color="warning" />
      </div>

      <div className={`${styles["card"]} ${styles["my-4"]}`}>
        <div className={`${styles["card-header"]} ${styles["bg-white"]}`}>
          <h6 className={styles["mb-0"]}>Thống kê doanh thu năm 2025</h6>
        </div>
        <div className={styles["card-body"]}>
          <canvas id="salesChart" height="100"></canvas>
        </div>
      </div>

      <footer
        className={`${styles["text-center"]} ${styles["py-3"]} ${styles["mt-4"]} ${styles["border-top"]}`}
      >
        © 2025 SkillCoder. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardPage;
