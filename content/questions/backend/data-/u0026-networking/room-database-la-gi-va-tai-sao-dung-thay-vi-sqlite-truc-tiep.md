---
id: room-database-la-gi-va-tai-sao-dung-thay-vi-sqlite-truc-tiep
position: backend
technology: data-\u0026-networking
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Room database là gì và tại sao dùng thay vì SQLite trực tiếp?

## Question (EN)
What is Room database and why use it instead of SQLite directly?

## Đáp án chi tiết (VI)
Room là lớp trừu tượng type-safe trên SQLite, tự động sinh code lúc compile, ngăn SQL injection và lỗi runtime. Bạn định nghĩa entity (data class), DAO (database access object với query), và Database class. Room hỗ trợ LiveData/Flow để quan sát thay đổi database. An toàn và dễ dùng hơn SQLite thô rất nhiều, và tích hợp tốt với coroutine và Compose.

## Detailed Answer (EN)
Room is a type-safe abstraction over SQLite that auto-generates code at compile time, preventing SQL injection and runtime errors. You define entities (data classes), DAOs (database access objects with queries), and a Database class. Room provides LiveData/Flow support for observing database changes and is much safer and easier than raw SQLite queries.
