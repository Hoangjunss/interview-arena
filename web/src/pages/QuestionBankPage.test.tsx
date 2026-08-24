import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QuestionBankPage } from './QuestionBankPage'
import { questionsApi } from '../api/questions'

vi.mock('../api/questions', () => ({
  questionsApi: { list: vi.fn() },
}))

describe('QuestionBankPage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('lists questions returned for the default filters', async () => {
    ;(questionsApi.list as any).mockResolvedValueOnce({
      content: [
        { id: '1', slug: 'react-q1', position: 'frontend', technology: 'react', level: 'junior' },
      ],
      totalPages: 1,
      totalElements: 1,
      size: 10,
      number: 0,
    })

    render(
      <MemoryRouter>
        <QuestionBankPage />
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByText('react q1')).toBeInTheDocument())
  })
})
