---
id: html5-co-nhung-tinh-nang-moi-nao-so-voi-html4
position: backend
technology: html5
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HTML5 có những tính năng mới nào so với HTML4?

## Question (EN)
What new features does HTML5 introduce compared to HTML4?

## Đáp án chi tiết (VI)
HTML5 (2014) thay đổi ba mảng lớn so với HTML4:\
\
**1. Ngữ nghĩa \u0026 media** — thẻ landmark `\u003cheader\u003e`, `\u003cnav\u003e`, `\u003carticle\u003e`, `\u003csection\u003e`, `\u003cfigure\u003e`; `\u003caudio\u003e`/`\u003cvideo\u003e` chạy thẳng không cần Flash; `\u003ccanvas\u003e` và SVG inline.\
\
**2. API trình duyệt** — `localStorage`/`sessionStorage`, IndexedDB, Geolocation, Web Worker, WebSocket, History API, Drag \u0026 Drop.\
\
**3. Form** — validation dựng sẵn và kiểu input mới:\
\
```html\
\u003cform\u003e\
  \u003cinput type=\\"email\\" required\u003e          \u003c!-- browser tự báo lỗi --\u003e\
  \u003cinput type=\\"date\\"\u003e\
  \u003cinput type=\\"number\\" min=\\"1\\" max=\\"10\\"\u003e\
  \u003cinput type=\\"range\\"\u003e\
  \u003cinput type=\\"color\\"\u003e\
  \u003cbutton\u003eGửi\u003c/button\u003e\
\u003c/form\u003e\
```\
\
Cộng thêm phần ít ai nhớ nhưng quan trọng: **HTML5 chuẩn hoá cách parse HTML lỗi**. Trước đó mỗi browser tự đoán một kiểu, đó là nguồn gốc của phần lớn bug \\"chạy trên Chrome, hỏng trên Firefox\\" thời HTML4.\
\
**Chốt:** DOCTYPE rút còn `\u003c!DOCTYPE html\u003e` cũng là thay đổi của HTML5 — vì spec bỏ hẳn ràng buộc DTD của SGML.

## Detailed Answer (EN)
HTML5 (2014) changed three areas compared with HTML4:\
\
**1. Semantics \u0026 media** — landmark elements `\u003cheader\u003e`, `\u003cnav\u003e`, `\u003carticle\u003e`, `\u003csection\u003e`, `\u003cfigure\u003e`; `\u003caudio\u003e`/`\u003cvideo\u003e` without Flash; `\u003ccanvas\u003e` and inline SVG.\
\
**2. Browser APIs** — `localStorage`/`sessionStorage`, IndexedDB, Geolocation, Web Workers, WebSocket, History API, Drag \u0026 Drop.\
\
**3. Forms** — built-in validation and new input types:\
\
```html\
\u003cform\u003e\
  \u003cinput type=\\"email\\" required\u003e          \u003c!-- the browser reports the error --\u003e\
  \u003cinput type=\\"date\\"\u003e\
  \u003cinput type=\\"number\\" min=\\"1\\" max=\\"10\\"\u003e\
  \u003cinput type=\\"range\\"\u003e\
  \u003cinput type=\\"color\\"\u003e\
  \u003cbutton\u003eSubmit\u003c/button\u003e\
\u003c/form\u003e\
```\
\
Plus the part few candidates mention but that mattered most: **HTML5 standardised error-tolerant parsing**. Before it, every browser guessed differently — the root cause of most \\"works in Chrome, breaks in Firefox\\" bugs of the HTML4 era.\
\
**Takeaway:** the shrunken `\u003c!DOCTYPE html\u003e` is an HTML5 change too, because the spec dropped SGML's DTD requirement entirely.
