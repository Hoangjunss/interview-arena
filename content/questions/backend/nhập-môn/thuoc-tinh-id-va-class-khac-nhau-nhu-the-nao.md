---
id: thuoc-tinh-id-va-class-khac-nhau-nhu-the-nao
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thuộc tính `id` và `class` khác nhau như thế nào?

## Question (EN)
How do the `id` and `class` attributes differ?

## Đáp án chi tiết (VI)
`id` **duy nhất trên toàn trang**, `class` **dùng lại thoải mái**.\
\
```html\
\u003csection id=\\"pricing\\" class=\\"card card--wide\\"\u003e...\u003c/section\u003e\
\u003c!-- một element nhiều class; nhưng chỉ một id --\u003e\
```\
\
```js\
document.getElementById('pricing')          // nhanh, chỉ trả 1 element\
document.querySelectorAll('.card')          // trả NodeList\
```\
\
| | `id` | `class` |\
|---|---|---|\
| Số lần xuất hiện | 1 | nhiều |\
| Specificity | (1,0,0) | (0,1,0) |\
| Dùng cho | anchor `#pricing`, `label[for]`, `aria-labelledby` | style, nhóm element |\
\
Vì specificity của id cao hơn class **10 lần bậc**, style gắn vào id gần như không override được bằng class — nên quy ước phổ biến là **id để móc nối (JS/anchor/a11y), class để style**.\
\
**Lưu ý JSX:** React dùng `className` thay `class` và `htmlFor` thay `for`, vì `class`/`for` là từ khoá của JavaScript.

## Detailed Answer (EN)
`id` is **unique per page**, `class` is **freely reusable**.\
\
```html\
\u003csection id=\\"pricing\\" class=\\"card card--wide\\"\u003e...\u003c/section\u003e\
\u003c!-- many classes per element; only one id --\u003e\
```\
\
```js\
document.getElementById('pricing')          // fast, returns a single element\
document.querySelectorAll('.card')          // returns a NodeList\
```\
\
| | `id` | `class` |\
|---|---|---|\
| Occurrences | 1 | many |\
| Specificity | (1,0,0) | (0,1,0) |\
| Used for | anchor `#pricing`, `label[for]`, `aria-labelledby` | styling, grouping |\
\
Because an id outranks a class by a whole specificity tier, styles bound to an id are nearly impossible to override with a class — hence the common convention: **ids for hooks (JS/anchor/a11y), classes for styling**.\
\
**JSX note:** React uses `className` instead of `class` and `htmlFor` instead of `for`, because `class` and `for` are JavaScript keywords.
