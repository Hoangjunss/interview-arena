---
id: module-augmentation-la-gi
position: backend
technology: interface-\u0026-type
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Module augmentation là gì?

## Question (EN)
What is module augmentation?

## Đáp án chi tiết (VI)
Module augmentation cho phép thêm types vào module đã có. Dùng để extend third-party types mà không fork. Cần import module đó (ambient augmentation vs global augmentation). Rất hữu ích cho middleware patterns.\
\
```typescript\
// Thêm user vào Express Request (pattern phổ biến với auth middleware)\
declare module 'express' {\
  interface Request {\
    user?: { id: string; role: string };\
  }\
}\
\
// Trong route:\
app.get('/me', (req, res) =\u003e {\
  res.json(req.user); // TS biết type của user\
});\
```

## Detailed Answer (EN)
Module augmentation allows adding types to an existing module. Used to extend third-party types without forking. Requires importing the module (ambient augmentation vs global augmentation). Very useful for middleware patterns.\
\
```typescript\
// Add user to Express Request (common auth middleware pattern)\
declare module 'express' {\
  interface Request {\
    user?: { id: string; role: string };\
  }\
}\
\
// In route handler:\
app.get('/me', (req, res) =\u003e {\
  res.json(req.user); // TS knows the type of user\
});\
```
