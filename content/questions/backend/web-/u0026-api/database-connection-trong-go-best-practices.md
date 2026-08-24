---
id: database-connection-trong-go-best-practices
position: backend
technology: web-\u0026-api
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Database connection trong Go best practices?

## Question (EN)
What are the best practices for database connections in Go?

## Đáp án chi tiết (VI)
`sql.Open()` trả connection pool (không phải single connection). Set: `db.SetMaxOpenConns(25)`, `db.SetMaxIdleConns(5)`, `db.SetConnMaxLifetime(5*time.Minute)`. KHÔNG `defer db.Close()` mỗi request vì sql.DB là long-lived pool — chỉ close khi app shutdown. Prepared statements cho queries lặp lại. Context timeout cho queries: `db.QueryContext(ctx, query)`.

## Detailed Answer (EN)
`sql.Open()` returns a connection pool, not a single connection. Configure it: `db.SetMaxOpenConns(25)`, `db.SetMaxIdleConns(5)`, `db.SetConnMaxLifetime(5*time.Minute)`. Do NOT `defer db.Close()` on every request — `sql.DB` is a long-lived pool and should only be closed at app shutdown. Use prepared statements for repeated queries. Always pass a context with a timeout: `db.QueryContext(ctx, query)`.
