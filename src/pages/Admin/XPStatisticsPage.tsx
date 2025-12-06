import React, { useEffect, useState } from "react";
import {
  Card,
  Statistic,
  Table,
  DatePicker,
  Select,
  Spin,
  Row,
  Col,
  Typography,
  Progress,
  Tag,
  Space,
  Empty,
  Button,
  message,
} from "antd";
import {
  TrophyOutlined,
  UserOutlined,
  RiseOutlined,
  FireOutlined,
  CrownOutlined,
  BookOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { gamificationService } from "../../service/gamification.service";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Title } = Typography;

const XPStatisticsPage: React.FC = () => {
  // Tổng quan XP
  const [overview, setOverview] = useState<any>(null);
  const [loadingOverview, setLoadingOverview] = useState(false);

  // XP theo thời gian
  const [periodData, setPeriodData] = useState<any[]>([]);
  const [loadingPeriod, setLoadingPeriod] = useState(false);
  const [periodFilter, setPeriodFilter] = useState({
    startDate: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    groupBy: "day" as "day" | "month" | "year",
  });

  // Top user XP
  const [topUsers, setTopUsers] = useState<any[]>([]);
  const [loadingTopUsers, setLoadingTopUsers] = useState(false);

  // XP theo khóa học
  const [courseId, setCourseId] = useState<string>("");
  const [courseXP, setCourseXP] = useState<any>(null);
  const [loadingCourseXP, setLoadingCourseXP] = useState(false);

  // XP theo instructor
  const [instructorId, setInstructorId] = useState<string>("");
  const [instructorXP, setInstructorXP] = useState<any>(null);
  const [loadingInstructorXP, setLoadingInstructorXP] = useState(false);

  // Generate mock period data based on date range
  const generateMockPeriodData = () => {
    const start = dayjs(periodFilter.startDate);
    const end = dayjs(periodFilter.endDate);
    const data = [];
    
    let current = start;
    while (current.isBefore(end) || current.isSame(end, 'day')) {
      let period = "";
      let next = current;
      
      if (periodFilter.groupBy === "day") {
        period = current.format("DD/MM");
        next = current.add(1, "day");
      } else if (periodFilter.groupBy === "month") {
        period = current.format("MM/YYYY");
        next = current.add(1, "month");
      } else {
        period = current.format("YYYY");
        next = current.add(1, "year");
      }
      
      data.push({
        period,
        totalXP: Math.floor(Math.random() * 5000) + 1000,
      });
      
      current = next;
      if (data.length > 30) break; // Limit to 30 data points
    }
    
    return data;
  };

  // Fetch tổng quan XP - Using real API + mock data
  const fetchOverview = async () => {
    setLoadingOverview(true);
    try {
      // Get real data from gamification API
      const [leaderboard, achievements] = await Promise.all([
        gamificationService.getLeaderboard(100), // Get more users for total count
        gamificationService.getAllAchievements(),
      ]);

      // Calculate total XP from all users
      const totalXP = leaderboard.reduce((sum, user) => sum + user.totalXP, 0);
      const avgXP = leaderboard.length > 0 ? Math.round(totalXP / leaderboard.length) : 0;

      setOverview({
        totalXP,
        totalUsers: leaderboard.length,
        totalAchievements: achievements.length,
        avgXP,
      });
    } catch (error) {
      message.error("Không thể tải thống kê tổng quan");
      console.error(error);
      setOverview(null);
    } finally {
      setLoadingOverview(false);
    }
  };

  // Fetch XP theo thời gian - Mock data for now
  const fetchPeriodData = () => {
    setLoadingPeriod(true);
    try {
      const mockData = generateMockPeriodData();
      setPeriodData(mockData);
    } catch (error) {
      message.error("Không thể tải dữ liệu XP theo thời gian");
      console.error(error);
      setPeriodData([]);
    } finally {
      setLoadingPeriod(false);
    }
  };

  // Fetch top user XP - Using real API
  const fetchTopUsers = async () => {
    setLoadingTopUsers(true);
    try {
      const leaderboard = await gamificationService.getLeaderboard(10);
      setTopUsers(leaderboard);
    } catch (error) {
      message.error("Không thể tải bảng xếp hạng");
      console.error(error);
      setTopUsers([]);
    } finally {
      setLoadingTopUsers(false);
    }
  };

  // Fetch all data
  const fetchAllData = () => {
    fetchOverview();
    fetchPeriodData();
    fetchTopUsers();
  };

  useEffect(() => {
    fetchOverview();
    fetchTopUsers();
  }, []);

  useEffect(() => {
    fetchPeriodData();
  }, [periodFilter]);

  // Fetch XP theo khóa học - Mock for now
  useEffect(() => {
    if (!courseId) return;
    setLoadingCourseXP(true);
    // Mock data
    setTimeout(() => {
      setCourseXP({
        totalXP: Math.floor(Math.random() * 10000) + 5000,
        count: Math.floor(Math.random() * 50) + 10,
      });
      setLoadingCourseXP(false);
    }, 500);
  }, [courseId]);

  // Fetch XP theo instructor - Mock for now
  useEffect(() => {
    if (!instructorId) return;
    setLoadingInstructorXP(true);
    // Mock data
    setTimeout(() => {
      setInstructorXP({
        totalXP: Math.floor(Math.random() * 15000) + 8000,
        count: Math.floor(Math.random() * 100) + 20,
      });
      setLoadingInstructorXP(false);
    }, 500);
  }, [instructorId]);

  // Format number with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("vi-VN").format(num);
  };

  // Get medal color based on rank
  const getMedalColor = (rank: number) => {
    if (rank === 1) return "#FFD700"; // Gold
    if (rank === 2) return "#C0C0C0"; // Silver
    if (rank === 3) return "#CD7F32"; // Bronze
    return "#8c8c8c";
  };

  // Get level color
  const getLevelColor = (level: number) => {
    if (level >= 50) return "red";
    if (level >= 30) return "orange";
    if (level >= 15) return "blue";
    if (level >= 5) return "green";
    return "default";
  };

  // Table columns with enhanced styling
  const topUserColumns = [
    {
      title: "Hạng",
      dataIndex: "rank",
      key: "rank",
      width: 80,
      align: "center" as const,
      render: (rank: number) => (
        <Space>
          {rank <= 3 ? (
            <CrownOutlined
              style={{ color: getMedalColor(rank), fontSize: 20 }}
            />
          ) : (
            <span style={{ fontSize: 16, fontWeight: "bold", color: "#8c8c8c" }}>
              #{rank}
            </span>
          )}
        </Space>
      ),
    },
    {
      title: "Người dùng",
      dataIndex: "userName",
      key: "userName",
      render: (name: string, _record: any) => (
        <Space>
          <UserOutlined style={{ color: "#1890ff" }} />
          <span style={{ fontWeight: 500 }}>{name}</span>
        </Space>
      ),
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      width: 120,
      align: "center" as const,
      render: (level: number) => (
        <Tag color={getLevelColor(level)} icon={<ThunderboltOutlined />}>
          Level {level}
        </Tag>
      ),
    },
    {
      title: "Tổng XP",
      dataIndex: "totalXP",
      key: "totalXP",
      width: 150,
      align: "right" as const,
      render: (xp: number) => (
        <span style={{ fontWeight: 600, color: "#52c41a", fontSize: 14 }}>
          {formatNumber(xp)} XP
        </span>
      ),
    },
    {
      title: "Tiến độ",
      key: "progress",
      width: 200,
      render: (record: any) => {
        const maxXP = topUsers[0]?.totalXP || 1;
        const percent = (record.totalXP / maxXP) * 100;
        return (
          <Progress
            percent={Math.round(percent)}
            size="small"
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
          />
        );
      },
    },
  ];

  return (
    <div style={{ padding: "24px", background: "#ffffff", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>
          🏆 Thống kê XP & Gamification
        </h1>
      </div>

      {/* Overview Statistics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={true} loading={loadingOverview}>
            <Statistic
              title="Tổng XP Hệ thống"
              value={overview?.totalXP || 0}
              formatter={(value) => formatNumber(Number(value))}
              prefix={<FireOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
            <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
              <TeamOutlined /> Toàn hệ thống
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={true} loading={loadingOverview}>
            <Statistic
              title="Tổng Người dùng"
              value={overview?.totalUsers || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
            <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
              <RiseOutlined /> Đang hoạt động
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={true} loading={loadingOverview}>
            <Statistic
              title="Thành tựu Mở khóa"
              value={overview?.totalAchievements || 0}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
            <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
              <TrophyOutlined /> Achievements
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={true} loading={loadingOverview}>
            <Statistic
              title="XP Trung bình/User"
              value={overview?.avgXP || 0}
              formatter={(value) => formatNumber(Number(value))}
              prefix={<RiseOutlined />}
              valueStyle={{ color: "#eb2f96" }}
            />
            <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
              <FireOutlined /> Trung bình
            </div>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card
        bordered={true}
        style={{ marginBottom: 24 }}
        title="Bộ lọc"
        extra={
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchAllData}
            loading={loadingOverview || loadingPeriod || loadingTopUsers}
          >
            Làm mới
          </Button>
        }
      >
        <Space wrap>
          <RangePicker
            value={[dayjs(periodFilter.startDate), dayjs(periodFilter.endDate)]}
            onChange={(dates) => {
              if (dates) {
                setPeriodFilter((f) => ({
                  ...f,
                  startDate: dates[0]?.format("YYYY-MM-DD") || f.startDate,
                  endDate: dates[1]?.format("YYYY-MM-DD") || f.endDate,
                }));
              }
            }}
            format="DD/MM/YYYY"
          />
          <Select
            value={periodFilter.groupBy}
            onChange={(groupBy) => setPeriodFilter((f) => ({ ...f, groupBy }))}
            style={{ width: 150 }}
          >
            <Select.Option value="day">Theo ngày</Select.Option>
            <Select.Option value="month">Theo tháng</Select.Option>
            <Select.Option value="year">Theo năm</Select.Option>
          </Select>
        </Space>
      </Card>

      {/* XP Trend Chart */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} xl={16}>
          <Card
            bordered={true}
            title="📈 Xu hướng XP theo thời gian"
            style={{ height: 400 }}
          >
            <Spin spinning={loadingPeriod}>
              {periodData.length > 0 ? (
                <div style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={periodData}>
                      <defs>
                        <linearGradient id="colorXP" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1890ff" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#1890ff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="period" stroke="#666" style={{ fontSize: 12 }} />
                      <YAxis stroke="#666" style={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255,255,255,0.95)",
                          border: "1px solid #d9d9d9",
                          borderRadius: 4,
                        }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="totalXP"
                        stroke="#1890ff"
                        fillOpacity={1}
                        fill="url(#colorXP)"
                        name="Tổng XP"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <Empty description="Không có dữ liệu" style={{ paddingTop: 100 }} />
              )}
            </Spin>
          </Card>
        </Col>

        {/* Course & Instructor Stats */}
        <Col xs={24} xl={8}>
          <Space direction="vertical" style={{ width: "100%" }} size={16}>
            <Card
              bordered={true}
              title={
                <Space>
                  <BookOutlined />
                  XP theo Khóa học
                </Space>
              }
            >
              <Select
                placeholder="Chọn khóa học"
                value={courseId}
                onChange={setCourseId}
                options={[]}
                style={{ width: "100%", marginBottom: 16 }}
                size="large"
              />
              <Spin spinning={loadingCourseXP}>
                {courseXP ? (
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Statistic
                      title="Tổng XP"
                      value={courseXP.totalXP}
                      formatter={(value) => formatNumber(Number(value))}
                      prefix={<FireOutlined style={{ color: "#1890ff" }} />}
                    />
                    <Statistic
                      title="Số user hoàn thành"
                      value={courseXP.count}
                      prefix={<UserOutlined style={{ color: "#52c41a" }} />}
                    />
                  </Space>
                ) : (
                  <Empty description="Chọn khóa học để xem thống kê" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </Spin>
            </Card>

            <Card
              bordered={true}
              title={
                <Space>
                  <TeamOutlined />
                  XP theo Giảng viên
                </Space>
              }
            >
              <Select
                placeholder="Chọn giảng viên"
                value={instructorId}
                onChange={setInstructorId}
                options={[]}
                style={{ width: "100%", marginBottom: 16 }}
                size="large"
              />
              <Spin spinning={loadingInstructorXP}>
                {instructorXP ? (
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Statistic
                      title="Tổng XP"
                      value={instructorXP.totalXP}
                      formatter={(value) => formatNumber(Number(value))}
                      prefix={<FireOutlined style={{ color: "#1890ff" }} />}
                    />
                    <Statistic
                      title="Số học viên"
                      value={instructorXP.count}
                      prefix={<UserOutlined style={{ color: "#52c41a" }} />}
                    />
                  </Space>
                ) : (
                  <Empty description="Chọn giảng viên để xem thống kê" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </Spin>
            </Card>
          </Space>
        </Col>
      </Row>

      {/* Top Users Leaderboard */}
      <Card bordered={true} title="👑 Bảng Xếp hạng Top User">
        <Spin spinning={loadingTopUsers}>
          <Table
            dataSource={topUsers}
            columns={topUserColumns}
            rowKey="userId"
            pagination={false}
            scroll={{ x: 800 }}
            rowClassName={(_record, index) =>
              index < 3 ? "top-user-row" : ""
            }
          />
        </Spin>
      </Card>

      <style>{`
        .top-user-row {
          background: #fafafa;
        }
        .top-user-row:hover {
          background: #f0f0f0 !important;
        }
      `}</style>
    </div>
  );
};

export default XPStatisticsPage;
