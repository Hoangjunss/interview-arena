import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthProvider } from './AuthContext'
import { useAuth } from './useAuth'
import { authApi } from '../api/auth'

vi.mock('../api/auth', () => ({
  authApi: { login: vi.fn(), register: vi.fn() },
}))

function TestConsumer() {
  const { user, login } = useAuth()
  return (
    <div>
      <span data-testid="user">{user ? user.email : 'anonymous'}</span>
      <button onClick={() => login('dev@example.com', 'pw')}>login</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('starts as anonymous and becomes authenticated after login()', async () => {
    ;(authApi.login as any).mockResolvedValueOnce({
      token: 'tok123',
      userId: 'u1',
      email: 'dev@example.com',
      displayName: 'Dev',
    })

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    )

    expect(screen.getByTestId('user').textContent).toBe('anonymous')

    fireEvent.click(screen.getByText('login'))

    await waitFor(() => expect(screen.getByTestId('user').textContent).toBe('dev@example.com'))
    expect(localStorage.getItem('token')).toBe('tok123')
  })
})
