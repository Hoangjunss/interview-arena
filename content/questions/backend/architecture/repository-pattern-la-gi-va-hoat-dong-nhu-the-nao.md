---
id: repository-pattern-la-gi-va-hoat-dong-nhu-the-nao
position: backend
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Repository pattern là gì và hoạt động như thế nào?

## Question (EN)
What is the repository pattern and how does it work?

## Đáp án chi tiết (VI)
Repository là lớp abstraction giữa domain logic và data source. Thay vì UI gọi trực tiếp API, bạn gọi `Repository.getUser(id)` — method này ẩn đi việc data đến từ network, cache hay database. Interface repository được định nghĩa trong domain layer; implementation trong data layer. Điều này giúp dễ dàng hoán đổi data source, hỗ trợ offline-first, và test bằng cách mock repository.

## Detailed Answer (EN)
Repository is an abstraction layer between domain logic and data sources. Instead of UI directly calling APIs, you call a repository method that abstracts whether data comes from network, cache, or database. This enables easy swapping of data sources, offline-first functionality, and mocking for tests.
