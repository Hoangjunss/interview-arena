---
id: fastapi-project-nen-to-chuc-theo-layer-hay-theo-feature
position: backend
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
FastAPI project nên tổ chức theo layer hay theo feature?

## Question (EN)
Should a FastAPI project be organized by layer or by feature?

## Đáp án chi tiết (VI)
Với app nhỏ, layer đơn giản như routers/services/repositories đủ dùng. Với app lớn, nên tổ chức theo feature/domain để giảm coupling: mỗi domain có router, schemas, service, repository và tests riêng.\
\
Quan trọng là route handler mỏng: parse request, gọi service/use-case, trả response. Business logic không nên nằm dày trong handler vì khó test và khó reuse cho worker/message consumer.

## Detailed Answer (EN)
For small apps, simple layers such as routers/services/repositories are enough. For large apps, organize by feature/domain to reduce coupling: each domain owns its router, schemas, service, repository and tests.\
\
The route handler should stay thin: parse request, call a service/use-case and return a response. Business logic should not be dense inside handlers because it becomes hard to test and reuse from workers/message consumers.
