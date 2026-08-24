---
id: lam-the-nao-de-chay-migrations-trong-ci-cd-pipeline-production
position: backend
technology: entity-framework
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để chạy migrations trong CI/CD pipeline production?

## Question (EN)
How do you run migrations in a production CI/CD pipeline?

## Đáp án chi tiết (VI)
Tạo idempotent migration scripts riêng và review trước khi deploy. Không bao giờ gọi `db.Database.Migrate()` khi app khởi động trong production — nhiều instance chạy đồng thời sẽ gây lock contention. Apply migrations trong deployment pipeline trước khi app start. Dùng `Sql()` cho các custom operations ngoài model changes. Luôn test migrations trên staging trước.

## Detailed Answer (EN)
Generate idempotent migration scripts separately and review them before deployment. Never call `db.Database.Migrate()` at app startup in production — multiple concurrent instances cause lock contention. Apply migrations in the deployment pipeline before the app starts. Use `Sql()` for custom operations beyond model changes. Always test migrations on staging first.
