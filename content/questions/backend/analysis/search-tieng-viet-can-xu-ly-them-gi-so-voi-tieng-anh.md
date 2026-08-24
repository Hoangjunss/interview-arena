---
id: search-tieng-viet-can-xu-ly-them-gi-so-voi-tieng-anh
position: backend
technology: analysis
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Search tiếng Việt cần xử lý thêm gì so với tiếng Anh?

## Question (EN)
What extra handling does Vietnamese search need compared with English?

## Đáp án chi tiết (VI)
Hai việc: **xử lý dấu** và **ghép từ ghép**. `standard` tokenizer cắt theo khoảng trắng nên \\"điện thoại\\" thành hai token rời, và \\"dien thoai\\" không gõ dấu sẽ không khớp \\"điện thoại\\".\
\
Cách xử lý dấu — index cả hai dạng bằng multi-field:\
\
```json\
\\"name\\": {\
  \\"type\\": \\"text\\

## Detailed Answer (EN)
Two things: **diacritics** and **compound words**. The `standard` tokenizer splits on whitespace, so \\"điện thoại\\" becomes two separate tokens, and unaccented \\"dien thoai\\" will not match \\"điện thoại\\".\
\
Handling diacritics — index both forms with a multi-field:\
\
```json\
\\"name\\": {\
  \\"type\\": \\"text\\
