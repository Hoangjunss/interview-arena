---
id: rbac-role-based-access-control-voi-custom-guards-va-decorators-trong-nestjs
position: backend
technology: request-pipeline
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RBAC (Role-Based Access Control) với custom Guards và Decorators trong NestJS?

## Question (EN)
RBAC (Role-Based Access Control) with custom Guards and Decorators in NestJS?

## Đáp án chi tiết (VI)
$82

## Detailed Answer (EN)
RBAC controls access based on user roles. Standard pattern:\
\
**Step 1**: create `@Roles()` decorator:\
```typescript\
export const Roles = (...roles: Role[]) =\u003e SetMetadata(ROLES_KEY, roles);\
```\
\
**Step 2**: create `RolesGuard` reading metadata via `Reflector`, checking `user.roles`.\
\
**Step 3**: register globally and apply:\
```typescript\
@Roles(Role.ADMIN)\
@Get('admin-only')\
getAdminData() { ... }\
```\
\
For fine-grained permissions use the casl library. Pitfall: RolesGuard runs after JwtGuard — ensure user is already attached to request.
