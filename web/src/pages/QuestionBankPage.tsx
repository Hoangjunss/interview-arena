import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { questionsApi } from '../api/questions'
import type { QuestionSummary } from '../types/question'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Search, BookOpen, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'

const POSITIONS = ['frontend', 'backend', 'devops', 'ai', 'database']
const LEVELS = ['junior', 'mid', 'senior']

const POSITION_ICONS: Record<string, string> = {
  frontend: '🎨',
  backend: '⚙️',
  devops: '🛠️',
  ai: '🤖',
  database: '🗄️',
}

const LEVEL_BADGE_VARIANT: Record<string, 'success' | 'warning' | 'destructive'> = {
  junior: 'success',
  mid: 'warning',
  senior: 'destructive',
}

export function QuestionBankPage() {
  const [position, setPosition] = useState('frontend')
  const [technology, setTechnology] = useState('react')
  const [level, setLevel] = useState('junior')
  const [questions, setQuestions] = useState<QuestionSummary[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
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
        setTotalElements(res.totalElements ?? res.content.length)
        if (filtersChanged) setPage(0)
      })
      .finally(() => setLoading(false))
  }, [position, technology, level, page])

  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-mono text-3xl font-bold">Kho câu hỏi</h1>
          <p className="mt-1 text-muted-foreground">
            Luyện tập với <strong className="text-foreground">5,000+</strong> câu hỏi kỹ thuật chuyên sâu
          </p>
        </div>
        {totalElements > 0 && !loading && (
          <Badge variant="secondary" className="mt-1 shrink-0 gap-1.5 px-3 py-1.5 text-sm">
            <BookOpen className="h-3.5 w-3.5" />
            {totalElements} câu hỏi
          </Badge>
        )}
      </div>

      {/* Position quick-select chips */}
      <div className="flex flex-wrap gap-2">
        {POSITIONS.map(p => (
          <button
            key={p}
            onClick={() => setPosition(p)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
              position === p
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border text-muted-foreground hover:border-accent/40 hover:text-foreground'
            }`}
          >
            <span>{POSITION_ICONS[p]}</span>
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Filters card */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            Bộ lọc chi tiết
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="position">Vị trí</Label>
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger id="position"><SelectValue /></SelectTrigger>
              <SelectContent>
                {POSITIONS.map(p => (
                  <SelectItem key={p} value={p}>
                    {POSITION_ICONS[p]} {p.charAt(0).toUpperCase() + p.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="technology">
              Công nghệ
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="technology"
                value={technology}
                onChange={e => setTechnology(e.target.value)}
                placeholder="react, spring-boot, k8s..."
                className="pl-9"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="level">Trình độ</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger id="level"><SelectValue /></SelectTrigger>
              <SelectContent>
                {LEVELS.map(l => (
                  <SelectItem key={l} value={l}>
                    {{ junior: '🟢 Junior', mid: '🟡 Mid', senior: '🔴 Senior' }[l]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
        </div>
      ) : questions.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center text-muted-foreground">
            <BookOpen className="h-10 w-10 opacity-30" />
            <div>
              <p className="font-medium">Không tìm thấy câu hỏi nào</p>
              <p className="text-sm">Thử thay đổi công nghệ hoặc trình độ để xem thêm.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {questions.map((q, idx) => (
            <Link key={q.id} to={`/questions/${q.id}`}>
              <Card className="group transition-all hover:border-accent hover:shadow-sm hover:shadow-accent/5">
                <CardContent className="flex items-center gap-4 py-4">
                  {/* Index number */}
                  <span className="font-mono text-xs text-muted-foreground w-6 shrink-0 text-right">
                    {page * 10 + idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-medium capitalize truncate group-hover:text-accent transition-colors">
                      {q.slug.replace(/-/g, ' ')}
                    </h2>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      <Badge variant="secondary" className="text-[10px]">{q.position}</Badge>
                      <Badge variant="secondary" className="text-[10px]">{q.technology}</Badge>
                      <Badge
                        variant={LEVEL_BADGE_VARIANT[q.level] ?? 'outline'}
                        className="text-[10px]"
                      >
                        {q.level}
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-2 flex items-center justify-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={page === 0}
                onClick={() => setPage(p => Math.max(0, p - 1))}
                className="gap-1"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Trước
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  const pageNum = Math.max(0, Math.min(page - 2, totalPages - 5)) + i
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`h-8 w-8 rounded-md font-mono text-xs transition-colors ${
                        pageNum === page
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {pageNum + 1}
                    </button>
                  )
                })}
              </div>
              <Button
                variant="secondary"
                size="sm"
                disabled={page >= totalPages - 1}
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                className="gap-1"
              >
                Sau
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
