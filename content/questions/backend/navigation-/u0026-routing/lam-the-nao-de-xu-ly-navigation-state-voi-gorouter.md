---
id: lam-the-nao-de-xu-ly-navigation-state-voi-gorouter
position: backend
technology: navigation-\u0026-routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để xử lý navigation state với GoRouter?

## Question (EN)
How do you handle navigation state with GoRouter?

## Đáp án chi tiết (VI)
GoRouter cung cấp `GoRouterState` với location, parameter, extra data: `String id = state.pathParameters['id']!`. Với nested navigation (bottom tab có stack độc lập), dùng `ShellRoute`. Với navigation dựa trên auth, dùng `redirect()` để kiểm tra state auth trước khi build page: `if (!isLoggedIn) return '/login'`. Điều này tập trung hóa logic navigation.

## Detailed Answer (EN)
GoRouter provides `GoRouterState` with route location, parameters, and extra data. For nested navigation use `ShellRoute`. For auth-based navigation, use the `redirect()` callback to check auth state before building pages, keeping all navigation logic centralized.
