export interface QuestionSummary {
  id: string
  slug: string
  position: string
  technology: string
  level: string
}

export interface QuestionDetail extends QuestionSummary {
  markdownBody: string
}
