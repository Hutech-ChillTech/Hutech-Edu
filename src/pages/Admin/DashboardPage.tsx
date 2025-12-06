import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Tag,
  Spin,
  message,
  Progress,
} from "antd";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  BookOutlined,
  RiseOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import Chart from "chart.js/auto";
import { paymentService } from "../../service/payment.service";
import { courseService } from "../../service/course.service";
import { userService } from "../../service/user.service";
import type {
  PaymentStatisticsOverview,
  RevenueByPeriod,
  TopCourse,
} from "../../service/payment.service";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [overview, setOverview] = useState<PaymentStatisticsOverview | null>(
    null
  );
  const [revenueData, setRevenueData] = useState<RevenueByPeriod[]>([]);
  const [topCourses, setTopCourses] = useState<TopCourse[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);

  const revenueChartRef = useRef<HTMLCanvasElement>(null);
  const methodChartRef = useRef<HTMLCanvasElement>(null);
  const revenueChartInstance = useRef<Chart | null>(null);
  const methodChartInstance = useRef<Chart | null>(null);

  // Fetch all dashboard data
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const [overviewData, revenueStats, topCoursesData, users, courses] =
        await Promise.all([
          paymentService.getStatisticsOverview(),
          paymentService.getRevenueByPeriod(
            dayjs().subtract(6, "months").format("YYYY-MM-DD"),
            dayjs().format("YYYY-MM-DD"),
            "month"
          ),
          paymentService.getTopSellingCourses(5),
          userService.getAllUsers(),
          courseService.getAllCourses(),
        ]);

      setOverview(overviewData);
      setRevenueData(revenueStats);
      setTopCourses(topCoursesData);
      setTotalUsers(users.length);
      setTotalCourses(courses.length);
    } catch (error) {
      message.error("Không thể tải dữ liệu dashboard");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Update revenue chart
  useEffect(() => {
    if (!revenueChartRef.current || revenueData.length === 0) return;

    if (revenueChartInstance.current) {
      revenueChartInstance.current.destroy();
    }

    const ctx = revenueChartRef.current.getContext("2d");
    if (!ctx) return;

    revenueChartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: revenueData.map((item) => item.period),
        datasets: [
          {
            label: "Doanh thu (VNĐ)",
            data: revenueData.map((item) => item.revenue),
            borderColor: "#1890ff",
            backgroundColor: "rgba(24, 144, 255, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `Doanh thu: ${context.parsed.y.toLocaleString(
                  "vi-VN"
                )}đ`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => {
                return (value as number).toLocaleString("vi-VN") + "đ";
              },
            },
          },
        },
      },
    });

    return () => {
      if (revenueChartInstance.current) {
        revenueChartInstance.current.destroy();
      }
    };
  }, [revenueData]);

  // Update payment method chart
  useEffect(() => {
    if (!methodChartRef.current || !overview) return;

    if (methodChartInstance.current) {
      methodChartInstance.current.destroy();
    }

    const ctx = methodChartRef.current.getContext("2d");
    if (!ctx) return;

    methodChartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: overview.revenueByMethod.map((item) => item.method),
        datasets: [
          {
            data: overview.revenueByMethod.map((item) => item.revenue),
            backgroundColor: ["#eb2f96", "#52c41a", "#1890ff", "#faad14"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || "";
                const value = context.parsed || 0;
                return `${label}: ${value.toLocaleString("vi-VN")}đ`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (methodChartInstance.current) {
        methodChartInstance.current.destroy();
      }
    };
  }, [overview]);

  // Top courses table columns
  const topCoursesColumns: ColumnsType<TopCourse> = [
    {
      title: "Khóa học",
      dataIndex: "courseName",
      key: "courseName",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src={record.avatarURL || "/images/default-course.jpg"}
            alt={text}
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <div style={{ fontSize: 12, color: "#8c8c8c" }}>
              {record.instructor}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Doanh thu",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      render: (value) => (
        <span style={{ color: "#52c41a", fontWeight: 500 }}>
          {value.toLocaleString("vi-VN")}đ
        </span>
      ),
      sorter: (a, b) => a.totalRevenue - b.totalRevenue,
    },
    {
      title: "Số lượng bán",
      dataIndex: "totalSales",
      key: "totalSales",
      render: (value) => <Tag color="blue">{value} học viên</Tag>,
      sorter: (a, b) => a.totalSales - b.totalSales,
    },
  ];

  const successRate = overview
    ? (
        (overview.successfulTransactions / overview.totalTransactions) *
        100
      ).toFixed(1)
    : "0";

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Spin size="large" tip="Đang tải dữ liệu dashboard..." />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
          📊 Admin Dashboard
        </h2>
        <p style={{ margin: "8px 0 0", color: "#8c8c8c" }}>
          Tổng quan hệ thống - Cập nhật lúc {dayjs().format("HH:mm DD/MM/YYYY")}
        </p>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Tổng người dùng"
              value={totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
            <div style={{ marginTop: 8, fontSize: 12, color: "#8c8c8c" }}>
              Đã đăng ký trên hệ thống
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Tổng khóa học"
              value={totalCourses}
              prefix={<BookOutlined />}
              valueStyle={{ color: "#eb2f96" }}
            />
            <div style={{ marginTop: 8, fontSize: 12, color: "#8c8c8c" }}>
              Khóa học đang hoạt động
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Giao dịch tháng này"
              value={overview?.monthlyRevenue.count || 0}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
            <div style={{ marginTop: 8, fontSize: 12, color: "#8c8c8c" }}>
              Tỷ lệ thành công: {successRate}%
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Doanh thu tháng này"
              value={overview?.monthlyRevenue.revenue || 0}
              prefix={<RiseOutlined />}
              suffix="đ"
              valueStyle={{ color: "#3f8600" }}
              formatter={(value) => (value as number).toLocaleString("vi-VN")}
            />
            <div style={{ marginTop: 8, fontSize: 12, color: "#8c8c8c" }}>
              Từ {overview?.monthlyRevenue.count || 0} đơn hàng
            </div>
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <Card title="📈 Biểu đồ doanh thu 6 tháng" bordered={false}>
            <div style={{ height: 320 }}>
              <canvas ref={revenueChartRef}></canvas>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="📊 Tổng quan hệ thống" bordered={false}>
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <span>
                  <UserOutlined style={{ color: "#722ed1" }} /> Tổng người dùng
                </span>
                <span style={{ fontWeight: 600, fontSize: 16 }}>
                  {totalUsers}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <span>
                  <BookOutlined style={{ color: "#eb2f96" }} /> Tổng khóa học
                </span>
                <span style={{ fontWeight: 600, fontSize: 16 }}>
                  {totalCourses}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <span>
                  <ShoppingCartOutlined style={{ color: "#1890ff" }} /> Tổng
                  giao dịch
                </span>
                <span style={{ fontWeight: 600, fontSize: 16 }}>
                  {overview?.totalTransactions || 0}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <span>
                  <DollarOutlined style={{ color: "#52c41a" }} /> Tổng doanh thu
                </span>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#52c41a",
                  }}
                >
                  {(overview?.totalRevenue || 0).toLocaleString("vi-VN")}đ
                </span>
              </div>
            </div>

            <div
              style={{
                marginTop: 24,
                paddingTop: 24,
                borderTop: "1px solid #f0f0f0",
              }}
            >
              <div style={{ marginBottom: 8, fontWeight: 500 }}>
                Trạng thái giao dịch:
              </div>
              <div style={{ marginBottom: 12 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                    fontSize: 13,
                  }}
                >
                  <span>
                    <CheckCircleOutlined style={{ color: "#52c41a" }} /> Thành
                    công
                  </span>
                  <span style={{ fontWeight: 500 }}>
                    {overview?.successfulTransactions || 0}
                  </span>
                </div>
                <Progress
                  percent={parseFloat(successRate)}
                  strokeColor="#52c41a"
                  size="small"
                />
              </div>

              <div style={{ marginBottom: 12 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                    fontSize: 13,
                  }}
                >
                  <span>
                    <ClockCircleOutlined style={{ color: "#faad14" }} /> Đang
                    chờ
                  </span>
                  <span style={{ fontWeight: 500 }}>
                    {overview?.pendingTransactions || 0}
                  </span>
                </div>
                <Progress
                  percent={
                    overview
                      ? (overview.pendingTransactions /
                          overview.totalTransactions) *
                        100
                      : 0
                  }
                  strokeColor="#faad14"
                  size="small"
                />
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                    fontSize: 13,
                  }}
                >
                  <span>
                    <CloseCircleOutlined style={{ color: "#ff4d4f" }} /> Thất
                    bại
                  </span>
                  <span style={{ fontWeight: 500 }}>
                    {overview?.failedTransactions || 0}
                  </span>
                </div>
                <Progress
                  percent={
                    overview
                      ? (overview.failedTransactions /
                          overview.totalTransactions) *
                        100
                      : 0
                  }
                  strokeColor="#ff4d4f"
                  size="small"
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Bottom Section */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24}>
          <Card title="🏆 Top 5 khóa học bán chạy nhất" bordered={false}>
            <Table
              dataSource={topCourses}
              columns={topCoursesColumns}
              rowKey="courseId"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>

      {/* Footer */}
      <div
        style={{
          marginTop: 32,
          paddingTop: 16,
          borderTop: "1px solid #f0f0f0",
          textAlign: "center",
          color: "#8c8c8c",
        }}
      >
        © 2025 SkillCoder. All rights reserved.
      </div>
    </div>
  );
};

export default DashboardPage;
