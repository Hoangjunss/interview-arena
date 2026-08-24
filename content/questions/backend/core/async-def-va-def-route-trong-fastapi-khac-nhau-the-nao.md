---
id: async-def-va-def-route-trong-fastapi-khac-nhau-the-nao
position: backend
technology: core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`async def` và `def` route trong FastAPI khác nhau thế nào?

## Question (EN)
How are `async def` and `def` routes different in FastAPI?

## Đáp án chi tiết (VI)
`async def` chạy trong event loop và phù hợp khi handler await async I/O như async database driver, HTTP client hoặc message broker. `def` sync handler được chạy trong threadpool để không block event loop.\
\
Sai lầm thường gặp là viết `async def` nhưng gọi thư viện blocking như `requests` hoặc sync DB driver bên trong; điều đó vẫn block event loop. Nếu dependency/blocking library chưa async, dùng `def` route hoặc chuyển sang thư viện async tương ứng.

## Detailed Answer (EN)
`async def` runs in the event loop and fits handlers that await async I/O such as async database drivers, HTTP clients or message brokers. A sync `def` handler runs in a threadpool so it does not block the event loop.\
\
A common mistake is writing `async def` while calling blocking libraries such as `requests` or a sync DB driver inside it; that still blocks the event loop. If the library is not async, use a `def` route or switch to an async library.
