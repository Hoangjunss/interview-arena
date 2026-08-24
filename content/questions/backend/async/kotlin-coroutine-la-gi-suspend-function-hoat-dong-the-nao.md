---
id: kotlin-coroutine-la-gi-suspend-function-hoat-dong-the-nao
position: backend
technology: async
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kotlin coroutine là gì? suspend function hoạt động thế nào?

## Question (EN)
What are Kotlin coroutines and how do suspend functions work?

## Đáp án chi tiết (VI)
Coroutine là cách viết code **bất đồng bộ theo kiểu tuần tự**, nhẹ hơn thread nhiều (hàng nghìn coroutine trên vài thread).\
\
- **`suspend` function**: có thể **tạm dừng** rồi tiếp tục mà **không chặn thread** — khi gặp điểm suspend, thread được trả lại để làm việc khác.\
- **CoroutineScope**: giới hạn vòng đời (ví dụ `viewModelScope`, `lifecycleScope`) → tự hủy job khi màn hình biến mất, tránh rò rỉ (structured concurrency).\
- **Dispatcher**: chọn thread pool — `Dispatchers.Main` (UI), `Dispatchers.IO` (mạng/đĩa), `Dispatchers.Default` (CPU).\
- Chạy song song bằng `async/await`, gộp bằng `coroutineScope`.\
\
Hay hỏi: khác biệt coroutine vs thread, và vì sao `withContext(Dispatchers.IO)` cho việc I/O để không nghẽn UI.

## Detailed Answer (EN)
Coroutines let you write **asynchronous code in a sequential style**, far lighter than threads (thousands of coroutines over a few threads).\
\
- **`suspend` function**: can **pause and resume without blocking the thread** — at a suspension point the thread is released to do other work.\
- **CoroutineScope**: bounds lifetime (e.g. `viewModelScope`, `lifecycleScope`) → cancels jobs when the screen disappears, avoiding leaks (structured concurrency).\
- **Dispatcher**: picks a thread pool — `Dispatchers.Main` (UI), `Dispatchers.IO` (network/disk), `Dispatchers.Default` (CPU).\
- Run in parallel with `async/await`, group with `coroutineScope`.\
\
Common ask: coroutines vs threads, and why `withContext(Dispatchers.IO)` for I/O so the UI is not blocked.
