---
id: error-tsx-va-not-found-tsx-trong-next-js-hoat-dong-nhu-the-nao
position: backend
technology: app-router
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
error.tsx và not-found.tsx trong Next.js hoạt động như thế nào?

## Question (EN)
How do error.tsx and not-found.tsx work in Next.js?

## Đáp án chi tiết (VI)
`error.tsx` phải là Client Component, nhận `error` và `reset` props, hiển thị khi có lỗi trong segment. `not-found.tsx` hiển thị khi gọi `notFound()` từ server component hoặc khi URL không match route nào. Global error.tsx ở root app/ bắt lỗi kể cả trong root layout.

## Detailed Answer (EN)
`error.tsx` must be a Client Component; it receives `error` and `reset` props and is shown when an error occurs within its route segment. `not-found.tsx` renders when `notFound()` is called from a server component or when no route matches the URL. A global error.tsx at the root of `app/` catches errors even inside the root layout.
