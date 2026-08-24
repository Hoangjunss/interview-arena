import { apiClient } from './client'
import type { AuthResponse } from '../types/auth'

export const authApi = {
  register: (email: string, password: string, displayName: string) =>
    apiClient.post<AuthResponse>('/api/auth/register', { email, password, displayName }),
  login: (email: string, password: string) =>
    apiClient.post<AuthResponse>('/api/auth/login', { email, password }),
}
