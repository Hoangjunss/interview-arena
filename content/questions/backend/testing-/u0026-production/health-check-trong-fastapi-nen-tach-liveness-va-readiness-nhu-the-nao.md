---
id: health-check-trong-fastapi-nen-tach-liveness-va-readiness-nhu-the-nao
position: backend
technology: testing-\u0026-production
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Health check trong FastAPI nên tách liveness và readiness như thế nào?

## Question (EN)
How should FastAPI health checks split liveness and readiness?

## Đáp án chi tiết (VI)
Liveness trả lời câu hỏi process còn sống không, nên đơn giản và ít dependency. Readiness trả lời app đã sẵn sàng nhận traffic chưa, có thể kiểm database/cache/critical dependency.\
\
Ví dụ:\
```python\
@app.get(\\"/health/live\\")\
async def live():\
    return {\\"status\\": \\"ok\\

## Detailed Answer (EN)
Liveness answers whether the process is alive, so it should be simple and depend on very little. Readiness answers whether the app is ready to receive traffic and may check database/cache/critical dependencies.\
\
Example:\
```python\
@app.get(\\"/health/live\\")\
async def live():\
    return {\\"status\\": \\"ok\\
