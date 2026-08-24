---
id: fastapi-tich-hop-sql-database-nen-quan-ly-session-the-nao
position: backend
technology: database-\u0026-async
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
FastAPI tích hợp SQL database nên quản lý session thế nào?

## Question (EN)
How should FastAPI manage SQL database sessions?

## Đáp án chi tiết (VI)
Mỗi request nên có session scope riêng, thường tạo bằng dependency `yield`. Service/repository nhận session qua dependency hoặc qua function parameter, commit/rollback ở layer rõ ràng.\
\
Ví dụ:\
```python\
async def get_db():\
    async with SessionLocal() as session:\
        yield session\
\
@app.post(\\"/users\\")\
async def create_user(db: Annotated[AsyncSession, Depends(get_db)]):\
    ...\
```\
Tránh global session dùng chung nhiều request. Với SQLAlchemy async, cần dùng async engine/driver tương ứng như `asyncpg` cho PostgreSQL.

## Detailed Answer (EN)
Each request should have its own session scope, usually created with a `yield` dependency. Services/repositories receive the session through dependency injection or function parameters, and commit/rollback should happen in a clear layer.\
\
Example:\
```python\
async def get_db():\
    async with SessionLocal() as session:\
        yield session\
\
@app.post(\\"/users\\")\
async def create_user(db: Annotated[AsyncSession, Depends(get_db)]):\
    ...\
```\
Avoid a global session shared by many requests. With SQLAlchemy async, use the matching async engine/driver such as `asyncpg` for PostgreSQL.
