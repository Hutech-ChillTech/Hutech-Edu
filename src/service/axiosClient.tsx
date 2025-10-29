// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: "http://localhost:3000/api", // đổi URL theo backend của bạn
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default axiosClient;
import axios from "axios";

// ✅ Tạo instance axios với baseURL cố định
const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor thêm token vào header nếu có
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Xử lý lỗi phản hồi từ server
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
