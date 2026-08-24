---
id: inverted-index-la-gi-va-vi-sao-no-lam-full-text-search-nhanh
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Inverted index là gì và vì sao nó làm full-text search nhanh?

## Question (EN)
What is an inverted index and why does it make full-text search fast?

## Đáp án chi tiết (VI)
Inverted index map **term sang danh sách document chứa term đó**. Tìm một từ chỉ là một lần lookup rồi lấy posting list, thay vì scan toàn bộ document như `LIKE %keyword%` trong SQL.\
\
```text\
\\"laptop\\" -\u003e [doc1, doc7, doc9]\
\\"gaming\\" -\u003e [doc7, doc12]\
```\
\
Đây là lý do full-text search nhanh hơn hẳn `LIKE %...%`, nơi B-tree index không giúp được vì từ nằm giữa chuỗi.\
\
Dữ liệu đi vào index phải qua **analysis**: tokenize, lowercase, bỏ dấu hoặc stemming tuỳ config. Vì thế **thứ nằm trong index thường khác chuỗi gốc**, và điều này giải thích rất nhiều hành vi search gây bất ngờ.\
\
```bash\
GET /_analyze\
{ \\"analyzer\\": \\"standard\\

## Detailed Answer (EN)
An inverted index maps **terms to the documents containing them**. Finding a word is one lookup returning a posting list, instead of scanning every document like `LIKE %keyword%` in SQL.\
\
```text\
\\"laptop\\" -\u003e [doc1, doc7, doc9]\
\\"gaming\\" -\u003e [doc7, doc12]\
```\
\
That is why full-text search beats `LIKE %...%`, where a B-tree index cannot help because the word sits mid-string.\
\
Data entering the index passes through **analysis**: tokenizing, lowercasing, accent folding or stemming depending on config. So **what is in the index differs from the original string**, which explains many surprising search behaviours.\
\
```bash\
GET /_analyze\
{ \\"analyzer\\": \\"standard\\
