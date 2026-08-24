---
id: apirouter-dung-de-to-chuc-fastapi-app-nhu-the-nao
position: backend
technology: core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
APIRouter dùng để tổ chức FastAPI app như thế nào?

## Question (EN)
How do you organize a FastAPI app with APIRouter?

## Đáp án chi tiết (VI)
`APIRouter` gom routes theo feature/module, cho phép đặt prefix, tags, dependencies và responses chung. Root app include router qua `app.include_router()`.\
\
Ví dụ:\
```python\
router = APIRouter(prefix=\\"/users\\

## Detailed Answer (EN)
`APIRouter` groups routes by feature/module and lets you set shared prefix, tags, dependencies and responses. The root app includes the router with `app.include_router()`.\
\
Example:\
```python\
router = APIRouter(prefix=\\"/users\\
