---
id: decorator-metadata-va-reflect-metadata-la-gi
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Decorator metadata và reflect-metadata là gì?

## Question (EN)
What are decorator metadata and reflect-metadata?

## Đáp án chi tiết (VI)
Reflect Metadata API cho phép đọc/ghi metadata trên class/method tại runtime. TypeScript emit metadata khi emitDecoratorMetadata: true (design:type, design:paramtypes, design:returntype). Dùng bởi dependency injection frameworks (Angular, NestJS) để resolve constructor params tự động.\
\
```typescript\
import 'reflect-metadata';\
\
@Injectable()\
class UserService {\
  constructor(private repo: UserRepository) {}\
  // NestJS đọc design:paramtypes → tự inject UserRepository\
}\
```

## Detailed Answer (EN)
The Reflect Metadata API allows reading/writing metadata on classes/methods at runtime. TypeScript emits metadata when emitDecoratorMetadata: true (design:type, design:paramtypes, design:returntype). Used by dependency injection frameworks (Angular, NestJS) to automatically resolve constructor parameters.\
\
```typescript\
import 'reflect-metadata';\
\
@Injectable()\
class UserService {\
  constructor(private repo: UserRepository) {}\
  // NestJS reads design:paramtypes → auto-injects UserRepository\
}\
```
