---
id: layouts-trong-next-js-app-router-la-gi
position: backend
technology: app-router
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Layouts trong Next.js App Router là gì?

## Question (EN)
What are layouts in the Next.js App Router?

## Đáp án chi tiết (VI)
Layout là UI chia sẻ giữa nhiều pages, preserve state khi navigate (không remount). `layout.tsx` nhận `children` prop. Nested layouts: layout lồng trong layout tạo hierarchy. Root layout (`app/layout.tsx`) bắt buộc phải có, wrap toàn app. Khác với template.tsx: template remount mỗi navigate.

## Detailed Answer (EN)
A layout is shared UI that wraps multiple pages and preserves its state across navigations (it does not remount). `layout.tsx` receives a `children` prop. Layouts can be nested to create a hierarchy. The root layout (`app/layout.tsx`) is required and wraps the entire app. Unlike layout.tsx, template.tsx remounts on every navigation.
