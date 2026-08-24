import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { InterviewSessionPage } from './InterviewSessionPage'
import { interviewApi } from '../api/interview'

vi.mock('../api/interview', () => ({
  interviewApi: { get: vi.fn(), submitAnswer: vi.fn() },
}))

describe('InterviewSessionPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(window as any).__TEST_POLL_INTERVAL_MS__ = 50
  })

  afterEach(() => {
    delete (window as any).__TEST_POLL_INTERVAL_MS__
  })

  it('polls and shows the follow-up question once it appears', async () => {
    ;(interviewApi.get as any)
      .mockResolvedValueOnce({
        sessionId: 's1', status: 'ACTIVE', finalScore: null,
        turns: [{ turnOrder: 1, questionText: 'Q1', answerText: 'A1', feedback: null }],
      })
      .mockResolvedValue({
        sessionId: 's1', status: 'ACTIVE', finalScore: null,
        turns: [
          { turnOrder: 1, questionText: 'Q1', answerText: 'A1', feedback: null },
          { turnOrder: 2, questionText: 'Q2', answerText: null, feedback: null },
        ],
      })

    render(
      <MemoryRouter initialEntries={['/interviews/s1']}>
        <Routes>
          <Route path="/interviews/:sessionId" element={<InterviewSessionPage />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByText('Q1')).toBeInTheDocument())
    await waitFor(() => expect(screen.getByText('Q2')).toBeInTheDocument())
  })

  it('submits an answer via the input form', async () => {
    ;(interviewApi.get as any).mockResolvedValue({
      sessionId: 's1', status: 'ACTIVE', finalScore: null,
      turns: [{ turnOrder: 1, questionText: 'Q1', answerText: null, feedback: null }],
    })
    ;(interviewApi.submitAnswer as any).mockResolvedValueOnce({ status: 'PROCESSING' })

    render(
      <MemoryRouter initialEntries={['/interviews/s1']}>
        <Routes>
          <Route path="/interviews/:sessionId" element={<InterviewSessionPage />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByText('Q1')).toBeInTheDocument())

    fireEvent.change(screen.getByPlaceholderText('Nhập câu trả lời của bạn'), { target: { value: 'My answer' } })
    fireEvent.click(screen.getByText('Gửi'))

    await waitFor(() => expect(interviewApi.submitAnswer).toHaveBeenCalledWith('s1', 'My answer'))
  })
})
