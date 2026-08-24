---
id: context-re-render-optimization-la-gi
position: backend
technology: context-\u0026-router
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Context re-render optimization là gì?

## Question (EN)
What is context re-render optimization?

## Đáp án chi tiết (VI)
Khi context value object được tạo mới mỗi render, tất cả consumers re-render dù giá trị thực không đổi. Fix: memoize value với useMemo `useMemo(() =\u003e ({ user, logout }), [user])`, tách state context và dispatch context riêng, dùng libraries như jotai/zustand tránh context re-render issues. Structural sharing giúp nhưng không đủ.

## Detailed Answer (EN)
When a context value object is recreated on every render, all consumers re-render even if the actual values have not changed. Fixes: memoize the value with useMemo `useMemo(() =\u003e ({ user, logout }), [user])`, split state and dispatch into separate contexts, or use libraries like Jotai or Zustand that avoid context re-render issues altogether. Structural sharing helps but is not sufficient on its own.
