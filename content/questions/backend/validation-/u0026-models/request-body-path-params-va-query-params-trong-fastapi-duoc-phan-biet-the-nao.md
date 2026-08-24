---
id: request-body-path-params-va-query-params-trong-fastapi-duoc-phan-biet-the-nao
position: backend
technology: validation-\u0026-models
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Request body, path params và query params trong FastAPI được phân biệt thế nào?

## Question (EN)
How does FastAPI distinguish request body, path params and query params?

## Đáp án chi tiết (VI)
FastAPI phân biệt dựa trên vị trí khai báo và type: parameter có trong path template là path param; primitive parameter không nằm trong path thường là query param; Pydantic model thường là request body.\
\
Ví dụ:\
```python\
@app.post(\\"/users/{user_id}\\")\
async def update_user(user_id: int, notify: bool = False, payload: UserUpdate = Body()):\
    return {\\"id\\": user_id, \\"notify\\": notify, \\"payload\\": payload}\
```\
Trong API public, nên đặt validation constraints rõ ràng bằng `Annotated`, `Path`, `Query`, `Body` để docs và lỗi 422 chính xác.

## Detailed Answer (EN)
FastAPI distinguishes them from declaration position and type: a parameter present in the path template is a path param; a primitive parameter not in the path is usually a query param; a Pydantic model is usually the request body.\
\
Example:\
```python\
@app.post(\\"/users/{user_id}\\")\
async def update_user(user_id: int, notify: bool = False, payload: UserUpdate = Body()):\
    return {\\"id\\": user_id, \\"notify\\": notify, \\"payload\\": payload}\
```\
For public APIs, define validation constraints explicitly with `Annotated`, `Path`, `Query`, and `Body` so docs and 422 errors are accurate.
