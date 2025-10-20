import React, { useEffect, useRef } from "react";
import StatCard from "../../components/Admin/StatCard";
import Chart from "chart.js/auto";
import "../../styles/AdminStyle.css";

const DashboardPage: React.FC = () => {
  const chartRef = useRef<Chart | null>(null); // ✅ giữ instance Chart

  useEffect(() => {
    const ctx = document.getElementById("salesChart") as HTMLCanvasElement;
    if (!ctx) return;

    // ✅ Nếu đã có chart, hủy trước khi tạo mới
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

    // ✅ Cleanup khi component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []); // chỉ chạy 1 lần khi mount

  return (
    <div>
      <div className="row">
        <StatCard title="DOANH THU HÔM NAY" value="0" color="primary" />
        <StatCard title="HỌC VIÊN MỚI" value="0" color="success" />
        <StatCard title="KHÓA HỌC MỚI" value="0" color="danger" />
        <StatCard title="TỔNG DOANH THU" value="0" color="warning" />
      </div>

      <div className="card my-4">
        <div className="card-header bg-white">
          <h6 className="mb-0">Thống kê doanh thu năm 2025</h6>
        </div>
        <div className="card-body">
          <canvas id="salesChart" height="100"></canvas>
        </div>
      </div>

      <footer className="text-center py-3 mt-4 border-top">
        © 2025 SkillCoder. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardPage;
