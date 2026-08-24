---
id: jwt-authentication-implement-day-du-trong-fastapi
position: backend
technology: fastapi
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
JWT Authentication — implement đầy đủ trong FastAPI?

## Question (EN)
How do you implement JWT authentication in FastAPI?

## Đáp án chi tiết (VI)
$79

## Detailed Answer (EN)
JWT auth in four steps: (1) hash password with bcrypt (2) issue JWT on login (3) verify in dependency (4) protect routes. Use `PyJWT` (not `python-jose` — unmaintained with CVEs).\
```python\
import jwt  # pip install PyJWT\
from datetime import datetime, timedelta, timezone\
\
SECRET = \\"your-secret-key\\"\
ALGORITHM = \\"HS256\\"\
\
def create_token(user_id: int) -\u003e str:\
    expire = datetime.now(timezone.utc) + timedelta(minutes=30)\
    return jwt.encode({\\"sub\\": str(user_id), \\"exp\\": expire}, SECRET, ALGORITHM)\
\
async def get_current_user(token = Depends(oauth2_scheme)):\
    try:\
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])\
    except jwt.PyJWTError:\
        raise HTTPException(401, \\"Invalid token\\")\
    return await get_user(payload[\\"sub\\"])\
```
