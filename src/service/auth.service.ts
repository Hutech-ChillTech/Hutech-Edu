import { type LoginResponse, type Register, type Login } from '../types/login.types';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const authService = {

  login: async (loginData: Login): Promise<LoginResponse> => { // Đổi tên tham số thành loginData để tránh trùng
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          ...loginData,
          returnSecureToken: true
        }),
      });

      const resData = await response.json(); 

      console.log("Dữ liệu chuẩn bị gửi về: ", resData);

      if (!response.ok) {
        throw new Error(resData.message || "Đăng nhập thất bại");
      }

      return resData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  register: async (registerData: Register) => {
    try {
      const response = await fetch(`${API_URL}/users/register`, { 
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(registerData)
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Đăng ký thất bại");
      }

      return resData;
    } catch (error) {
      console.error("Error fetching register: ", error);
      throw error;
    }
  },

  // 3. Hàm Logout
  logout: () => {
    localStorage.removeItem("accessToken"); 
    localStorage.removeItem("uid");
    localStorage.removeItem("user"); 
  },
};