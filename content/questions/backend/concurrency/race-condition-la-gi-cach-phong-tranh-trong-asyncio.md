---
id: race-condition-la-gi-cach-phong-tranh-trong-asyncio
position: backend
technology: concurrency
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Race condition là gì? Cách phòng tránh trong asyncio?

## Question (EN)
What is a race condition? How to prevent it in asyncio?

## Đáp án chi tiết (VI)
Race condition xảy ra khi nhiều coroutines đọc-modify-write shared state, kết quả phụ thuộc vào thứ tự thực thi. Giải quyết bằng `asyncio.Lock`.\
```python\
# Race condition\
counter = 0\
async def increment():\
    global counter\
    current = counter\
    await asyncio.sleep(0)  # Yield — có thể bị preempt!\
    counter = current + 1   # Ghi lại giá trị cũ\
\
# Fix với Lock\
lock = asyncio.Lock()\
async def safe_increment():\
    async with lock:\
        global counter\
        counter += 1  # Atomic trong lock context\
```\
Semaphore: giới hạn số coroutines concurrent. `asyncio.Semaphore(10)` tối đa 10 concurrent requests.

## Detailed Answer (EN)
Race condition occurs when multiple coroutines read-modify-write shared state. Fix with asyncio.Lock.\
```python\
lock = asyncio.Lock()\
semaphore = asyncio.Semaphore(10)  # Max 10 concurrent\
\
async def safe_update():\
    async with lock:\
        shared_state += 1\
\
async def rate_limited_fetch(url):\
    async with semaphore:\
        return await fetch(url)\
```
