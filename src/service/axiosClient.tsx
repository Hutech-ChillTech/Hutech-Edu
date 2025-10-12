import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api", // đổi URL theo backend của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;