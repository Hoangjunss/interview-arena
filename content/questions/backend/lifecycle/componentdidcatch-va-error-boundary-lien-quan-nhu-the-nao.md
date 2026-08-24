---
id: componentdidcatch-va-error-boundary-lien-quan-nhu-the-nao
position: backend
technology: lifecycle
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
componentDidCatch và Error Boundary liên quan như thế nào?

## Question (EN)
How are componentDidCatch and Error Boundaries related?

## Đáp án chi tiết (VI)
componentDidCatch(error, info) là lifecycle method cho phép Class Component bắt lỗi từ component con trong render phase. Kết hợp với getDerivedStateFromError để tạo Error Boundary - component bắt lỗi và hiển thị fallback UI. Function components không thể là Error Boundary, phải dùng class hoặc thư viện như react-error-boundary.

## Detailed Answer (EN)
componentDidCatch(error, info) is the lifecycle method that lets a Class Component catch errors thrown in its child component tree during the render phase. Combined with getDerivedStateFromError, it forms an Error Boundary — a component that catches errors and renders a fallback UI instead of crashing. Function components cannot be Error Boundaries; you must use a class component or a library like react-error-boundary.
