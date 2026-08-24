import { useEffect, useState } from 'react'
import { progressApi, Progress } from '../api/progress'
import { Link } from 'react-router-dom'

export function ProgressPage() {
  const [progress, setProgress] = useState<Progress | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    progressApi.get()
      .then(setProgress)
      .catch((e: any) => {
        setError(e.message || 'Không thể tải dữ liệu tiến độ.')
      })
  }, [])

  if (error) {
    return (
      <div className="home-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="auth-alert">{error}</div>
        <Link className="btn-secondary" to="/">Trang chủ</Link>
      </div>
    )
  }

  if (!progress) {
    return (
      <div className="home-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p style={{ color: 'var(--text)' }}>Đang tải tiến độ của bạn...</p>
      </div>
    )
  }

  return (
    <div className="home-container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 className="hero-title" style={{ fontSize: '40px', margin: 0, textAlign: 'left' }}>Tiến độ học tập</h1>
          <p style={{ color: 'var(--text)', marginTop: '8px' }}>
            Xem lại quá trình luyện tập và kết quả của bạn
          </p>
        </div>
        <Link className="btn-secondary" to="/" style={{ padding: '8px 16px', fontSize: '14px' }}>
          Quay lại
        </Link>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        {/* Card 1: Completed Interviews */}
        <div style={{
          padding: '24px',
          borderRadius: '12px',
          background: 'var(--code-bg)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '32px', marginBottom: '8px' }}>🤖</span>
          <h3 style={{ margin: '0 0 8px', fontSize: '16px', color: 'var(--text)', fontWeight: 500 }}>
            Phỏng vấn AI đã xong
          </h3>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--text-h)' }}>
            {progress.completedInterviews}
          </div>
        </div>

        {/* Card 2: Average Interview Score */}
        <div style={{
          padding: '24px',
          borderRadius: '12px',
          background: 'var(--code-bg)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '32px', marginBottom: '8px' }}>📈</span>
          <h3 style={{ margin: '0 0 8px', fontSize: '16px', color: 'var(--text)', fontWeight: 500 }}>
            Điểm phỏng vấn TB
          </h3>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--text-h)' }}>
            {progress.averageInterviewScore.toFixed(1)}
          </div>
        </div>

        {/* Card 3: Quiz Accuracy */}
        <div style={{
          padding: '24px',
          borderRadius: '12px',
          background: 'var(--code-bg)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '32px', marginBottom: '8px' }}>🎯</span>
          <h3 style={{ margin: '0 0 8px', fontSize: '16px', color: 'var(--text)', fontWeight: 500 }}>
            Độ chính xác Quiz
          </h3>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--text-h)' }}>
            {progress.quizAccuracyPercent.toFixed(1)}%
          </div>
        </div>

        {/* Card 4: Cards Reviewed */}
        <div style={{
          padding: '24px',
          borderRadius: '12px',
          background: 'var(--code-bg)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '32px', marginBottom: '8px' }}>🗂️</span>
          <h3 style={{ margin: '0 0 8px', fontSize: '16px', color: 'var(--text)', fontWeight: 500 }}>
            Thẻ ghi nhớ đã ôn
          </h3>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--text-h)' }}>
            {progress.cardsReviewedTotal}
          </div>
        </div>
      </div>

      <div style={{
        padding: '24px',
        borderRadius: '12px',
        background: 'var(--accent-bg)',
        border: '1px solid var(--accent-border)',
        color: 'var(--text-h)',
        lineHeight: 1.6
      }}>
        <h3 style={{ margin: '0 0 8px', color: 'var(--text-h)', fontSize: '20px' }}>💡 Lời khuyên từ AI Arena</h3>
        {progress.completedInterviews === 0 && progress.cardsReviewedTotal === 0 ? (
          <p>Bắt đầu hành trình của bạn bằng cách duyệt qua kho câu hỏi, luyện thẻ nhớ hoặc thử sức với một buổi phỏng vấn AI ngay!</p>
        ) : (
          <p>
            Bạn đang có những bước tiến tuyệt vời! Hãy duy trì việc luyện tập thẻ nhớ (SRS) hằng ngày để ghi nhớ lâu hơn, và định kỳ thực hiện các bài phỏng vấn thử với AI để rèn luyện kỹ năng phản xạ và diễn đạt.
          </p>
        )}
      </div>
    </div>
  )
}
