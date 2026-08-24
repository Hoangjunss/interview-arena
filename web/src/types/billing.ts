export interface UserSubscription {
  plan: 'FREE' | 'PRO';
  currentPeriodEnd: string | null; // ISO timestamp
  cancelAtPeriodEnd: boolean;
}

export interface CheckoutSessionResponse {
  url: string;
}
