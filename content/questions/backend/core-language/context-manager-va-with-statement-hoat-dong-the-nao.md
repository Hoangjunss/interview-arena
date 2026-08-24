---
id: context-manager-va-with-statement-hoat-dong-the-nao
position: backend
technology: core-language
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Context Manager và `with` statement hoạt động thế nào?

## Question (EN)
How does the `with` statement and context manager work?

## Đáp án chi tiết (VI)
Context manager quản lý tài nguyên tự động qua `__enter__` và `__exit__`. `with` đảm bảo cleanup chạy dù có exception hay không.\
```python\
from contextlib import asynccontextmanager\
\
# Dùng @asynccontextmanager cho async code (không phải @contextmanager)\
@asynccontextmanager\
async def db_transaction(session):\
    try:\
        yield session\
        await session.commit()\
    except Exception:\
        await session.rollback()\
        raise\
\
# Class-based (sync)\
class Timer:\
    def __enter__(self):\
        import time; self.start = time.perf_counter(); return self\
    def __exit__(self, *args):\
        self.elapsed = time.perf_counter() - self.start\
```

## Detailed Answer (EN)
Context manager handles resource setup/teardown via __enter__ and __exit__. with ensures cleanup runs even on exception.\
```python\
from contextlib import contextmanager\
\
@contextmanager\
def managed_resource():\
    resource = acquire()\
    try:\
        yield resource\
    finally:\
        release(resource)\
```
