import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { questionsApi } from '../api/questions'
import { quizApi, QuizResult } from '../api/quiz'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import type { QuestionDetail } from '../types/question'

function parseOptions(markdownBody: string): string[] {
  const match = markdownBody.match(/## Đáp án trắc nghiệm\s*\n((?:- \[[ x]] .*\n?)+)/)
  if (!match) return []
  return match[1]
    .split('\n')
    .filter(line => line.trim().length > 0)
    .map(line => line.replace(/^- \[[ x]] /, '').trim())
}

export function QuizPage() {
  const { questionId } = useParams<{ questionId: string }>()
  const [detail, setDetail] = useState<QuestionDetail | null>(null)
  const [options, setOptions] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [result, setResult] = useState<QuizResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (questionId) {
      setLoading(true)
      setResult(null)
      setSelectedIndex(null)
      questionsApi.detail(questionId)
        .then(res => {
          setDetail(res)
          setOptions(parseOptions(res.markdownBody))
        })
        .finally(() => setLoading(false))
    }
  }, [questionId])

  async function handleOptionClick(index: number) {
    if (!questionId || result !== null) return
    setSelectedIndex(index)
    try {
      const r = await quizApi.submit(questionId, index)
      setResult(r)
    } catch (err) {
      console.error('Failed to submit choice', err)
    }
  }

  if (loading) {
    return (
      <div className="home-container" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <p style={{ color: 'var(--text)' }}>Đang tải câu hỏi...</p>
      </div>
    )
  }

  if (!detail) {
    return (
      <div className="home-container" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <h1 className="hero-title" style={{ fontSize: '32px' }}>Không tìm thấy câu hỏi</h1>
        <div className="cta-group">
          <Link className="btn-primary" to="/questions">Quay lại kho câu hỏi</Link>
        </div>
      </div>
    )
  }

  // Extract explanation from markdown body
  const explanationSplit = detail.markdownBody.split(/(## Giải thích \(VI\)|## Explanation \(EN\))/i)
  const explanationMarkdown = explanationSplit.length > 2 ? explanationSplit.slice(1).join('\n') : ''

  // Get question content without the options and explanation
  const questionContent = detail.markdownBody.split(/## Đáp án trắc nghiệm/i)[0]

  return (
    <div className="home-container" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 className="hero-title" style={{ fontSize: '32px', margin: 0 }}>Luyện trắc nghiệm</h1>
        <Link className="btn-secondary" to="/questions" style={{ padding: '8px 16px', fontSize: '14px' }}>
          Quay lại
        </Link>
      </div>

      <div
        style={{
          padding: '28px',
          borderRadius: '16px',
          background: 'var(--code-bg)',
          border: '1px solid var(--border)',
          marginBottom: '28px',
        }}
      >
        <div style={{ fontSize: '14px', color: 'var(--text)', marginBottom: '12px', textTransform: 'uppercase', fontWeight: 600 }}>
          {detail.position} • {detail.technology} • {detail.level}
        </div>
        <MarkdownRenderer content={questionContent} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        {options.map((option, i) => {
          let itemStyle: React.CSSProperties = {
            padding: '18px 24px',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            background: 'var(--code-bg)',
            cursor: result === null ? 'pointer' : 'default',
            textAlign: 'left',
            fontSize: '16px',
            color: 'var(--text-h)',
            transition: 'border-color 0.2s, background 0.2s',
            display: 'block',
            width: '100%',
          }

          if (result !== null) {
            if (i === result.correctIndex) {
              itemStyle.borderColor = '#10b981'
              itemStyle.background = 'rgba(16, 185, 129, 0.1)'
            } else if (i === selectedIndex && !result.correct) {
              itemStyle.borderColor = '#ef4444'
              itemStyle.background = 'rgba(239, 68, 68, 0.1)'
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleOptionClick(i)}
              disabled={result !== null}
              style={itemStyle}
              onMouseEnter={e => {
                if (result === null) {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                }
              }}
              onMouseLeave={e => {
                if (result === null) {
                  e.currentTarget.style.borderColor = 'var(--border)'
                }
              }}
            >
              <span style={{ fontWeight: 600, marginRight: '12px' }}>{String.fromCharCode(65 + i)}.</span>
              {option}
            </button>
          )
        })}
      </div>

      {result && (
        <div
          style={{
            padding: '24px',
            borderRadius: '16px',
            border: `1px solid ${result.correct ? '#10b981' : '#ef4444'}`,
            background: result.correct ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)',
            marginBottom: '32px',
          }}
        >
          <h3 style={{ margin: '0 0 12px', color: result.correct ? '#10b981' : '#ef4444', fontSize: '20px' }}>
            {result.correct ? 'Chính xác! 🎉' : 'Chưa chính xác. ❌'}
          </h3>
          {explanationMarkdown && (
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '12px' }}>
              <h4 style={{ margin: '0 0 8px', fontSize: '16px', color: 'var(--text-h)' }}>Giải thích chi tiết:</h4>
              <MarkdownRenderer content={explanationMarkdown} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
