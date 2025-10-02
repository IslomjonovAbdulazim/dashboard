import api from './api'

// Types for Authentication API
export interface LoginRequest {
  email: string
  password: string
  captchaToken: string
}

export interface LoginResponse {
  message: string
}

export interface AuthError {
  error: {
    code: 
      | 'INCORRECT_PASSWORD' 
      | 'USER_NOT_FOUND' 
      | 'CAPTCHA_TOKEN_NOT_EXIST' 
      | 'INVALID_EMAIL' 
      | 'USER_BLOCKED'
  }
}

// Authentication API functions
export const authApi = {
  // Login with email and password
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/v1/users/login', credentials)
    return response.data
  },

  // Logout (if needed - would clear cookies on server)
  logout: async (): Promise<void> => {
    try {
      await api.post('/v1/users/logout')
    } catch (error) {
      // Even if logout fails, we should clear local state
      console.warn('Logout request failed:', error)
    }
  },

  // Check if user is authenticated (test if cookies are valid)
  checkAuth: async (): Promise<boolean> => {
    try {
      // Try to make an authenticated request to test if cookies are valid
      await api.get('/v1/users/me') // Assuming this endpoint exists
      return true
    } catch (error) {
      return false
    }
  },
}