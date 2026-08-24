import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { DsaProblemPage } from './DsaProblemPage'
import { dsaApi } from '../api/dsa'

vi.mock('../api/dsa', () => ({
  dsaApi: { detail: vi.fn(), submit: vi.fn() },
}))

vi.mock('@monaco-editor/react', () => ({
  default: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <textarea data-testid="editor" value={value} onChange={e => onChange(e.target.value)} />
  ),
}))

describe('DsaProblemPage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('loads the problem, submits code, and shows a passed verdict', async () => {
    ;(dsaApi.detail as any).mockResolvedValueOnce({
      id: '1',
      slug: 'two-sum',
      topic: 'array',
      difficulty: 'easy',
      markdownBody: '## Đề bài (VI)\nNội dung.',
      starterCode: { java: 'stub-java', python: 'stub-python', javascript: 'stub-js', cpp: 'stub-cpp' },
      samples: [{ input: '2,7,11,15\n9', expectedOutput: '0,1' }],
    })
    ;(dsaApi.submit as any).mockResolvedValueOnce({
      verdict: 'PASSED',
      passedCount: 3,
      totalCount: 3,
      failures: [],
    })

    render(
      <MemoryRouter initialEntries={['/dsa/two-sum']}>
        <Routes>
          <Route path="/dsa/:slug" element={<DsaProblemPage />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByText('two sum')).toBeInTheDocument())

    fireEvent.click(screen.getByRole('button', { name: /chạy thử/i }))

    await waitFor(() => expect(screen.getByText(/PASSED/)).toBeInTheDocument())
    expect(dsaApi.submit).toHaveBeenCalledWith('two-sum', 'python', 'stub-python')
  })
})
