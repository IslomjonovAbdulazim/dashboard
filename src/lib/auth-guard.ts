import { useAuthStore } from '@/stores/auth-store'

export const isAuthenticated = (): boolean => {
  const { user, isAuthenticated } = useAuthStore.getState().auth
  return !!(user && isAuthenticated)
}

export const requireAuth = () => {
  const authenticated = isAuthenticated()
  if (!authenticated) {
    throw new Error('Authentication required')
  }
  return authenticated
}

// Since we're using HTTP-only cookies, we don't need auth headers
export const getAuthHeaders = () => {
  return {} // Auth is handled by cookies
}