import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { questionsApi } from '../api/questions'
import { flashcardsApi } from '../api/flashcards'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import type { QuestionDetail } from '../types/question'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/sonner'
import { ArrowLeft, BookmarkPlus, ClipboardCheck, Clock, ExternalLink } from 'lucide-react'

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export function QuestionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [detail, setDetail] = useState<QuestionDetail | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (id) {
      setLoading(true)
      setError(null)
      setSaved(false)
      questionsApi.detail(id)
        .then(setDetail)
        .catch(err => {
          setError((err as Error).message || 'Không thể tải chi tiết câu hỏi này.')
        })
        .finally(() => setLoading(false))
    }
  }, [id])

  async function saveToFlashcard() {
    if (!detail || saving || saved) return
    setSaving(true)
    try {
      await flashcardsApi.save(detail.id)
      setSaved(true)
      toast.success('Đã lưu vào Flashcard! Sẽ xuất hiện trong lịch ôn tập của bạn.')
    } catch {
      toast.error('Không thể lưu flashcard, thử lại sau.')
    } finally {
      setSaving(false)
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success('Đã copy link câu hỏi!')
    })
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-10 w-2/3" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
        <Skeleton className="h-[400px] w-full" />
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
  const readTime = estimateReadingTime(detail.markdownBody)
  const levelColors: Record<string, string> = {
    junior: 'success',
    mid: 'warning',
    senior: 'destructive',
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link to="/questions" className="flex items-center gap-1 hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          Kho câu hỏi
        </Link>
        <span>/</span>
        <span className="capitalize">{detail.position}</span>
        <span>/</span>
        <span className="capitalize text-foreground">{detail.technology}</span>
      </nav>

      {/* Title + actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <h1 className="font-mono text-2xl font-bold leading-tight capitalize">
            {detail.slug.replace(/-/g, ' ')}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{detail.position}</Badge>
            <Badge variant="secondary">{detail.technology}</Badge>
            <Badge variant={levelColors[detail.level] as 'success' | 'warning' | 'destructive' ?? 'outline'}>
              {detail.level}
            </Badge>
            {isQuiz && <Badge variant="default">📝 Có trắc nghiệm</Badge>}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              ~{readTime} phút đọc
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isQuiz && (
            <Button asChild size="sm" className="gap-1.5">
              <Link to={`/quiz/${detail.id}`}>
                <ClipboardCheck className="h-3.5 w-3.5" />
                Làm trắc nghiệm
              </Link>
            </Button>
          )}
          <Button
            size="sm"
            variant={saved ? 'success' : 'secondary'}
            onClick={saveToFlashcard}
            disabled={saving || saved}
            className="gap-1.5"
          >
            <BookmarkPlus className="h-3.5 w-3.5" />
            {saved ? 'Đã lưu flashcard' : saving ? 'Đang lưu...' : 'Lưu Flashcard'}
          </Button>
          <Button size="sm" variant="ghost" onClick={copyLink} className="gap-1.5" title="Copy link">
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Content card */}
      <Card className="overflow-hidden">
        {/* Card header bar */}
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-6 py-3">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Nội dung câu hỏi</span>
          <span className="font-mono text-xs text-muted-foreground">{detail.slug}</span>
        </div>
        <CardContent className="prose prose-invert max-w-none py-8">
          <MarkdownRenderer content={detail.markdownBody} />
        </CardContent>
      </Card>

      {/* Bottom navigation hint */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-muted/20 px-5 py-3.5">
        <Button asChild variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
          <Link to="/questions">
            <ArrowLeft className="h-3.5 w-3.5" />
            Quay lại danh sách
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          {!saved && (
            <Button size="sm" variant="outline" onClick={saveToFlashcard} disabled={saving} className="gap-1.5 text-xs">
              <BookmarkPlus className="h-3.5 w-3.5" />
              Lưu để ôn lại
            </Button>
          )}
          {isQuiz && (
            <Button asChild size="sm" className="gap-1.5 text-xs">
              <Link to={`/quiz/${detail.id}`}>
                <ClipboardCheck className="h-3.5 w-3.5" />
                Làm bài kiểm tra
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
