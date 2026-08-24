---
id: index-signature-trong-typescript-la-gi
position: backend
technology: interface-\u0026-type
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Index signature trong TypeScript là gì?

## Question (EN)
What is an index signature in TypeScript?

## Đáp án chi tiết (VI)
Index signature cho phép object có keys không biết trước. Tất cả explicit properties phải compatible với index signature type.\
\
```typescript\
interface StringMap { [key: string]: string }\
const headers: StringMap = { 'Content-Type': 'application/json' };\
\
// Lưu ý: explicit properties cũng phải match\
interface WithLength {\
  [key: string]: string;\
  length: number; // Error! length phải là string\
}\
\
// Record\u003cK,V\u003e thường rõ ràng hơn:\
const routes: Record\u003cstring, string\u003e = { home: '/', about: '/about' };\
```

## Detailed Answer (EN)
An index signature allows objects to have unknown keys in advance. All explicit properties must be compatible with the index signature type.\
\
```typescript\
interface StringMap { [key: string]: string }\
const headers: StringMap = { 'Content-Type': 'application/json' };\
\
// Note: explicit properties must also match the index signature type\
interface WithLength {\
  [key: string]: string;\
  length: number; // Error! length must also be string\
}\
\
// Record\u003cK,V\u003e is often clearer:\
const routes: Record\u003cstring, string\u003e = { home: '/', about: '/about' };\
```
