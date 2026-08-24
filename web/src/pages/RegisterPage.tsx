/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react'

const BENEFITS = [
  'Miễn phí hoàn toàn, không cần thẻ tín dụng',
  '5,000+ câu hỏi kỹ thuật đã được phân loại',
  'Thẻ nhớ SRS không giới hạn số lượng',
  '3 lượt phỏng vấn thử AI mỗi ngày',
  '20 lượt chấm bài DSA mỗi ngày',
]

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await register(email, password, displayName)
      navigate('/')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Đăng ký thất bại, email có thể đã được sử dụng'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh bg-background overflow-x-hidden">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:flex-col lg:w-[45%] relative bg-gradient-to-br from-purple-500/15 via-accent/10 to-transparent border-r border-border/40 p-12 justify-between overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />

        <div className="relative space-y-2">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-mono text-sm font-black text-accent-foreground shadow-lg">
              IA
            </div>
            <span className="font-mono text-base font-bold text-foreground">Interview Arena</span>
          </Link>
        </div>

        <div className="relative space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-black tracking-tight leading-tight">
              Bắt đầu hành trình<br />
              <span className="bg-gradient-to-r from-accent to-fuchsia-400 bg-clip-text text-transparent">miễn phí ngay hôm nay</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Tạo tài khoản trong 30 giây, không cần thẻ tín dụng.
            </p>
          </div>

          <ul className="space-y-3">
            {BENEFITS.map(b => (
              <li key={b} className="flex items-center gap-3">
                <CheckCircle2 className="h-4.5 w-4.5 text-accent shrink-0" />
                <span className="text-sm text-muted-foreground">{b}</span>
              </li>
            ))}
          </ul>

          <div className="bg-card/30 border border-border/60 rounded-xl p-4 space-y-1.5">
            <p className="text-xs font-semibold text-foreground">Muốn nhiều hơn?</p>
            <p className="text-xs text-muted-foreground">
              Nâng cấp lên Pro với <strong className="text-foreground">$5/tháng</strong> để mở khóa không giới hạn phỏng vấn AI và bài tập DSA.
            </p>
          </div>
        </div>

        <p className="relative text-xs text-muted-foreground/60 font-mono">© 2026 Interview Arena</p>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm space-y-7">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent font-mono text-xs font-black text-accent-foreground">IA</div>
            <span className="font-mono text-sm font-semibold">Interview Arena</span>
          </Link>

          <div className="space-y-1 text-left">
            <h1 className="text-2xl font-black tracking-tight">Tạo tài khoản</h1>
            <p className="text-sm text-muted-foreground">Miễn phí, không cần thẻ tín dụng</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="displayName">Tên hiển thị</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="Nguyễn Văn A"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                required
                autoComplete="name"
                className="bg-muted/20"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ten@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="bg-muted/20"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="Tối thiểu 6 ký tự"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                className="bg-muted/20"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full font-bold gap-2 mt-2">
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" />Đang tạo tài khoản...</>
              ) : (
                <>Đăng ký miễn phí <ArrowRight className="h-4 w-4" /></>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Đã có tài khoản?{' '}
            <Link className="font-semibold text-accent hover:underline" to="/login">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
