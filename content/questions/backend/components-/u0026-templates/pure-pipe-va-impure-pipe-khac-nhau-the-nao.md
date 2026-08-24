---
id: pure-pipe-va-impure-pipe-khac-nhau-the-nao
position: backend
technology: components-\u0026-templates
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pure pipe và impure pipe khác nhau thế nào?

## Question (EN)
How are pure pipes different from impure pipes?

## Đáp án chi tiết (VI)
Pipe transform dữ liệu trong template. Mặc định pipe là pure: Angular chỉ gọi lại khi primitive value đổi hoặc object/array reference đổi, nên hiệu năng tốt hơn.\
\
Ví dụ custom pure pipe:\
```typescript\
@Pipe({ name: \\"kebabCase\\" })\
export class KebabCasePipe implements PipeTransform {\
  transform(value: string): string {\
    return value.toLowerCase().replaceAll(\\" \\

## Detailed Answer (EN)
A pipe transforms data in a template. Pipes are pure by default: Angular reruns them only when a primitive changes or an object/array reference changes, which is better for performance.\
\
Custom pure pipe example:\
```typescript\
@Pipe({ name: \\"kebabCase\\" })\
export class KebabCasePipe implements PipeTransform {\
  transform(value: string): string {\
    return value.toLowerCase().replaceAll(\\" \\
