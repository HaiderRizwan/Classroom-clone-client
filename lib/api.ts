import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Add this for handling cookies if needed
});

// Request interceptor for adding auth token
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

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (data: { name: string; email: string; password: string }) => {
    try {
      const response = await api.post('/auth/register', {
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        password: data.password
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Registration failed';
        console.error('Registration error:', error.response?.data);
        throw new Error(message);
      }
      throw error;
    }
  },

  validateToken: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      
      const response = await api.get('/auth/me'); // Changed from /validate to /me
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      throw new Error('Token validation failed');
    }
  }
};

export const classroomAPI = {
  getMyClassrooms: async () => {
    const response = await api.get('/classrooms/my');
    return response.data;
  },
  createClassroom: async (data: { name: string; section: string }) => {
    const response = await api.post('/classrooms', data);
    return response.data;
  },
  joinClassroom: async (code: string) => {
    const response = await api.post('/classrooms/join', { code });
    return response.data;
  },
  getClassroomById: async (id: string) => {
    const response = await api.get(`/classrooms/${id}`);
    return response.data;
  },
};

export const assignmentAPI = {
  getAssignments: async (classroomId: string) => {
    const response = await api.get(`/assignments/classroom/${classroomId}`);
    return response.data;
  },
  createAssignment: async (classroomId: string, data: any) => {
    const response = await api.post(`/assignments/classroom/${classroomId}`, data);
    return response.data;
  },
};

export const commentAPI = {
  getComments: async (classroomId: string) => {
    const response = await api.get(`/comments/classroom/${classroomId}`);
    return response.data;
  },
  createComment: async (classroomId: string, data: { content: string; parentCommentId?: string }) => {
    const response = await api.post(`/comments/classroom/${classroomId}`, data);
    return response.data;
  },
};

export default api;