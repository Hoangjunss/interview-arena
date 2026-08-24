---
id: sqlalchemy-2-0-async-setup-co-ban-the-nao
position: backend
technology: database-\u0026-testing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SQLAlchemy 2.0 async — setup cơ bản thế nào?

## Question (EN)
How do you set up SQLAlchemy 2.0 async with FastAPI?

## Đáp án chi tiết (VI)
SQLAlchemy 2.0 async dùng `create_async_engine`, `async_sessionmaker`, và ORM style mới với `Mapped`/`mapped_column` — fully type-safe.\
```python\
from sqlalchemy.ext.asyncio import (\
    create_async_engine, AsyncSession, async_sessionmaker\
)\
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column\
\
engine = create_async_engine(\
    \\"postgresql+asyncpg://user:pass@localhost/db\\

## Detailed Answer (EN)
SQLAlchemy 2.0 async setup uses `create_async_engine`, `async_sessionmaker`, and the new `Mapped`/`mapped_column` ORM style with full type safety.\
```python\
engine = create_async_engine(\
    \\"postgresql+asyncpg://user:pass@localhost/db\\
