---
id: middleware-trong-fastapi-dung-khi-nao
position: backend
technology: core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Middleware trong FastAPI dùng khi nào?

## Question (EN)
When should you use middleware in FastAPI?

## Đáp án chi tiết (VI)
Middleware bọc toàn bộ request/response, phù hợp cho cross-cutting concern như request id, logging, timing, CORS, compression, trusted host hoặc security headers.\
\
Ví dụ timing middleware:\
```python\
@app.middleware(\\"http\\")\
async def add_process_time(request: Request, call_next):\
    start = time.perf_counter()\
    response = await call_next(request)\
    response.headers[\\"X-Process-Time\\"] = str(time.perf_counter() - start)\
    return response\
```\
Không nên nhét business logic vào middleware vì nó thiếu context của route handler và khó test theo domain.

## Detailed Answer (EN)
Middleware wraps the whole request/response cycle and fits cross-cutting concerns such as request ids, logging, timing, CORS, compression, trusted hosts or security headers.\
\
Timing middleware example:\
```python\
@app.middleware(\\"http\\")\
async def add_process_time(request: Request, call_next):\
    start = time.perf_counter()\
    response = await call_next(request)\
    response.headers[\\"X-Process-Time\\"] = str(time.perf_counter() - start)\
    return response\
```\
Do not put business logic in middleware because it lacks route-level domain context and is harder to test.
