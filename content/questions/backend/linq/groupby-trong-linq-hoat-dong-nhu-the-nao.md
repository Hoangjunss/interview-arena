---
id: groupby-trong-linq-hoat-dong-nhu-the-nao
position: backend
technology: linq
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`GroupBy` trong LINQ hoạt động như thế nào?

## Question (EN)
What is GroupBy in LINQ and how does it work?

## Đáp án chi tiết (VI)
`GroupBy` tổ chức các phần tử theo một key, trả về các group mà mỗi group chứa key và các element tương ứng: `students.GroupBy(s =\u003e s.Department)`. Hỗ trợ grouping theo nhiều key thông qua anonymous object: `students.GroupBy(s =\u003e new { s.Department, s.Year })`. Kết quả có thể được tổng hợp thêm bằng `Count()`, `Sum()` hoặc `Select()` trên từng group.

## Detailed Answer (EN)
`GroupBy` organizes elements by a key, returning groups where each group contains a key and its associated elements: `students.GroupBy(s =\u003e s.Department)`. Supports multiple-key grouping via anonymous objects: `students.GroupBy(s =\u003e new { s.Department, s.Year })`. Results can be further aggregated with `Count()`, `Sum()`, or `Select()` per group.
