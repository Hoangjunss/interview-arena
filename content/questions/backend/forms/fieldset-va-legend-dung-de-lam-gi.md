---
id: fieldset-va-legend-dung-de-lam-gi
position: backend
technology: forms
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`\u003cfieldset\u003e` và `\u003clegend\u003e` dùng để làm gì?

## Question (EN)
What are `\u003cfieldset\u003e` and `\u003clegend\u003e` used for?

## Đáp án chi tiết (VI)
`\u003cfieldset\u003e` nhóm các control liên quan, `\u003clegend\u003e` là nhãn của cả nhóm.\
\
```html\
\u003cfieldset\u003e\
  \u003clegend\u003eHình thức thanh toán\u003c/legend\u003e\
\
  \u003clabel\u003e\u003cinput type=\\"radio\\" name=\\"pay\\" value=\\"cod\\"\u003e Khi nhận hàng\u003c/label\u003e\
  \u003clabel\u003e\u003cinput type=\\"radio\\" name=\\"pay\\" value=\\"bank\\"\u003e Chuyển khoản\u003c/label\u003e\
\u003c/fieldset\u003e\
```\
\
Giá trị lớn nhất nằm ở **nhóm radio/checkbox**. Mỗi radio có label riêng (\\"Khi nhận hàng\\"), nhưng không có gì nói **đang chọn cho câu hỏi nào**. Screen reader đọc `legend` trước mỗi lựa chọn → \\"Hình thức thanh toán, Khi nhận hàng, radio 1/2\\".\
\
Mẹo ít người biết: `disabled` trên `\u003cfieldset\u003e` **vô hiệu hoá toàn bộ control bên trong** — tiện cho trạng thái đang gửi form:\
\
```html\
\u003cfieldset disabled\u003e   \u003c!-- mọi input/button bên trong đều bị disable --\u003e\
```\
\
**Lưu ý:** `\u003cfieldset\u003e` có style mặc định (border, padding, và `min-width: min-content` khó ghi đè) hay phá layout flex/grid. Reset bằng `border: 0; padding: 0; min-width: 0;` thay vì bỏ luôn thẻ.

## Detailed Answer (EN)
`\u003cfieldset\u003e` groups related controls and `\u003clegend\u003e` names the group.\
\
```html\
\u003cfieldset\u003e\
  \u003clegend\u003ePayment method\u003c/legend\u003e\
\
  \u003clabel\u003e\u003cinput type=\\"radio\\" name=\\"pay\\" value=\\"cod\\"\u003e Cash on delivery\u003c/label\u003e\
  \u003clabel\u003e\u003cinput type=\\"radio\\" name=\\"pay\\" value=\\"bank\\"\u003e Bank transfer\u003c/label\u003e\
\u003c/fieldset\u003e\
```\
\
Its biggest payoff is **radio/checkbox groups**. Each radio has its own label (\\"Cash on delivery\\"), but nothing states **which question is being answered**. Screen readers announce the `legend` before each option → \\"Payment method, Cash on delivery, radio 1 of 2\\".\
\
A lesser-known trick: `disabled` on `\u003cfieldset\u003e` **disables every control inside** — handy for a submitting state:\
\
```html\
\u003cfieldset disabled\u003e   \u003c!-- every input/button inside is disabled --\u003e\
```\
\
**Note:** `\u003cfieldset\u003e` ships opinionated defaults (border, padding, and a stubborn `min-width: min-content`) that break flex/grid layouts. Reset with `border: 0; padding: 0; min-width: 0;` rather than dropping the element.
