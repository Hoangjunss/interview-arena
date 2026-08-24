---
id: api-key-authentication-va-multi-tenant-trong-nestjs
position: backend
technology: auth-\u0026-security
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
API Key authentication và multi-tenant trong NestJS?

## Question (EN)
API Key authentication and multi-tenant patterns in NestJS?

## Đáp án chi tiết (VI)
$79

## Detailed Answer (EN)
**API Key Guard**: extract key from header, validate against DB or cache:\
```typescript\
@Injectable()\
export class ApiKeyGuard implements CanActivate {\
  async canActivate(context: ExecutionContext) {\
    const request = context.switchToHttp().getRequest();\
    const apiKey = request.headers['x-api-key'];\
    const keyRecord = await this.apiKeysService.validateKey(apiKey);\
    if (!keyRecord) throw new UnauthorizedException();\
    request.tenant = keyRecord.tenant;\
    return true;\
  }\
}\
```\
\
**Multi-tenant**: REQUEST-scoped `TenantContext` service reads tenant from request, services filter data by tenant. Strategies: separate DB, shared DB with tenant_id column, schema per tenant.
