---
id: select-va-selectmany-khac-nhau-nhu-the-nao-trong-linq
position: backend
technology: linq
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Select` và `SelectMany` khác nhau như thế nào trong LINQ?

## Question (EN)
What is the difference between Select and SelectMany in LINQ?

## Đáp án chi tiết (VI)
`Select` chiếu mỗi phần tử sang dạng mới (quan hệ 1-1). `SelectMany` làm phẳng các nested collections thành một sequence duy nhất (1-nhiều): `students.SelectMany(s =\u003e s.Subjects)` gộp tất cả danh sách subject thành một. `Select` giữ nguyên cấu trúc phân cấp; `SelectMany` xóa bỏ nesting — hữu ích khi cần flatten collection lồng nhau.

## Detailed Answer (EN)
`Select` projects each element into a new form (1-to-1 mapping). `SelectMany` flattens nested collections into a single sequence (1-to-many): `students.SelectMany(s =\u003e s.Subjects)` combines all subject lists into one. `Select` maintains hierarchy; `SelectMany` removes nesting — useful for flattening nested collections.
