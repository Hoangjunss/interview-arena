import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Brain, Bot, BarChart3, CheckCircle, ArrowRight, Flame } from 'lucide-react'

const FEATURE_CARDS = [
  {
    icon: BookOpen,
    title: 'Kho câu hỏi',
    description: '5,000+ câu hỏi kỹ thuật theo vị trí, công nghệ và trình độ.',
    badge: '5,000+ câu',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    icon: Brain,
    title: 'Flashcards SRS',
    description: 'Hệ thống ôn tập thông minh giúp ghi nhớ lâu dài theo khoa học nhận thức.',
    badge: 'Spaced Repetition',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    icon: Bot,
    title: 'Phỏng vấn AI',
    description: 'Luyện tập phỏng vấn thực tế với AI Interviewer và nhận phản hồi tức thì.',
    badge: 'Powered by AI',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    icon: BarChart3,
    title: 'Theo dõi tiến độ',
    description: 'Dashboard phân tích chi tiết giúp bạn biết rõ mình đang ở đâu.',
    badge: 'Analytics',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
]

const TESTIMONIALS = [
  { name: 'Minh T.', role: 'Backend Dev @ FPT', text: 'Đã pass vòng technical interview Google nhờ luyện flashcards mỗi ngày!' },
  { name: 'Lan H.', role: 'Frontend Dev @ VNG', text: 'AI Interviewer giúp tôi tự tin hơn rất nhiều trước khi đi phỏng vấn thật.' },
  { name: 'Đức N.', role: 'DevOps Eng. @ Tiki', text: 'Kho câu hỏi DevOps rất đầy đủ, phân loại rõ ràng theo level.' },
]

export function HomePage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="flex flex-col gap-20">
        {/* Hero section */}
        <div className="relative flex flex-col items-center gap-6 py-16 text-center">
          {/* Glow effect */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          </div>

          <Badge variant="outline" className="relative border-accent/50 text-accent">
            <Flame className="mr-1 h-3 w-3" />
            Hơn 5,000+ câu hỏi phỏng vấn kỹ thuật
          </Badge>

          <h1 className="relative font-mono text-5xl font-bold leading-tight md:text-6xl">
            <span className="text-foreground">Interview</span>{' '}
            <span className="text-accent">Arena</span>
          </h1>

          <p className="relative max-w-xl text-lg text-muted-foreground leading-relaxed">
            Nền tảng luyện phỏng vấn AI, ôn tập câu hỏi qua thẻ ghi nhớ (Flashcards SRS) và mô phỏng phỏng vấn trực tiếp.
          </p>

          <div className="relative flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="gap-2">
              <Link to="/register">
                Bắt đầu miễn phí
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/login">Đăng nhập</Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="relative flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-success" /> Miễn phí hoàn toàn</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-success" /> Không cần thẻ tín dụng</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-success" /> 5,000+ câu hỏi</span>
          </div>
        </div>

        {/* Feature cards */}
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h2 className="font-mono text-2xl font-semibold">Mọi thứ bạn cần để ace phỏng vấn</h2>
            <p className="mt-2 text-muted-foreground">Được thiết kế dành riêng cho kỹ sư phần mềm Việt Nam</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURE_CARDS.map(f => (
              <Card key={f.title} className="group overflow-hidden transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
                <CardHeader>
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${f.bg}`}>
                    <f.icon className={`h-5 w-5 ${f.color}`} />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{f.title}</CardTitle>
                    <Badge variant="secondary" className="text-[10px]">{f.badge}</Badge>
                  </div>
                  <CardDescription className="leading-relaxed">{f.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h2 className="font-mono text-2xl font-semibold">Được tin dùng bởi các kỹ sư</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {TESTIMONIALS.map(t => (
              <Card key={t.name} className="bg-muted/50">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground leading-relaxed italic">"{t.text}"</p>
                  <div className="mt-4">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA bottom */}
        <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center">
          <h2 className="font-mono text-2xl font-semibold">Sẵn sàng bắt đầu hành trình?</h2>
          <p className="mt-2 text-muted-foreground">Tạo tài khoản miễn phí và luyện tập ngay hôm nay.</p>
          <Button asChild size="lg" className="mt-6 gap-2">
            <Link to="/register">
              Đăng ký miễn phí
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const tiles = [
    {
      to: '/questions',
      icon: BookOpen,
      title: 'Kho câu hỏi',
      description: 'Duyệt và luyện tập theo vị trí, công nghệ, trình độ.',
      badge: '5,000+',
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    },
    {
      to: '/flashcards',
      icon: Brain,
      title: 'Ôn tập thẻ nhớ (SRS)',
      description: 'Ghi nhớ lâu dài với lịch ôn tập thông minh.',
      badge: 'SRS',
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
    },
    {
      to: '/interviews/new',
      icon: Bot,
      title: 'Phỏng vấn thử AI 🤖',
      description: 'Mô phỏng phỏng vấn thật với AI Interviewer.',
      badge: 'AI',
      color: 'text-accent',
      bg: 'bg-accent/10',
    },
    {
      to: '/progress',
      icon: BarChart3,
      title: 'Tiến độ của tôi 📊',
      description: 'Xem lại thống kê luyện tập của bạn.',
      badge: 'Stats',
      color: 'text-green-400',
      bg: 'bg-green-400/10',
    },
  ]

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Chào buổi sáng' : hour < 18 ? 'Chào buổi chiều' : 'Chào buổi tối'

  return (
    <div className="flex flex-col gap-10">
      {/* Greeting section */}
      <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 via-transparent to-transparent p-8">
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
        <Badge variant="outline" className="mb-3 border-accent/40 text-accent text-xs">
          <Flame className="mr-1 h-3 w-3" />
          Hôm nay là ngày tốt để luyện tập!
        </Badge>
        <h1 className="font-mono text-3xl font-bold">
          {greeting}, <span className="text-accent">{user.displayName}</span> 👋
        </h1>
        <p className="mt-2 text-muted-foreground">
          {user.email} · Sẵn sàng luyện tập phỏng vấn chưa?
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="sm" className="gap-1.5">
            <Link to="/flashcards">
              <Brain className="h-3.5 w-3.5" />
              Ôn thẻ nhớ hôm nay
            </Link>
          </Button>
          <Button asChild size="sm" variant="secondary" className="gap-1.5">
            <Link to="/interviews/new">
              <Bot className="h-3.5 w-3.5" />
              Phỏng vấn thử AI
            </Link>
          </Button>
        </div>
      </div>

      {/* Main tiles */}
      <div className="flex flex-col gap-4">
        <h2 className="font-mono text-lg font-semibold text-muted-foreground">Chức năng chính</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tiles.map(tile => (
            <Link key={tile.to} to={tile.to}>
              <Card className="group h-full transition-all hover:border-accent hover:shadow-md hover:shadow-accent/5">
                <CardHeader>
                  <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg transition-transform group-hover:scale-110 ${tile.bg}`}>
                    <tile.icon className={`h-4.5 w-4.5 ${tile.color}`} />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{tile.title}</CardTitle>
                    <Badge variant="secondary" className="text-[10px]">{tile.badge}</Badge>
                  </div>
                  <CardDescription className="leading-relaxed">{tile.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <span className={`flex items-center gap-1 text-xs font-medium transition-colors ${tile.color}`}>
                    Đi đến <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick tips */}
      <Card className="bg-muted/30">
        <CardContent className="flex items-start gap-4 py-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning/15">
            <Flame className="h-4.5 w-4.5 text-warning" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Mẹo luyện tập hiệu quả</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Dành <strong className="text-foreground">15–20 phút mỗi ngày</strong> để ôn tập Flashcard SRS. Hệ thống sẽ nhắc đúng lúc bạn sắp quên — giúp ghi nhớ lâu gấp 3 lần so với học truyền thống.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
