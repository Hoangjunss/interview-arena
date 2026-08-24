---
id: migrations-trong-entity-framework-la-gi-va-hoat-dong-nhu-the-nao
position: backend
technology: entity-framework
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Migrations trong Entity Framework là gì và hoạt động như thế nào?

## Question (EN)
What are Entity Framework migrations and how do they work?

## Đáp án chi tiết (VI)
Migration theo dõi thay đổi schema database dưới dạng C# code. Tạo migration bằng `Add-Migration MigrationName` sau khi thay đổi model. Migration sinh ra method `Up()` (áp dụng thay đổi) và `Down()` (rollback). Apply bằng `Update-Database`. Migration cho phép version control schema, rollback dễ dàng, và áp dụng theo từng môi trường một cách có kiểm soát.

## Detailed Answer (EN)
Migrations track database schema changes as C# code. Create migrations via `Add-Migration MigrationName` when models change. Migrations generate an `Up()` method (apply changes) and a `Down()` method (rollback). Apply via `Update-Database`. Migrations enable schema version control, rollback capability, and controlled environment-specific application.
