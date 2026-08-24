import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DsaListPage } from './DsaListPage'
import { dsaApi } from '../api/dsa'

vi.mock('../api/dsa', () => ({
  dsaApi: { list: vi.fn() },
}))

describe('DsaListPage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('lists DSA problems returned for the default filters', async () => {
    ;(dsaApi.list as any).mockResolvedValueOnce({
      content: [{ id: '1', slug: 'two-sum', topic: 'array', difficulty: 'easy' }],
      totalPages: 1,
      totalElements: 1,
      size: 10,
      number: 0,
    })

    render(
      <MemoryRouter>
        <DsaListPage />
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByText('two sum')).toBeInTheDocument())
  })
})
