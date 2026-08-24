---
id: dynamic-og-images-trong-next-js-la-gi-cach-tao
position: backend
technology: next.js-seo
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dynamic OG images trong Next.js là gì? Cách tạo?

## Question (EN)
What are dynamic OG images in Next.js? How do you create them?

## Đáp án chi tiết (VI)
Dynamic OG images là ảnh preview được generate tự động cho mỗi trang — thay vì 1 ảnh chung cho cả website. Dùng `@vercel/og` (Satori) hoặc Next.js convention file `app/blog/[slug]/opengraph-image.tsx`. Cơ chế: viết JSX/HTML → Satori convert sang SVG → convert sang PNG. Có thể fetch data (title, author, date) rồi render lên ảnh. \
\
**Ví dụ:** blog post share trên Facebook hiển thị ảnh có title bài viết, author avatar, ngày đăng — professional hơn nhiều so với generic image. Performance: generate tại build time (SSG) hoặc on-demand (ISR), cache kết quả.

## Detailed Answer (EN)
Dynamic OG images are auto-generated preview images unique to each page — rather than one generic image for the entire site. Use `@vercel/og` (powered by Satori) or the Next.js file convention `app/blog/[slug]/opengraph-image.tsx`. \
\
**How it works:** write JSX/HTML → Satori converts it to SVG → converts to PNG. You can fetch data (title, author, date) and render it on the image. \
\
**Example:** sharing a blog post on Facebook shows an image with the post title, author avatar, and publish date — far more professional than a generic placeholder. Performance: generated at build time (SSG) or on-demand (ISR), with results cached.
