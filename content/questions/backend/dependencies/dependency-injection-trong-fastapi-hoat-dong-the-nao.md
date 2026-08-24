---
id: dependency-injection-trong-fastapi-hoat-dong-the-nao
position: backend
technology: dependencies
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dependency Injection trong FastAPI hoạt động thế nào?

## Question (EN)
How does Dependency Injection work in FastAPI?

## Đáp án chi tiết (VI)
FastAPI dependency là callable được khai báo bằng `Depends` hoặc `Security`. FastAPI tự gọi dependency, truyền request params cần thiết, cache kết quả trong request nếu cùng dependency được dùng nhiều lần, rồi inject kết quả vào handler.\
\
Ví dụ:\
```python\
async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]) -\u003e User:\
    return await auth_service.verify(token)\
\
@app.get(\\"/me\\")\
async def me(user: Annotated[User, Depends(get_current_user)]):\
    return user\
```\
Dependency phù hợp cho auth, DB session, settings, pagination, tenant context và shared validation.

## Detailed Answer (EN)
A FastAPI dependency is a callable declared with `Depends` or `Security`. FastAPI calls the dependency, passes required request params, caches the result within the request if reused, and injects the result into the handler.\
\
Example:\
```python\
async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]) -\u003e User:\
    return await auth_service.verify(token)\
\
@app.get(\\"/me\\")\
async def me(user: Annotated[User, Depends(get_current_user)]):\
    return user\
```\
Dependencies fit auth, DB sessions, settings, pagination, tenant context and shared validation.
