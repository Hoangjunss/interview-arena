---
id: pydantic-v2-nhung-thay-doi-lon-so-voi-v1
position: backend
technology: fastapi
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pydantic v2 — những thay đổi lớn so với v1?

## Question (EN)
Pydantic v2 — what are the major changes from v1?

## Đáp án chi tiết (VI)
FastAPI 0.100+ dùng Pydantic v2 mặc định — nhanh hơn 5-50x nhờ Rust core.\
**Thay đổi chính**:\
```python\
# v1 → v2 migration\
\
# 1. validator → field_validator\
# v1:\
@validator('email')\
def validate_email(cls, v): ...\
\
# v2:\
from pydantic import field_validator\
@field_validator('email')\
@classmethod\
def validate_email(cls, v: str) -\u003e str: ...\
\
# 2. orm_mode → model_config\
# v1: class Config: orm_mode = True\
# v2:\
from pydantic import ConfigDict\
class UserSchema(BaseModel):\
    model_config = ConfigDict(from_attributes=True)\
\
# 3. .dict() → .model_dump()\
user.model_dump()\
user.model_dump(exclude={'password'})\
\
# 4. .json() → .model_dump_json()\
user.model_dump_json()\
\
# 5. parse_obj → model_validate\
UserSchema.model_validate({\\"id\\": 1, \\"name\\": \\"Alice\\

## Detailed Answer (EN)
FastAPI 0.100+ uses Pydantic v2 by default — 5-50x faster thanks to Rust core.\
```python\
# field_validator instead of @validator\
@field_validator('email')\
@classmethod\
def validate_email(cls, v: str) -\u003e str: ...\
\
# model_config instead of class Config\
class User(BaseModel):\
    model_config = ConfigDict(from_attributes=True)\
\
# .model_dump() instead of .dict()\
user.model_dump(exclude={'password'})\
\
# model_validate instead of parse_obj\
UserSchema.model_validate({\\"id\\": 1})\
\
# pydantic-settings is now a separate package\
from pydantic_settings import BaseSettings\
```
