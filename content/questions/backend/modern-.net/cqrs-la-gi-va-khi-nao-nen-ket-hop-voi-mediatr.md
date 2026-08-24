---
id: cqrs-la-gi-va-khi-nao-nen-ket-hop-voi-mediatr
position: backend
technology: modern-.net
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CQRS là gì và khi nào nên kết hợp với MediatR?

## Question (EN)
What is CQRS and when should you implement it with MediatR?

## Đáp án chi tiết (VI)
CQRS (Command Query Responsibility Segregation) tách biệt thao tác ghi (command) và đọc (query) thành các handler riêng. MediatR implement pattern Mediator — in-process messaging bus. Command thay đổi state; query chỉ trả về dữ liệu. \
\
**Lợi ích:** scale độc lập, DTO khác nhau cho read/write, pipeline middleware cho cross-cutting concerns. Sai lầm phổ biến: dùng CQRS cho CRUD đơn giản — chỉ nên áp dụng khi độ phức tạp thực sự yêu cầu model read/write khác nhau.

## Detailed Answer (EN)
CQRS (Command Query Responsibility Segregation) separates write operations (commands) from read operations (queries) into distinct handlers. MediatR implements the Mediator pattern as an in-process messaging bus. Commands modify state; queries return data. \
\
**Benefits:** independent scaling, different DTOs for reads/writes, pipeline middleware for cross-cutting concerns. Common mistake: applying CQRS to simple CRUD — only implement when complexity genuinely requires separate read/write models.
