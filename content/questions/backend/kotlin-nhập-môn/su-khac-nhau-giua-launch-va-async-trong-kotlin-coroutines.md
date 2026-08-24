---
id: su-khac-nhau-giua-launch-va-async-trong-kotlin-coroutines
position: backend
technology: kotlin-nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác nhau giữa `launch` và `async` trong Kotlin coroutines?

## Question (EN)
Explain the difference between `launch` and `async` in Kotlin coroutines.

## Đáp án chi tiết (VI)
`launch` là coroutine fire-and-forget, trả về `Job` và không trả về kết quả. `async` dùng khi cần thực hiện tác vụ và lấy kết quả về, trả về `Deferred`. Dùng `launch` cho tác vụ độc lập (như cập nhật UI), còn `async` khi cần kết quả trả về (như fetch data từ network). Phải gọi `await()` trên Deferred để lấy kết quả.

## Detailed Answer (EN)
`launch` is a fire-and-forget coroutine that returns a `Job` and no result. `async` is used when you need to perform a task and get its result back, returning a `Deferred` object. Use `launch` for independent tasks (like updating UI), and `async` when you need the result (like fetching network data). You must call `await()` on Deferred to retrieve the result.
