---
id: metadata-trong-next-js-app-router-duoc-dinh-nghia-nhu-the-nao
position: backend
technology: app-router
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Metadata trong Next.js App Router được định nghĩa như thế nào?

## Question (EN)
How is metadata defined in the Next.js App Router?

## Đáp án chi tiết (VI)
Export `metadata` object hoặc `generateMetadata` function từ page.tsx hoặc layout.tsx. Tự động merge metadata từ parent layouts. `export const metadata = { title: 'Page Title', description: '...' }`. `generateMetadata` là async function nhận params để tạo dynamic metadata cho dynamic routes. Thay thế cho next/head.

## Detailed Answer (EN)
Export a `metadata` object or a `generateMetadata` function from page.tsx or layout.tsx. Metadata is automatically merged from parent layouts. `export const metadata = { title: 'Page Title', description: '...' }`. `generateMetadata` is an async function that receives params, enabling dynamic metadata for dynamic routes. This replaces the old next/head approach.
