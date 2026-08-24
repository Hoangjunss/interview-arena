---
id: symbol-va-string-trong-ruby-khac-nhau-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Symbol và String trong Ruby khác nhau thế nào?

## Question (EN)
What is the difference between a Symbol and a String in Ruby?

## Đáp án chi tiết (VI)
**String** là mutable, mỗi lần tạo là 1 object mới trong heap. **Symbol** là immutable, mỗi tên symbol chỉ tồn tại 1 lần trong memory (interned).\
\
```ruby\
\\"hello\\".object_id == \\"hello\\".object_id  # false — 2 object khác nhau\
:hello.object_id  == :hello.object_id   # true  — cùng 1 object\
```\
\
Dùng Symbol cho hash key, method name, trạng thái cố định (`:pending`, `:active`). Dùng String khi cần thao tác văn bản: cắt, nối, format.\
\
Hình dung: Symbol như \\"nhãn dán\\" cố định, String như tờ giấy có thể viết đè.

## Detailed Answer (EN)
**String** is mutable; each instantiation creates a new heap object. **Symbol** is immutable; every symbol with the same name is the same object in memory (interned).\
\
```ruby\
\\"hello\\".object_id == \\"hello\\".object_id  # false — two different objects\
:hello.object_id  == :hello.object_id   # true  — always the same object\
```\
\
Use Symbol for hash keys, method names, fixed state tokens (`:pending`, `:active`). Use String when text manipulation is needed: slicing, concatenation, formatting.\
\
Mental model: a Symbol is a permanent label; a String is a writable sheet of paper.
