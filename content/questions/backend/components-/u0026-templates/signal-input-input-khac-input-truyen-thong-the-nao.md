---
id: signal-input-input-khac-input-truyen-thong-the-nao
position: backend
technology: components-\u0026-templates
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Signal input `input()` khác `@Input()` truyền thống thế nào?

## Question (EN)
How is signal input `input()` different from traditional `@Input()`?

## Đáp án chi tiết (VI)
`input()` tạo một InputSignal đọc bằng cách gọi function, ví dụ `userId()`, và compose tự nhiên với `computed()` hoặc `effect()`.\
\
Ví dụ:\
```typescript\
@Component({ template: \\"\u003cp\u003eUser {{ userId() }}\u003c/p\u003e\\" })\
export class UserCard {\
  userId = input.required\u003cstring\u003e()\
  displayId = computed(() =\u003e `#${this.userId()}`)\
}\
```\
`@Input()` vẫn dùng được, nhất là trong code cũ; nhưng khi viết component mới, signal input giúp template và reactive state nhất quán hơn.

## Detailed Answer (EN)
`input()` creates an InputSignal that you read by calling it, for example `userId()`, and it composes naturally with `computed()` or `effect()`.\
\
Example:\
```typescript\
@Component({ template: \\"\u003cp\u003eUser {{ userId() }}\u003c/p\u003e\\" })\
export class UserCard {\
  userId = input.required\u003cstring\u003e()\
  displayId = computed(() =\u003e `#${this.userId()}`)\
}\
```\
`@Input()` still works, especially in older code; but for new components, signal inputs keep templates and reactive state more consistent.
