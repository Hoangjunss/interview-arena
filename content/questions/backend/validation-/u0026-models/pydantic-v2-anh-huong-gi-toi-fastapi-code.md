---
id: pydantic-v2-anh-huong-gi-toi-fastapi-code
position: backend
technology: validation-\u0026-models
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pydantic v2 ảnh hưởng gì tới FastAPI code?

## Question (EN)
How does Pydantic v2 affect FastAPI code?

## Đáp án chi tiết (VI)
FastAPI dùng Pydantic để validate và serialize dữ liệu, nên cần nắm các API chính của Pydantic version đang dùng trong dự án. Với Pydantic v2, các điểm hay gặp là `model_config`, `model_validate()`, `model_dump()` và validators bằng `@field_validator`/`@model_validator`.\
\
Ví dụ:\
```python\
class UserRead(BaseModel):\
    id: int\
    email: EmailStr\
    model_config = ConfigDict(from_attributes=True)\
```\
Khi review FastAPI code, cần kiểm tra validators, serialization, ORM mapping và custom types vì đây là nơi dễ lệch behavior nhất.

## Detailed Answer (EN)
FastAPI uses Pydantic to validate and serialize data, so you need to know the main APIs of the Pydantic version used by the project. With Pydantic v2, common APIs are `model_config`, `model_validate()`, `model_dump()` and validators with `@field_validator`/`@model_validator`.\
\
Example:\
```python\
class UserRead(BaseModel):\
    id: int\
    email: EmailStr\
    model_config = ConfigDict(from_attributes=True)\
```\
When reviewing FastAPI code, check validators, serialization, ORM mapping and custom types because these are common places where behavior differs.
