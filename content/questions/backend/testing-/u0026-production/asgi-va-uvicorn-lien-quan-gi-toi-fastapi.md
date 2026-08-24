---
id: asgi-va-uvicorn-lien-quan-gi-toi-fastapi
position: backend
technology: testing-\u0026-production
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ASGI và Uvicorn liên quan gì tới FastAPI?

## Question (EN)
How are ASGI and Uvicorn related to FastAPI?

## Đáp án chi tiết (VI)
FastAPI là ASGI application; ASGI là interface cho Python async web apps. Uvicorn là ASGI server phổ biến dùng để chạy FastAPI, nhận HTTP/WebSocket request và gọi app theo ASGI protocol.\
\
Trong production, số process/workers phụ thuộc CPU, memory, blocking I/O và cách scale bằng container/orchestrator. Không tăng workers mù quáng nếu app giữ nhiều connection pool hoặc model lớn trong memory.

## Detailed Answer (EN)
FastAPI is an ASGI application; ASGI is the interface for async Python web apps. Uvicorn is a common ASGI server used to run FastAPI, receive HTTP/WebSocket requests and call the app through the ASGI protocol.\
\
In production, process/worker count depends on CPU, memory, blocking I/O and scaling through containers/orchestrators. Do not blindly increase workers if the app holds many connection pools or large models in memory.
