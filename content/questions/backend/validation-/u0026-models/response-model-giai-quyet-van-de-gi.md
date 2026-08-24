---
id: response-model-giai-quyet-van-de-gi
position: backend
technology: validation-\u0026-models
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`response_model` giải quyết vấn đề gì?

## Question (EN)
What problem does `response_model` solve?

## Đáp án chi tiết (VI)
`response_model` ép output theo schema đã khai báo: validate/serialize response, lọc field không được expose và sinh OpenAPI chính xác.\
\
Ví dụ tránh trả password hash:\
```python\
class UserRead(BaseModel):\
    id: int\
    email: str\
\
@app.get(\\"/users/{user_id}\\

## Detailed Answer (EN)
`response_model` enforces the declared output schema: it validates/serializes responses, filters fields that should not be exposed and generates accurate OpenAPI.\
\
Example avoiding password hash leaks:\
```python\
class UserRead(BaseModel):\
    id: int\
    email: str\
\
@app.get(\\"/users/{user_id}\\
