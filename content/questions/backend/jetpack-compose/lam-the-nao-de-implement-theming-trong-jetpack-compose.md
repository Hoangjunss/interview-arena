---
id: lam-the-nao-de-implement-theming-trong-jetpack-compose
position: backend
technology: jetpack-compose
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để implement theming trong Jetpack Compose?

## Question (EN)
How do you implement theming in Jetpack Compose?

## Đáp án chi tiết (VI)
Dùng `MaterialTheme` (Material 3) hoặc `CompositionLocal` tùy chỉnh để tập trung hóa các thuộc tính theme. Định nghĩa màu sắc, typography, và shape trong theme object, dùng `CompositionLocalProvider` để cung cấp chúng cho cây composable. Wrap app trong `MaterialTheme(colorScheme = colorScheme, typography = typography) { App() }` — lưu ý tham số là `colorScheme` (Material 3), không phải `colors` (Material 2). Hỗ trợ dark/light mode qua `isSystemInDarkTheme()`.

## Detailed Answer (EN)
Use `MaterialTheme` (Material 3) or custom `CompositionLocal` values to centralize theme properties. Define colors, typography, and shapes in a theme object, and use `CompositionLocalProvider` to provide them to the composable tree. Wrap your app in `MaterialTheme(colorScheme = colorScheme, typography = typography) { App() }` — note the parameter is `colorScheme` (Material 3), not `colors` (Material 2). Supports light/dark mode through `isSystemInDarkTheme()`.
