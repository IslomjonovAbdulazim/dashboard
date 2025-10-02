import api from './api'

// Types for API responses
export interface AuthUser {
  id: number
  email: string
  role: string
}

export interface LoginRequest {
  email: string
  password: string
}

// Current API login request format (until super admin is implemented)
export interface CurrentApiLoginRequest {
  phone: string
  password: string
  role: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
  user: AuthUser
}

// Configuration for API endpoints
const API_CONFIG = {
  // Set to true when super admin API is implemented
  USE_SUPER_ADMIN_API: true,
  SUPER_ADMIN_ENDPOINT: '/api/v1/auth/super-admin/login',
  CURRENT_API_ENDPOINT: '/auth/login',
}

// Auth API functions
export const authApi = {
  // Super Admin Login (adaptable to current API)
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    if (API_CONFIG.USE_SUPER_ADMIN_API) {
      // Future super admin API
      const response = await api.post<LoginResponse>(
        API_CONFIG.SUPER_ADMIN_ENDPOINT,
        credentials
      )
      return response.data
    } else {
      // Current API - map email to phone and set role to admin
      const currentApiPayload: CurrentApiLoginRequest = {
        phone: credentials.email, // Using email as phone for now
        password: credentials.password,
        role: 'admin', // Assuming admin role for super admin access
      }
      
      const response = await api.post<LoginResponse>(
        API_CONFIG.CURRENT_API_ENDPOINT,
        currentApiPayload
      )
      return response.data
    }
  },

  // Verify token (optional - if backend supports it)
  verifyToken: async (): Promise<AuthUser> => {
    const response = await api.get<AuthUser>('/api/v1/auth/verify')
    return response.data
  },

  // Logout (if backend supports it)
  logout: async (): Promise<void> => {
    await api.post('/api/v1/auth/logout')
  },
}