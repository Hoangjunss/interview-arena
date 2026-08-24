import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { dsaApi } from '../api/dsa'
import type { DsaProblemSummary } from '../types/dsa'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

const TOPICS = ['array', 'linked-list', 'stack-queue', 'tree', 'graph', 'dynamic-programming', 'string', 'sorting-searching', 'greedy', 'math']
const DIFFICULTIES = ['easy', 'medium', 'hard']

function difficultyBadgeVariant(difficulty: string) {
  if (difficulty === 'easy') return 'success' as const
  if (difficulty === 'medium') return 'warning' as const
  return 'destructive' as const
}

export function DsaListPage() {
  const [topic, setTopic] = useState<string | null>(null)
  const [difficulty, setDifficulty] = useState<string | null>(null)
  const [problems, setProblems] = useState<DsaProblemSummary[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setPage(0)
  }, [topic, difficulty])

  useEffect(() => {
    setLoading(true)
    dsaApi.list(topic, difficulty, page, 10)
      .then(res => {
        setProblems(res.content)
        setTotalPages(res.totalPages)
      })
      .finally(() => setLoading(false))
  }, [topic, difficulty, page])

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-mono text-3xl font-semibold">DSA</h1>

      <Card>
        <CardContent className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2">
          <Select value={topic ?? '__all__'} onValueChange={v => setTopic(v === '__all__' ? null : v)}>
            <SelectTrigger><SelectValue placeholder="Tất cả chủ đề" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">Tất cả chủ đề</SelectItem>
              {TOPICS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={difficulty ?? '__all__'} onValueChange={v => setDifficulty(v === '__all__' ? null : v)}>
            <SelectTrigger><SelectValue placeholder="Tất cả độ khó" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">Tất cả độ khó</SelectItem>
              {DIFFICULTIES.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
        </div>
      ) : problems.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Không tìm thấy bài toán nào phù hợp với bộ lọc hiện tại.
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {problems.map(p => (
            <Link key={p.id} to={`/dsa/${p.slug}`}>
              <Card className="transition-colors hover:border-accent">
                <CardContent className="flex items-center justify-between py-4">
                  <h2 className="text-lg font-medium capitalize">{p.slug.replace(/-/g, ' ')}</h2>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{p.topic}</Badge>
                    <Badge variant={difficultyBadgeVariant(p.difficulty)}>{p.difficulty}</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-4">
              <Button variant="secondary" size="sm" disabled={page === 0} onClick={() => setPage(p => Math.max(0, p - 1))}>
                Trang trước
              </Button>
              <span className="text-sm text-muted-foreground">
                Trang <strong className="text-foreground">{page + 1}</strong> / {totalPages}
              </span>
              <Button variant="secondary" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}>
                Trang sau
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
