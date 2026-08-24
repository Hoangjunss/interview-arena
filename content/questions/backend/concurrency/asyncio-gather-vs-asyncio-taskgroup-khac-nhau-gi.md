---
id: asyncio-gather-vs-asyncio-taskgroup-khac-nhau-gi
position: backend
technology: concurrency
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`asyncio.gather` vs `asyncio.TaskGroup` — khác nhau gì?

## Question (EN)
`asyncio.gather` vs `asyncio.TaskGroup` — what's the difference?

## Đáp án chi tiết (VI)
`asyncio.gather` (Python 3.4+): chạy song song, trả về list kết quả. `asyncio.TaskGroup` (Python 3.11+) — recommended cách mới: nếu một task fail, các tasks còn lại bị cancel tự động.\
```python\
# gather — return_exceptions để không propagate lỗi\
results = await asyncio.gather(\
    task1(), task2(), task3(),\
    return_exceptions=True\
)\
\
# TaskGroup — structured concurrency (recommended 3.11+)\
async with asyncio.TaskGroup() as tg:\
    t1 = tg.create_task(task1())\
    t2 = tg.create_task(task2())\
# Tất cả tasks xong khi thoát context\
# Nếu 1 task raise exception → cancel tasks còn lại\
print(t1.result(), t2.result())\
```

## Detailed Answer (EN)
gather (3.4+): runs coroutines concurrently, returns results list. TaskGroup (3.11+, recommended): if one task fails, remaining tasks are cancelled automatically — structured concurrency.\
```python\
async with asyncio.TaskGroup() as tg:\
    t1 = tg.create_task(coro1())\
    t2 = tg.create_task(coro2())\
# All done when context exits; exception cancels others\
```
