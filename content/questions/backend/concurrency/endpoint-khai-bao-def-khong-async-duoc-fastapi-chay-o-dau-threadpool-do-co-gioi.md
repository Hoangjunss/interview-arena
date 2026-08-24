---
id: endpoint-khai-bao-def-khong-async-duoc-fastapi-chay-o-dau-threadpool-do-co-gioi
position: backend
technology: concurrency
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Endpoint khai báo `def` (không async) được FastAPI chạy ở đâu? Threadpool đó có giới hạn không?

## Question (EN)
Where does FastAPI run a plain `def` endpoint? Is that threadpool bounded?

## Đáp án chi tiết (VI)
Starlette đẩy hàm `def` sang một **threadpool** qua `anyio.to_thread.run_sync`, nên code đồng bộ không chặn event loop. Threadpool này **có giới hạn**: AnyIO mặc định 40 thread cho toàn tiến trình.\
\
Hệ quả khi tải cao: request thứ 41 trở đi **xếp hàng** chờ thread rảnh, latency tăng dần chứ không lỗi. Nếu endpoint `def` gọi DB đồng bộ mất 200ms thì trần thông lượng của tiến trình xấp xỉ `40 / 0.2 = 200 req/s`, bất kể máy còn CPU.\
\
```python\
import anyio\
\
@app.on_event(\\"startup\\")\
async def raise_thread_limit():\
    limiter = anyio.to_thread.current_default_thread_limiter()\
    limiter.total_tokens = 100\
```\
\
Lưu ý trước khi nâng số:\
- Thread vẫn tốn stack và context switch; nâng lên vài trăm thường phản tác dụng.\
- Pool kết nối DB phải đủ lớn tương ứng, nếu không sẽ chỉ dời điểm nghẽn.\
- Event loop vẫn là nơi **lập lịch** cho các thread này. Nếu loop bị chặn bởi một `async def` viết sai, request `def` cũng không được giao thread dù pool đang rỗng.

## Detailed Answer (EN)
Starlette hands `def` functions to a **threadpool** via `anyio.to_thread.run_sync`, so synchronous code does not block the event loop. That pool is **bounded**: AnyIO defaults to 40 threads per process.\
\
Under load this means request 41 onward **queues** for a free thread — latency climbs, requests do not fail. If a `def` endpoint makes a 200ms synchronous DB call, the process ceiling is roughly `40 / 0.2 = 200 req/s` no matter how much CPU is left.\
\
```python\
import anyio\
\
@app.on_event(\\"startup\\")\
async def raise_thread_limit():\
    limiter = anyio.to_thread.current_default_thread_limiter()\
    limiter.total_tokens = 100\
```\
\
Before raising the number:\
- Threads still cost stack memory and context switches; a few hundred usually backfires.\
- The DB connection pool must grow to match, otherwise you only move the bottleneck.\
- The event loop still **schedules** those threads. If a badly written `async def` blocks the loop, `def` requests get no thread even with an empty pool.
