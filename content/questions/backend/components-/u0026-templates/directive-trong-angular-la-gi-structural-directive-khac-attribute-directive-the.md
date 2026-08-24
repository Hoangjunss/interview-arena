---
id: directive-trong-angular-la-gi-structural-directive-khac-attribute-directive-the
position: backend
technology: components-\u0026-templates
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Directive trong Angular là gì? Structural directive khác attribute directive thế nào?

## Question (EN)
What is a directive in Angular? How do structural directives differ from attribute directives?

## Đáp án chi tiết (VI)
Directive là class gắn behavior vào DOM hoặc template.\
\
Attribute directive thay đổi behavior/appearance của element có sẵn, ví dụ highlight hoặc permission state. Structural directive thay đổi cấu trúc DOM bằng cách thêm/xóa view. Trong Angular hiện đại, legacy `*ngIf`, `*ngFor`, `*ngSwitch` đã bị deprecate từ v20 để ưu tiên block syntax như `@if`, `@for`, `@switch`.

## Detailed Answer (EN)
A directive is a class that attaches behavior to the DOM or a template.\
\
An attribute directive changes behavior or appearance of an existing element, such as highlight or permission state. A structural directive changes DOM structure by adding/removing views. In modern Angular, legacy `*ngIf`, `*ngFor`, and `*ngSwitch` have been deprecated since v20 in favor of block syntax such as `@if`, `@for`, and `@switch`.
