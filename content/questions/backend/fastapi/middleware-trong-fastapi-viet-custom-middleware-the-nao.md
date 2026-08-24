---
id: middleware-trong-fastapi-viet-custom-middleware-the-nao
position: backend
technology: fastapi
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Middleware trong FastAPI — viết custom middleware thế nào?

## Question (EN)
How do you write custom middleware in FastAPI?

## Đáp án chi tiết (VI)
Middleware chạy trước và sau mỗi request. Dùng `@app.middleware(\\"http\\")` cho custom middleware.\
```python\
import time, uuid\
from fastapi import Request\
\
@app.middleware(\\"http\\")\
async def logging_middleware(request: Request, call_next):\
    request_id = str(uuid.uuid4())\
    start = time.perf_counter()\
\
    response = await call_next(request)\
\
    duration = time.perf_counter() - start\
    response.headers[\\"X-Request-ID\\"] = request_id\
    response.headers[\\"X-Duration\\"] = f\\"{duration:.4f}\\"\
    return response\
```\
CORS, GZip, TrustedHost — dùng built-in middlewares. Lưu ý: Middleware exception handler không bắt HTTP exceptions từ path operations — dùng `exception_handler` thay.

## Detailed Answer (EN)
Middleware runs before/after every request.\
```python\
@app.middleware(\\"http\\")\
async def add_timing(request: Request, call_next):\
    start = time.perf_counter()\
    response = await call_next(request)\
    response.headers[\\"X-Time\\"] = str(time.perf_counter() - start)\
    return response\
```
