export interface DsaProblemSummary {
  id: string
  slug: string
  topic: string
  difficulty: string
}

export interface DsaSampleTestCase {
  input: string
  expectedOutput: string
}

export interface DsaProblemDetail extends DsaProblemSummary {
  markdownBody: string
  starterCode: Record<string, string>
  samples: DsaSampleTestCase[]
}

export interface DsaTestCaseFailure {
  input: string | null
  expected: string | null
  actual: string | null
}

export interface DsaSubmissionResult {
  verdict: 'PASSED' | 'FAILED' | 'ERROR'
  passedCount: number
  totalCount: number
  failures: DsaTestCaseFailure[]
}
