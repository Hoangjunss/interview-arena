import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import BillingPage from './BillingPage'
import { billingApi } from '../api/billing'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../api/billing', () => ({
  billingApi: {
    getSubscription: vi.fn(),
    createCheckoutSession: vi.fn(),
    cancel: vi.fn(),
    resume: vi.fn(),
  },
}))

describe('BillingPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders free tier info and upgrade options when subscription plan is FREE', async () => {
    ;(billingApi.getSubscription as any).mockResolvedValueOnce({
      data: {
        plan: 'FREE',
        currentPeriodEnd: null,
        cancelAtPeriodEnd: false,
      },
    })

    render(
      <MemoryRouter>
        <BillingPage />
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getAllByText('Free Tier').length).toBeGreaterThan(0))
    expect(screen.getAllByText('Nâng Cấp Lên Pro Ngay').length).toBeGreaterThan(0)
    expect(screen.getAllByText('$5').length).toBeGreaterThan(0)
  })

  it('renders active details and cancel button when subscription plan is PRO', async () => {
    ;(billingApi.getSubscription as any).mockResolvedValueOnce({
      data: {
        plan: 'PRO',
        currentPeriodEnd: '2026-12-31T00:00:00Z',
        cancelAtPeriodEnd: false,
      },
    })

    render(
      <MemoryRouter>
        <BillingPage />
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getAllByText('Pro Member').length).toBeGreaterThan(0))
    expect(screen.getAllByText('Hủy Gia Hạn Gói').length).toBeGreaterThan(0)
  })
})
