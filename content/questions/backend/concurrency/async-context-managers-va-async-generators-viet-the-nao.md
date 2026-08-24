---
id: async-context-managers-va-async-generators-viet-the-nao
position: backend
technology: concurrency
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Async context managers và async generators — viết thế nào?

## Question (EN)
Async context managers and async generators — how to write them?

## Đáp án chi tiết (VI)
$78

## Detailed Answer (EN)
```python\
from contextlib import asynccontextmanager\
\
@asynccontextmanager\
async def managed_connection(pool):\
    conn = await pool.acquire()\
    try: yield conn\
    finally: await pool.release(conn)\
\
# Class-based\
class AsyncDBSession:\
    async def __aenter__(self): ...\
    async def __aexit__(self, *args): ...\
\
# Async generator\
async def fetch_pages(url: str):\
    page = 1\
    while True:\
        data = await fetch(f\\"{url}?page={page}\\")\
        if not data: break\
        yield data; page += 1\
\
async for page in fetch_pages(url): process(page)\
```
