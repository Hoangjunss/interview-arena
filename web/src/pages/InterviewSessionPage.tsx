import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { interviewApi } from '../api/interview'
import type { InterviewSession } from '../types/interview'

function getPollInterval() {
  return (window as any).__TEST_POLL_INTERVAL_MS__ || 2000
}

export function InterviewSessionPage() {
  const { sessionId } = useParams<{ sessionId: string }>()
  const [session, setSession] = useState<InterviewSession | null>(null)
  const [answer, setAnswer] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!sessionId) return

    async function poll() {
      try {
        const result = await interviewApi.get(sessionId!)
        setSession(result)
        if (result.status !== 'ACTIVE' && pollRef.current) {
          clearInterval(pollRef.current)
        }
      } catch (err: any) {
        setError(err.message || 'Lỗi kết nối máy chủ.')
      }
    }

    poll()
    pollRef.current = setInterval(poll, getPollInterval())

    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [sessionId])

  useEffect(() => {
    if (chatEndRef.current && typeof chatEndRef.current.scrollIntoView === 'function') {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [session?.turns])

  async function submit() {
    if (!sessionId || !answer.trim() || submitting) return
    setSubmitting(true)
    setError(null)
    try {
      await interviewApi.submitAnswer(sessionId, answer)
      setAnswer('')
    } catch (err: any) {
      setError(err.message || 'Lỗi gửi câu trả lời.')
    } finally {
      setSubmitting(false)
    }
  }

  if (error && !session) {
    return (
      <div className="home-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h1 className="hero-title" style={{ fontSize: '32px' }}>Có lỗi xảy ra</h1>
        <div className="auth-alert" style={{ marginBottom: '24px' }}>{error}</div>
        <Link className="btn-primary" to="/interviews/new">Thiết lập lại</Link>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="home-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p style={{ color: 'var(--text)' }}>Đang tải phiên phỏng vấn...</p>
      </div>
    )
  }

  const currentTurn = session.turns[session.turns.length - 1]
  const waitingForAnswer = session.status === 'ACTIVE' && currentTurn && currentTurn.answerText === null
  const isFailed = session.status === 'FAILED'

  return (
    <div className="home-container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left', display: 'flex', flexDirection: 'column', height: '85vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexShrink: 0 }}>
        <div>
          <h1 className="hero-title" style={{ fontSize: '28px', margin: 0 }}>Phỏng vấn thử AI</h1>
          <span style={{ fontSize: '13px', color: 'var(--text)' }}>
            Vị trí: <strong style={{ textTransform: 'capitalize' }}>{session.turns[0]?.questionText ? 'Đang phỏng vấn' : ''}</strong>
          </span>
        </div>
        <Link className="btn-secondary" to="/" style={{ padding: '8px 16px', fontSize: '14px' }}>
          Thoát
        </Link>
      </div>

      {/* Chat logs area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          borderRadius: '16px',
          background: 'var(--code-bg)',
          border: '1px solid var(--border)',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        {session.turns.map(turn => (
          <div key={turn.turnOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* AI Question */}
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  maxWidth: '75%',
                  padding: '16px 20px',
                  borderRadius: '16px 16px 16px 4px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-h)',
                  fontSize: '15px',
                  lineHeight: 1.6
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600, marginBottom: '6px' }}>
                  AI INTERVIEWER • CÂU HỎI {turn.turnOrder}
                </div>
                {turn.questionText}
              </div>
            </div>

            {/* User Answer */}
            {turn.answerText && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div
                  style={{
                    maxWidth: '75%',
                    padding: '16px 20px',
                    borderRadius: '16px 16px 4px 16px',
                    background: 'var(--accent)',
                    color: 'white',
                    fontSize: '15px',
                    lineHeight: 1.6
                  }}
                >
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 600, marginBottom: '6px' }}>
                    BẠN
                  </div>
                  {turn.answerText}
                </div>
              </div>
            )}

            {/* Turn Feedback (only when completed) */}
            {turn.feedback && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '16px' }}>
                <div
                  style={{
                    maxWidth: '70%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: 'rgba(16,185,129,0.05)',
                    borderLeft: '4px solid #10b981',
                    fontSize: '14px',
                    color: 'var(--text-h)',
                    lineHeight: 1.5
                  }}
                >
                  <strong style={{ color: '#10b981' }}>Nhận xét câu trả lời {turn.turnOrder}:</strong> {turn.feedback}
                </div>
              </div>
            )}
          </div>
        ))}

        {session.status === 'COMPLETED' && (
          <div
            style={{
              padding: '32px',
              borderRadius: '16px',
              border: '2px dashed #10b981',
              background: 'rgba(16, 185, 129, 0.05)',
              textAlign: 'center',
              marginTop: '20px'
            }}
          >
            <h2 style={{ color: '#10b981', fontSize: '28px', margin: '0 0 8px' }}>Phiên phỏng vấn hoàn thành!</h2>
            <p style={{ fontSize: '16px', margin: '0 0 20px', color: 'var(--text)' }}>
              AI đã đánh giá tổng quan năng lực kỹ thuật và trình bày của bạn.
            </p>
            <div style={{ display: 'inline-block', padding: '16px 32px', borderRadius: '50px', background: '#10b981', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
              Điểm số: {session.finalScore}/100
            </div>
          </div>
        )}

        {isFailed && (
          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid #ef4444',
              background: 'rgba(239,68,68,0.05)',
              color: '#ef4444',
              textAlign: 'center'
            }}
          >
            <strong>Lỗi chấm điểm:</strong> LLM phản hồi không đúng định dạng. Phiên phỏng vấn bị hủy.
          </div>
        )}

        {session.status === 'ACTIVE' && !waitingForAnswer && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '8px', color: 'var(--text)' }}>
            <span style={{ fontStyle: 'italic', fontSize: '14px' }}>AI đang suy nghĩ và viết câu hỏi tiếp theo...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      {waitingForAnswer && (
        <div style={{ display: 'flex', gap: '12px', flexShrink: 0, marginBottom: '20px' }}>
          <textarea
            className="form-input"
            style={{ flex: 1, resize: 'none', height: '60px', padding: '14px' }}
            placeholder="Nhập câu trả lời của bạn"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            disabled={submitting}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                submit()
              }
            }}
          />
          <button
            className="auth-btn"
            style={{ width: '100px', height: '60px' }}
            onClick={submit}
            disabled={submitting || !answer.trim()}
          >
            {submitting ? 'Đang gửi...' : 'Gửi'}
          </button>
        </div>
      )}
    </div>
  )
}
