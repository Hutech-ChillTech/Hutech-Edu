import axios from "axios";

export const xpStatisticsService = {
  getOverviewXP: () => axios.get("/api/xp/statistics/overview"),
  getXPByPeriod: (params: {
    startDate: string;
    endDate: string;
    groupBy: "day" | "month" | "year";
  }) => axios.get("/api/xp/statistics/xp-by-period", { params }),
  getTopUsers: (limit: number = 10) =>
    axios.get("/api/xp/statistics/top-users", { params: { limit } }),
  getCourseXP: (courseId: string) =>
    axios.get(`/api/xp/statistics/course/${courseId}`),
  getInstructorXP: (userId: string) =>
    axios.get(`/api/xp/statistics/instructor/${userId}`),
};
