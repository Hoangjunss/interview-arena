import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../../auth/AuthContext'
import { AppShell } from './AppShell'

function renderShell(initialPath: string) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<div>Home content</div>} />
            <Route path="/questions" element={<div>Questions content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  )
}

describe('AppShell', () => {
  it('renders the nav links and the routed page content', () => {
    renderShell('/questions')

    expect(screen.getByRole('link', { name: /kho câu hỏi/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /flashcards/i })).toBeInTheDocument()
    expect(screen.getByText('Questions content')).toBeInTheDocument()
  })
})
