export interface LoginResponse {
  success: boolean;
  data: {
    uid: string;
    userId: string;
    roleId: string;
    role: string;
    email: string;
    token: string;
  };
  message: string;
}

//  Kiểu dữ liệu trong token
export interface DecodedToken {
  userId: string;
  email: string;
  roles?: string[];
  role?: string;
  iat: number;
  exp: number;
}