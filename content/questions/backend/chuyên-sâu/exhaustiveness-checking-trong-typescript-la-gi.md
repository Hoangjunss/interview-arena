---
id: exhaustiveness-checking-trong-typescript-la-gi
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Exhaustiveness checking trong TypeScript là gì?

## Question (EN)
What is exhaustiveness checking in TypeScript?

## Đáp án chi tiết (VI)
Sau khi handle tất cả cases trong discriminated union, assign default case sang variable type `never`. Nếu có case chưa handle, TS báo lỗi.\
```typescript\
type Action =\
  | { type: 'INCREMENT' }\
  | { type: 'DECREMENT' }\
  | { type: 'RESET' };\
\
function reducer(state: number, action: Action): number {\
  switch (action.type) {\
    case 'INCREMENT': return state + 1;\
    case 'DECREMENT': return state - 1;\
    case 'RESET':     return 0;\
    default:\
      // Nếu thêm 'SET' vào Action mà không handle, dòng này báo lỗi\
      const exhaustive: never = action;\
      throw new Error(`Unhandled action: ${exhaustive}`);\
  }\
}\
\
// Hoặc dùng helper function\
function assertNever(x: never): never {\
  throw new Error('Unexpected value: ' + x);\
}\
```\
Pattern này đảm bảo thêm case mới vào union sẽ bị catch ngay tại compile time.

## Detailed Answer (EN)
After handling all cases of a discriminated union, assign the default case to a variable of type `never`. If any case is unhandled, TS reports an error.\
```typescript\
type Action =\
  | { type: 'INCREMENT' }\
  | { type: 'DECREMENT' }\
  | { type: 'RESET' };\
\
function reducer(state: number, action: Action): number {\
  switch (action.type) {\
    case 'INCREMENT': return state + 1;\
    case 'DECREMENT': return state - 1;\
    case 'RESET':     return 0;\
    default:\
      // If 'SET' is added to Action without handling it, this line errors\
      const exhaustive: never = action;\
      throw new Error(`Unhandled action: ${exhaustive}`);\
  }\
}\
\
// Or use a helper function\
function assertNever(x: never): never {\
  throw new Error('Unexpected value: ' + x);\
}\
```\
This pattern ensures that adding a new case to the union is caught immediately at compile time.
