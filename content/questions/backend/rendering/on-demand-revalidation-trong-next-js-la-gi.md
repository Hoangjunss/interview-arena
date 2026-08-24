---
id: on-demand-revalidation-trong-next-js-la-gi
position: backend
technology: rendering
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
On-demand revalidation trong Next.js là gì?

## Question (EN)
What is on-demand revalidation in Next.js?

## Đáp án chi tiết (VI)
On-demand revalidation cho phép invalidate cache và regenerate pages ngay lập tức thay vì đợi timeout.\
\
- Pages Router: `res.revalidate('/path')` trong API route.\
- App Router: `revalidatePath('/path')` hoặc `revalidateTag('posts')` trong Server Action hoặc Route Handler.\
\
Phù hợp khi CMS webhook trigger cần update content ngay.

## Detailed Answer (EN)
On-demand revalidation lets you invalidate the cache and regenerate pages immediately rather than waiting for a timer.\
\
- Pages Router: call `res.revalidate('/path')` inside an API route.\
- App Router: call `revalidatePath('/path')` or `revalidateTag('posts')` inside a Server Action or Route Handler.\
\
Ideal when a CMS webhook fires and content needs to update right away.
