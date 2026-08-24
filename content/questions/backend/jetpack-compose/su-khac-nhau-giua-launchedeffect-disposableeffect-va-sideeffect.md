---
id: su-khac-nhau-giua-launchedeffect-disposableeffect-va-sideeffect
position: backend
technology: jetpack-compose
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác nhau giữa `LaunchedEffect`, `DisposableEffect`, và `SideEffect`?

## Question (EN)
Explain the difference between `LaunchedEffect`, `DisposableEffect`, and `SideEffect`.

## Đáp án chi tiết (VI)
`LaunchedEffect` khởi chạy coroutine cho tác vụ bất đồng bộ. `DisposableEffect` dùng để thiết lập và dọn dẹp resource với một cleanup block (như event listener). `SideEffect` chạy sau mỗi lần recomposition, không có tham số, hiếm khi dùng (chủ yếu cho logging). Dùng `LaunchedEffect` cho load data, `DisposableEffect` cho resource, và tránh `SideEffect` trong hầu hết trường hợp.

## Detailed Answer (EN)
`LaunchedEffect` launches a coroutine scope for async operations. `DisposableEffect` is for setting up and cleaning up resources with a cleanup block (like event listeners). `SideEffect` runs after every recomposition with no parameters and is rarely used (mostly for logging). Use `LaunchedEffect` for data loading, `DisposableEffect` for resources, and avoid `SideEffect` in most cases.
