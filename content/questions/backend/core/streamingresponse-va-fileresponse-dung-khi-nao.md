---
id: streamingresponse-va-fileresponse-dung-khi-nao
position: backend
technology: core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
StreamingResponse và FileResponse dùng khi nào?

## Question (EN)
When should you use StreamingResponse and FileResponse?

## Đáp án chi tiết (VI)
`StreamingResponse` dùng khi response lớn hoặc sinh dần như export CSV, proxy stream, AI token stream. `FileResponse` dùng trả file có sẵn trên disk và xử lý headers phù hợp.\
\
Ví dụ streaming:\
```python\
async def rows():\
    for row in data:\
        yield json.dumps(row) + \\"\\\
\\"\
\
return StreamingResponse(rows(), media_type=\\"application/x-ndjson\\")\
```\
Cần chú ý client disconnect, timeout, backpressure và không giữ toàn bộ payload lớn trong memory.

## Detailed Answer (EN)
`StreamingResponse` is used when a response is large or generated incrementally, such as CSV export, proxy streams or AI token streams. `FileResponse` returns an existing file from disk and handles suitable headers.\
\
Streaming example:\
```python\
async def rows():\
    for row in data:\
        yield json.dumps(row) + \\"\\\
\\"\
\
return StreamingResponse(rows(), media_type=\\"application/x-ndjson\\")\
```\
Watch client disconnects, timeouts, backpressure and avoid holding a huge payload in memory.
