import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { ProgressPage } from './ProgressPage'
import { progressApi } from '../api/progress'

import { MemoryRouter } from 'react-router-dom'

vi.mock('../api/progress', () => ({
  progressApi: {
    get: vi.fn(),
  },
}))

describe('ProgressPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders aggregated stats', async () => {
    ;(progressApi.get as any).mockResolvedValueOnce({
      completedInterviews: 4,
      averageInterviewScore: 78.5,
      quizAccuracyPercent: 66.7,
      cardsReviewedTotal: 20,
    })

    render(
      <MemoryRouter>
        <ProgressPage />
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByText('4')).toBeInTheDocument())
    expect(screen.getByText('78.5')).toBeInTheDocument()
    expect(screen.getByText('66.7%')).toBeInTheDocument()
    expect(screen.getByText('20')).toBeInTheDocument()
  })
})
