import { useEffect, useState } from 'react'
import { progressApi, type Progress } from '../api/progress'
import { Link } from 'react-router-dom'
import { Bot, TrendingUp, Target, Layers, Lightbulb } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
      </div>
    )
  }

  const stats = [
    { icon: Bot, label: 'Phỏng vấn AI đã xong', value: progress.completedInterviews },
    { icon: TrendingUp, label: 'Điểm phỏng vấn TB', value: progress.averageInterviewScore.toFixed(1) },
    { icon: Target, label: 'Độ chính xác Quiz', value: `${progress.quizAccuracyPercent.toFixed(1)}%` },
    { icon: Layers, label: 'Thẻ ghi nhớ đã ôn', value: progress.cardsReviewedTotal },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-mono text-3xl font-semibold">Tiến độ học tập</h1>
        <p className="mt-2 text-muted-foreground">Xem lại quá trình luyện tập và kết quả của bạn</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <Card key={stat.label}>
            <CardContent className="flex flex-col items-center justify-center gap-2 py-8 text-center">
              <stat.icon className="h-7 w-7 text-accent" />
              <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
              <div className="font-mono text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-accent/40 bg-accent/5">
        <CardContent className="flex gap-3 py-6">
          <Lightbulb className="h-6 w-6 shrink-0 text-accent" />
          <div>
            <h3 className="mb-2 text-lg font-semibold">Lời khuyên từ AI Arena</h3>
            {progress.completedInterviews === 0 && progress.cardsReviewedTotal === 0 ? (
              <p className="leading-relaxed">
                Bắt đầu hành trình của bạn bằng cách duyệt qua kho câu hỏi, luyện thẻ nhớ hoặc thử sức với một buổi phỏng vấn AI ngay!
              </p>
            ) : (
              <p className="leading-relaxed">
                Bạn đang có những bước tiến tuyệt vời! Hãy duy trì việc luyện tập thẻ nhớ (SRS) hằng ngày để ghi nhớ lâu hơn, và định kỳ thực hiện các bài phỏng vấn thử với AI để rèn luyện kỹ năng phản xạ và diễn đạt.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
