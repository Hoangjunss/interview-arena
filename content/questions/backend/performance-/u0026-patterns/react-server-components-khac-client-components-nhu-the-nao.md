---
id: react-server-components-khac-client-components-nhu-the-nao
position: backend
technology: performance-\u0026-patterns
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
React Server Components khác Client Components như thế nào?

## Question (EN)
How do React Server Components differ from Client Components?

## Đáp án chi tiết (VI)
Server Components render trên server, không có state/effects/event handlers, có thể trực tiếp access database và file system, không thêm bundle size JavaScript. Client Components (với 'use client') chạy trên browser, có interactivity. Server Components được giới thiệu trong React 18 và là nền tảng của Next.js App Router.

## Detailed Answer (EN)
Server Components render entirely on the server, have no state/effects/event handlers, can directly access databases and the file system, and add zero JavaScript to the client bundle. Client Components (marked with 'use client') run in the browser and support full interactivity. Server Components were introduced in React 18 and are the foundation of the Next.js App Router.
