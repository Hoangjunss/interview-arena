---
id: lam-sao-sap-xep-mot-slice-struct-bang-sort-slice
position: backend
technology: standard-library
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao sắp xếp một slice struct bằng `sort.Slice`?

## Question (EN)
How do you sort a slice of structs with `sort.Slice`?

## Đáp án chi tiết (VI)
`sort.Slice(s, less)` sắp xếp slice **tại chỗ** dựa trên hàm so sánh `less(i, j) bool` — trả về true nếu phần tử `i` phải đứng trước `j`. Không cần implement interface `sort.Interface`.\
\
Lưu ý:\
- `sort.Slice` **không ổn định** (thứ tự phần tử bằng nhau có thể đổi); cần ổn định thì dùng `sort.SliceStable`.\
- So sánh nhiều field bằng cách xâu chuỗi điều kiện: field chính trước, hòa mới xét field phụ.\
\
```go\
type Person struct {\
    Name string\
    Age  int\
}\
people := []Person{{\\"Bob\\

## Detailed Answer (EN)
`sort.Slice(s, less)` sorts a slice **in place** using a comparison function `less(i, j) bool` — return true if element `i` should come before `j`. You do not need to implement the `sort.Interface`.\
\
Notes:\
- `sort.Slice` is **not stable** (the order of equal elements may change); use `sort.SliceStable` when you need stability.\
- Compare multiple fields by chaining conditions: primary field first, then break ties on a secondary field.\
\
```go\
type Person struct {\
    Name string\
    Age  int\
}\
people := []Person{{\\"Bob\\
