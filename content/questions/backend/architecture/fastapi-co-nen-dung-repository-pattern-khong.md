---
id: fastapi-co-nen-dung-repository-pattern-khong
position: backend
technology: architecture
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
FastAPI có nên dùng repository pattern không?

## Question (EN)
Should FastAPI use the repository pattern?

## Đáp án chi tiết (VI)
Repository pattern hữu ích khi muốn tách business logic khỏi persistence details, mock database trong unit test hoặc hỗ trợ nhiều data source. Nhưng abstraction quá sớm có thể tạo boilerplate không cần thiết.\
\
Rule thực tế: app nhỏ có thể gọi ORM trong service; app lớn nên có repository/query layer cho aggregate phức tạp, transaction boundary và query reuse. Đừng tạo generic repository CRUD nếu query thực tế luôn domain-specific.

## Detailed Answer (EN)
The repository pattern is useful when you want to separate business logic from persistence details, mock databases in unit tests or support multiple data sources. But premature abstraction can create unnecessary boilerplate.\
\
Practical rule: small apps can call the ORM in services; large apps benefit from a repository/query layer for complex aggregates, transaction boundaries and query reuse. Do not create a generic CRUD repository if real queries are always domain-specific.
