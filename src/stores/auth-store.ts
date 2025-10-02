import { create } from 'zustand'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

const IS_AUTHENTICATED = 'zehnly_is_authenticated'
const USER_DATA = 'zehnly_user_data'

interface AuthUser {
  id: number
  email: string
  role: string
}

interface AuthState {
  auth: {
    user: AuthUser | null
    isAuthenticated: boolean
    setUser: (user: AuthUser | null) => void
    setAuthenticated: (authenticated: boolean) => void
    login: (user: AuthUser) => void
    logout: () => void
  }
}

export const useAuthStore = create<AuthState>()((set) => {
  const isAuthenticatedCookie = getCookie(IS_AUTHENTICATED)
  const userCookie = getCookie(USER_DATA)
  
  const initAuthenticated = isAuthenticatedCookie === 'true'
  const initUser = userCookie ? JSON.parse(userCookie) : null
  
  return {
    auth: {
      user: initUser,
      isAuthenticated: initAuthenticated,
      setUser: (user) =>
        set((state) => {
          if (user) {
            setCookie(USER_DATA, JSON.stringify(user))
          } else {
            removeCookie(USER_DATA)
          }
          return { ...state, auth: { ...state.auth, user } }
        }),
      setAuthenticated: (authenticated) =>
        set((state) => {
          if (authenticated) {
            setCookie(IS_AUTHENTICATED, 'true')
          } else {
            removeCookie(IS_AUTHENTICATED)
          }
          return { ...state, auth: { ...state.auth, isAuthenticated: authenticated } }
        }),
      login: (user) =>
        set((state) => {
          setCookie(IS_AUTHENTICATED, 'true')
          setCookie(USER_DATA, JSON.stringify(user))
          return {
            ...state,
            auth: { ...state.auth, user, isAuthenticated: true },
          }
        }),
      logout: () =>
        set((state) => {
          removeCookie(IS_AUTHENTICATED)
          removeCookie(USER_DATA)
          return {
            ...state,
            auth: { ...state.auth, user: null, isAuthenticated: false },
          }
        }),
    },
  }
})
