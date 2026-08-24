import { apiClient } from './client'
import type { InterviewSession } from '../types/interview'

export const interviewApi = {
  start: (position: string, technology: string, level: string) =>
    apiClient.post<InterviewSession>('/api/interviews', { position, technology, level }),
  submitAnswer: (sessionId: string, answerText: string) =>
    apiClient.post<{ status: string }>(`/api/interviews/${sessionId}/answers`, { answerText }),
  get: (sessionId: string) => apiClient.get<InterviewSession>(`/api/interviews/${sessionId}`),
}
