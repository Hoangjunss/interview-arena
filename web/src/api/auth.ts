import { apiClient } from './client'
import type { AuthResponse, UserProfile } from '../types/auth'

export const authApi = {
  register: (email: string, password: string, displayName: string) =>
    apiClient.post<AuthResponse>('/api/auth/register', { email, password, displayName }),
  login: (email: string, password: string) =>
    apiClient.post<AuthResponse>('/api/auth/login', { email, password }),
  getProfile: () =>
    apiClient.get<UserProfile>('/api/users/me'),
  updateProfile: (displayName: string) =>
    apiClient.put<UserProfile>('/api/users/me', { displayName }),
  changePassword: (currentPassword: string, newPassword: string) =>
    apiClient.put<void>('/api/users/me/password', { currentPassword, newPassword }),
}

