---
id: threadpoolexecutor-va-processpoolexecutor-voi-asyncio
position: backend
technology: concurrency
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`ThreadPoolExecutor` và `ProcessPoolExecutor` với asyncio?

## Question (EN)
`ThreadPoolExecutor` and `ProcessPoolExecutor` with asyncio?

## Đáp án chi tiết (VI)
$79

## Detailed Answer (EN)
Run blocking or CPU-bound code inside async context:\
```python\
# ThreadPoolExecutor for blocking sync libraries\
executor = ThreadPoolExecutor(max_workers=10)\
result = await loop.run_in_executor(executor, blocking_function, arg)\
\
# ProcessPoolExecutor for CPU-bound work\
cpu_exec = ProcessPoolExecutor(max_workers=4)\
result = await loop.run_in_executor(cpu_exec, heavy_compute, data)\
\
# asyncio.to_thread (Python 3.9+) — shorthand for thread pool\
result = await asyncio.to_thread(blocking_function, arg)\
```\
Pitfall: objects passed to ProcessPoolExecutor must be picklable.
