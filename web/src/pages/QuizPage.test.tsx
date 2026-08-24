import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { QuizPage } from './QuizPage'
import { questionsApi } from '../api/questions'
import { quizApi } from '../api/quiz'

vi.mock('../api/questions', () => ({ questionsApi: { detail: vi.fn() } }))
vi.mock('../api/quiz', () => ({ quizApi: { submit: vi.fn() } }))

describe('QuizPage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders options parsed from markdown and shows result after submit', async () => {
    ;(questionsApi.detail as any).mockResolvedValueOnce({
      id: 'q1',
      slug: 'react-quiz-jsx-keys',
      markdownBody: '## Đáp án trắc nghiệm\n- [ ] Sai\n- [x] Đúng\n',
    })
    ;(quizApi.submit as any).mockResolvedValueOnce({ correct: true, correctIndex: 1 })

    render(
      <MemoryRouter initialEntries={['/quiz/q1']}>
        <Routes>
          <Route path="/quiz/:questionId" element={<QuizPage />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByText('Đúng')).toBeInTheDocument())

    fireEvent.click(screen.getByText('Đúng'))

    await waitFor(() => expect(screen.getByText(/Chính xác/)).toBeInTheDocument())
  })
})
