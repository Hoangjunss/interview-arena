---
id: go-co-nhung-kieu-du-lieu-co-ban-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Go có những kiểu dữ liệu cơ bản nào?

## Question (EN)
What are the basic data types in Go?

## Đáp án chi tiết (VI)
Go có các nhóm kiểu dữ liệu cơ bản: nhóm số gồm `int`, `int8/16/32/64`, `float32/64`, `complex64/128`; nhóm văn bản là `string` (immutable, mã hóa UTF-8); và `bool` cho giá trị logic true/false. Ngoài ra còn có `byte` (alias của uint8) dùng cho dữ liệu nhị phân, và `rune` (alias của int32) đại diện cho một ký tự Unicode.\
\
Mỗi kiểu đều có zero value mặc định khi khai báo mà không gán giá trị: int là 0, string là chuỗi rỗng, bool là false, pointer là nil.

## Detailed Answer (EN)
Go's basic types are grouped as: numeric types (`int`, `int8/16/32/64`, `float32/64`, `complex64/128`); text (`string`, immutable, UTF-8 encoded); and `bool` for true/false logic. There's also `byte` (alias for uint8) for binary data and `rune` (alias for int32) representing a Unicode code point.\
\
Every type has a well-defined zero value when declared without initialization: int is 0, string is empty string, bool is false, pointers are nil.
