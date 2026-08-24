---
id: lam-the-nao-de-xu-ly-concurrency-conflicts-trong-ef-core
position: backend
technology: entity-framework
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để xử lý concurrency conflicts trong EF Core?

## Question (EN)
How do you handle concurrency conflicts in EF Core?

## Đáp án chi tiết (VI)
Dùng optimistic concurrency với `[Timestamp]` row version token trên entity. Khi xung đột xảy ra, EF ném `DbUpdateConcurrencyException`. Xử lý bằng cách đọc lại giá trị mới nhất và retry, hoặc trả về HTTP 409 Conflict cho client yêu cầu refresh. Pessimistic locking dùng SQL-level locks hiếm khi cần thiết trong ứng dụng hiện đại.

## Detailed Answer (EN)
Use optimistic concurrency with `[Timestamp]` row version tokens on entities. When conflicts occur, EF throws `DbUpdateConcurrencyException`. Handle by re-reading updated values and retrying, or return HTTP 409 Conflict to clients requesting a refresh. Pessimistic locking via SQL-level locks is rarely needed in modern applications.
