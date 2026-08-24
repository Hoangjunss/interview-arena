---
id: giai-thich-state-management-trong-jetpack-compose-voi-mutablestateof-va-remember
position: backend
technology: jetpack-compose
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích state management trong Jetpack Compose với `mutableStateOf` và `remember`.

## Question (EN)
Explain state management in Jetpack Compose using `mutableStateOf` and `remember`.

## Đáp án chi tiết (VI)
`mutableStateOf()` tạo một state object có thể quan sát, kích hoạt recomposition khi thay đổi. `remember` lưu cache giá trị state qua các lần recomposition để không bị tạo lại mỗi lần. Kết hợp lại: `val count = remember { mutableStateOf(0) }` hoặc ngắn gọn hơn là `var count by remember { mutableStateOf(0) }`. Khi `count` thay đổi, chỉ các composable đang đọc nó mới recompose, không phải cả màn hình.

## Detailed Answer (EN)
`mutableStateOf()` creates an observable state object that triggers recomposition when changed. `remember` caches the state value across recompositions so it doesn't get recreated each time. Together: `val count = remember { mutableStateOf(0) }` or the shorter `var count by remember { mutableStateOf(0) }`. When `count` changes, only composables reading it recompose, not the entire screen.
