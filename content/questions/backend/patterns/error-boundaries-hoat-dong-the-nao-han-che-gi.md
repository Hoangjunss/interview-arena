---
id: error-boundaries-hoat-dong-the-nao-han-che-gi
position: backend
technology: patterns
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Error Boundaries hoạt động thế nào? Hạn chế gì?

## Question (EN)
How do Error Boundaries work? What are their limitations?

## Đáp án chi tiết (VI)
Class component dùng `componentDidCatch` và `getDerivedStateFromError` bắt lỗi render. Hiển thị fallback UI thay vì crash toàn app. Hạn chế: không bắt lỗi trong event handlers, async code, SSR, và chính Error Boundary. Dùng react-error-boundary library cho function components.

## Detailed Answer (EN)
A class component using `componentDidCatch` and `getDerivedStateFromError` catches render errors in its subtree and displays a fallback UI instead of crashing the whole app. Limitations: they do not catch errors in event handlers, async code, SSR, or inside the boundary itself. Use the react-error-boundary library for a modern, function-component-friendly approach.
