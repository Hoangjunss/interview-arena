---
id: isr-incremental-static-regeneration-la-gi
position: backend
technology: rendering
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ISR (Incremental Static Regeneration) là gì?

## Question (EN)
What is ISR (Incremental Static Regeneration)?

## Đáp án chi tiết (VI)
ISR kết hợp SSG và SSR: trang được generate tĩnh, nhưng sau `revalidate` seconds có thể regenerate lại. User đầu tiên sau revalidate nhận stale content, trigger background regeneration; user sau nhận fresh content.\
\
- Pages Router: `return { revalidate: 60 }` trong getStaticProps.\
- App Router: `export const revalidate = 60` hoặc `fetch(url, { next: { revalidate: 60 } })`.

## Detailed Answer (EN)
ISR blends SSG and SSR: pages are statically generated but can be regenerated in the background after a `revalidate` interval. The first user after the interval receives stale content and triggers a background regeneration; subsequent users get the fresh version.\
\
- Pages Router: `return { revalidate: 60 }` in getStaticProps.\
- App Router: `export const revalidate = 60` or `fetch(url, { next: { revalidate: 60 } })`.
