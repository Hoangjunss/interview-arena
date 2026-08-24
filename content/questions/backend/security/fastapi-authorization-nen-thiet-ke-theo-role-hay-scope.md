---
id: fastapi-authorization-nen-thiet-ke-theo-role-hay-scope
position: backend
technology: security
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
FastAPI authorization nên thiết kế theo role hay scope?

## Question (EN)
Should FastAPI authorization be designed with roles or scopes?

## Đáp án chi tiết (VI)
Role phù hợp quyền coarse-grained như admin/user/support. Scope phù hợp quyền fine-grained theo action/resource như `orders:read`, `orders:write`. OAuth2 scopes tích hợp tốt với OpenAPI và `Security` dependencies.\
\
Ví dụ dependency kiểm scope:\
```python\
async def require_scope(user: User, scope: str):\
    if scope not in user.scopes:\
        raise HTTPException(status_code=403, detail=\\"Forbidden\\")\
```\
Production thường kết hợp: role để quản trị đơn giản, scope/permission để kiểm soát API chi tiết. Authorization phải nằm ở backend, không dựa vào frontend route guard.

## Detailed Answer (EN)
Roles fit coarse-grained permissions such as admin/user/support. Scopes fit fine-grained permissions by action/resource such as `orders:read`, `orders:write`. OAuth2 scopes integrate well with OpenAPI and `Security` dependencies.\
\
Scope-checking dependency example:\
```python\
async def require_scope(user: User, scope: str):\
    if scope not in user.scopes:\
        raise HTTPException(status_code=403, detail=\\"Forbidden\\")\
```\
Production often combines both: roles for simple administration and scopes/permissions for detailed API control. Authorization must live in the backend, not in frontend route guards.
