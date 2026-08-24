import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ApiError } from '../api/client'
import { interviewApi } from '../api/interview'

const POSITIONS = [
  { value: 'frontend', label: 'Frontend Developer' },
  { value: 'backend', label: 'Backend Developer' },
  { value: 'devops', label: 'DevOps Engineer' },
  { value: 'ai', label: 'AI Engineer' },
  { value: 'database', label: 'Database Administrator' }
]

const LEVELS = [
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Middle' },
  { value: 'senior', label: 'Senior' }
]

export function InterviewSetupPage() {
  const navigate = useNavigate()
  const [position, setPosition] = useState('frontend')
  const [technology, setTechnology] = useState('React')
  const [level, setLevel] = useState('mid')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function start() {
    if (!technology.trim()) return
    setLoading(true)
    setError(null)
    try {
      const session = await interviewApi.start(position, technology, level)
      navigate(`/interviews/${session.sessionId}`)
    } catch (err) {
      console.error(err)
      if (err instanceof ApiError && err.status === 429) {
        setError('Bạn đã dùng hết lượt phỏng vấn AI miễn phí hôm nay. Nâng cấp Pro để tiếp tục.')
      } else {
        setError('Không thể bắt đầu phỏng vấn, thử lại sau.')
      }
      setLoading(false)
    }
  }

  return (
    <div className="home-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 className="hero-title" style={{ fontSize: '32px', margin: 0 }}>Thiết lập phỏng vấn</h1>
        <Link className="btn-secondary" to="/" style={{ padding: '8px 16px', fontSize: '14px' }}>
          Hủy
        </Link>
      </div>

      <div
        className="auth-card"
        style={{
          padding: '40px',
          borderRadius: '16px',
          background: 'var(--code-bg)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow)'
        }}
      >
        <p style={{ color: 'var(--text)', fontSize: '15px', marginBottom: '24px', lineHeight: 1.6 }}>
          Chọn vị trí tuyển dụng, công nghệ mục tiêu và trình độ mong muốn của bạn. AI sẽ đóng vai người phỏng vấn để kiểm tra kiến thức của bạn.
        </p>

        {error && (
          <div className="auth-alert" role="alert" style={{ marginBottom: '24px' }}>
            {error}
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Vị trí phỏng vấn</label>
          <select
            value={position}
            onChange={e => setPosition(e.target.value)}
            className="form-input"
            style={{ appearance: 'none', background: 'var(--bg)', cursor: 'pointer' }}
          >
            {POSITIONS.map(p => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Công nghệ cốt lõi (ví dụ: React, Java, Docker)</label>
          <input
            type="text"
            className="form-input"
            value={technology}
            onChange={e => setTechnology(e.target.value)}
            placeholder="Ví dụ: React, Spring Boot, AWS"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Cấp độ chuyên môn</label>
          <select
            value={level}
            onChange={e => setLevel(e.target.value)}
            className="form-input"
            style={{ appearance: 'none', background: 'var(--bg)', cursor: 'pointer' }}
          >
            {LEVELS.map(l => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        <button
          className="auth-btn"
          onClick={start}
          disabled={loading || !technology.trim()}
          style={{ marginTop: '16px' }}
        >
          {loading ? 'Đang khởi tạo phiên...' : 'Bắt đầu phỏng vấn'}
        </button>
      </div>
    </div>
  )
}
