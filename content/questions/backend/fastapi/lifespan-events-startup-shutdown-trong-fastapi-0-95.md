---
id: lifespan-events-startup-shutdown-trong-fastapi-0-95
position: backend
technology: fastapi
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lifespan events — startup/shutdown trong FastAPI 0.95+?

## Question (EN)
How do you handle startup/shutdown events in FastAPI 0.95+?

## Đáp án chi tiết (VI)
Dùng `@asynccontextmanager` với `lifespan` parameter thay vì `@app.on_event` (deprecated).\
```python\
from contextlib import asynccontextmanager\
\
@asynccontextmanager\
async def lifespan(app: FastAPI):\
    # Startup\
    await database.connect()\
    redis_pool = await create_redis_pool()\
    app.state.redis = redis_pool\
\
    yield  # App đang chạy\
\
    # Shutdown\
    await database.disconnect()\
    await redis_pool.aclose()\
\
app = FastAPI(lifespan=lifespan)\
```

## Detailed Answer (EN)
Use @asynccontextmanager with lifespan param instead of deprecated @app.on_event.\
```python\
@asynccontextmanager\
async def lifespan(app: FastAPI):\
    await startup()   # Before yield\
    yield\
    await shutdown()  # After yield\
\
app = FastAPI(lifespan=lifespan)\
```
