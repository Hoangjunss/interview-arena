---
id: testing-fastapi-voi-pytest-va-testclient
position: backend
technology: database-\u0026-testing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Testing FastAPI với pytest và TestClient?

## Question (EN)
How do you test FastAPI endpoints with pytest and TestClient?

## Đáp án chi tiết (VI)
Dùng `TestClient` cho synchronous-style test của async endpoints. Override dependencies để isolate tests.\
```python\
from fastapi.testclient import TestClient\
import pytest\
\
def override_get_db():\
    yield TestingSessionLocal()\
\
app.dependency_overrides[get_db] = override_get_db\
client = TestClient(app)\
\
def test_create_user():\
    res = client.post(\\"/users\\

## Detailed Answer (EN)
```python\
client = TestClient(app)\
\
def test_endpoint():\
    response = client.post(\\"/items\\
