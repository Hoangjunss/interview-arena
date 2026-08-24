export interface AuthUser {
  userId: string
  email: string
  displayName: string
}

export interface AuthResponse extends AuthUser {
  token: string
}

export interface UserProfile {
  userId: string
  email: string
  displayName: string
  createdAt: string
}
