---
id: su-khac-biet-giua-dynamic-va-static-rendering-trong-app-router
position: backend
technology: rendering
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa dynamic và static rendering trong App Router?

## Question (EN)
What is the difference between dynamic and static rendering in the App Router?

## Đáp án chi tiết (VI)
- Static rendering: render lúc build time, cache và serve từ CDN.\
- Dynamic rendering: render mỗi request, không cache.\
\
Tự động dynamic khi dùng: `await cookies()`, `await headers()`, `searchParams`, hay fetch với `cache: 'no-store'`. Explicit: `export const dynamic = 'force-dynamic'` hoặc `'force-static'`. Opt-in static càng nhiều càng tốt cho performance.

## Detailed Answer (EN)
- Static rendering: happens at build time, cached and served from a CDN.\
- Dynamic rendering: happens per request, not cached.\
\
A route becomes dynamic automatically when it uses: `await cookies()`, `await headers()`, `searchParams`, or fetch with `cache: 'no-store'`. Be explicit with `export const dynamic = 'force-dynamic'` or `'force-static'`. Prefer static rendering whenever possible for best performance.
