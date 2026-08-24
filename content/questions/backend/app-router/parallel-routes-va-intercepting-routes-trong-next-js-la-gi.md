---
id: parallel-routes-va-intercepting-routes-trong-next-js-la-gi
position: backend
technology: app-router
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Parallel Routes và Intercepting Routes trong Next.js là gì?

## Question (EN)
What are Parallel Routes and Intercepting Routes in Next.js?

## Đáp án chi tiết (VI)
Parallel Routes dùng `@slot` convention để render nhiều pages cùng lúc trong cùng layout (ví dụ modal + page). Intercepting Routes (`(.)path`, `(..)path`) cho phép intercept route và hiển thị trong context hiện tại (như Instagram photo modal). Phù hợp cho modal workflows phức tạp không mất URL sharability.

## Detailed Answer (EN)
Parallel Routes use the `@slot` folder convention to render multiple pages simultaneously within the same layout (e.g., a modal alongside a page). Intercepting Routes (`(.)path`, `(..)path`) let you intercept a navigation and display the target route in the current context — like Instagram's photo modal. Both patterns are ideal for complex modal workflows that need shareable URLs.
