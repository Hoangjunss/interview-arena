import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../auth/AuthContext'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  it('shows login/register CTAs when logged out', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </AuthProvider>
    )

    expect(screen.getAllByRole('link', { name: /đăng nhập/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /đăng ký/i }).length).toBeGreaterThan(0)
  })
})
