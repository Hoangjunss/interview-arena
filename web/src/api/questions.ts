import { apiClient } from './client'
import type { QuestionDetail, QuestionSummary } from '../types/question'

export interface Page<T> {
  content: T[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}

export const questionsApi = {
  list: (position: string, technology: string, level: string, page = 0, size = 10) =>
    apiClient.get<Page<QuestionSummary>>(
      `/api/questions?position=${position}&technology=${technology}&level=${level}&page=${page}&size=${size}`
    ),
  detail: (id: string) => apiClient.get<QuestionDetail>(`/api/questions/${id}`),
}
