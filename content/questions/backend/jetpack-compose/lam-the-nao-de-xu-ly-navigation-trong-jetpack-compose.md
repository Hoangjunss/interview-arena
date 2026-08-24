---
id: lam-the-nao-de-xu-ly-navigation-trong-jetpack-compose
position: backend
technology: jetpack-compose
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để xử lý navigation trong Jetpack Compose?

## Question (EN)
How do you handle navigation in Jetpack Compose?

## Đáp án chi tiết (VI)
Dùng Compose Navigation library với `NavController` và `NavHost`. Định nghĩa `NavGraph` với các màn hình và route, rồi dùng `navController.navigate(route)` để điều hướng. State được giữ lại khi quay về màn hình trước. Với Compose Navigation 2.8+ (stable từ Oct 2024), dùng type-safe routes qua `@Serializable` thay vì string-based routes. `BackHandler` cho phép tùy chỉnh hành vi nút back.

## Detailed Answer (EN)
Use the Compose Navigation library with `NavController` and `NavHost`. Define a `NavGraph` with screens and navigation routes, and use `navController.navigate(route)` to navigate. State is preserved when returning to previous destinations. Compose Navigation 2.8+ (stable Oct 2024) introduced type-safe routes via `@Serializable` — use these instead of string-based routes. `BackHandler` allows custom back button behavior.
