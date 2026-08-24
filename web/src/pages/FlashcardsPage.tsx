import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { flashcardsApi, type DueCard, type ReviewRating } from '../api/flashcards'
import { questionsApi } from '../api/questions'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import type { QuestionDetail } from '../types/question'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export function FlashcardsPage() {
  const [cards, setCards] = useState<DueCard[] | null>(null)
  const [index, setIndex] = useState(0)
  const [detail, setDetail] = useState<QuestionDetail | null>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [loadingCard, setLoadingCard] = useState(false)

  useEffect(() => {
    flashcardsApi.due().then(setCards)
  }, [])

  useEffect(() => {
    if (cards && index < cards.length) {
      setLoadingCard(true)
      setIsFlipped(false)
      setDetail(null)
      questionsApi.detail(cards[index].questionId)
        .then(setDetail)
        .finally(() => setLoadingCard(false))
    }
  }, [cards, index])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!cards || index >= cards.length || loadingCard) return
      if (e.key === '1') rate('AGAIN')
      if (e.key === '2') rate('HARD')
      if (e.key === '3') rate('GOOD')
      if (e.key === '4') rate('EASY')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, index, loadingCard])

  async function rate(rating: ReviewRating) {
    if (!cards) return
    await flashcardsApi.review(cards[index].questionId, rating)
    setIndex(i => i + 1)
  }

  if (cards === null) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-72 w-full" />
      </div>
    )
  }

  if (index >= cards.length) {
    return (
      <div className="flex flex-col items-center gap-6 py-12 text-center">
        <h1 className="font-mono text-3xl font-semibold">Hoàn thành!</h1>
        <p className="max-w-md text-muted-foreground">
          Không còn thẻ nào cần ôn tập hôm nay. Chúc mừng bạn đã hoàn thành mục tiêu! 🎉
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link to="/questions">Xem kho câu hỏi</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/">Trang chủ</Link>
          </Button>
        </div>
      </div>
    )
  }

  const card = cards[index]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-2xl font-semibold">Luyện thẻ nhớ (SRS)</h1>
          <span className="text-sm text-muted-foreground">
            Còn lại: <strong className="text-foreground">{cards.length - index}</strong> thẻ
          </span>
        </div>
        <Button asChild variant="secondary" size="sm">
          <Link to="/">Thoát</Link>
        </Button>
      </div>

      <div className="[perspective:1200px]">
        <Card
          onClick={() => { if (!loadingCard) setIsFlipped(!isFlipped) }}
          className="relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center text-center transition-[transform] duration-300 hover:border-accent [transform-style:preserve-3d]"
          style={{ transform: isFlipped ? 'rotateY(180deg)' : 'none' }}
        >
          <div className="absolute right-4 top-4 text-xs text-muted-foreground [backface-visibility:hidden]">
            {isFlipped ? 'Đang hiện đáp án' : 'Nhấp để lật thẻ'}
          </div>

          <CardContent className="w-full py-6 [backface-visibility:hidden]" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'none' }}>
            {loadingCard ? (
              <p className="text-muted-foreground">Đang tải nội dung...</p>
            ) : !isFlipped ? (
              <div>
                <h2 className="mb-4 text-xl font-semibold capitalize">{card.slug.replace(/-/g, ' ')}</h2>
                {detail && (
                  <div className="prose prose-invert max-w-none text-left text-base">
                    <MarkdownRenderer content={detail.markdownBody.split(/(## Đáp án chi tiết|## Detailed Answer)/i)[0]} />
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full text-left">
                <h2 className="mb-2 border-b border-border pb-2 text-lg font-semibold">Đáp án</h2>
                {detail ? (
                  <div className="prose prose-invert max-w-none text-sm">
                    <MarkdownRenderer content={detail.markdownBody} />
                  </div>
                ) : (
                  <p className="text-muted-foreground">Không tìm thấy đáp án.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <Button variant="destructive" onClick={() => rate('AGAIN')}>Again</Button>
        <Button variant="warning" onClick={() => rate('HARD')}>Hard</Button>
        <Button onClick={() => rate('GOOD')}>Good</Button>
        <Button variant="success" onClick={() => rate('EASY')}>Easy</Button>
      </div>
    </div>
  )
}
