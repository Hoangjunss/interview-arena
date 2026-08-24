---
id: usesuspensequery-khac-gi-usequery-khi-nao-dung
position: backend
technology: react-query
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useSuspenseQuery khác gì useQuery? Khi nào dùng?

## Question (EN)
What is useSuspenseQuery and when should you use it?

## Đáp án chi tiết (VI)
`useSuspenseQuery` tích hợp React Suspense — thay vì return `isLoading`/`isError`, nó throw Promise (cho Suspense boundary bắt) hoặc throw Error (cho Error Boundary bắt). Kết quả: `data` luôn defined (TypeScript happy), không cần if/else cho loading/error states. Code gọn hơn: component chỉ chứa happy path. Suspense boundary ở parent xử lý loading, ErrorBoundary xử lý error. Khi nào dùng: project đã adopt Suspense pattern, muốn tách loading UI khỏi component logic. Khi nào KHÔNG dùng: cần kiểm soát loading state chi tiết, cần show partial data trong khi fetch. Lưu ý: nhiều useSuspenseQuery trong 1 component sẽ waterfall — dùng `useSuspenseQueries` để parallel.

## Detailed Answer (EN)
useSuspenseQuery is a variant of useQuery that integrates with React Suspense. Instead of returning isLoading, it throws a Promise when data is not yet available, letting React Suspense boundaries catch it and show a fallback. Benefits: cleaner component code — no need to handle loading/error states inline; works with React's concurrent features; consistent with server-side data loading patterns. Usage: wrap components using useSuspenseQuery with \u003cSuspense fallback={\u003cSkeleton /\u003e}\u003e; for error states, use an ErrorBoundary. In Next.js App Router: works naturally with Server Components and streaming. Limitations: requires all data to be in the same Suspense boundary to avoid waterfall loading (use Promise.all or parallel queries); does not work with queries that have enabled: false. Best for: components where data is essential and must be available before rendering.
