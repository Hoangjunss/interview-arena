---
id: async-vs-sync-endpoints-trong-fastapi-khi-nao-dung-def-hay-async-def
position: backend
technology: fastapi
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Async vs sync endpoints trong FastAPI — khi nào dùng def hay async def?

## Question (EN)
Async vs sync endpoints in FastAPI — when to use def vs async def?

## Đáp án chi tiết (VI)
FastAPI chạy trên Starlette (ASGI), hỗ trợ cả sync và async endpoints:\
\
**async def**: dùng khi endpoint thực hiện I/O async (database queries async, HTTP calls async):\
```python\
@app.get(\\"/users/{id}\\")\
async def get_user(id: int, db: AsyncSession = Depends(get_db)):\
    user = await db.get(User, id)  # Async I/O\
    return user\
```\
\
**def (sync)**: khi dùng blocking operations không thể async. FastAPI tự động chạy sync endpoint trong ThreadPoolExecutor để không block event loop:\
```python\
@app.get(\\"/compute\\")\
def cpu_task(data: list):\
    return [x**2 for x in data]  # CPU-bound — sync OK\
```\
\
**Không được làm**: gọi blocking I/O trong async def — block toàn bộ event loop:\
```python\
@app.get(\\"/wrong\\")\
async def bad_endpoint():\
    time.sleep(1)           # BLOCKING! Sai!\
    requests.get(\\"...\\")     # BLOCKING! Sai!\
    # Dùng asyncio.sleep() và httpx.AsyncClient() thay\
```\
\
**Rule**: I/O async → `async def`. CPU-bound hoặc blocking library → `def`. Không bao giờ dùng blocking I/O trong `async def`.

## Detailed Answer (EN)
**async def**: use when doing async I/O (async DB, async HTTP calls):\
```python\
@app.get(\\"/users/{id}\\")\
async def get_user(id: int, db = Depends(get_db)):\
    return await db.get(User, id)\
```\
\
**def (sync)**: blocking operations. FastAPI auto-runs in ThreadPoolExecutor to avoid blocking the event loop.\
\
**Never do**: blocking I/O inside async def — blocks the entire event loop:\
```python\
@app.get(\\"/wrong\\")\
async def bad():\
    time.sleep(1)       # BLOCKING! Wrong!\
    requests.get(\\"...\\")  # BLOCKING! Use httpx.AsyncClient() instead\
```\
\
**Rule**: async I/O → `async def`. CPU-bound or blocking library → `def`.
