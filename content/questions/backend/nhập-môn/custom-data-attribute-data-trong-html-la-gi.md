---
id: custom-data-attribute-data-trong-html-la-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Custom data attribute (data-*) trong HTML là gì?

## Question (EN)
What are custom data attributes (data-*)?

## Đáp án chi tiết (VI)
`data-*` cho phép gắn dữ liệu tuỳ ý lên element mà **vẫn hợp lệ theo HTML spec** (dùng attribute tự chế như `userid=\\"123\\"` thì không).\
\
```html\
\u003cli data-user-id=\\"123\\" data-role=\\"admin\\" data-active\u003eĐịnh\u003c/li\u003e\
```\
\
```js\
const li = document.querySelector('li')\
li.dataset.userId   // '123'  — kebab-case tự đổi sang camelCase\
li.dataset.role     // 'admin'\
li.dataset.userId = '456'      // ghi ngược lại DOM\
delete li.dataset.role         // gỡ attribute\
```\
\
Dùng được cả trong CSS:\
\
```css\
li[data-role=\\"admin\\"] { font-weight: 700; }\
li[data-active] { color: var(--accent); }\
```\
\
Ứng dụng thực tế: gắn hook cho test (`data-testid`), truyền id xuống event delegation, đánh dấu state cho CSS thay vì thêm/bớt class.\
\
**Lưu ý:** `dataset` **luôn trả string** — `Number(li.dataset.userId)` chứ đừng so sánh thẳng với số. Và đừng nhét dữ liệu nhạy cảm vào đây: nó nằm nguyên trong HTML gửi về client.

## Detailed Answer (EN)
`data-*` lets you attach arbitrary data to an element while **staying valid per the HTML spec** (an invented attribute such as `userid=\\"123\\"` is not).\
\
```html\
\u003cli data-user-id=\\"123\\" data-role=\\"admin\\" data-active\u003eDinh\u003c/li\u003e\
```\
\
```js\
const li = document.querySelector('li')\
li.dataset.userId   // '123'  — kebab-case becomes camelCase\
li.dataset.role     // 'admin'\
li.dataset.userId = '456'      // writes back to the DOM\
delete li.dataset.role         // removes the attribute\
```\
\
It also works from CSS:\
\
```css\
li[data-role=\\"admin\\"] { font-weight: 700; }\
li[data-active] { color: var(--accent); }\
```\
\
Real uses: test hooks (`data-testid`), carrying an id for event delegation, expressing state for CSS instead of toggling classes.\
\
**Note:** `dataset` **always returns strings** — wrap with `Number()` rather than comparing to a number directly. And never put sensitive data there: it ships verbatim in the HTML.
