---
id: environment-variables-trong-next-js-duoc-xu-ly-nhu-the-nao
position: backend
technology: optimization
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Environment variables trong Next.js được xử lý như thế nào?

## Question (EN)
How are environment variables handled in Next.js?

## Đáp án chi tiết (VI)
`.env.local` cho local development (git-ignored). `.env.production`, `.env.development` cho môi trường cụ thể. `NEXT_PUBLIC_` prefix expose biến xuống client bundle - KHÔNG đặt secrets với prefix này. Không có prefix: chỉ server-side. Trong App Router: server components đọc trực tiếp `process.env.VAR`. Client: chỉ NEXT_PUBLIC_ vars.

## Detailed Answer (EN)
`.env.local` is for local development and is git-ignored. `.env.production` and `.env.development` are for specific environments. The `NEXT_PUBLIC_` prefix exposes a variable to the client bundle — never put secrets there. Variables without the prefix are server-side only. In the App Router, Server Components read `process.env.VAR` directly. On the client, only `NEXT_PUBLIC_` variables are available.
