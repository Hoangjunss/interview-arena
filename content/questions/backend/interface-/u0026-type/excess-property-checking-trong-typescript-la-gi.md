---
id: excess-property-checking-trong-typescript-la-gi
position: backend
technology: interface-\u0026-type
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Excess property checking trong TypeScript là gì?

## Question (EN)
What is excess property checking in TypeScript?

## Đáp án chi tiết (VI)
TypeScript kiểm tra extra properties khi assign object literal trực tiếp vào typed variable. Nhưng assign qua biến trung gian không bị check — đây là behavior khá bất ngờ.\
\
```typescript\
interface Config { host: string; port: number }\
\
// Object literal — excess property check:\
const cfg: Config = { host: 'localhost', port: 3000, debug: true }; // Error!\
\
// Qua biến trung gian — không bị check:\
const raw = { host: 'localhost', port: 3000, debug: true };\
const cfg2: Config = raw; // OK (chỉ check structural compatibility)\
```\
\
Behavior này giúp phát hiện typos trong config objects.

## Detailed Answer (EN)
TypeScript checks for extra properties when assigning an object literal directly to a typed variable. However, assigning via an intermediate variable bypasses this check — a surprisingly inconsistent behavior.\
\
```typescript\
interface Config { host: string; port: number }\
\
// Object literal — excess property check fires:\
const cfg: Config = { host: 'localhost', port: 3000, debug: true }; // Error!\
\
// Via intermediate variable — no check:\
const raw = { host: 'localhost', port: 3000, debug: true };\
const cfg2: Config = raw; // OK (only structural compatibility is checked)\
```\
\
This behavior helps catch typos in config objects.
