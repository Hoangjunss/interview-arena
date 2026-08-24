---
id: khi-nao-dung-dl-dt-dd
position: backend
technology: semantic
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào dùng `\u003cdl\u003e`, `\u003cdt\u003e`, `\u003cdd\u003e`?

## Question (EN)
When should you use `\u003cdl\u003e`, `\u003cdt\u003e`, and `\u003cdd\u003e`?

## Đáp án chi tiết (VI)
`\u003cdl\u003e` là danh sách **cặp khoá – giá trị** hoặc **thuật ngữ – định nghĩa**.\
\
```html\
\u003cdl\u003e\
  \u003cdt\u003eTác giả\u003c/dt\u003e\
  \u003cdd\u003eNguyễn Đăng Định\u003c/dd\u003e\
\
  \u003cdt\u003eNgày đăng\u003c/dt\u003e\
  \u003cdd\u003e\u003ctime datetime=\\"2026-03-15\\"\u003e15/3/2026\u003c/time\u003e\u003c/dd\u003e\
\
  \u003cdt\u003eThẻ\u003c/dt\u003e            \u003c!-- một dt, nhiều dd --\u003e\
  \u003cdd\u003eReact\u003c/dd\u003e\
  \u003cdd\u003ePerformance\u003c/dd\u003e\
\u003c/dl\u003e\
```\
\
Hợp nhất với: metadata bài viết, glossary, bảng thông số sản phẩm, FAQ (`\u003cdt\u003e` là câu hỏi, `\u003cdd\u003e` là câu trả lời).\
\
Khi cần một lớp bọc để style, spec chỉ cho phép `\u003cdiv\u003e` bao cặp `dt`/`dd` bên trong `\u003cdl\u003e`, **không cho phép thẻ khác**.\
\
**Lưu ý:** dùng `\u003cul\u003e\u003cli\u003eTác giả: ...\u003c/li\u003e\u003c/ul\u003e` cho danh sách key–value vì tiện. Nó vẫn chạy, nhưng screen reader mất quan hệ khoá–giá trị và mất luôn thông tin \\"một khoá có nhiều giá trị\\".

## Detailed Answer (EN)
`\u003cdl\u003e` is a list of **key–value** or **term–definition** pairs.\
\
```html\
\u003cdl\u003e\
  \u003cdt\u003eAuthor\u003c/dt\u003e\
  \u003cdd\u003eNguyen Dang Dinh\u003c/dd\u003e\
\
  \u003cdt\u003ePublished\u003c/dt\u003e\
  \u003cdd\u003e\u003ctime datetime=\\"2026-03-15\\"\u003eMarch 15, 2026\u003c/time\u003e\u003c/dd\u003e\
\
  \u003cdt\u003eTags\u003c/dt\u003e           \u003c!-- one dt, several dd --\u003e\
  \u003cdd\u003eReact\u003c/dd\u003e\
  \u003cdd\u003ePerformance\u003c/dd\u003e\
\u003c/dl\u003e\
```\
\
Good fits: article metadata, glossaries, product spec tables, FAQs (`\u003cdt\u003e` the question, `\u003cdd\u003e` the answer).\
\
When you need a styling wrapper, use `\u003cdiv\u003e` — the spec allows `\u003cdiv\u003e` around a `dt`/`dd` group inside `\u003cdl\u003e`, but **no other element**.\
\
**Note:** falling back to `\u003cul\u003e\u003cli\u003eAuthor: ...\u003c/li\u003e\u003c/ul\u003e` because it is easier. It renders fine, but screen readers lose the key–value relationship and the \\"one key, several values\\" grouping.
