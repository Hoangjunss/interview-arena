---
id: lifespan-startup-shutdown-trong-fastapi-dung-de-lam-gi
position: backend
technology: core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lifespan/startup-shutdown trong FastAPI dùng để làm gì?

## Question (EN)
What are FastAPI lifespan/startup-shutdown handlers used for?

## Đáp án chi tiết (VI)
Lifespan quản lý resource cấp app như connection pool, cache client, ML model hoặc scheduler. Code trước `yield` chạy khi app startup, code sau `yield` chạy khi shutdown, giúp mở và đóng resource đúng vòng đời.\
\
Ví dụ:\
```python\
@asynccontextmanager\
async def lifespan(app: FastAPI):\
    app.state.redis = await Redis.from_url(REDIS_URL)\
    yield\
    await app.state.redis.aclose()\
\
app = FastAPI(lifespan=lifespan)\
```\
Không nên tạo resource nặng ở global import nếu nó cần cleanup hoặc phụ thuộc cấu hình runtime.

## Detailed Answer (EN)
Lifespan manages app-level resources such as connection pools, cache clients, ML models or schedulers. Code before `yield` runs at startup; code after `yield` runs at shutdown, so resources open and close with the app lifecycle.\
\
Example:\
```python\
@asynccontextmanager\
async def lifespan(app: FastAPI):\
    app.state.redis = await Redis.from_url(REDIS_URL)\
    yield\
    await app.state.redis.aclose()\
\
app = FastAPI(lifespan=lifespan)\
```\
Do not create heavy resources at global import time if they need cleanup or depend on runtime configuration.
