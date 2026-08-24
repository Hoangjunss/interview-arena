export interface InterviewTurn {
  turnOrder: number
  questionText: string
  answerText: string | null
  feedback: string | null
}

export interface InterviewSession {
  sessionId: string
  status: 'ACTIVE' | 'COMPLETED' | 'FAILED'
  finalScore: number | null
  turns: InterviewTurn[]
}
