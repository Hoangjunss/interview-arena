---
id: fastapi-api-versioning-nen-lam-nhu-the-nao
position: backend
technology: testing-\u0026-production
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
FastAPI API versioning nên làm như thế nào?

## Question (EN)
How should API versioning be handled in FastAPI?

## Đáp án chi tiết (VI)
Versioning phổ biến nhất là path prefix như `/api/v1`, dễ debug và dễ route qua gateway. Header-based versioning sạch URL hơn nhưng khó test và cache hơn.\
\
Trong FastAPI, có thể dùng router prefix:\
```python\
v1 = APIRouter(prefix=\\"/api/v1\\")\
v2 = APIRouter(prefix=\\"/api/v2\\")\
app.include_router(v1)\
app.include_router(v2)\
```\
Không nên tạo version mới cho mọi field nhỏ. Dùng backward-compatible changes trước, deprecate rõ ràng, đo traffic cũ rồi mới remove.

## Detailed Answer (EN)
The most common versioning style is a path prefix such as `/api/v1`, which is easy to debug and route through gateways. Header-based versioning keeps URLs cleaner but is harder to test and cache.\
\
In FastAPI, use router prefixes:\
```python\
v1 = APIRouter(prefix=\\"/api/v1\\")\
v2 = APIRouter(prefix=\\"/api/v2\\")\
app.include_router(v1)\
app.include_router(v2)\
```\
Do not create a new version for every small field change. Prefer backward-compatible changes, clear deprecation, traffic measurement and then removal.
