import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function HomePage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-8 py-16 text-center">
        <h1 className="font-mono text-4xl font-semibold text-accent md:text-5xl">Interview Arena</h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Nền tảng luyện phỏng vấn AI, ôn tập câu hỏi qua thẻ ghi nhớ (Flashcards SRS) và mô phỏng phỏng vấn trực tiếp.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link to="/login">Đăng nhập</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/register">Đăng ký tài khoản</Link>
          </Button>
        </div>
      </div>
    )
  }

  const tiles = [
    { to: '/questions', title: 'Kho câu hỏi', description: 'Duyệt và luyện tập theo vị trí, công nghệ, trình độ.' },
    { to: '/flashcards', title: 'Ôn tập thẻ nhớ (SRS)', description: 'Ghi nhớ lâu dài với lịch ôn tập thông minh.' },
    { to: '/interviews/new', title: 'Phỏng vấn thử AI 🤖', description: 'Mô phỏng phỏng vấn thật với AI Interviewer.' },
    { to: '/progress', title: 'Tiến độ của tôi 📊', description: 'Xem lại thống kê luyện tập của bạn.' },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-mono text-2xl font-semibold">
          Xin chào, <span className="text-accent">{user.displayName}</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Xin chào, <strong>{user.displayName}</strong> ({user.email})! Sẵn sàng luyện tập phỏng vấn chưa?
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tiles.map(tile => (
          <Link key={tile.to} to={tile.to}>
            <Card className="h-full transition-colors hover:border-accent">
              <CardHeader>
                <CardTitle className="text-base">{tile.title}</CardTitle>
                <CardDescription>{tile.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
