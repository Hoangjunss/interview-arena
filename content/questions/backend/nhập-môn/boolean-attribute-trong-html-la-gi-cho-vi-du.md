---
id: boolean-attribute-trong-html-la-gi-cho-vi-du
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Boolean attribute trong HTML là gì? Cho ví dụ?

## Question (EN)
What is a boolean attribute? Give examples.

## Đáp án chi tiết (VI)
Boolean attribute chỉ có hai trạng thái: **có mặt = true, vắng mặt = false**. Giá trị gán cho nó không được xét đến.\
\
```html\
\u003cinput disabled\u003e                  \u003c!-- true --\u003e\
\u003cinput disabled=\\"\\"\u003e               \u003c!-- true --\u003e\
\u003cinput disabled=\\"disabled\\"\u003e       \u003c!-- true --\u003e\
\u003cinput disabled=\\"false\\"\u003e          \u003c!-- VẪN true — chỉ cần attribute có mặt --\u003e\
\u003cinput\u003e                           \u003c!-- false --\u003e\
```\
\
Nhóm hay gặp: `disabled`, `checked`, `selected`, `required`, `readonly`, `autofocus`, `hidden`, `multiple`, `defer`, `async`.\
\
Muốn tắt thì phải **gỡ hẳn attribute**, không phải gán giá trị khác:\
\
```js\
input.removeAttribute('disabled')   // đúng\
input.disabled = false              // đúng — property nhận boolean thật\
input.setAttribute('disabled', 'false') // sai — vẫn disabled\
```\
\
**Chốt:** phân biệt **attribute** (chuỗi trong HTML) và **property** (giá trị boolean trong DOM) là mấu chốt của câu này — trong React, `disabled={false}` an toàn vì React tự gỡ attribute.

## Detailed Answer (EN)
$80
