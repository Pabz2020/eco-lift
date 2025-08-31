import axios from 'axios';
import { 
  LoginRequest, 
  LoginResponse, 
  DashboardStats, 
  UserWithTransactions, 
  PickupRequest,
  ApiResponse 
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },
};

// Dashboard API
export const dashboardAPI = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get<DashboardStats>('/dashboard/stats');
    return response.data;
  },

  getUsers: async (filterType: string = 'All'): Promise<UserWithTransactions[]> => {
    const response = await api.get<UserWithTransactions[]>(`/dashboard/users?filterType=${filterType}`);
    return response.data;
  },

  getPickupRequests: async (): Promise<PickupRequest[]> => {
    const response = await api.get<PickupRequest[]>('/dashboard/pickup-requests');
    return response.data;
  },

  getRecentRequests: async (): Promise<PickupRequest[]> => {
    const response = await api.get<PickupRequest[]>('/dashboard/recent-requests');
    return response.data;
  },
};

// Health check
export const healthAPI = {
  check: async (): Promise<{ status: string; timestamp: string }> => {
    const response = await api.get<{ status: string; timestamp: string }>('/health');
    return response.data;
  },
};

export default api;
