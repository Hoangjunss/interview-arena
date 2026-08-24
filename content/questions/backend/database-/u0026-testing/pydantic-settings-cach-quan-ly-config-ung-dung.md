---
id: pydantic-settings-cach-quan-ly-config-ung-dung
position: backend
technology: database-\u0026-testing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pydantic Settings — cách quản lý config ứng dụng?

## Question (EN)
How do you manage app config with Pydantic Settings?

## Đáp án chi tiết (VI)
`pydantic-settings` tự động đọc env vars và validate types. Hỗ trợ `.env` file.\
```python\
from pydantic_settings import BaseSettings, SettingsConfigDict\
from functools import lru_cache\
\
class Settings(BaseSettings):\
    model_config = SettingsConfigDict(\
        env_file=\\".env\\

## Detailed Answer (EN)
```python\
from pydantic_settings import BaseSettings, SettingsConfigDict\
from functools import lru_cache\
\
class Settings(BaseSettings):\
    model_config = SettingsConfigDict(env_file=\\".env\\")  # pydantic-settings 2.x\
    database_url: str\
    secret_key: str\
    debug: bool = False\
\
@lru_cache\
def get_settings(): return Settings()\
```
