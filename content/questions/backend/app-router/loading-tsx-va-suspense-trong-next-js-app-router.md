---
id: loading-tsx-va-suspense-trong-next-js-app-router
position: backend
technology: app-router
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
loading.tsx và Suspense trong Next.js App Router?

## Question (EN)
How do loading.tsx and Suspense work in the Next.js App Router?

## Đáp án chi tiết (VI)
`loading.tsx` tự động tạo Suspense boundary bọc page hoặc layout, hiển thị loading UI ngay lập tức khi navigate. Streaming: Next.js stream HTML từng phần, user thấy nội dung nhanh hơn thay vì đợi toàn trang. Instant loading states không cần manually thêm Suspense và fallback UI.

## Detailed Answer (EN)
`loading.tsx` automatically creates a Suspense boundary around a page or layout, showing a loading UI instantly on navigation. Next.js streams HTML in chunks so users see content progressively rather than waiting for the full page. This gives instant loading states without manually adding Suspense and fallback UI.
