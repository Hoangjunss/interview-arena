/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { BookOpen, Brain, Bot, Code2, Loader2, ArrowRight } from 'lucide-react'

const FEATURES = [
  { icon: BookOpen, label: '5,000+ câu hỏi lý thuyết kỹ thuật' },
  { icon: Brain, label: 'Thẻ nhớ Spaced Repetition thông minh' },
  { icon: Bot, label: 'Phỏng vấn giả lập 1-1 với AI' },
  { icon: Code2, label: '500 bài toán DSA với chấm điểm trực tiếp' },
]

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Email hoặc mật khẩu không đúng'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh bg-background overflow-x-hidden">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:flex-col lg:w-[45%] relative bg-gradient-to-br from-accent/20 via-purple-500/10 to-transparent border-r border-border/40 p-12 justify-between overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent" />

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
              Chào mừng trở lại<br />
              <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">Arena!</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Tiếp tục hành trình chinh phục nhà tuyển dụng của bạn.
            </p>
          </div>

          <ul className="space-y-4">
            {FEATURES.map(f => (
              <li key={f.label} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 shrink-0">
                  <f.icon className="h-4 w-4 text-accent" />
                </div>
                <span className="text-sm text-muted-foreground">{f.label}</span>
              </li>
            ))}
          </ul>
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
            <h1 className="text-2xl font-black tracking-tight">Đăng nhập</h1>
            <p className="text-sm text-muted-foreground">Nhập thông tin tài khoản của bạn để tiếp tục</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
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
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="bg-muted/20"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full font-bold gap-2 mt-2">
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" />Đang xử lý...</>
              ) : (
                <>Đăng nhập <ArrowRight className="h-4 w-4" /></>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Chưa có tài khoản?{' '}
            <Link className="font-semibold text-accent hover:underline" to="/register">
              Đăng ký miễn phí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
