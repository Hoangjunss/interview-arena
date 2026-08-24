---
id: custom-providers-usevalue-useclass-usefactory-useexisting-khi-nao-dung-cai-nao
position: backend
technology: core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Custom providers: useValue, useClass, useFactory, useExisting — khi nào dùng cái nào?

## Question (EN)
Custom providers: useValue, useClass, useFactory, useExisting — when to use each?

## Đáp án chi tiết (VI)
Custom providers cho phép kiểm soát cách NestJS tạo và inject dependencies:\
\
**useValue**: inject giá trị cụ thể — thường dùng cho config objects, mocking trong tests:\
```typescript\
{ provide: 'CONFIG', useValue: { apiKey: 'abc' } }\
```\
\
**useClass**: chỉ định class khác để inject — dùng để swap implementation (mock, stub):\
```typescript\
{ provide: UserService, useClass: MockUserService }\
```\
\
**useFactory**: factory function tạo provider — hỗ trợ async và inject dependencies:\
```typescript\
{ provide: 'DB', useFactory: async (config: ConfigService) =\u003e {\
  return createConnection(config.get('DB_URL'))\
}, inject: [ConfigService] }\
```\
\
**useExisting**: alias — inject cùng instance từ token khác:\
```typescript\
{ provide: 'LOGGER', useExisting: WinstonLogger }\
```\
\
Sử dụng string token cần `@Inject('TOKEN')` decorator trong constructor vì TypeScript không thể reflect string literals.

## Detailed Answer (EN)
Custom providers control how NestJS creates and injects dependencies:\
\
**useValue**: inject a specific value — for config objects or mocking in tests.\
\
**useClass**: specify a different class — swap implementations (mock, stub).\
\
**useFactory**: factory function creating provider — supports async and dependency injection:\
```typescript\
{ provide: 'DB', useFactory: async (config) =\u003e createConn(config.get('URL')), inject: [ConfigService] }\
```\
\
**useExisting**: alias — injects the same instance under a different token.\
\
String tokens require `@Inject('TOKEN')` decorator because TypeScript cannot reflect string literals.
