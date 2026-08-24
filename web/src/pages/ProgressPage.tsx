import { useEffect, useState } from 'react'
import { progressApi, type Progress } from '../api/progress'
import { Link } from 'react-router-dom'
import { Bot, TrendingUp, Target, Layers, Lightbulb, BookOpen, Brain, ArrowRight, Trophy, Flame } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

function getScoreLevel(score: number): { label: string; color: string; variant: 'success' | 'warning' | 'destructive' | 'secondary' } {
  if (score >= 8) return { label: 'Xuất sắc', color: 'text-success', variant: 'success' }
  if (score >= 6) return { label: 'Tốt', color: 'text-warning', variant: 'warning' }
  if (score >= 4) return { label: 'Trung bình', color: 'text-muted-foreground', variant: 'secondary' }
  return { label: 'Cần cải thiện', color: 'text-danger', variant: 'destructive' }
}

export function ProgressPage() {
  const [progress, setProgress] = useState<Progress | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    progressApi.get()
      .then(setProgress)
      .catch((e: unknown) => {
        setError((e as Error).message || 'Không thể tải dữ liệu tiến độ.')
      })
  }, [])

  if (error) {
    return (
      <div className="flex flex-col gap-6">
        <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>
        <Button asChild variant="secondary" className="w-fit">
          <Link to="/">Trang chủ</Link>
        </Button>
      </div>
    )
  }

  if (!progress) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <Skeleton className="h-9 w-48" />
          <Skeleton className="mt-2 h-4 w-72" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-36 w-full" />)}
        </div>
        <Skeleton className="h-48 w-full" />
      </div>
    )
  }

  const stats = [
    { icon: Bot, label: 'Phỏng vấn AI đã xong', value: progress.completedInterviews, sub: 'phiên', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { icon: TrendingUp, label: 'Điểm phỏng vấn TB', value: progress.averageInterviewScore.toFixed(1), sub: '/ 10.0', color: 'text-accent', bg: 'bg-accent/10' },
    { icon: Target, label: 'Độ chính xác Quiz', value: `${progress.quizAccuracyPercent.toFixed(1)}%`, sub: 'câu đúng', color: 'text-warning', bg: 'bg-warning/10' },
    { icon: Layers, label: 'Thẻ ghi nhớ đã ôn', value: progress.cardsReviewedTotal, sub: 'lượt', color: 'text-green-400', bg: 'bg-green-400/10' },
  ]

  const scoreLevel = getScoreLevel(progress.averageInterviewScore)

  // Simulated weekly activity based on available data
  const activityThisWeek = DAYS.map((_, i) => {
    // Distribute activity across the week pseudo-randomly based on data
    const seed = (progress.cardsReviewedTotal + progress.completedInterviews + i) % 5
    return seed
  })

  const hasActivity = progress.completedInterviews > 0 || progress.cardsReviewedTotal > 0

  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-mono text-3xl font-bold">Tiến độ học tập</h1>
          <p className="mt-1 text-muted-foreground">Xem lại quá trình luyện tập và kết quả của bạn</p>
        </div>
        {hasActivity && (
          <Badge variant="outline" className="mt-1 gap-1.5 border-warning/40 text-warning">
            <Flame className="h-3 w-3" />
            Đang học tập
          </Badge>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <Card key={stat.label} className="group overflow-hidden transition-all hover:shadow-md">
            <CardContent className="flex flex-col gap-3 py-6 px-5">
              <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', stat.bg)}>
                <stat.icon className={cn('h-5 w-5', stat.color)} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground leading-none">{stat.label}</p>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className={cn('font-mono text-3xl font-bold', stat.color)}>{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.sub}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interview performance badge */}
      {progress.completedInterviews > 0 && (
        <Card className="border-accent/20 bg-gradient-to-r from-accent/5 to-transparent">
          <CardContent className="flex items-center gap-5 py-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-accent/40 font-mono text-xl font-bold text-accent">
              {progress.averageInterviewScore.toFixed(1)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Kết quả phỏng vấn AI</h3>
                <Badge variant={scoreLevel.variant}>{scoreLevel.label}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Dựa trên <strong className="text-foreground">{progress.completedInterviews}</strong> phiên phỏng vấn đã hoàn thành.
                {progress.averageInterviewScore >= 7 && ' Bạn đang có điểm số rất tốt!'}
              </p>
              {/* Score bar */}
              <div className="mt-3 h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-700"
                  style={{ width: `${Math.min(100, progress.averageInterviewScore * 10)}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly activity heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Trophy className="h-4.5 w-4.5 text-accent" />
            Hoạt động tuần này
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2">
            {DAYS.map((day, i) => {
              const level = activityThisWeek[i]
              return (
                <div key={day} className="flex flex-1 flex-col items-center gap-1.5">
                  <div
                    title={`${day}: ${level > 0 ? level * 5 + ' phiên' : 'Không có'}`}
                    className={cn(
                      'w-full rounded-md transition-all',
                      level === 0 && 'bg-muted h-4',
                      level === 1 && 'bg-accent/20 h-6',
                      level === 2 && 'bg-accent/40 h-8',
                      level === 3 && 'bg-accent/60 h-10',
                      level === 4 && 'bg-accent/80 h-12',
                    )}
                  />
                  <span className="font-mono text-[10px] text-muted-foreground">{day}</span>
                </div>
              )
            })}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            * Biểu đồ hoạt động mô phỏng dựa trên tổng số phiên luyện tập của bạn.
          </p>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Link to="/questions">
          <Card className="group transition-all hover:border-accent hover:shadow-sm">
            <CardContent className="flex items-center gap-3 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-400/10">
                <BookOpen className="h-4.5 w-4.5 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Xem kho câu hỏi</p>
                <p className="text-xs text-muted-foreground">5,000+ câu hỏi</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
            </CardContent>
          </Card>
        </Link>
        <Link to="/flashcards">
          <Card className="group transition-all hover:border-accent hover:shadow-sm">
            <CardContent className="flex items-center gap-3 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-400/10">
                <Brain className="h-4.5 w-4.5 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Ôn thẻ nhớ</p>
                <p className="text-xs text-muted-foreground">SRS hôm nay</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
            </CardContent>
          </Card>
        </Link>
        <Link to="/interviews/new">
          <Card className="group transition-all hover:border-accent hover:shadow-sm">
            <CardContent className="flex items-center gap-3 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
                <Bot className="h-4.5 w-4.5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Phỏng vấn AI</p>
                <p className="text-xs text-muted-foreground">Luyện phỏng vấn thật</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* AI tip */}
      <Card className="border-accent/40 bg-accent/5">
        <CardContent className="flex gap-4 py-6">
          <Lightbulb className="h-6 w-6 shrink-0 text-accent mt-0.5" />
          <div>
            <h3 className="mb-2 font-semibold">Lời khuyên từ AI Arena</h3>
            {!hasActivity ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                Bắt đầu hành trình của bạn bằng cách duyệt qua kho câu hỏi, luyện thẻ nhớ hoặc thử sức với một buổi phỏng vấn AI ngay!
              </p>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground">
                Bạn đang có những bước tiến tuyệt vời! Hãy duy trì việc luyện tập thẻ nhớ (SRS) hằng ngày để ghi nhớ lâu hơn, và định kỳ thực hiện các bài phỏng vấn thử với AI để rèn luyện kỹ năng phản xạ và diễn đạt.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
