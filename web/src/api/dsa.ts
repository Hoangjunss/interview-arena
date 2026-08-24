import { apiClient } from './client'
import type { DsaProblemDetail, DsaProblemSummary, DsaSubmissionResult } from '../types/dsa'

interface Page<T> {
  content: T[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}

export const dsaApi = {
  list: (topic: string | null, difficulty: string | null, page = 0, size = 10) => {
    const params = new URLSearchParams({ page: String(page), size: String(size) })
    if (topic) params.set('topic', topic)
    if (difficulty) params.set('difficulty', difficulty)
    return apiClient.get<Page<DsaProblemSummary>>(`/api/dsa?${params.toString()}`)
  },
  detail: (slug: string) => apiClient.get<DsaProblemDetail>(`/api/dsa/${slug}`),
  submit: (slug: string, language: string, code: string) =>
    apiClient.post<DsaSubmissionResult>(`/api/dsa/${slug}/submit`, { language, code }),
}
