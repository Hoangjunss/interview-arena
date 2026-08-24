---
id: discriminated-unions-la-gi-tai-sao-huu-ich
position: backend
technology: interface-\u0026-type
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Discriminated unions là gì? Tại sao hữu ích?

## Question (EN)
What are discriminated unions? Why are they useful?

## Đáp án chi tiết (VI)
Discriminated union là union trong đó mỗi member có common literal property (discriminant). TypeScript narrow type tự động khi check discriminant.\
```typescript\
type Shape =\
  | { kind: 'circle'; radius: number }\
  | { kind: 'square'; side: number }\
  | { kind: 'triangle'; base: number; height: number };\
\
function area(shape: Shape): number {\
  switch (shape.kind) {\
    case 'circle':\
      return Math.PI * shape.radius ** 2;\
    case 'square':\
      return shape.side ** 2;\
    case 'triangle':\
      return (shape.base * shape.height) / 2;\
  }\
}\
```\
Giúp type-safe handling cases khác nhau, TypeScript sẽ báo lỗi nếu thiếu case.

## Detailed Answer (EN)
A discriminated union is a union where each member has a common literal property (the discriminant). TypeScript automatically narrows the type when checking the discriminant.\
```typescript\
type Shape =\
  | { kind: 'circle'; radius: number }\
  | { kind: 'square'; side: number }\
  | { kind: 'triangle'; base: number; height: number };\
\
function area(shape: Shape): number {\
  switch (shape.kind) {\
    case 'circle':\
      return Math.PI * shape.radius ** 2;\
    case 'square':\
      return shape.side ** 2;\
    case 'triangle':\
      return (shape.base * shape.height) / 2;\
  }\
}\
```\
Provides type-safe handling of different cases — TypeScript reports an error if a case is missing.
