---
id: fastapi-app-bi-cham-thi-debug-tu-dau
position: backend
technology: testing-\u0026-production
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
FastAPI app bị chậm thì debug từ đâu?

## Question (EN)
Where do you start debugging a slow FastAPI app?

## Đáp án chi tiết (VI)
Bắt đầu bằng đo latency theo route và dependency: database query, external HTTP call, serialization, blocking code trong async route, connection pool exhaustion. Sau đó dùng profiling/tracing để tìm bottleneck thật.\
\
Checklist thực tế: kiểm tra có dùng thư viện sync trong `async def` không, query có N+1 không, response payload có quá lớn không, Pydantic serialization có nặng không, worker count/pool size có phù hợp không, và logs có chỉ ra retry/timeout từ dependency ngoài không.

## Detailed Answer (EN)
Start by measuring latency by route and dependency: database queries, external HTTP calls, serialization, blocking code inside async routes and connection pool exhaustion. Then use profiling/tracing to find the real bottleneck.\
\
Practical checklist: check for sync libraries inside `async def`, N+1 queries, oversized response payloads, heavy Pydantic serialization, unsuitable worker count/pool size, and logs showing retries/timeouts from external dependencies.
