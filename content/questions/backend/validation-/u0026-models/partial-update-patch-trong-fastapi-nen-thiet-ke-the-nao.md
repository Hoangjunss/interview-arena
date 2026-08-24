---
id: partial-update-patch-trong-fastapi-nen-thiet-ke-the-nao
position: backend
technology: validation-\u0026-models
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Partial update/PATCH trong FastAPI nên thiết kế thế nào?

## Question (EN)
How should you design partial update/PATCH in FastAPI?

## Đáp án chi tiết (VI)
PATCH nên dùng model riêng với fields optional, sau đó chỉ apply field nào client gửi. Với Pydantic v2, `model_dump(exclude_unset=True)` giúp phân biệt field không gửi với field gửi giá trị `null`.\
\
Ví dụ:\
```python\
class UserPatch(BaseModel):\
    name: str | None = None\
    bio: str | None = None\
\
changes = payload.model_dump(exclude_unset=True)\
```\
Không nên reuse model create cho PATCH vì create thường required fields, còn PATCH phải biểu diễn partial mutation.

## Detailed Answer (EN)
PATCH should use a separate model with optional fields, then apply only fields sent by the client. With Pydantic v2, `model_dump(exclude_unset=True)` distinguishes missing fields from fields explicitly sent as `null`.\
\
Example:\
```python\
class UserPatch(BaseModel):\
    name: str | None = None\
    bio: str | None = None\
\
changes = payload.model_dump(exclude_unset=True)\
```\
Do not reuse the create model for PATCH because create usually has required fields while PATCH represents partial mutation.
