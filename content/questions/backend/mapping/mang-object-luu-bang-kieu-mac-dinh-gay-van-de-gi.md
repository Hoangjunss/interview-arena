---
id: mang-object-luu-bang-kieu-mac-dinh-gay-van-de-gi
position: backend
technology: mapping
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mảng object lưu bằng kiểu mặc định gây vấn đề gì?

## Question (EN)
What goes wrong when an array of objects uses the default type?

## Đáp án chi tiết (VI)
Kiểu `object` mặc định **làm phẳng mảng**, nên quan hệ giữa các field trong cùng một phần tử bị mất.\
\
```json\
\\"variants\\": [\
  { \\"color\\": \\"red\\

## Detailed Answer (EN)
The default `object` type **flattens arrays**, so the relationship between fields inside one element is lost.\
\
```json\
\\"variants\\": [\
  { \\"color\\": \\"red\\
