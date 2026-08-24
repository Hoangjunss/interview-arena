import { apiClient } from './client'

export interface QuizResult {
  correct: boolean
  correctIndex: number
}

export const quizApi = {
  submit: (questionId: string, selectedIndex: number) =>
    apiClient.post<QuizResult>(`/api/quiz/${questionId}/submit`, { selectedIndex }),
}
