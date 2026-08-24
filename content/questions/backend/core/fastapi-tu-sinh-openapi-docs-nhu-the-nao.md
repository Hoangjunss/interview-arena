---
id: fastapi-tu-sinh-openapi-docs-nhu-the-nao
position: backend
technology: core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
FastAPI tự sinh OpenAPI docs như thế nào?

## Question (EN)
How does FastAPI generate OpenAPI documentation?

## Đáp án chi tiết (VI)
FastAPI sinh OpenAPI từ path operations, type hints, Pydantic models, status codes, dependencies và metadata. Mặc định app có Swagger UI ở `/docs` và ReDoc ở `/redoc`.\
\
Docs tự động chỉ đáng tin khi contract được viết rõ: đặt response model, status code đúng, mô tả lỗi, phân biệt input/output schema và không trả dữ liệu tùy tiện bằng raw dict ở các endpoint quan trọng.

## Detailed Answer (EN)
FastAPI generates OpenAPI from path operations, type hints, Pydantic models, status codes, dependencies and metadata. By default, the app exposes Swagger UI at `/docs` and ReDoc at `/redoc`.\
\
Automatic docs are reliable only when the contract is explicit: set response models, correct status codes, error descriptions, separate input/output schemas and avoid returning arbitrary raw dicts for important endpoints.
