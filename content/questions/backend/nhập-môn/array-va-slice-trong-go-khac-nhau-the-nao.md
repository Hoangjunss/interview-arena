---
id: array-va-slice-trong-go-khac-nhau-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Array và Slice trong Go khác nhau thế nào?

## Question (EN)
What is the difference between arrays and slices in Go?

## Đáp án chi tiết (VI)
Array: size cố định, value type `[5]int`. Slice: dynamic, reference type `[]int`. Slice dùng phổ biến hơn. `make([]int, 0, 10)` tạo slice capacity 10. `append(slice, item)` thêm phần tử. Slice là view lên underlying array.

## Detailed Answer (EN)
Arrays have a fixed size and are value types: `[5]int`. Slices are dynamic and are reference types: `[]int`. Slices are used far more often. `make([]int, 0, 10)` creates a slice with capacity 10. `append(slice, item)` adds an element. A slice is a view over an underlying array.
