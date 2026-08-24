---
id: streaming-ssr-trong-next-js-hoat-dong-nhu-the-nao
position: backend
technology: rendering
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Streaming SSR trong Next.js hoạt động như thế nào?

## Question (EN)
How does Streaming SSR work in Next.js?

## Đáp án chi tiết (VI)
Streaming SSR gửi HTML từng phần xuống browser ngay khi ready thay vì đợi toàn trang. Dùng HTTP chunked transfer encoding. Kết hợp với Suspense: phần ngoài Suspense stream trước, phần trong stream khi data ready. Giảm Time to First Byte và First Contentful Paint. Enabled mặc định trong App Router.

## Detailed Answer (EN)
Streaming SSR sends HTML chunks to the browser as soon as they are ready, rather than waiting for the full page. It uses HTTP chunked transfer encoding. Combined with Suspense: content outside Suspense boundaries streams first; content inside streams when its data is ready. This reduces Time to First Byte and First Contentful Paint. It is enabled by default in the App Router.
