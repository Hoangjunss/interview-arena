---
id: fastapi-la-gi-uu-diem-so-voi-flask-va-django
position: backend
technology: fastapi
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
FastAPI là gì? Ưu điểm so với Flask và Django?

## Question (EN)
What is FastAPI? How does it compare to Flask and Django?

## Đáp án chi tiết (VI)
FastAPI là modern Python web framework dựa trên Starlette (ASGI) + Pydantic. \
\
**Ưu điểm:** (1) Async native — ~20K RPS, Flask/Django ~4-5K RPS (2) Auto OpenAPI docs — Swagger UI + ReDoc tự động từ type hints (3) Type-based validation — Pydantic validate request/response (4) Dependency Injection built-in (5) ASGI hỗ trợ WebSocket, HTTP/2. Dùng FastAPI cho: microservices, AI/ML serving, real-time APIs. Django vẫn tốt cho enterprise apps với admin panel và nhiều features built-in.

## Detailed Answer (EN)
FastAPI is a modern Python framework built on Starlette (ASGI) + Pydantic. \
\
**Advantages:** (1) Async native — ~20K RPS vs Flask/Django ~4-5K RPS (2) Auto OpenAPI docs from type hints (3) Pydantic type-based validation (4) Built-in Dependency Injection (5) WebSocket, HTTP/2 support. Use for: microservices, AI/ML serving, real-time APIs.
