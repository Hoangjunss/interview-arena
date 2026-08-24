---
id: html-attribute-thuoc-tinh-la-gi-cho-vi-du
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HTML Attribute (thuộc tính) là gì? Cho ví dụ?

## Question (EN)
What is an attribute? Give examples.

## Đáp án chi tiết (VI)
Attribute cung cấp thông tin bổ sung cho element, viết trong **thẻ mở** theo cú pháp `name=\\"value\\"`:\
\
```html\
\u003ca href=\\"https://example.com\\" target=\\"_blank\\" rel=\\"noopener\\"\u003eLink\u003c/a\u003e\
\u003cimg src=\\"/logo.png\\" alt=\\"Logo công ty\\" width=\\"120\\"\u003e\
\u003cinput type=\\"email\\" placeholder=\\"you@example.com\\" required\u003e\
```\
\
Ba nhóm hay gặp:\
- **Global** — dùng được trên mọi thẻ: `id`, `class`, `style`, `title`, `hidden`, `data-*`.\
- **Riêng từng thẻ**: `href` (a), `src`/`alt` (img), `type`/`name` (input).\
- **Boolean** — chỉ cần có mặt: `disabled`, `checked`, `required`.\
\
Tên attribute **không phân biệt hoa thường**, giá trị thì có: `class=\\"Btn\\"` khác `class=\\"btn\\"`.\
\
**Lưu ý:** `target=\\"_blank\\"` mà thiếu `rel=\\"noopener\\"` thì trang đích đọc được `window.opener` — browser hiện đại đã mặc định chặn, nhưng interviewer vẫn hỏi và code cũ vẫn cần thêm tay.

## Detailed Answer (EN)
An attribute adds information to an element and lives in the **opening tag** as `name=\\"value\\"`:\
\
```html\
\u003ca href=\\"https://example.com\\" target=\\"_blank\\" rel=\\"noopener\\"\u003eLink\u003c/a\u003e\
\u003cimg src=\\"/logo.png\\" alt=\\"Company logo\\" width=\\"120\\"\u003e\
\u003cinput type=\\"email\\" placeholder=\\"you@example.com\\" required\u003e\
```\
\
Three common groups:\
- **Global** — valid on any element: `id`, `class`, `style`, `title`, `hidden`, `data-*`.\
- **Element-specific**: `href` (a), `src`/`alt` (img), `type`/`name` (input).\
- **Boolean** — presence is the value: `disabled`, `checked`, `required`.\
\
Attribute names are **case-insensitive**; values are not: `class=\\"Btn\\"` differs from `class=\\"btn\\"`.\
\
**Note:** `target=\\"_blank\\"` without `rel=\\"noopener\\"` lets the destination read `window.opener`. Modern browsers imply it now, but interviewers still ask and legacy code still needs it spelled out.
