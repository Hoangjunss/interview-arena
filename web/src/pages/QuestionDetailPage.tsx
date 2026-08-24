import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { questionsApi } from '../api/questions'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import type { QuestionDetail } from '../types/question'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'

export function QuestionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [detail, setDetail] = useState<QuestionDetail | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      setLoading(true)
      setError(null)
      questionsApi.detail(id)
        .then(setDetail)
        .catch(err => {
          setError((err as Error).message || 'Không thể tải chi tiết câu hỏi này.')
        })
        .finally(() => setLoading(false))
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (error || !detail) {
    return (
      <div className="flex flex-col gap-6">
        <Alert variant="destructive">
          <AlertDescription>{error || 'Không tìm thấy câu hỏi.'}</AlertDescription>
        </Alert>
        <Button asChild variant="secondary" className="w-fit">
          <Link to="/questions">Quay lại kho câu hỏi</Link>
        </Button>
      </div>
    )
  }

  const isQuiz = detail.markdownBody.includes('## Đáp án trắc nghiệm')

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-mono text-2xl font-semibold capitalize">{detail.slug.replace(/-/g, ' ')}</h1>
          <div className="mt-2 flex gap-2">
            <Badge variant="secondary">{detail.position}</Badge>
            <Badge variant="secondary">{detail.technology}</Badge>
            <Badge variant="outline">{detail.level}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          {isQuiz && (
            <Button asChild size="sm">
              <Link to={`/quiz/${detail.id}`}>Làm trắc nghiệm 📝</Link>
            </Button>
          )}
          <Button asChild variant="secondary" size="sm">
            <Link to="/questions">Quay lại</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="prose prose-invert max-w-none py-8">
          <MarkdownRenderer content={detail.markdownBody} />
        </CardContent>
      </Card>
    </div>
  )
}
