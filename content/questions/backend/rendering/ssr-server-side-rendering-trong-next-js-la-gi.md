---
id: ssr-server-side-rendering-trong-next-js-la-gi
position: backend
technology: rendering
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SSR (Server-Side Rendering) trong Next.js là gì?

## Question (EN)
What is SSR (Server-Side Rendering) in Next.js?

## Đáp án chi tiết (VI)
SSR render HTML trên server cho mỗi request, trả về fully-rendered HTML cho browser. Tốt cho: SEO, trang có data thay đổi thường xuyên theo user, first paint nhanh. Trong App Router: mặc định Server Components là SSR. Pages Router: dùng `getServerSideProps`. \
\
**Nhược điểm:** server phải xử lý nhiều, TTFB cao hơn SSG.

## Detailed Answer (EN)
SSR renders HTML on the server for every request and delivers fully-rendered HTML to the browser. It is great for: SEO, pages with frequently changing per-user data, and fast first paint. In the App Router, Server Components are SSR by default. In the Pages Router, use `getServerSideProps`. Downsides: higher server load and higher TTFB compared to SSG.
