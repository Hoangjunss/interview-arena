---
id: dependency-voi-yield-dung-khi-nao
position: backend
technology: dependencies
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dependency với `yield` dùng khi nào?

## Question (EN)
When should you use a dependency with `yield`?

## Đáp án chi tiết (VI)
Dependency dùng `yield` phù hợp cho resource có setup/cleanup như database session, transaction, file handle hoặc external client. Code trước `yield` chạy trước handler, code sau `yield` chạy sau response path operation hoàn tất hoặc khi có exception.\
\
Ví dụ DB session:\
```python\
async def get_session():\
    async with async_sessionmaker() as session:\
        yield session\
```\
Không nên tạo global mutable session dùng chung nhiều request. Mỗi request nên có session/resource scope rõ ràng để tránh leak connection và race condition.

## Detailed Answer (EN)
A dependency with `yield` fits resources that need setup/cleanup such as database sessions, transactions, file handles or external clients. Code before `yield` runs before the handler; code after `yield` runs after the path operation completes or when an exception happens.\
\
Database session example:\
```python\
async def get_session():\
    async with async_sessionmaker() as session:\
        yield session\
```\
Do not create one global mutable session shared by many requests. Each request should have clear resource scope to avoid connection leaks and race conditions.
