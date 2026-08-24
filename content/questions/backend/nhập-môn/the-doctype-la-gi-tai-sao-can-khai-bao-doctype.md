---
id: the-doctype-la-gi-tai-sao-can-khai-bao-doctype
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thẻ DOCTYPE là gì? Tại sao cần khai báo DOCTYPE?

## Question (EN)
What is DOCTYPE? Why is it necessary?

## Đáp án chi tiết (VI)
DOCTYPE (Document Type Declaration) khai báo phiên bản HTML đang dùng và **phải nằm ở dòng đầu tiên**. HTML5 chỉ cần một dòng:\
\
```html\
\u003c!DOCTYPE html\u003e\
\u003chtml lang=\\"vi\\"\u003e\
  \u003chead\u003e\u003cmeta charset=\\"utf-8\\"\u003e\u003c/head\u003e\
  \u003cbody\u003e...\u003c/body\u003e\
\u003c/html\u003e\
```\
\
Nó quyết định browser render ở **standards mode** hay **quirks mode**. Thiếu DOCTYPE → quirks mode, và khác biệt lớn nhất là **box model**: `width` bị tính gộp cả padding + border (kiểu IE5) thay vì chỉ phần content.\
\
```js\
document.compatMode\
// 'CSS1Compat' = standards mode\
// 'BackCompat'  = quirks mode\
```\
\
**Lưu ý:** DOCTYPE không phải thẻ HTML và không phải comment — đặt nó sau một comment hay một dòng trắng có BOM vẫn đủ để rơi vào quirks mode ở một số browser. Luôn để nó là byte đầu tiên của file.

## Detailed Answer (EN)
DOCTYPE (Document Type Declaration) states which HTML version the document uses and **must be the first line**. HTML5 needs a single line:\
\
```html\
\u003c!DOCTYPE html\u003e\
\u003chtml lang=\\"en\\"\u003e\
  \u003chead\u003e\u003cmeta charset=\\"utf-8\\"\u003e\u003c/head\u003e\
  \u003cbody\u003e...\u003c/body\u003e\
\u003c/html\u003e\
```\
\
It decides whether the browser renders in **standards mode** or **quirks mode**. Without it you get quirks mode, whose biggest difference is the **box model**: `width` includes padding and border (the old IE5 behaviour) instead of the content box alone.\
\
```js\
document.compatMode\
// 'CSS1Compat' = standards mode\
// 'BackCompat'  = quirks mode\
```\
\
**Note:** DOCTYPE is neither an HTML tag nor a comment — putting a comment or a BOM-carrying blank line before it is enough to drop some browsers into quirks mode. Keep it as the first byte of the file.
