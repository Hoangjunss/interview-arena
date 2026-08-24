---
id: symbol-to-proc-va-operator-hoat-dong-the-nao-khi-nao-dung-method-name
position: backend
technology: block-\u0026-iterator
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Symbol#to_proc và `\u0026` operator hoạt động thế nào? Khi nào dùng `\u0026method(:name)`?

## Question (EN)
How do Symbol#to_proc and the `\u0026` operator work? When do you use `\u0026method(:name)`?

## Đáp án chi tiết (VI)
`\u0026` trước một object sẽ gọi `to_proc` trên nó rồi truyền kết quả như một block. Symbol implement `to_proc` để tạo block gọi method cùng tên trên mỗi phần tử.\
\
```ruby\
# Dài dòng:\
[1, 2, 3].map { |n| n.to_s }   # =\u003e [\\"1\\

## Detailed Answer (EN)
`\u0026` before an object calls `to_proc` on it, then passes the result as a block. Symbol implements `to_proc` to create a block that calls the named method on each element.\
\
```ruby\
# Verbose:\
[1, 2, 3].map { |n| n.to_s }   # =\u003e [\\"1\\
