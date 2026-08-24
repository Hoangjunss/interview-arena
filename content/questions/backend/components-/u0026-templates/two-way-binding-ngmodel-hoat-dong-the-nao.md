---
id: two-way-binding-ngmodel-hoat-dong-the-nao
position: backend
technology: components-\u0026-templates
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Two-way binding `[(ngModel)]` hoạt động thế nào?

## Question (EN)
How does two-way binding with `[(ngModel)]` work?

## Đáp án chi tiết (VI)
`[(ngModel)]` là cú pháp banana-in-a-box kết hợp property binding và event binding: dữ liệu đi xuống input, thay đổi từ input đẩy ngược lên model.\
\
Nó thuộc `FormsModule` và phù hợp với form đơn giản. Với form phức tạp, validation nhiều bước hoặc test nghiêm túc, nên dùng Reactive Forms vì model explicit hơn.

## Detailed Answer (EN)
`[(ngModel)]` is the banana-in-a-box syntax combining property binding and event binding: data flows down into the input, and input changes flow back into the model.\
\
It belongs to `FormsModule` and works well for simple forms. For complex forms, multi-step validation or stricter tests, Reactive Forms are usually better because the model is explicit.
