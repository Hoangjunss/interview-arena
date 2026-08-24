import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { interviewApi } from '../api/interview'
import type { InterviewSession } from '../types/interview'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

function getPollInterval() {
  return (window as unknown as Record<string, number>).__TEST_POLL_INTERVAL_MS__ || 2000
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
      } catch (err: unknown) {
        setError((err as Error).message || 'Lỗi kết nối máy chủ.')
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
    } catch (err: unknown) {
      const message = (err as Error).message || 'Lỗi gửi câu trả lời.'
      setError(message)
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  if (error && !session) {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="font-mono text-2xl font-semibold">Có lỗi xảy ra</h1>
        <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>
        <Button asChild>
          <Link to="/interviews/new">Thiết lập lại</Link>
        </Button>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground">Đang tải phiên phỏng vấn...</p>
      </div>
    )
  }

  const currentTurn = session.turns[session.turns.length - 1]
  const waitingForAnswer = session.status === 'ACTIVE' && currentTurn && currentTurn.answerText === null
  const isFailed = session.status === 'FAILED'

  return (
    <div className="flex h-[85vh] flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="font-mono text-xl font-semibold">Phỏng vấn thử AI</h1>
        <Button asChild variant="secondary" size="sm">
          <Link to="/">Thoát</Link>
        </Button>
      </div>

      <Card className="flex-1 overflow-y-auto">
        <CardContent className="flex flex-col gap-5 py-6">
          {session.turns.map(turn => (
            <div key={turn.turnOrder} className="flex flex-col gap-3">
              <div className="flex justify-start">
                <div className="max-w-[75%] rounded-2xl rounded-bl-sm border border-border bg-background px-5 py-4 text-sm leading-relaxed">
                  <div className="mb-1.5 font-mono text-[11px] font-semibold text-accent">
                    AI INTERVIEWER • CÂU HỎI {turn.turnOrder}
                  </div>
                  {turn.questionText}
                </div>
              </div>

              {turn.answerText && (
                <div className="flex justify-end">
                  <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-accent px-5 py-4 text-sm leading-relaxed text-accent-foreground">
                    <div className="mb-1.5 font-mono text-[11px] font-semibold opacity-70">BẠN</div>
                    {turn.answerText}
                  </div>
                </div>
              )}

              {turn.feedback && (
                <div className="flex justify-start pl-4">
                  <div className="max-w-[70%] rounded-lg border-l-4 border-success bg-success/5 px-4 py-3 text-sm leading-normal">
                    <strong className="text-success">Nhận xét câu trả lời {turn.turnOrder}:</strong> {turn.feedback}
                  </div>
                </div>
              )}
            </div>
          ))}

          {session.status === 'COMPLETED' && (
            <div className="mt-4 flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-success bg-success/5 py-8 text-center">
              <h2 className="text-2xl font-semibold text-success">Phiên phỏng vấn hoàn thành!</h2>
              <p className="text-muted-foreground">
                AI đã đánh giá tổng quan năng lực kỹ thuật và trình bày của bạn.
              </p>
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-success font-mono text-2xl font-bold text-success">
                {session.finalScore}
              </div>
            </div>
          )}

          {isFailed && (
            <Alert variant="destructive">
              <AlertDescription>
                <strong>Lỗi chấm điểm:</strong> LLM phản hồi không đúng định dạng. Phiên phỏng vấn bị hủy.
              </AlertDescription>
            </Alert>
          )}

          {session.status === 'ACTIVE' && !waitingForAnswer && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
              </span>
              <span className="italic">AI đang suy nghĩ và viết câu hỏi tiếp theo...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </CardContent>
      </Card>

      {waitingForAnswer && (
        <div className="flex gap-3">
          <Textarea
            className={cn('h-[60px] flex-1 resize-none')}
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
          <Button className="h-[60px] w-24" onClick={submit} disabled={submitting || !answer.trim()}>
            {submitting ? 'Đang gửi...' : 'Gửi'}
          </Button>
        </div>
      )}
    </div>
  )
}
