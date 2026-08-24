---
id: pseudo-class-va-pseudo-element-khac-nhau-the-nao
position: backend
technology: css-\u0026-layout
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pseudo-class và pseudo-element khác nhau thế nào?

## Question (EN)
What is the difference between a pseudo-class and a pseudo-element?

## Đáp án chi tiết (VI)
- **Pseudo-class** (một dấu hai chấm `:`): chọn phần tử theo **trạng thái hoặc vị trí** trong cây — chứ không tạo gì mới. Ví dụ: `:hover`, `:focus`, `:active`, `:checked`, `:disabled`, `:first-child`, `:nth-child(2n)`, `:not(...)`. Nó trả lời \\"phần tử này đang ở trạng thái nào / đứng thứ mấy\\".\
- **Pseudo-element** (hai dấu hai chấm `::`): tạo/định dạng **một phần con ảo** của phần tử — phần không có sẵn trong DOM. Ví dụ: `::before`, `::after` (chèn nội dung trang trí qua `content`), `::first-line`, `::first-letter`, `::placeholder`, `::selection`.\
\
Quy ước cú pháp: pseudo-class dùng **`:`**, pseudo-element dùng **`::`** (chuẩn CSS3). Bốn pseudo-element đời đầu (`::before`, `::after`, `::first-line`, `::first-letter`) vẫn chấp nhận một dấu `:` để tương thích cũ, nhưng nên viết hai dấu.\
\
```css\
a:hover { color: blue; }          /* state */\
.card::after { content: ''; }      /* virtual child */\
```\
\
Lưu ý: `::before`/`::after` bắt buộc có thuộc tính `content` (kể cả `content: ''`) mới hiển thị.

## Detailed Answer (EN)
$83
