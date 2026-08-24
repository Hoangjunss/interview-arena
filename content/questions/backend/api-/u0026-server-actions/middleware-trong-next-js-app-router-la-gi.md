---
id: middleware-trong-next-js-app-router-la-gi
position: backend
technology: api-\u0026-server-actions
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Middleware trong Next.js App Router là gì?

## Question (EN)
What is Middleware in the Next.js App Router?

## Đáp án chi tiết (VI)
Middleware là `middleware.ts` ở root, chạy trên Edge runtime trước mọi request. Dùng để: authentication/authorization, redirect, rewrite URL, add/modify headers, A/B testing. Return NextResponse để điều khiển response. Dùng `matcher` config để chỉ định routes áp dụng. Nhẹ và nhanh vì Edge runtime.

## Detailed Answer (EN)
Middleware is a `middleware.ts` file at the project root that runs on the Edge runtime before every request. Use it for: authentication/authorization checks, redirects, URL rewrites, adding/modifying response headers, and A/B testing. Return a NextResponse to control the response. Use the `matcher` config to target specific routes. It is fast and lightweight because it runs on the Edge.
