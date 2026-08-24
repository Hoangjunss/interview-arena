---
id: test-fastapi-endpoint-nen-viet-nhu-the-nao
position: backend
technology: testing-\u0026-production
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Test FastAPI endpoint nên viết như thế nào?

## Question (EN)
How should you test FastAPI endpoints?

## Đáp án chi tiết (VI)
Với endpoint sync/normal, dùng `TestClient`. Với async test cần gọi async DB/client, dùng `pytest.mark.anyio` và `httpx.AsyncClient` hoặc ASGI transport.\
\
Ví dụ override dependency:\
```python\
app.dependency_overrides[get_current_user] = lambda: User(id=1, email=\\"a@example.com\\")\
client = TestClient(app)\
response = client.get(\\"/me\\")\
assert response.status_code == 200\
```\
Test tốt nên cover status code, response schema, auth path, validation lỗi 422 và side effect quan trọng.

## Detailed Answer (EN)
For normal sync-style endpoint tests, use `TestClient`. For async tests that call async DB/client code, use `pytest.mark.anyio` and `httpx.AsyncClient` or ASGI transport.\
\
Dependency override example:\
```python\
app.dependency_overrides[get_current_user] = lambda: User(id=1, email=\\"a@example.com\\")\
client = TestClient(app)\
response = client.get(\\"/me\\")\
assert response.status_code == 200\
```\
Good tests cover status codes, response schema, auth paths, 422 validation errors and important side effects.
