import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { dsaApi } from '../api/dsa'
import type { DsaProblemDetail, DsaSubmissionResult } from '../types/dsa'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { toast } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

const LANGUAGES = ['java', 'python', 'javascript', 'cpp'] as const

export function DsaProblemPage() {
  const { slug } = useParams<{ slug: string }>()
  const [problem, setProblem] = useState<DsaProblemDetail | null>(null)
  const [language, setLanguage] = useState<string>('python')
  const [code, setCode] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<DsaSubmissionResult | null>(null)

  useEffect(() => {
    if (!slug) return
    dsaApi.detail(slug).then(detail => {
      setProblem(detail)
      setCode(detail.starterCode[language] ?? '')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  function onLanguageChange(next: string) {
    if (code.trim() && !window.confirm('Đổi ngôn ngữ sẽ mất code hiện tại. Tiếp tục?')) {
      return
    }
    setLanguage(next)
    setCode(problem?.starterCode[next] ?? '')
    setResult(null)
  }

  async function handleSubmit() {
    if (!slug || submitting) return
    setSubmitting(true)
    setResult(null)
    try {
      const res = await dsaApi.submit(slug, language, code)
      setResult(res)
    } catch (err: any) {
      toast.error(err.message || 'Không thể chấm bài, thử lại sau.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!problem) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-mono text-2xl font-semibold capitalize">{problem.slug.replace(/-/g, ' ')}</h1>
        <Button asChild variant="secondary" size="sm">
          <Link to="/dsa">Quay lại</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="prose prose-invert max-w-none py-6">
            <MarkdownRenderer content={problem.markdownBody} />
            {problem.samples.length > 0 && (
              <div className="mt-6 not-prose flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-muted-foreground">Ví dụ</h3>
                {problem.samples.map((sample, i) => (
                  <div key={i} className="rounded-md border border-border bg-muted p-3 font-mono text-xs">
                    <div>Input: {sample.input.replace('\n', ', ')}</div>
                    <div>Output: {sample.expectedOutput}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>

          <Card className="overflow-hidden">
            <Editor
              height="400px"
              language={language === 'cpp' ? 'cpp' : language === 'javascript' ? 'javascript' : language}
              theme="vs-dark"
              value={code}
              onChange={v => setCode(v ?? '')}
              options={{ minimap: { enabled: false }, fontSize: 14 }}
            />
          </Card>

          <Button onClick={handleSubmit} disabled={submitting || !code.trim()}>
            {submitting ? 'Đang chấm bài...' : 'Chạy thử'}
          </Button>

          {result && (
            <Card className={cn(result.verdict === 'PASSED' ? 'border-success' : 'border-danger')}>
              <CardContent className="py-4">
                <Alert variant={result.verdict === 'PASSED' ? 'default' : 'destructive'}>
                  <AlertDescription>
                    {result.verdict} — {result.passedCount}/{result.totalCount} test case đạt
                  </AlertDescription>
                </Alert>
                {result.failures.length > 0 && (
                  <div className="mt-4 flex flex-col gap-3">
                    {result.failures.map((f, i) => (
                      <div key={i} className="rounded-md border border-danger/40 bg-danger/5 p-3 font-mono text-xs">
                        <div>Input: {f.input}</div>
                        <div>Expected: {f.expected}</div>
                        <div>Actual: {f.actual}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
