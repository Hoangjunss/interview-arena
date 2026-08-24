---
id: deadlock-trong-postgresql-xay-ra-khi-nao-va-xu-ly-ra-sao
position: backend
technology: transactions-\u0026-concurrency
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Deadlock trong PostgreSQL xảy ra khi nào và xử lý ra sao?

## Question (EN)
When do deadlocks happen in PostgreSQL and how do you handle them?

## Đáp án chi tiết (VI)
Deadlock xảy ra khi hai transaction kẹt chờ nhau: A giữ khóa mà B cần, B giữ khóa mà A cần — không ai nhường, thành vòng tròn chờ. PostgreSQL tự phát hiện và hủy một transaction để phá vòng; phía app phải bắt lỗi đó và thử lại (nếu thao tác an toàn để chạy lại).\
\
Giảm deadlock bằng cách: luôn truy cập các tài nguyên theo cùng một thứ tự, giữ transaction ngắn, đánh index cho điều kiện update/delete để không khóa thừa nhiều dòng, và tuyệt đối không gọi API bên ngoài khi đang mở transaction.

## Detailed Answer (EN)
A deadlock happens when two transactions get stuck waiting on each other: A holds a lock B needs, B holds a lock A needs — neither yields, forming a wait cycle. PostgreSQL detects this and aborts one transaction to break it; your app must catch that error and retry (if the operation is safe to rerun).\
\
Reduce deadlocks by: always accessing resources in the same order, keeping transactions short, indexing update/delete conditions so you do not lock extra rows, and never calling external APIs while a transaction is open.
