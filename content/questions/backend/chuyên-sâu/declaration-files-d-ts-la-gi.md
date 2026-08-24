---
id: declaration-files-d-ts-la-gi
position: backend
technology: chuyên-sâu
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Declaration files (.d.ts) là gì?

## Question (EN)
What are declaration files (.d.ts)?

## Đáp án chi tiết (VI)
Declaration files chứa type declarations không có implementation (ambient declarations). Dùng để type third-party libraries không viết bằng TS. @types/ packages trên npm. Tự viết .d.ts khi cần declare types cho JS code hoặc global variables.\
\
```typescript\
// Khai báo SVG imports (pattern phổ biến với Vite/Webpack)\
declare module '*.svg' {\
  const content: string;\
  export default content;\
}\
\
// Mở rộng global:\
declare global {\
  interface Window { analytics: Analytics; }\
}\
```

## Detailed Answer (EN)
Declaration files contain type declarations without implementations (ambient declarations). Used to type third-party libraries not written in TS. Available as @types/ packages on npm. Write your own .d.ts when you need to declare types for JS code or global variables.\
\
```typescript\
// Declaring SVG imports (common with Vite/Webpack)\
declare module '*.svg' {\
  const content: string;\
  export default content;\
}\
\
// Extending globals:\
declare global {\
  interface Window { analytics: Analytics; }\
}\
```
