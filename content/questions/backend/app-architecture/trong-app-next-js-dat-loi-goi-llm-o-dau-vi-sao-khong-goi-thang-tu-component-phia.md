---
id: trong-app-next-js-dat-loi-goi-llm-o-dau-vi-sao-khong-goi-thang-tu-component-phia
position: backend
technology: app-architecture
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong app Next.js, đặt lời gọi LLM ở đâu? Vì sao không gọi thẳng từ component phía client?

## Question (EN)
In a Next.js app, where do you put the LLM call? Why not call it straight from a client component?

## Đáp án chi tiết (VI)
$83

## Detailed Answer (EN)
Call it from a **server route handler** (`app/api/chat/route.ts`) or a server action — never directly from the browser.\
\
**Reasons:**\
- **API key.** Anything prefixed `NEXT_PUBLIC_` ships in the bundle the user can read. A leaked key means strangers spending on your account.\
- **Control.** Only the server can enforce authentication, per-user quotas, input length limits, and cost logging.\
- **Prompt.** The system prompt is product IP; calling from the client publishes it.\
\
```ts\
// app/api/chat/route.ts\
export async function POST(req: Request) {\
  const session = await auth()\
  if (!session) return new Response('Unauthorized', { status: 401 })\
\
  const { messages } = await req.json()\
  const stream = await callModel({ messages, apiKey: process.env.LLM_API_KEY })\
  return new Response(stream, { headers: { 'Content-Type': 'text/event-stream' } })\
}\
```\
\
The client only ever knows the internal `/api/chat` endpoint. Switching provider or model is a one-place server change with zero client edits.
