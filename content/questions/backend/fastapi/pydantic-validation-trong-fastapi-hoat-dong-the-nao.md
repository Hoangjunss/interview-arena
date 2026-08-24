---
id: pydantic-validation-trong-fastapi-hoat-dong-the-nao
position: backend
technology: fastapi
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pydantic validation trong FastAPI hoạt động thế nào?

## Question (EN)
How does Pydantic validation work in FastAPI?

## Đáp án chi tiết (VI)
FastAPI dùng Pydantic model để tự động validate request body, query params, path params. Trả về 422 Unprocessable Entity nếu invalid.\
```python\
from pydantic import BaseModel, EmailStr, Field, field_validator\
\
class UserCreate(BaseModel):\
    name: str = Field(min_length=2, max_length=50)\
    email: EmailStr\
    age: int = Field(ge=0, le=150)\
\
    @field_validator('name')\
    @classmethod\
    def name_alpha(cls, v: str) -\u003e str:\
        if not v.replace(' ', '').isalpha():\
            raise ValueError('Only letters allowed')\
        return v.strip().title()\
\
    model_config = {\\"from_attributes\\": True}  # Pydantic v2\
\
@app.post(\\"/users\\

## Detailed Answer (EN)
FastAPI uses Pydantic to auto-validate request body, query params, path params. Returns 422 if invalid.\
```python\
from pydantic import BaseModel, Field\
\
class Item(BaseModel):\
    name: str = Field(min_length=1)\
    price: float = Field(gt=0)\
    quantity: int = Field(ge=0)\
\
@app.post(\\"/items\\")\
async def create(item: Item):  # Auto-validated\
    ...\
```
