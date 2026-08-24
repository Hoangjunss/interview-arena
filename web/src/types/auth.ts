export interface AuthUser {
  userId: string
  email: string
  displayName: string
}

export interface AuthResponse extends AuthUser {
  token: string
}
