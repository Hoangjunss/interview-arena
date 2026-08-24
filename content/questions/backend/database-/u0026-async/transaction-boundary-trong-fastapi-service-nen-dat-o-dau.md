---
id: transaction-boundary-trong-fastapi-service-nen-dat-o-dau
position: backend
technology: database-\u0026-async
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Transaction boundary trong FastAPI service nên đặt ở đâu?

## Question (EN)
Where should transaction boundaries be placed in a FastAPI service?

## Đáp án chi tiết (VI)
Transaction boundary nên đặt quanh use-case cần atomic, thường ở service/application layer, không rải commit trong từng repository nhỏ. Repository chỉ thao tác dữ liệu; service quyết định commit/rollback cho toàn workflow.\
\
Ví dụ ý tưởng:\
```python\
async with session.begin():\
    order = await orders.create(session, payload)\
    await inventory.reserve(session, order.items)\
```\
Nếu mỗi repository tự commit, workflow nhiều bước sẽ khó rollback khi bước sau lỗi, dễ tạo dữ liệu nửa vời.

## Detailed Answer (EN)
Transaction boundaries should wrap the atomic use case, usually in the service/application layer, not scattered as commits inside small repositories. Repositories manipulate data; the service decides commit/rollback for the whole workflow.\
\
Concept example:\
```python\
async with session.begin():\
    order = await orders.create(session, payload)\
    await inventory.reserve(session, order.items)\
```\
If every repository commits by itself, multi-step workflows become hard to roll back when a later step fails, creating partial data.
