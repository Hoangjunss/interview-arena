import { apiClient } from './client'

export interface Progress {
  completedInterviews: number
  averageInterviewScore: number
  quizAccuracyPercent: number
  cardsReviewedTotal: number
  dsaProblemsSolved: number
}

export const progressApi = {
  get: () => apiClient.get<Progress>('/api/progress'),
}
