// import {type User} from '../types/database.types';
import { type LoginResponse } from '../types/login.types';
import axiosClient from './axiosClient';

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axiosClient.post<LoginResponse>("/users/login", {
      email,
      password,
    });

    return response.data;
  },
  logout: () => {
    localStorage.clear();
  },
};