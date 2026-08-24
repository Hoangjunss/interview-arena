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
      dsaProblemsSolved: 5,
    })

    render(
      <MemoryRouter>
        <ProgressPage />
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getAllByText('4').length).toBeGreaterThan(0))
    expect(screen.getAllByText('78.5').length).toBeGreaterThan(0)
    expect(screen.getAllByText('66.7%').length).toBeGreaterThan(0)
    expect(screen.getAllByText('20').length).toBeGreaterThan(0)
    expect(screen.getAllByText('5').length).toBeGreaterThan(0)
  })
})
