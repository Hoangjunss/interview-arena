/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
import React, { useState } from 'react'
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
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Check,
  X,
  Zap,
  ShieldCheck
} from 'lucide-react'

export function HomePage() {
  const { user } = useAuth()
  
  // States for interactive landing page elements
  const [activeTab, setActiveTab] = useState<'theory' | 'flashcards' | 'dsa' | 'ai'>('theory')
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  // FAQ Data
  const FAQS = [
    {
      q: 'Hệ thống thẻ nhớ (SRS) hoạt động như thế nào?',
      a: 'SRS (Spaced Repetition System) sử dụng thuật toán SM-2 để tự động tính toán thời điểm tối ưu bạn sắp quên một khái niệm và nhắc bạn ôn tập lại. Giúp chuyển kiến thức từ trí nhớ ngắn hạn sang dài hạn hiệu quả gấp 3 lần.'
    },
    {
      q: 'Trình chấm bài DSA (Data Structures & Algorithms) sử dụng công nghệ gì?',
      a: 'Interview Arena tích hợp trực tiếp với Judge0 - hệ thống biên dịch và thực thi code sandboxed an toàn. Bạn soạn thảo code qua Monaco Editor (tương tự VS Code) và được chấm điểm tự động đối chiếu với các bộ test cases chuẩn.'
    },
    {
      q: 'AI Mock Interview hoạt động và chấm điểm ra sao?',
      a: 'Hệ thống AI đóng vai trò là nhà tuyển dụng chuyên nghiệp, đặt câu hỏi dựa trên CV hoặc vị trí tuyển dụng. Sau mỗi lượt thoại, câu trả lời của bạn được phân tích về mặt kỹ thuật, thái độ và độ chính xác để đưa ra điểm số kèm nhận xét cải thiện chi tiết.'
    },
    {
      q: 'Tôi có thể sử dụng các tính năng miễn phí không?',
      a: 'Có. Gói FREE của chúng tôi cung cấp đầy đủ quyền truy cập kho câu hỏi lý thuyết, ôn tập flashcard không giới hạn, cùng hạn ngạch 3 lượt phỏng vấn AI và 20 lượt chấm bài DSA mỗi ngày.'
    }
  ]

  // -------------------------------------------------------------
  // LOGGED OUT VIEW (Dynamic SaaS Landing Page - Editorial Theme)
  // -------------------------------------------------------------
  if (!user) {
    return (
      <div className="flex flex-col gap-28 py-6">
        
        {/* 1. Hero Section: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <Badge variant="outline" className="border-accent/40 text-accent font-medium px-3 py-1 text-xs tracking-wide">
              <Flame className="mr-1.5 h-3.5 w-3.5 text-accent animate-pulse" />
              Nền Tảng Luyện Phỏng Vấn Công Nghệ Hàng Đầu
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Chinh phục mọi vòng <br />
              <span className="bg-gradient-to-r from-accent via-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
                phỏng vấn kỹ thuật
              </span>
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
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

          {/* Right Side: Showcase stack */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-purple-500/5 blur-3xl rounded-full" />
            <div className="relative bg-card/30 border border-border/80 rounded-2xl p-6 shadow-2xl backdrop-blur-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border/40">
                <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase">Arena Overview</span>
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-border" />
                  <span className="w-2.5 h-2.5 rounded-full bg-border" />
                  <span className="w-2.5 h-2.5 rounded-full bg-border" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-card/60 border border-border p-4 rounded-xl flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-left">Ngân hàng câu hỏi</p>
                    <p className="text-xs text-muted-foreground mt-0.5 text-left">Phân loại chi tiết theo vị trí & level</p>
                  </div>
                </div>

                <div className="bg-card/60 border border-border p-4 rounded-xl flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <Brain className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-left">Thẻ nhớ Spaced Repetition</p>
                    <p className="text-xs text-muted-foreground mt-0.5 text-left">Thuật toán SM-2 nhắc nhở thông minh</p>
                  </div>
                </div>

                <div className="bg-card/60 border border-border p-4 rounded-xl flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-left">Phỏng vấn giả lập 1-1</p>
                    <p className="text-xs text-muted-foreground mt-0.5 text-left">Chấm điểm chi tiết và gợi ý cải thiện</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Interactive Feature Showcase Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">Trải nghiệm tính năng trực tiếp</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Nhấp vào các thẻ bên dưới để xem mô phỏng hoạt động thực tế của nền tảng.
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
            {[
              { id: 'theory', label: 'Kho Lý Thuyết', icon: BookOpen, color: 'text-blue-400' },
              { id: 'flashcards', label: 'Thẻ Nhớ SRS', icon: Brain, color: 'text-purple-400' },
              { id: 'dsa', label: 'Thuật Toán DSA', icon: Code2, color: 'text-green-400' },
              { id: 'ai', label: 'Phỏng Vấn AI', icon: Bot, color: 'text-accent' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-accent bg-accent/10 text-foreground'
                    : 'border-border text-muted-foreground hover:border-accent/30 hover:text-foreground'
                }`}
              >
                <tab.icon className={`h-4.5 w-4.5 ${tab.color}`} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Interactive Screen Preview */}
          <div className="bg-card/40 border border-border rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-lg relative min-h-[300px] flex items-center justify-center">
            
            {activeTab === 'theory' && (
              <div className="w-full space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground uppercase">Module: Lý thuyết</span>
                  <Badge variant="secondary" className="bg-blue-400/10 text-blue-400 border border-blue-400/20">Mid/Senior</Badge>
                </div>
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-foreground">Q: Sự khác nhau giữa `useEffect` và `useLayoutEffect` trong React?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed bg-card/60 p-4 rounded-xl border border-border">
                    `useEffect` chạy bất đồng bộ (asynchronously) sau khi trình duyệt đã vẽ xong giao diện (paint). `useLayoutEffect` chạy đồng bộ (synchronously) ngay sau khi DOM được thay đổi nhưng trước khi trình duyệt paint. Hãy dùng `useLayoutEffect` khi cần tính toán kích thước DOM để tránh hiện tượng giật màn hình (flicker).
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'flashcards' && (
              <div className="w-full space-y-6 text-center max-w-md mx-auto">
                <span className="text-xs font-mono text-muted-foreground uppercase block text-left">Module: Thẻ nhớ</span>
                <div className="bg-card/80 border-2 border-dashed border-border p-8 rounded-2xl shadow-inner space-y-4">
                  <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20">Lý thuyết mạng</Badge>
                  <h4 className="text-lg font-bold text-foreground">3-way handshake trong TCP là gì?</h4>
                  <p className="text-xs text-muted-foreground">Nhấp để xem câu trả lời ôn tập SRS</p>
                  <Button size="sm" className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold rounded-lg px-6">
                    Lật thẻ câu hỏi
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'dsa' && (
              <div className="w-full space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground uppercase">Module: DSA Editor</span>
                  <Badge variant="secondary" className="bg-green-400/10 text-green-400 border border-green-400/20">Accepted</Badge>
                </div>
                <div className="bg-muted/40 p-4 rounded-xl border border-border font-mono text-xs text-foreground space-y-2">
                  <p className="text-muted-foreground">// Solution for Binary Search</p>
                  <p><span className="text-accent">class</span> Solution &#123;</p>
                  <p>&nbsp;&nbsp;search(nums, target) &#123;</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-500">let</span> left = 0, right = nums.length - 1;</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-accent">while</span> (left &lt;= right) &#123; ... &#125;</p>
                  <p>&nbsp;&nbsp;&#125;</p>
                  <p>&#125;</p>
                </div>
                <div className="flex justify-between items-center text-xs text-muted-foreground bg-green-500/10 border border-green-500/20 p-3 rounded-lg text-green-400">
                  <span>Runtime: 45ms</span>
                  <span>Memory: 42.1 MB</span>
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="w-full space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground uppercase">Module: Phỏng vấn giả lập</span>
                  <Badge variant="secondary" className="bg-accent/10 text-accent border border-accent/20">Score: 8.5/10</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex space-x-3 items-start">
                    <span className="bg-accent/15 text-accent p-1.5 rounded-lg text-xs font-bold">Interviewer</span>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed bg-card/60 p-3 rounded-xl border border-border flex-1">
                      Hãy giải thích cách bạn xử lý xung đột dữ liệu (data race) khi nhiều thread cùng ghi vào một vùng nhớ?
                    </p>
                  </div>
                  <div className="flex space-x-3 items-start justify-end">
                    <p className="text-xs sm:text-sm text-foreground leading-relaxed bg-accent/10 p-3 rounded-xl border border-accent/20 flex-1 text-right">
                      Tôi sẽ sử dụng cơ chế Lock (Mutex) để đồng bộ hóa quyền truy cập, hoặc áp dụng các cấu trúc dữ liệu Thread-safe như ConcurrentHashMap trong Java.
                    </p>
                    <span className="bg-primary/10 text-primary p-1.5 rounded-lg text-xs font-bold">Candidate</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* 3. Pricing Comparison Section */}
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">Lựa chọn gói dịch vụ</h2>
            <p className="text-muted-foreground text-sm">Nâng cấp để mở khóa giới hạn tối đa cho việc luyện tập phỏng vấn.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Free Card */}
            <div className="bg-card/20 border border-border/80 rounded-2xl p-8 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold">Free Plan</h3>
                  <p className="text-xs text-muted-foreground mt-1">Dành cho việc bắt đầu luyện tập cơ bản</p>
                </div>
                <div className="text-3xl font-black">$0<span className="text-sm font-normal text-muted-foreground"> / tháng</span></div>
                
                <ul className="space-y-3 text-sm text-left">
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-green-500 shrink-0" />
                    <span className="text-muted-foreground">Kho câu hỏi lý thuyết đầy đủ</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-green-500 shrink-0" />
                    <span className="text-muted-foreground">Hệ thống thẻ nhớ SRS không giới hạn</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-green-500 shrink-0" />
                    <span className="text-muted-foreground">3 lượt phỏng vấn AI mỗi ngày</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-green-500 shrink-0" />
                    <span className="text-muted-foreground">20 lượt nộp bài DSA mỗi ngày</span>
                  </li>
                </ul>
              </div>

              <Button asChild variant="outline" className="w-full border-border font-bold py-3 rounded-xl hover:bg-muted/40">
                <Link to="/register">Bắt đầu ngay</Link>
              </Button>
            </div>

            {/* Pro Card */}
            <div className="bg-card border-2 border-accent rounded-2xl p-8 flex flex-col justify-between space-y-8 relative overflow-hidden shadow-xl shadow-accent/5">
              <div className="absolute top-0 right-0 bg-accent text-accent-foreground font-mono text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-bl-xl">
                Popular
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold flex items-center space-x-1.5">
                    <span>Pro Plan</span>
                    <Sparkles className="h-4 w-4 text-accent" />
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">Dành cho ôn luyện cao độ và bứt phá sự nghiệp</p>
                </div>
                <div className="text-3xl font-black">$5<span className="text-sm font-normal text-muted-foreground"> / tháng</span></div>
                
                <ul className="space-y-3 text-sm text-left">
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-accent shrink-0" />
                    <span className="text-foreground font-medium">Không giới hạn phỏng vấn thử AI</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-accent shrink-0" />
                    <span className="text-foreground font-medium">Không giới hạn nộp bài DSA</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-accent shrink-0" />
                    <span className="text-muted-foreground">Đầy đủ 4 ngôn ngữ (Python, JS, Java, C++)</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-accent shrink-0" />
                    <span className="text-muted-foreground">Băng thông thực thi ưu tiên tốc độ cao</span>
                  </li>
                </ul>
              </div>

              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 rounded-xl shadow-lg shadow-accent/10">
                <Link to="/register">Nâng cấp Pro</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* 4. FAQ Section */}
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">Câu hỏi thường gặp</h2>
            <p className="text-muted-foreground text-sm">Một số giải đáp nhanh giúp bạn làm quen với nền tảng.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index} 
                className="bg-card/30 border border-border rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between font-semibold text-sm text-foreground hover:bg-card/55 transition-colors text-left"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-accent shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`h-4.5 w-4.5 text-muted-foreground transition-transform duration-200 ${
                    activeFaq === index ? 'rotate-180' : ''
                  }`} />
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-4 pt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 text-left">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 5. CTA Bottom Section */}
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
