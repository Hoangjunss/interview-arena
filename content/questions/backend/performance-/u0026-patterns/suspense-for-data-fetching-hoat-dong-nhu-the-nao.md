---
id: suspense-for-data-fetching-hoat-dong-nhu-the-nao
position: backend
technology: performance-\u0026-patterns
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Suspense for data fetching hoạt động như thế nào?

## Question (EN)
How does Suspense for data fetching work?

## Đáp án chi tiết (VI)
Component throw Promise khi data chưa ready, Suspense catch Promise và show fallback, khi Promise resolve React retry render component. Chính thức support với React.lazy, Next.js (Server Components), và React Query v5+ qua `useSuspenseQuery` (không còn experimental). React 19 bổ sung hook `use()` cho phép client-side Suspense data fetching trực tiếp. Cho phép colocate loading states với components cần data.

## Detailed Answer (EN)
A component throws a Promise when its data is not yet ready. Suspense catches the Promise and shows the fallback UI. When the Promise resolves, React retries rendering the component. Officially supported with React.lazy, Next.js (Server Components), and React Query v5+ via `useSuspenseQuery` (no longer experimental). React 19 adds the `use()` hook for native client-side Suspense data fetching. It allows loading states to be colocated with the components that need the data.
