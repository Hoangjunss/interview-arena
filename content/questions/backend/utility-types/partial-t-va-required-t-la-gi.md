---
id: partial-t-va-required-t-la-gi
position: backend
technology: utility-types
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Partial\u003cT\u003e` và `Required\u003cT\u003e` là gì?

## Question (EN)
What are `Partial\u003cT\u003e` and `Required\u003cT\u003e`?

## Đáp án chi tiết (VI)
`Partial\u003cT\u003e` làm tất cả properties của T thành optional. `Required\u003cT\u003e` làm tất cả optional thành required. Cả hai chỉ shallow.\
\
```typescript\
interface User { id: number; name: string; bio?: string }\
\
// Partial: dùng cho PATCH requests\
function updateUser(id: string, data: Partial\u003cUser\u003e) { /* ... */ }\
updateUser('1', { name: 'New Name' }); // OK, không cần gửi toàn bộ\
\
// Required: enforce tất cả fields sau validation\
const validated: Required\u003cUser\u003e = { id: 1, name: 'An', bio: 'Dev' };\
```

## Detailed Answer (EN)
`Partial\u003cT\u003e` makes all properties of T optional. `Required\u003cT\u003e` makes all optional properties required. Both are shallow.\
\
```typescript\
interface User { id: number; name: string; bio?: string }\
\
// Partial: used for PATCH requests\
function updateUser(id: string, data: Partial\u003cUser\u003e) { /* ... */ }\
updateUser('1', { name: 'New Name' }); // OK, no need to send everything\
\
// Required: enforce all fields after validation\
const validated: Required\u003cUser\u003e = { id: 1, name: 'An', bio: 'Dev' };\
```
