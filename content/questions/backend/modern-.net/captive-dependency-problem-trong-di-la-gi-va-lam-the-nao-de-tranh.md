---
id: captive-dependency-problem-trong-di-la-gi-va-lam-the-nao-de-tranh
position: backend
technology: modern-.net
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Captive dependency problem trong DI là gì và làm thế nào để tránh?

## Question (EN)
What is the captive dependency problem in DI and how do you avoid it?

## Đáp án chi tiết (VI)
Captive dependency xảy ra khi scoped service bị inject vào singleton — service scoped sống mãi cùng singleton, không bao giờ được dispose đúng chu kỳ. \
\
**Ví dụ:** `IUnitOfWork` (scoped) inject vào `AppService` (singleton), UnitOfWork bị \\"giam\\" mãi, scope không bao giờ kết thúc. Hậu quả: memory leak, dữ liệu stale, connection pool cạn kiệt. Phòng tránh: không bao giờ inject scoped vào singleton; dùng factory pattern hoặc `IServiceScopeFactory` để tạo scope tạm thời khi cần. Singleton nên stateless.

## Detailed Answer (EN)
Captive dependency occurs when a scoped service is injected into a singleton — the scoped service lives as long as the singleton, never disposed at the correct scope boundary. \
\
**Example:** `IUnitOfWork` (scoped) injected into `AppService` (singleton); UnitOfWork is captured and its scope never ends. Consequences: memory leaks, stale data, and connection pool exhaustion. Prevention: never inject scoped services into singletons; use `IServiceScopeFactory` to create temporary scopes when needed. Singletons should be stateless.
