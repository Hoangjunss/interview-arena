import { createContext, useState, type ReactNode } from 'react'
import { authApi } from '../api/auth'
import type { AuthUser } from '../types/auth'

interface AuthContextValue {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, displayName: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function readInitialUser(): AuthUser | null {
  const raw = localStorage.getItem('user')
  return raw ? (JSON.parse(raw) as AuthUser) : null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readInitialUser)

  function persist(authUser: AuthUser, token: string) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(authUser))
    setUser(authUser)
  }

  async function login(email: string, password: string) {
    const response = await authApi.login(email, password)
    persist({ userId: response.userId, email: response.email, displayName: response.displayName }, response.token)
  }

  async function register(email: string, password: string, displayName: string) {
    const response = await authApi.register(email, password, displayName)
    persist({ userId: response.userId, email: response.email, displayName: response.displayName }, response.token)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
