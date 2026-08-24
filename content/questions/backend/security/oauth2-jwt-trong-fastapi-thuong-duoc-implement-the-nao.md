---
id: oauth2-jwt-trong-fastapi-thuong-duoc-implement-the-nao
position: backend
technology: security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
OAuth2/JWT trong FastAPI thường được implement thế nào?

## Question (EN)
How is OAuth2/JWT commonly implemented in FastAPI?

## Đáp án chi tiết (VI)
Pattern phổ biến: login endpoint verify credentials, cấp access token ngắn hạn; protected endpoints dùng dependency đọc Bearer token, verify signature/expiry, load user và inject `current_user`.\
\
Ví dụ dependency rút gọn:\
```python\
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=\\"/auth/login\\")\
\
async def current_user(token: Annotated[str, Depends(oauth2_scheme)]):\
    payload = jwt.decode(token, SECRET, algorithms=[\\"HS256\\"])\
    return await users.get(payload[\\"sub\\"])\
```\
Trong production cần refresh token, revoke/session strategy, password hashing mạnh, rotation secret/key và phân quyền theo scope/role.

## Detailed Answer (EN)
Common pattern: a login endpoint verifies credentials and issues a short-lived access token; protected endpoints use a dependency to read the Bearer token, verify signature/expiry, load the user and inject `current_user`.\
\
Short dependency example:\
```python\
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=\\"/auth/login\\")\
\
async def current_user(token: Annotated[str, Depends(oauth2_scheme)]):\
    payload = jwt.decode(token, SECRET, algorithms=[\\"HS256\\"])\
    return await users.get(payload[\\"sub\\"])\
```\
Production needs refresh tokens, revoke/session strategy, strong password hashing, secret/key rotation and authorization by scope/role.
