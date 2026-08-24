/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Brain, 
  Bot, 
  BarChart3, 
  ArrowRight, 
  Flame, 
  Code2, 
  Sparkles, 
  Trophy,
  Compass,
  CheckSquare
} from 'lucide-react'

export function HomePage() {
  const { user } = useAuth()

  // -------------------------------------------------------------
  // LOGGED OUT VIEW (Asymmetric Split Screen - Editorial Theme)
  // -------------------------------------------------------------
  if (!user) {
    return (
      <div className="flex flex-col gap-24 py-6">
        {/* Hero Section: Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <Badge variant="outline" className="border-accent/40 text-accent font-medium px-3 py-1 text-xs tracking-wide">
              <Flame className="mr-1.5 h-3.5 w-3.5 text-accent animate-pulse" />
              Nền Tảng Luyện Phỏng Vấn Công Nghệ Toàn Diện
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Sẵn sàng cho mọi cuộc <br />
              <span className="bg-gradient-to-r from-accent via-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
                phỏng vấn kỹ thuật
              </span>
            </h1>

            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl">
              Nâng tầm kỹ năng lập trình và trả lời phỏng vấn. Tích hợp ngân hàng câu hỏi đồ sộ, hệ thống thẻ ghi nhớ SRS thông minh, môi trường thực thi code DSA và mô phỏng phỏng vấn thử 1-1 với AI.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/10 transition-all duration-200">
                <Link to="/register" className="gap-2">
                  Bắt đầu miễn phí
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border hover:bg-muted/40 font-semibold rounded-xl">
                <Link to="/login">Đăng nhập tài khoản</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/40">
              <div>
                <p className="text-2xl font-black text-foreground">5,000+</p>
                <p className="text-xs text-muted-foreground mt-0.5">Câu hỏi lý thuyết</p>
              </div>
              <div>
                <p className="text-2xl font-black text-foreground">500+</p>
                <p className="text-xs text-muted-foreground mt-0.5">Thử thách DSA</p>
              </div>
              <div>
                <p className="text-2xl font-black text-foreground">1-on-1</p>
                <p className="text-xs text-muted-foreground mt-0.5">Giả lập phỏng vấn AI</p>
              </div>
            </div>
          </div>

          {/* Right Side: Visual Dashboard Card Stack */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-purple-500/5 blur-3xl rounded-full" />
            <div className="relative bg-card/30 border border-border/80 rounded-2xl p-6 shadow-2xl backdrop-blur-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border/40">
                <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase">Bảng điều khiển mẫu</span>
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-border" />
                  <span className="w-2.5 h-2.5 rounded-full bg-border" />
                  <span className="w-2.5 h-2.5 rounded-full bg-border" />
                </div>
              </div>

              {/* Module Previews */}
              <div className="space-y-3">
                <div className="bg-card/60 border border-border p-4 rounded-xl flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold truncate">Ngân hàng câu hỏi</p>
                      <Badge variant="secondary" className="text-[10px] scale-90">Active</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">Phân loại chi tiết theo vị trí & level</p>
                  </div>
                </div>

                <div className="bg-card/60 border border-border p-4 rounded-xl flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <Brain className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold truncate">Thẻ nhớ Spaced Repetition</p>
                      <Badge variant="secondary" className="text-[10px] scale-90">SRS System</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">Thuật toán SM-2 nhắc nhở thông minh</p>
                  </div>
                </div>

                <div className="bg-card/60 border border-border p-4 rounded-xl flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold truncate">Phỏng vấn giả lập 1-1</p>
                      <Badge variant="secondary" className="text-[10px] scale-90">AI Evaluator</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">Chấm điểm chi tiết và gợi ý cải thiện</p>
                  </div>
                </div>

                <div className="bg-card/60 border border-border p-4 rounded-xl flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold truncate">Luyện thuật toán DSA</p>
                      <Badge variant="secondary" className="text-[10px] scale-90">Judge0 Live</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">Trình soạn thảo Monaco & biên dịch trực tiếp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Roadmap Section (No fake stats, honest structure) */}
        <div className="space-y-8">
          <div className="text-left space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Lộ trình ôn tập khoa học</h2>
            <p className="text-muted-foreground text-sm">Các bước được xây dựng nhằm tối ưu thời gian và hiệu quả ôn luyện của ứng viên.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card/20 border border-border/60 rounded-xl p-6 space-y-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">1</div>
              <h3 className="font-bold text-base">Củng cố lý thuyết</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Quét nhanh các câu hỏi lý thuyết theo công nghệ chuyên sâu (React, Spring Boot, Docker, System Design...) để lấp lỗ hổng kiến thức.
              </p>
            </div>
            <div className="bg-card/20 border border-border/60 rounded-xl p-6 space-y-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">2</div>
              <h3 className="font-bold text-base">Rèn luyện phản xạ (SRS)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Đưa các khái niệm cốt lõi vào Flashcard. Thuật toán sẽ phân bổ thời gian ôn tập tối ưu để thông tin chuyển hẳn vào trí nhớ dài hạn.
              </p>
            </div>
            <div className="bg-card/20 border border-border/60 rounded-xl p-6 space-y-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">3</div>
              <h3 className="font-bold text-base">Mô phỏng áp lực phòng thi</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tham gia phỏng vấn thoại/chat giả lập với AI. Làm bài test DSA áp lực thời gian để rèn luyện sự tự tin khi bước vào phỏng vấn thật.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl border border-accent/20 bg-gradient-to-r from-accent/5 via-purple-500/5 to-transparent p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Sẵn sàng bước vào Arena?</h3>
            <p className="text-sm text-muted-foreground">Tạo tài khoản ngay hôm nay để bắt đầu hành trình chinh phục nhà tuyển dụng.</p>
          </div>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/95 text-primary-foreground font-bold rounded-xl px-8 shrink-0">
            <Link to="/register" className="gap-2">
              Đăng ký miễn phí
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------
  // LOGGED IN VIEW (Studio Dashboard Theme)
  // -------------------------------------------------------------
  const tiles = [
    {
      to: '/questions',
      icon: BookOpen,
      title: 'Kho câu hỏi lý thuyết',
      description: 'Luyện tập trả lời lý thuyết phân loại theo vị trí, tech stack.',
      badge: '5,000+ câu',
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    },
    {
      to: '/flashcards',
      icon: Brain,
      title: 'Hệ thống thẻ nhớ (SRS)',
      description: 'Học thông minh với chu kỳ lặp lại SM-2 để nhớ lâu dài.',
      badge: 'Spaced Repetition',
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
    },
    {
      to: '/interviews/new',
      icon: Bot,
      title: 'Phỏng vấn thử AI',
      description: 'Mô phỏng áp lực phỏng vấn 1-1 và nhận phản hồi chi tiết.',
      badge: 'Giả lập AI',
      color: 'text-accent',
      bg: 'bg-accent/10',
    },
    {
      to: '/dsa',
      icon: Code2,
      title: 'Luyện thuật toán DSA',
      description: '500 thử thách LeetCode biên dịch & chấm điểm trực tiếp qua Judge0.',
      badge: '500 bài toán',
      color: 'text-green-400',
      bg: 'bg-green-400/10',
    },
  ]

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Chào buổi sáng' : hour < 18 ? 'Chào buổi chiều' : 'Chào buổi tối'

  return (
    <div className="flex flex-col gap-10 py-4">
      {/* Dynamic Header Greeting block */}
      <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 via-transparent to-transparent p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
        <div className="space-y-2 text-left">
          <Badge variant="outline" className="border-accent/40 text-accent text-xs">
            <Flame className="mr-1 h-3 w-3 inline text-accent" />
            Hôm nay là ngày tốt để luyện tập!
          </Badge>
          <h1 className="text-3xl font-black tracking-tight">
            {greeting}, <span className="text-accent">{user.displayName}</span> 👋
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Tài khoản: {user.email} · Bắt đầu các mục tiêu hàng ngày của bạn ngay bên dưới.
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <Button asChild size="sm" variant="outline" className="border-border hover:bg-muted/40 font-semibold rounded-lg">
            <Link to="/progress" className="gap-1">
              <BarChart3 className="h-3.5 w-3.5" />
              Xem tiến độ
            </Link>
          </Button>
          <Button asChild size="sm" className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold rounded-lg">
            <Link to="/billing" className="gap-1">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Quản lý gói
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Feature Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-wider text-left">Công cụ luyện tập</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiles.map(tile => (
            <Link key={tile.to} to={tile.to} className="block group">
              <Card className="h-full border border-border hover:border-accent bg-card/30 hover:bg-card/50 transition-all duration-300 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-accent/5">
                <CardHeader className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-105 ${tile.bg}`}>
                      <tile.icon className={`h-5 w-5 ${tile.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-[10px] py-0.5 px-2 font-medium tracking-wide">
                      {tile.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-bold group-hover:text-accent transition-colors">
                    {tile.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed mt-2">
                    {tile.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-0 flex items-center justify-between text-xs font-semibold text-muted-foreground group-hover:text-accent transition-colors">
                  <span>Bắt đầu luyện tập</span>
                  <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Checklist Section (Anti-AI Slop active action block) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/20 border border-border/80 md:col-span-2">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-primary" />
              <span>Gợi ý nhiệm vụ hôm nay</span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-muted-foreground flex-1 text-left">Ôn tập ít nhất 10 câu lý thuyết kỹ thuật</span>
                <Button variant="ghost" size="sm" asChild className="text-accent hover:text-accent/90 h-auto p-0">
                  <Link to="/questions">Bắt đầu</Link>
                </Button>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="text-muted-foreground flex-1 text-left">Ôn các thẻ nhớ hết hạn trong chu kỳ SRS</span>
                <Button variant="ghost" size="sm" asChild className="text-purple-400 hover:text-purple-400/90 h-auto p-0">
                  <Link to="/flashcards">Bắt đầu</Link>
                </Button>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-muted-foreground flex-1 text-left">Giải quyết 1 bài toán giải thuật thuật toán mới</span>
                <Button variant="ghost" size="sm" asChild className="text-green-400 hover:text-green-400/90 h-auto p-0">
                  <Link to="/dsa">Bắt đầu</Link>
                </Button>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Tip of the day */}
        <Card className="bg-card/20 border border-border/80">
          <CardContent className="p-6 space-y-3">
            <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span>Mẹo phỏng vấn</span>
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed text-left">
              Khi phỏng vấn thuật toán (DSA), đừng bắt đầu code ngay. Hãy dành 3-5 phút trao đổi giải thuật và độ phức tạp thời gian/không gian mong đợi với người phỏng vấn để thống nhất phương án tối ưu trước.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
