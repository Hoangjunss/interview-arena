---
id: recomposition-trong-jetpack-compose-la-gi
position: backend
technology: jetpack-compose
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Recomposition trong Jetpack Compose là gì?

## Question (EN)
What is recomposition in Jetpack Compose?

## Đáp án chi tiết (VI)
Compose là UI **khai báo**: bạn viết các hàm `@Composable` nhận dữ liệu (state) và **phát ra UI** tương ứng. Khi state đọc bên trong đổi, Compose **chạy lại các composable liên quan** để cập nhật UI — đó là **recomposition**.\
\
Điểm quan trọng:\
- Compose **chỉ recompose phần đọc state đã đổi**, bỏ qua phần khác (smart recomposition).\
- Composable phải **idempotent và không side-effect** vì có thể chạy lại nhiều lần, theo thứ tự bất kỳ, thậm chí song song hoặc bị bỏ qua.\
- Việc nặng/side-effect phải đặt trong `LaunchedEffect`, `remember`, coroutine — không đặt thẳng trong thân composable.\
\
Hay hỏi: nguyên nhân recompose thừa và cách dùng `key`, `remember`, kiểu ổn định (stable) để tránh.

## Detailed Answer (EN)
Compose is a **declarative** UI: you write `@Composable` functions that take data (state) and **emit UI** from it. When state read inside changes, Compose **re-runs the affected composables** to update the UI — that is **recomposition**.\
\
Key points:\
- Compose **only recomposes the parts that read the changed state**, skipping the rest (smart recomposition).\
- Composables must be **idempotent and side-effect free** since they may run many times, in any order, even in parallel, or be skipped.\
- Heavy work/side effects belong in `LaunchedEffect`, `remember`, coroutines — not directly in the composable body.\
\
Common ask: causes of excessive recomposition and using `key`, `remember`, and stable types to avoid it.
