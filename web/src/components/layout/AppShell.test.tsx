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

    // Links appear in both nav and footer — assert at least one is present
    expect(screen.getAllByRole('link', { name: /kho câu hỏi/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /flashcards/i }).length).toBeGreaterThan(0)
    expect(screen.getByText('Questions content')).toBeInTheDocument()
  })
})

