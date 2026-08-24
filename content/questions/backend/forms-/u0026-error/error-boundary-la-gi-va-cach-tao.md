---
id: error-boundary-la-gi-va-cach-tao
position: backend
technology: forms-\u0026-error
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Error Boundary là gì và cách tạo?

## Question (EN)
What is an Error Boundary and how do you create one?

## Đáp án chi tiết (VI)
Error Boundary là React component bắt JavaScript errors trong component tree con và hiển thị fallback UI thay vì crash toàn app. Chỉ có thể tạo với Class Component implement `getDerivedStateFromError` (set error state) và `componentDidCatch` (log error). Thư viện react-error-boundary cung cấp `ErrorBoundary` component tiện dụng hơn.

## Detailed Answer (EN)
An Error Boundary is a React component that catches JavaScript errors anywhere in its child component tree and displays a fallback UI instead of crashing the whole app. It can only be created with a Class Component that implements `getDerivedStateFromError` (to set the error state) and `componentDidCatch` (to log the error). The react-error-boundary library provides a convenient `ErrorBoundary` component for function-component-based projects.
