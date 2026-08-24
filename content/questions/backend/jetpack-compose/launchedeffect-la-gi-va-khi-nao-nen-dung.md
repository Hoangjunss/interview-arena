---
id: launchedeffect-la-gi-va-khi-nao-nen-dung
position: backend
technology: jetpack-compose
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`LaunchedEffect` là gì và khi nào nên dùng?

## Question (EN)
What is `LaunchedEffect` and when should you use it?

## Đáp án chi tiết (VI)
`LaunchedEffect` là side-effect function khởi chạy một coroutine scope gắn với lifecycle của composable. Dùng cho các tác vụ một lần như load data, animation, hay analytics. Nó chạy khi key parameter thay đổi và hủy khi composable rời khỏi composition. \
\
**Ví dụ:** `LaunchedEffect(userId) { loadUserData(userId) }` load lại data mỗi khi userId thay đổi.

## Detailed Answer (EN)
`LaunchedEffect` is a side-effect function that launches a coroutine scope tied to the composable's lifecycle. Use it for one-time operations like loading data, animations, or analytics events. It runs when the key parameter changes and cancels when the composable leaves composition. \
\
**Example:** `LaunchedEffect(userId) { loadUserData(userId) }` reloads data whenever userId changes.
