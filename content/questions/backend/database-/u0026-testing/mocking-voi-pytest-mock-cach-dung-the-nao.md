---
id: mocking-voi-pytest-mock-cach-dung-the-nao
position: backend
technology: database-\u0026-testing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mocking với `pytest-mock` — cách dùng thế nào?

## Question (EN)
How do you use `pytest-mock` for mocking?

## Đáp án chi tiết (VI)
Dùng `mocker` fixture từ pytest-mock để mock functions và verify calls.\
```python\
async def test_register_sends_email(mocker):\
    # Mock email service\
    mock_send = mocker.patch(\
        \\"app.services.email_service.send\\

## Detailed Answer (EN)
```python\
def test_service(mocker):\
    mock_db = mocker.patch(\\"app.services.get_user\\")\
    mock_db.return_value = {\\"id\\": 1, \\"name\\": \\"Alice\\
