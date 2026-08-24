import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { FlashcardsPage } from './FlashcardsPage'
import { flashcardsApi } from '../api/flashcards'
import { questionsApi } from '../api/questions'

vi.mock('../api/flashcards', () => ({
  flashcardsApi: { due: vi.fn(), review: vi.fn() },
}))

vi.mock('../api/questions', () => ({
  questionsApi: { detail: vi.fn() },
}))

describe('FlashcardsPage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('shows the first due card and advances after rating', async () => {
    ;(flashcardsApi.due as any).mockResolvedValueOnce([
      { questionId: 'q1', slug: 'react-q1' },
      { questionId: 'q2', slug: 'react-q2' },
    ])
    ;(flashcardsApi.review as any).mockResolvedValueOnce(undefined)
    ;(questionsApi.detail as any).mockResolvedValue({
      id: 'q1',
      slug: 'react-q1',
      position: 'frontend',
      technology: 'react',
      level: 'junior',
      markdownBody: '## Question\nHow useState works?'
    })

    render(
      <MemoryRouter>
        <FlashcardsPage />
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByText('react q1')).toBeInTheDocument())

    fireEvent.click(screen.getByText('Good'))

    await waitFor(() => expect(screen.getByText('react q2')).toBeInTheDocument())
    expect(flashcardsApi.review).toHaveBeenCalledWith('q1', 'GOOD')
  })

  it('shows a completion message when there are no due cards', async () => {
    ;(flashcardsApi.due as any).mockResolvedValueOnce([])

    render(
      <MemoryRouter>
        <FlashcardsPage />
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByText(/Không còn thẻ/)).toBeInTheDocument())
  })
})
