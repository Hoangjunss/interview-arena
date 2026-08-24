---
id: control-flow-moi-if-for-switch-khac-ngif-ngfor-the-nao
position: backend
technology: components-\u0026-templates
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Control flow mới `@if`, `@for`, `@switch` khác `*ngIf`, `*ngFor` thế nào?

## Question (EN)
How do new control flow blocks `@if`, `@for`, `@switch` differ from `*ngIf`, `*ngFor`?

## Đáp án chi tiết (VI)
Control flow block là cú pháp template built-in, không cần import directive và dễ type-check hơn.\
\
Ví dụ:\
```html\
@if (user(); as u) {\
  \u003ch2\u003e{{ u.name }}\u003c/h2\u003e\
} @else {\
  \u003capp-login /\u003e\
}\
\
@for (item of items(); track item.id) {\
  \u003capp-row [item]=\\"item\\" /\u003e\
} @empty {\
  \u003cp\u003eNo data\u003c/p\u003e\
}\
```\
Từ Angular v20, `NgIf`, `NgFor`, `NgSwitch` đã deprecate, nên code mới nên dùng block syntax.

## Detailed Answer (EN)
Control flow blocks are built-in template syntax, require no directive import and are easier to type-check.\
\
Example:\
```html\
@if (user(); as u) {\
  \u003ch2\u003e{{ u.name }}\u003c/h2\u003e\
} @else {\
  \u003capp-login /\u003e\
}\
\
@for (item of items(); track item.id) {\
  \u003capp-row [item]=\\"item\\" /\u003e\
} @empty {\
  \u003cp\u003eNo data\u003c/p\u003e\
}\
```\
Since Angular v20, `NgIf`, `NgFor`, and `NgSwitch` are deprecated, so new code should use block syntax.
