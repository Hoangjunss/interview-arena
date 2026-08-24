---
id: partial-prerendering-ppr-trong-next-js-la-gi
position: backend
technology: rendering
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Partial Prerendering (PPR) trong Next.js là gì?

## Question (EN)
What is Partial Prerendering (PPR) in Next.js?

## Đáp án chi tiết (VI)
Partial Prerendering (experimental, Next.js 14) cho phép combine static shell và dynamic holes trong cùng một page. Static parts được prerender và cached, dynamic parts (trong Suspense) được stream khi request. User nhận static shell ngay lập tức, dynamic content load sau. Tốt nhất của SSG và SSR trong một trang.

## Detailed Answer (EN)
Partial Prerendering (experimental, introduced in Next.js 14) combines a static shell with dynamic holes on a single page. Static parts are prerendered and cached; dynamic parts (inside Suspense boundaries) are streamed on each request. Users receive the static shell instantly and dynamic content loads in afterward — the best of SSG and SSR on a single page.
