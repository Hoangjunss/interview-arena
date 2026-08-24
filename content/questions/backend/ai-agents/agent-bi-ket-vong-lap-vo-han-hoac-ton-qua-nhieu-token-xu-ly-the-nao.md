---
id: agent-bi-ket-vong-lap-vo-han-hoac-ton-qua-nhieu-token-xu-ly-the-nao
position: backend
technology: ai-agents
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Agent bị kẹt vòng lặp vô hạn hoặc tốn quá nhiều token. Xử lý thế nào?

## Question (EN)
Your agent loops infinitely or burns too many tokens. How do you fix it?

## Đáp án chi tiết (VI)
Đây là failure mode phổ biến nhất của agent. Cần nhiều lớp phòng thủ:\
\
**1. Hard limits (bắt buộc)**: `max_iterations` (10-25 step), `max_tokens_per_session` (100K), `timeout` (30s/tool, 5min/session), `max_tool_calls_per_tool`.\
\
**2. Loop detection**: hash (action + args) gần nhất — lặp lại N lần → ép break; semantic similarity thought sequence \u003e 0.95 → đang spin.\
\
**3. Token reduction**: context compression (tóm tắt history cũ), observation truncation (trim tool output dài), prompt caching (giảm 50-90% prefix cost), smaller model cho sub-task (Haiku/mini).\
\
**4. Planning trước**: Plan-and-Execute (plan upfront → khó lạc), Reflexion (agent tự review progress mỗi N step).\
\
**5. Observability**: log Thought/Action/Observation với trace ID + token count; alert khi cost/session \u003e threshold. Tools: LangSmith, Langfuse, Arize Phoenix, Helicone.\
\
**6. Human-in-the-loop**: confirm trước action destructive hoặc sau N step với task quan trọng.

## Detailed Answer (EN)
This is the #1 agent failure mode. Use defense in depth:\
\
**1. Hard limits (required)**: `max_iterations` (10–25 steps), `max_tokens_per_session` (100K), `timeout` (30s/tool, 5min/session), `max_tool_calls_per_tool`.\
\
**2. Loop detection**: hash recent (action + args) — repeated N times → force break; thought sequence cosine \u003e 0.95 → spinning.\
\
**3. Token reduction**: context compression (summarize old history), observation truncation (trim long tool outputs), prompt caching (50–90% cheaper prefixes), smaller models for sub-tasks (Haiku/mini).\
\
**4. Plan first**: Plan-and-Execute (full plan upfront → less drift), Reflexion (agent self-reviews every N steps).\
\
**5. Observability**: log every Thought/Action/Observation with trace ID + token count; alert on cost/session exceeding threshold. Tools: LangSmith, Langfuse, Arize Phoenix, Helicone.\
\
**6. Human-in-the-loop**: confirm before destructive actions or every N steps for critical tasks.
