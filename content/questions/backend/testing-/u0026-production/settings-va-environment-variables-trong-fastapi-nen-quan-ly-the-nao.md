---
id: settings-va-environment-variables-trong-fastapi-nen-quan-ly-the-nao
position: backend
technology: testing-\u0026-production
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Settings và environment variables trong FastAPI nên quản lý thế nào?

## Question (EN)
How should settings and environment variables be managed in FastAPI?

## Đáp án chi tiết (VI)
Dùng Pydantic Settings hoặc `pydantic-settings` để parse env vars có type, default và validation. Settings nên được inject qua dependency hoặc tạo singleton cached rõ ràng.\
\
Ví dụ:\
```python\
class Settings(BaseSettings):\
    database_url: str\
    jwt_secret: SecretStr\
\
@lru_cache\
def get_settings() -\u003e Settings:\
    return Settings()\
```\
Không commit secret vào repo. Tách config theo môi trường qua env vars, secret manager hoặc orchestrator secrets.

## Detailed Answer (EN)
Use Pydantic Settings or `pydantic-settings` to parse environment variables with types, defaults and validation. Settings should be injected via dependency or created as an explicitly cached singleton.\
\
Example:\
```python\
class Settings(BaseSettings):\
    database_url: str\
    jwt_secret: SecretStr\
\
@lru_cache\
def get_settings() -\u003e Settings:\
    return Settings()\
```\
Do not commit secrets to the repo. Split environment config through env vars, secret managers or orchestrator secrets.
