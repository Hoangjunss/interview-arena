import { apiClient } from './client'

export interface DueCard {
  questionId: string
  slug: string
}

export type ReviewRating = 'AGAIN' | 'HARD' | 'GOOD' | 'EASY'

export const flashcardsApi = {
  due: () => apiClient.get<DueCard[]>('/api/flashcards/due'),
  review: (questionId: string, rating: ReviewRating) =>
    apiClient.post<void>(`/api/flashcards/${questionId}/review`, { rating }),
  save: (questionId: string) =>
    apiClient.post<void>(`/api/flashcards/${questionId}/save`, {}),
}

