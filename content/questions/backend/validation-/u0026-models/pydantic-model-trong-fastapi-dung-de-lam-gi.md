---
id: pydantic-model-trong-fastapi-dung-de-lam-gi
position: backend
technology: validation-\u0026-models
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pydantic model trong FastAPI dùng để làm gì?

## Question (EN)
What are Pydantic models used for in FastAPI?

## Đáp án chi tiết (VI)
Pydantic model định nghĩa schema cho request body, response, settings hoặc object trung gian. FastAPI dùng model để validate input, serialize output và sinh OpenAPI schema.\
\
Model nên tách theo use-case: `UserCreate` cho input tạo mới, `UserRead` cho response, `UserUpdate` cho partial update. Không nên expose trực tiếp database model nếu nó có field nhạy cảm như password hash hoặc internal flags.

## Detailed Answer (EN)
Pydantic models define schemas for request bodies, responses, settings or intermediate objects. FastAPI uses them to validate input, serialize output and generate OpenAPI schemas.\
\
Models should be split by use case: `UserCreate` for create input, `UserRead` for responses and `UserUpdate` for partial updates. Do not expose database models directly if they contain sensitive fields such as password hashes or internal flags.
