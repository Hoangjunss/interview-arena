import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { questionsApi } from '../api/questions'
import type { QuestionSummary } from '../types/question'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

const POSITIONS = ['frontend', 'backend', 'devops', 'ai', 'database']
const LEVELS = ['junior', 'mid', 'senior']

export function QuestionBankPage() {
  const [position, setPosition] = useState('frontend')
  const [technology, setTechnology] = useState('react')
  const [level, setLevel] = useState('junior')
  const [questions, setQuestions] = useState<QuestionSummary[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)

  const filtersRef = useRef({ position, technology, level })

  useEffect(() => {
    const prev = filtersRef.current
    const filtersChanged =
      prev.position !== position ||
      prev.technology !== technology ||
      prev.level !== level
    filtersRef.current = { position, technology, level }

    const fetchPage = filtersChanged ? 0 : page

    setLoading(true)
    questionsApi.list(position, technology.toLowerCase(), level, fetchPage, 10)
      .then(res => {
        setQuestions(res.content)
        setTotalPages(res.totalPages)
        if (filtersChanged) setPage(0)
      })
      .finally(() => setLoading(false))
  }, [position, technology, level, page])

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-mono text-3xl font-semibold">Kho câu hỏi</h1>

      <Card>
        <CardContent className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-3">
          <div>
            <Label htmlFor="position">Vị trí</Label>
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger id="position"><SelectValue /></SelectTrigger>
              <SelectContent>
                {POSITIONS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="technology">Công nghệ</Label>
            <Input
              id="technology"
              value={technology}
              onChange={e => setTechnology(e.target.value)}
              placeholder="Ví dụ: react, spring-boot"
            />
          </div>
          <div>
            <Label htmlFor="level">Trình độ</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger id="level"><SelectValue /></SelectTrigger>
              <SelectContent>
                {LEVELS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}
        </div>
      ) : questions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Không tìm thấy câu hỏi nào phù hợp với bộ lọc hiện tại.
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {questions.map(q => (
            <Link key={q.id} to={`/questions/${q.id}`}>
              <Card className="transition-colors hover:border-accent">
                <CardContent className="flex flex-col gap-2 py-4">
                  <h2 className="text-lg font-medium capitalize">{q.slug.replace(/-/g, ' ')}</h2>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{q.position}</Badge>
                    <Badge variant="secondary">{q.technology}</Badge>
                    <Badge variant="outline">{q.level}</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="sm"
                disabled={page === 0}
                onClick={() => setPage(p => Math.max(0, p - 1))}
              >
                Trang trước
              </Button>
              <span className="text-sm text-muted-foreground">
                Trang <strong className="text-foreground">{page + 1}</strong> / {totalPages}
              </span>
              <Button
                variant="secondary"
                size="sm"
                disabled={page >= totalPages - 1}
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              >
                Trang sau
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
