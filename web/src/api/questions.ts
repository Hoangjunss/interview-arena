import { apiClient } from './client'
import type { QuestionDetail, QuestionSummary } from '../types/question'

export const questionsApi = {
  list: (position: string, technology: string, level: string) =>
    apiClient.get<QuestionSummary[]>(
      `/api/questions?position=${position}&technology=${technology}&level=${level}`
    ),
  detail: (id: string) => apiClient.get<QuestionDetail>(`/api/questions/${id}`),
}
