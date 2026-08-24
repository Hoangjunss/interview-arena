---
id: ssg-static-site-generation-trong-next-js-la-gi
position: backend
technology: rendering
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SSG (Static Site Generation) trong Next.js là gì?

## Question (EN)
What is SSG (Static Site Generation) in Next.js?

## Đáp án chi tiết (VI)
SSG tạo HTML tại build time, serve static files từ CDN. Cực kỳ nhanh, không cần server processing mỗi request. Phù hợp cho: blog, documentation, marketing pages, data ít thay đổi. Pages Router: không có getServerSideProps. App Router: dùng `export const dynamic = 'force-static'`. \
\
**Nhược điểm:** phải rebuild để cập nhật content.

## Detailed Answer (EN)
SSG generates HTML at build time and serves static files from a CDN. It is extremely fast with no per-request server processing. Best for: blogs, documentation, marketing pages, and data that changes infrequently. In the App Router use `export const dynamic = 'force-static'`. Downside: you must rebuild to update content.
