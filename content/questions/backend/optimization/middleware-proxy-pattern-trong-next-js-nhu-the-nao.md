---
id: middleware-proxy-pattern-trong-next-js-nhu-the-nao
position: backend
technology: optimization
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Middleware proxy pattern trong Next.js như thế nào?

## Question (EN)
How does the Middleware proxy pattern work in Next.js?

## Đáp án chi tiết (VI)
Middleware có thể rewrite requests đến API khác: `NextResponse.rewrite(new URL('/api/proxy', request.url))`. Hoặc trong next.config.js dùng `rewrites` array để proxy: `{ source: '/api/:path*', destination: 'https://backend.com/:path*' }`. Hữu ích để: hide API endpoints, implement BFF (Backend For Frontend), avoid CORS issues.

## Detailed Answer (EN)
Middleware can rewrite requests to a different API: `NextResponse.rewrite(new URL('/api/proxy', request.url))`. Alternatively, use the `rewrites` array in next.config.js: `{ source: '/api/:path*', destination: 'https://backend.com/:path*' }`. Useful for: hiding internal API endpoints, implementing a Backend For Frontend (BFF), and avoiding CORS issues.
