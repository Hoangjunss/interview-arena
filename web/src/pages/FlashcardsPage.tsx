import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { flashcardsApi, DueCard, ReviewRating } from '../api/flashcards'
import { questionsApi } from '../api/questions'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import type { QuestionDetail } from '../types/question'

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

  async function rate(rating: ReviewRating) {
    if (!cards) return
    await flashcardsApi.review(cards[index].questionId, rating)
    setIndex(i => i + 1)
  }

  if (cards === null) {
    return (
      <div className="home-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p style={{ color: 'var(--text)' }}>Đang tải danh sách thẻ...</p>
      </div>
    )
  }

  if (index >= cards.length) {
    return (
      <div className="home-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '60px 20px' }}>
        <h1 className="hero-title" style={{ fontSize: '40px' }}>Hoàn thành!</h1>
        <p className="hero-subtitle">
          Không còn thẻ nào cần ôn tập hôm nay. Chúc mừng bạn đã hoàn thành mục tiêu! 🎉
        </p>
        <div className="cta-group">
          <Link className="btn-primary" to="/questions">
            Xem kho câu hỏi
          </Link>
          <Link className="btn-secondary" to="/">
            Trang chủ
          </Link>
        </div>
      </div>
    )
  }

  const card = cards[index]

  return (
    <div className="home-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 className="hero-title" style={{ fontSize: '32px', margin: 0 }}>Luyện thẻ nhớ (SRS)</h1>
          <span style={{ fontSize: '14px', color: 'var(--text)' }}>
            Còn lại: <strong>{cards.length - index}</strong> thẻ
          </span>
        </div>
        <Link className="btn-secondary" to="/" style={{ padding: '8px 16px', fontSize: '14px' }}>
          Thoát
        </Link>
      </div>

      <div
        onClick={() => {
          if (!loadingCard) setIsFlipped(!isFlipped)
        }}
        style={{
          padding: '40px',
          borderRadius: '16px',
          background: 'var(--code-bg)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow)',
          minHeight: '280px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          transition: 'transform 0.3s, border-color 0.2s',
          transform: isFlipped ? 'rotateY(360deg)' : 'none',
          marginBottom: '32px',
          position: 'relative'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--accent)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border)'
        }}
      >
        <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '12px', color: 'var(--text)' }}>
          {isFlipped ? 'Đang hiện đáp án' : 'Nhấp để lật thẻ'}
        </div>

        {loadingCard ? (
          <p style={{ color: 'var(--text)' }}>Đang tải nội dung...</p>
        ) : !isFlipped ? (
          <div>
            <h2 style={{ fontSize: '24px', margin: '0 0 16px', textTransform: 'capitalize' }}>
              {card.slug.replace(/-/g, ' ')}
            </h2>
            {detail && <div style={{ fontSize: '16px', color: 'var(--text-h)', textAlign: 'left' }}><MarkdownRenderer content={detail.markdownBody.split(/(## Đáp án chi tiết|## Detailed Answer)/i)[0]} /></div>}
          </div>
        ) : (
          <div style={{ textAlign: 'left', width: '100%' }}>
            <h2 style={{ fontSize: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginTop: 0 }}>
              Đáp án
            </h2>
            {detail ? (
              <div style={{ fontSize: '15px' }}>
                <MarkdownRenderer content={detail.markdownBody} />
              </div>
            ) : (
              <p style={{ color: 'var(--text)' }}>Không tìm thấy đáp án.</p>
            )}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        <button
          className="auth-btn"
          style={{ background: '#ef4444', fontSize: '14px', padding: '10px' }}
          onClick={() => rate('AGAIN')}
        >
          Again
        </button>
        <button
          className="auth-btn"
          style={{ background: '#f59e0b', fontSize: '14px', padding: '10px' }}
          onClick={() => rate('HARD')}
        >
          Hard
        </button>
        <button
          className="auth-btn"
          style={{ background: 'var(--accent)', fontSize: '14px', padding: '10px' }}
          onClick={() => rate('GOOD')}
        >
          Good
        </button>
        <button
          className="auth-btn"
          style={{ background: '#10b981', fontSize: '14px', padding: '10px' }}
          onClick={() => rate('EASY')}
        >
          Easy
        </button>
      </div>
    </div>
  )
}
