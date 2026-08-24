---
id: signal-computed-va-effect-khac-nhau-the-nao
position: backend
technology: signals-\u0026-change-detection
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`signal`, `computed` và `effect` khác nhau thế nào?

## Question (EN)
How do `signal`, `computed` and `effect` differ?

## Đáp án chi tiết (VI)
`signal` giữ state có thể ghi; `computed` derive giá trị read-only; `effect` chạy side effect khi dependency signal đổi.\
\
Ví dụ:\
```typescript\
const count = signal(0)\
const doubled = computed(() =\u003e count() * 2)\
\
effect(() =\u003e {\
  localStorage.setItem(\\"count\\

## Detailed Answer (EN)
`signal` stores writable state; `computed` derives read-only state; `effect` runs side effects when signal dependencies change.\
\
Example:\
```typescript\
const count = signal(0)\
const doubled = computed(() =\u003e count() * 2)\
\
effect(() =\u003e {\
  localStorage.setItem(\\"count\\
