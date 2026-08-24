---
id: caching-strategy-trong-python-api-redis-pattern
position: backend
technology: database-\u0026-testing
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Caching strategy trong Python API — Redis pattern?

## Question (EN)
What is the cache-aside pattern? How to implement it with Redis in Python?

## Đáp án chi tiết (VI)
Cache-aside pattern: application kiểm tra cache trước, nếu miss thì query DB và populate cache.\
```python\
import json\
from functools import wraps\
\
def cache(key_prefix: str, ttl: int = 300):\
    def decorator(func):\
        @wraps(func)\
        async def wrapper(*args, **kwargs):\
            key = f\\"{key_prefix}:{args}:{kwargs}\\"\
            cached = await redis.get(key)\
            if cached:\
                return json.loads(cached)\
\
            result = await func(*args, **kwargs)\
            await redis.setex(key, ttl, json.dumps(result))\
            return result\
        return wrapper\
    return decorator\
\
@cache(\\"products\\

## Detailed Answer (EN)
Cache-aside: check cache → miss → query DB → populate cache.\
```python\
async def get_user(user_id: int):\
    cached = await redis.get(f\\"user:{user_id}\\")\
    if cached:\
        return json.loads(cached)\
\
    user = await db.get_user(user_id)\
    await redis.setex(f\\"user:{user_id}\\
