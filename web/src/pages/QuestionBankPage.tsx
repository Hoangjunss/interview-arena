import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { questionsApi } from '../api/questions'
import type { QuestionSummary } from '../types/question'

const POSITIONS = ['frontend', 'backend', 'devops', 'ai', 'database']
const LEVELS = ['junior', 'mid', 'senior']

export function QuestionBankPage() {
  const [position, setPosition] = useState('frontend')
  const [technology, setTechnology] = useState('react')
  const [level, setLevel] = useState('junior')
  const [questions, setQuestions] = useState<QuestionSummary[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)

  const prevFiltersRef = useRef({ position, technology, level })

  useEffect(() => {
    const prev = prevFiltersRef.current
    const filtersChanged = prev.position !== position || prev.technology !== technology || prev.level !== level
    
    prevFiltersRef.current = { position, technology, level }

    if (filtersChanged && page !== 0) {
      setPage(0)
      return
    }

    setLoading(true)
    questionsApi.list(position, technology.toLowerCase(), level, page, 10)
      .then(res => {
        setQuestions(res.content)
        setTotalPages(res.totalPages)
      })
      .finally(() => setLoading(false))
  }, [position, technology, level, page])

  return (
    <div className="home-container" style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 className="hero-title" style={{ fontSize: '40px', margin: 0 }}>Kho câu hỏi</h1>
        <Link className="btn-secondary" to="/" style={{ padding: '8px 16px', fontSize: '14px' }}>
          Quay lại
        </Link>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
        padding: '24px',
        background: 'var(--code-bg)',
        borderRadius: '12px',
        border: '1px solid var(--border)'
      }}>
        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label">Vị trí</label>
          <select className="form-input" value={position} onChange={e => setPosition(e.target.value)}>
            {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label">Công nghệ</label>
          <input
            className="form-input"
            value={technology}
            onChange={e => setTechnology(e.target.value)}
            placeholder="Ví dụ: react, spring-boot"
          />
        </div>

        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label">Trình độ</label>
          <select className="form-input" value={level} onChange={e => setLevel(e.target.value)}>
            {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: 'var(--text)' }}>Đang tải câu hỏi...</p>
      ) : questions.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text)', padding: '40px' }}>
          Không tìm thấy câu hỏi nào phù hợp với bộ lọc hiện tại.
        </p>
      ) : (
        <div style={{ display: 'grid', gap: '12px' }}>
          {questions.map(q => (
            <Link
              key={q.id}
              to={`/questions/${q.id}`}
              style={{
                display: 'block',
                padding: '20px',
                borderRadius: '8px',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                textDecoration: 'none',
                color: 'var(--text-h)',
                transition: 'transform 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateX(4px)'
                e.currentTarget.style.borderColor = 'var(--accent)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.borderColor = 'var(--border)'
              }}
            >
              <h2 style={{ fontSize: '18px', margin: 0, textTransform: 'capitalize' }}>
                {q.slug.replace(/-/g, ' ')}
              </h2>
              <span style={{ fontSize: '12px', color: 'var(--text)' }}>
                {q.position} • {q.technology} • {q.level}
              </span>
            </Link>
          ))}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
              <button
                className="btn-secondary"
                disabled={page === 0}
                onClick={() => setPage(p => Math.max(0, p - 1))}
                style={{ padding: '8px 16px', fontSize: '14px', cursor: page === 0 ? 'not-allowed' : 'pointer', opacity: page === 0 ? 0.5 : 1 }}
              >
                Trang trước
              </button>
              <span style={{ color: 'var(--text)', fontSize: '14px' }}>
                Trang <strong>{page + 1}</strong> / {totalPages}
              </span>
              <button
                className="btn-secondary"
                disabled={page >= totalPages - 1}
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                style={{ padding: '8px 16px', fontSize: '14px', cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer', opacity: page >= totalPages - 1 ? 0.5 : 1 }}
              >
                Trang sau
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
