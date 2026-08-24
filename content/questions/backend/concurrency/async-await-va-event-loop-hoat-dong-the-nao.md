---
id: async-await-va-event-loop-hoat-dong-the-nao
position: backend
technology: concurrency
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`async/await` và event loop hoạt động thế nào?

## Question (EN)
How do `async/await` and the event loop work?

## Đáp án chi tiết (VI)
Event loop quản lý coroutines. Khi coroutine gặp `await`, nó tạm dừng và nhường control để event loop chạy coroutine khác. Đây là cooperative concurrency — không phải parallelism thực sự.\
```python\
import asyncio, httpx\
\
async def fetch(url: str) -\u003e dict:\
    async with httpx.AsyncClient() as client:\
        r = await client.get(url)  # Yield control tại đây\
        return r.json()\
\
async def main():\
    # Chạy 3 requests đồng thời (concurrent), không phải song song\
    results = await asyncio.gather(\
        fetch(\\"/users/1\\"),\
        fetch(\\"/users/2\\"),\
        fetch(\\"/users/3\\"),\
    )\
\
asyncio.run(main())\
```

## Detailed Answer (EN)
Event loop manages coroutines. When a coroutine hits await, it pauses and yields control to run other coroutines.\
```python\
async def main():\
    # Concurrent (not parallel) — all running \\"at once\\" via event loop\
    results = await asyncio.gather(\
        fetch_user(1),\
        fetch_user(2),\
        fetch_user(3),\
    )\
```
