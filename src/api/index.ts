import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export type ErrorResponse = {
  code: string;
  message: string;
};

export type AuthResponse = {
  token: string;
};

export type ProfileResponse = {
  email: string;
  id: string;
};

export const register = async (email: string, password: string) => {
  try {
    const { data } = await api.post<AuthResponse>('/register', { email, password });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.message || 'Registration failed');
    }
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const { data } = await api.post<AuthResponse>('/login', { email, password });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.message || 'Login failed');
    }
    throw error;
  }
};

export const getProfile = async () => {
  const { data } = await api.get<ProfileResponse>('/profile');
  return data;
};