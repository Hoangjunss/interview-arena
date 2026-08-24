---
id: edge-runtime-vs-node-js-runtime-trong-next-js-la-gi
position: backend
technology: api-\u0026-server-actions
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Edge Runtime vs Node.js Runtime trong Next.js là gì?

## Question (EN)
What is the difference between Edge Runtime and Node.js Runtime in Next.js?

## Đáp án chi tiết (VI)
Node.js Runtime: đầy đủ Node.js APIs, có thể dùng npm packages, phù hợp cho heavy computation. Edge Runtime: V8 engine không có Node.js APIs, giới hạn package support, nhưng cực kỳ nhanh (chạy gần user), cold start gần 0. Middleware mặc định Edge. Route Handlers có thể chọn: `export const runtime = 'edge'` hoặc `'nodejs'`.

## Detailed Answer (EN)
Node.js Runtime: full Node.js API access, any npm package can be used, suited for heavy computation. Edge Runtime: V8 engine without Node.js APIs, limited package support, but extremely fast (runs close to the user) with near-zero cold starts. Middleware uses Edge by default. Route Handlers can opt in: `export const runtime = 'edge'` or `'nodejs'`.
