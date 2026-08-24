import ReactMarkdown from 'react-markdown'

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="markdown-body" style={{ textAlign: 'left', lineHeight: '1.6' }}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
