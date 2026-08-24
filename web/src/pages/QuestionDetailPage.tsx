import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { questionsApi } from '../api/questions'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import type { QuestionDetail } from '../types/question'

export function QuestionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [detail, setDetail] = useState<QuestionDetail | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      setLoading(true)
      setError(null)
      questionsApi.detail(id)
        .then(setDetail)
        .catch(err => {
          setError(err.message || 'Không thể tải chi tiết câu hỏi này.')
        })
        .finally(() => setLoading(false))
    }
  }, [id])

  if (loading) {
    return (
      <div className="home-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ color: 'var(--text)' }}>Đang tải chi tiết câu hỏi...</p>
      </div>
    )
  }

  if (error || !detail) {
    return (
      <div className="home-container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
        <div className="auth-alert" style={{ marginBottom: '24px' }}>{error || 'Không tìm thấy câu hỏi.'}</div>
        <Link className="btn-secondary" to="/questions">
          Quay lại kho câu hỏi
        </Link>
      </div>
    )
  }

  const isQuiz = detail.markdownBody.includes('## Đáp án trắc nghiệm')

  return (
    <div className="home-container" style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 className="hero-title" style={{ fontSize: '36px', margin: 0, textTransform: 'capitalize' }}>
            {detail.slug.replace(/-/g, ' ')}
          </h1>
          <span style={{ fontSize: '14px', color: 'var(--text)' }}>
            Vị trí: <strong>{detail.position}</strong> • Công nghệ: <strong>{detail.technology}</strong> • Trình độ: <strong>{detail.level}</strong>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {isQuiz && (
            <Link className="btn-primary" to={`/quiz/${detail.id}`} style={{ padding: '8px 16px', fontSize: '14px' }}>
              Làm trắc nghiệm 📝
            </Link>
          )}
          <Link className="btn-secondary" to="/questions" style={{ padding: '8px 16px', fontSize: '14px' }}>
            Quay lại
          </Link>
        </div>
      </div>

      <div style={{
        padding: '40px',
        borderRadius: '16px',
        background: 'var(--code-bg)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)',
        marginBottom: '40px'
      }}>
        <MarkdownRenderer content={detail.markdownBody} />
      </div>
    </div>
  )
}
