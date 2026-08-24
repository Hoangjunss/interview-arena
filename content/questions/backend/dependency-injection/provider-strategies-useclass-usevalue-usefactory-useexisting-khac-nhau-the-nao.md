---
id: provider-strategies-useclass-usevalue-usefactory-useexisting-khac-nhau-the-nao
position: backend
technology: dependency-injection
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Provider strategies `useClass`, `useValue`, `useFactory`, `useExisting` khác nhau thế nào?

## Question (EN)
How do provider strategies `useClass`, `useValue`, `useFactory`, and `useExisting` differ?

## Đáp án chi tiết (VI)
`useClass` tạo instance từ class cụ thể, thường để đổi implementation.\
\
Ví dụ các provider strategy:\
```typescript\
providers: [\
  { provide: Logger, useClass: ConsoleLogger },\
  { provide: API_URL, useValue: \\"/api\\" },\
  { provide: SESSION_ID, useFactory: () =\u003e crypto.randomUUID() },\
  { provide: OLD_LOGGER, useExisting: Logger },\
]\
```\
`useValue` cấp object/value có sẵn, `useFactory` tạo dependency động và có thể inject dependency khác, `useExisting` alias token này sang token khác để reuse cùng instance.

## Detailed Answer (EN)
`useClass` creates an instance from a concrete class, often to swap implementations.\
\
Provider strategy examples:\
```typescript\
providers: [\
  { provide: Logger, useClass: ConsoleLogger },\
  { provide: API_URL, useValue: \\"/api\\" },\
  { provide: SESSION_ID, useFactory: () =\u003e crypto.randomUUID() },\
  { provide: OLD_LOGGER, useExisting: Logger },\
]\
```\
`useValue` provides an existing object/value, `useFactory` creates a dynamic dependency and can inject other dependencies, and `useExisting` aliases one token to another to reuse the same instance.
