---
id: fastapi-xu-ly-loi-validation-va-business-errors-nhu-the-nao
position: backend
technology: error-handling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
FastAPI xử lý lỗi validation và business errors như thế nào?

## Question (EN)
How does FastAPI handle validation errors and business errors?

## Đáp án chi tiết (VI)
Lỗi validation request tự động trả 422 với chi tiết field lỗi. Business error nên dùng `HTTPException` hoặc custom exception + exception handler để response nhất quán.\
\
Ví dụ:\
```python\
if not user:\
    raise HTTPException(status_code=404, detail=\\"User not found\\")\
```\
Không nên trả `{ \\"error\\": ... }` thủ công với status 200. API client cần status code đúng để retry, log, alert và xử lý UX chính xác.

## Detailed Answer (EN)
Request validation errors automatically return 422 with field-level details. Business errors should use `HTTPException` or custom exceptions plus exception handlers for consistent responses.\
\
Example:\
```python\
if not user:\
    raise HTTPException(status_code=404, detail=\\"User not found\\")\
```\
Do not return `{ \\"error\\": ... }` manually with status 200. API clients need correct status codes for retry, logging, alerting and UX handling.
