import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ApiError } from '../api/client'
import { interviewApi } from '../api/interview'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

const POSITIONS = [
  { value: 'frontend', label: 'Frontend Developer' },
  { value: 'backend', label: 'Backend Developer' },
  { value: 'devops', label: 'DevOps Engineer' },
  { value: 'ai', label: 'AI Engineer' },
  { value: 'database', label: 'Database Administrator' },
]

const LEVELS = [
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Middle' },
  { value: 'senior', label: 'Senior' },
]

export function InterviewSetupPage() {
  const navigate = useNavigate()
  const [position, setPosition] = useState('frontend')
  const [technology, setTechnology] = useState('React')
  const [level, setLevel] = useState('mid')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function start() {
    if (!technology.trim()) return
    setLoading(true)
    setError(null)
    try {
      const session = await interviewApi.start(position, technology, level)
      navigate(`/interviews/${session.sessionId}`)
    } catch (err) {
      console.error(err)
      if (err instanceof ApiError && err.status === 429) {
        setError('Bạn đã dùng hết lượt phỏng vấn AI miễn phí hôm nay. Nâng cấp Pro để tiếp tục.')
      } else {
        setError('Không thể bắt đầu phỏng vấn, thử lại sau.')
      }
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-mono text-2xl font-semibold">Thiết lập phỏng vấn</h1>
        <Button asChild variant="secondary" size="sm">
          <Link to="/">Hủy</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-normal text-muted-foreground">
            Chọn vị trí tuyển dụng, công nghệ mục tiêu và trình độ mong muốn của bạn. AI sẽ đóng vai người phỏng vấn để kiểm tra kiến thức của bạn.
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div>
            <Label htmlFor="position">Vị trí phỏng vấn</Label>
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger id="position"><SelectValue /></SelectTrigger>
              <SelectContent>
                {POSITIONS.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="technology">Công nghệ cốt lõi (ví dụ: React, Java, Docker)</Label>
            <Input
              id="technology"
              value={technology}
              onChange={e => setTechnology(e.target.value)}
              placeholder="Ví dụ: React, Spring Boot, AWS"
              required
            />
          </div>

          <div>
            <Label htmlFor="level">Cấp độ chuyên môn</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger id="level"><SelectValue /></SelectTrigger>
              <SelectContent>
                {LEVELS.map(l => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={start} disabled={loading || !technology.trim()} className="mt-2">
            {loading ? 'Đang khởi tạo phiên...' : 'Bắt đầu phỏng vấn'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
