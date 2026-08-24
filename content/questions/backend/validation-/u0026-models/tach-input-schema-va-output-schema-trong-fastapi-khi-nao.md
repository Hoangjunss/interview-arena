---
id: tach-input-schema-va-output-schema-trong-fastapi-khi-nao
position: backend
technology: validation-\u0026-models
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tách input schema và output schema trong FastAPI khi nào?

## Question (EN)
When should input and output schemas be separated in FastAPI?

## Đáp án chi tiết (VI)
Nên tách khi input và output không cùng shape: create cần password nhưng output không được trả password; internal fields như `is_admin`, `deleted_at`, `version` không nên client ghi; response cần computed fields hoặc nested objects.\
\
Ví dụ các model riêng:\
```python\
class UserCreate(BaseModel):\
    email: EmailStr\
    password: str\
\
class UserRead(BaseModel):\
    id: int\
    email: EmailStr\
```\
Tách schema giúp OpenAPI rõ hơn và giảm rủi ro mass assignment hoặc data leak.

## Detailed Answer (EN)
Separate them when input and output have different shapes: create input needs a password but output must not return it; internal fields such as `is_admin`, `deleted_at`, `version` should not be writable by clients; responses may need computed fields or nested objects.\
\
Separate model example:\
```python\
class UserCreate(BaseModel):\
    email: EmailStr\
    password: str\
\
class UserRead(BaseModel):\
    id: int\
    email: EmailStr\
```\
Separate schemas make OpenAPI clearer and reduce mass assignment or data leak risk.
