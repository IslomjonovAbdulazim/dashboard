import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/auth-store'

const BASE_URL = 'https://api.zehnly.ai'

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
  withCredentials: true, // Enable sending cookies with requests
})

// Request interceptor - no need to add auth token since it's in cookies
api.interceptors.request.use(
  (config: any) => {
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, reset auth state
      useAuthStore.getState().auth.logout()
    }
    return Promise.reject(error)
  }
)

export { api }
export default api