---
id: type-annotation-trong-typescript-la-gi
position: backend
technology: types-nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Type annotation trong TypeScript là gì?

## Question (EN)
What is type annotation in TypeScript?

## Đáp án chi tiết (VI)
Type annotation là khai báo kiểu tường minh cho biến, parameter, return value: `let name: string = 'John'`. TypeScript cũng có type inference tự suy luận kiểu từ giá trị gán. Annotation thường chỉ cần cho function parameters, return types, và khi inference không đủ thông tin.\
\
```typescript\
function greet(name: string): string {\
  return 'Hi ' + name;\
}\
let count: number = 0; // annotation thường dư (inference đủ)\
let data: unknown;    // cần annotation vì chưa gán\
```

## Detailed Answer (EN)
Type annotation is an explicit type declaration for variables, parameters, and return values: `let name: string = 'John'`. TypeScript also has type inference to automatically infer types from assigned values. Annotations are usually only needed for function parameters, return types, and when inference lacks sufficient information.\
\
```typescript\
function greet(name: string): string {\
  return 'Hi ' + name;\
}\
let count: number = 0; // annotation often redundant (inference sufficient)\
let data: unknown;    // needed when no initial value\
```
