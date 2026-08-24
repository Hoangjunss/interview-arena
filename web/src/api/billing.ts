import { apiClient } from './client'
import type { CheckoutSessionResponse, UserSubscription } from '../types/billing'

export const billingApi = {
  createCheckoutSession: () =>
    apiClient.post<CheckoutSessionResponse>('/api/billing/checkout-session'),
  getSubscription: () =>
    apiClient.get<UserSubscription>('/api/billing/subscription'),
  cancel: () =>
    apiClient.post<void>('/api/billing/cancel'),
  resume: () =>
    apiClient.post<void>('/api/billing/resume'),
}
