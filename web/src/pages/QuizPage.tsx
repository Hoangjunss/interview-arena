import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { questionsApi } from '../api/questions'
import { quizApi, type QuizResult } from '../api/quiz'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import type { QuestionDetail } from '../types/question'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { toast } from '@/components/ui/sonner'

function parseOptions(markdownBody: string): string[] {
  const match = markdownBody.match(/## Đáp án trắc nghiệm\s*\n((?:- \[[ x]] .*\n?)+)/)
  if (!match) return []
  return match[1]
    .split('\n')
    .filter(line => line.trim().length > 0)
    .map(line => line.replace(/^- \[[ x]] /, '').trim())
}

export function QuizPage() {
  const { questionId } = useParams<{ questionId: string }>()
  const [detail, setDetail] = useState<QuestionDetail | null>(null)
  const [options, setOptions] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [result, setResult] = useState<QuizResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (questionId) {
      setLoading(true)
      setResult(null)
      setSelectedIndex(null)
      questionsApi.detail(questionId)
        .then(res => {
          setDetail(res)
          setOptions(parseOptions(res.markdownBody))
        })
        .finally(() => setLoading(false))
    }
  }, [questionId])

  async function handleOptionClick(index: number) {
    if (!questionId || result !== null) return
    setSelectedIndex(index)
    try {
      const r = await quizApi.submit(questionId, index)
      setResult(r)
    } catch (err) {
      console.error('Failed to submit choice', err)
      toast.error('Không thể nộp câu trả lời, thử lại sau.')
      setSelectedIndex(null)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

  if (!detail) {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="font-mono text-2xl font-semibold">Không tìm thấy câu hỏi</h1>
        <Button asChild>
          <Link to="/questions">Quay lại kho câu hỏi</Link>
        </Button>
      </div>
    )
  }

  const explanationSplit = detail.markdownBody.split(/(## Giải thích \(VI\)|## Explanation \(EN\))/i)
  const explanationMarkdown = explanationSplit.length > 2 ? explanationSplit.slice(1).join('\n') : ''
  const questionContent = detail.markdownBody.split(/## Đáp án trắc nghiệm/i)[0]

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-mono text-2xl font-semibold">Luyện trắc nghiệm</h1>
        <Button asChild variant="secondary" size="sm">
          <Link to="/questions">Quay lại</Link>
        </Button>
      </div>

      <Card>
        <CardContent className="py-6">
          <div className="mb-3 flex gap-2">
            <Badge variant="secondary">{detail.position}</Badge>
            <Badge variant="secondary">{detail.technology}</Badge>
            <Badge variant="outline">{detail.level}</Badge>
          </div>
          <div className="prose prose-invert max-w-none">
            <MarkdownRenderer content={questionContent} />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3">
        {options.map((option, i) => {
          const isCorrect = result !== null && i === result.correctIndex
          const isWrongSelection = result !== null && i === selectedIndex && !result.correct

          return (
            <button
              key={i}
              onClick={() => handleOptionClick(i)}
              disabled={result !== null}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl border border-border bg-card px-6 py-4 text-left text-base transition-colors',
                result === null && 'hover:border-accent',
                isCorrect && 'border-success bg-success/10',
                isWrongSelection && 'border-danger bg-danger/10'
              )}
            >
              <span className="font-mono font-semibold">{String.fromCharCode(65 + i)}.</span>
              {option}
            </button>
          )
        })}
      </div>

      {result && (
        <Card className={cn(result.correct ? 'border-success' : 'border-danger')}>
          <CardContent className="py-6">
            <h3 className={cn('mb-3 text-xl font-semibold', result.correct ? 'text-success' : 'text-danger')}>
              {result.correct ? 'Chính xác! 🎉' : 'Chưa chính xác. ❌'}
            </h3>
            {explanationMarkdown && (
              <div className="border-t border-border pt-3">
                <h4 className="mb-2 text-base font-medium">Giải thích chi tiết:</h4>
                <div className="prose prose-invert max-w-none text-sm">
                  <MarkdownRenderer content={explanationMarkdown} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
