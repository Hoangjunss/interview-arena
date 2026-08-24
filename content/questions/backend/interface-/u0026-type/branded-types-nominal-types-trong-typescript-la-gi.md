---
id: branded-types-nominal-types-trong-typescript-la-gi
position: backend
technology: interface-\u0026-type
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Branded types (nominal types) trong TypeScript là gì?

## Question (EN)
What are branded types (nominal types) in TypeScript?

## Đáp án chi tiết (VI)
TypeScript dùng structural typing (shape giống nhau là tương thích). Branded types tạo nominal typing để ngăn nhầm lẫn giữa các string types semantically khác nhau (UserId vs Email).\
\
```typescript\
type UserId = string \u0026 { readonly _brand: 'UserId' };\
type Email  = string \u0026 { readonly _brand: 'Email' };\
\
// Factory function tạo branded value:\
function makeUserId(id: string): UserId { return id as UserId; }\
\
function sendMail(email: Email) { /* ... */ }\
const id = makeUserId('abc123');\
sendMail(id); // Error! UserId không phải Email\
```

## Detailed Answer (EN)
TypeScript uses structural typing (same shape = compatible). Branded types create nominal typing to prevent confusing semantically different string types (UserId vs Email).\
\
```typescript\
type UserId = string \u0026 { readonly _brand: 'UserId' };\
type Email  = string \u0026 { readonly _brand: 'Email' };\
\
// Factory function to create branded value:\
function makeUserId(id: string): UserId { return id as UserId; }\
\
function sendMail(email: Email) { /* ... */ }\
const id = makeUserId('abc123');\
sendMail(id); // Error! UserId is not Email\
```
