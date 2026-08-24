---
id: dbcontext-la-gi-va-no-quan-ly-nhung-gi
position: backend
technology: entity-framework
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
DbContext là gì và nó quản lý những gì?

## Question (EN)
What is DbContext and what does it manage in EF Core?

## Đáp án chi tiết (VI)
`DbContext` đại diện cho một session với database, quản lý entity instances, change tracking và `SaveChanges()`. Nó theo dõi tất cả entities đã tải (added, modified, deleted). Implement `IDisposable` — luôn dùng `using` statement. Trong ASP.NET Core được scope theo mỗi request. Không bao giờ dùng static hay singleton `DbContext` — luôn dùng scoped lifetime.

## Detailed Answer (EN)
`DbContext` represents a session with the database, managing entity instances, change tracking, and `SaveChanges()` operations. It tracks all loaded entities (added, modified, deleted) and implements `IDisposable` — always use a `using` statement. In ASP.NET Core it is scoped per request. Never use a static or singleton `DbContext`.
