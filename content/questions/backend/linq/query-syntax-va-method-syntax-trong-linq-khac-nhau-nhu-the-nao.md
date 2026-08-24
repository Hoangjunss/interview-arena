---
id: query-syntax-va-method-syntax-trong-linq-khac-nhau-nhu-the-nao
position: backend
technology: linq
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Query syntax và method syntax trong LINQ khác nhau như thế nào?

## Question (EN)
What is the difference between query syntax and method syntax in LINQ?

## Đáp án chi tiết (VI)
Query syntax trông giống SQL: `var result = from x in list where x \u003e 5 select x;`. Method syntax dùng lambda expressions: `var result = list.Where(x =\u003e x \u003e 5).Select(x =\u003e x);`. Cả hai đều tương đương về mặt chức năng — compiler chuyển query syntax thành method syntax nội bộ. Query syntax phù hợp cho join phức tạp; method syntax linh hoạt hơn cho các phép biến đổi chuỗi.

## Detailed Answer (EN)
Query syntax resembles SQL: `var result = from x in list where x \u003e 5 select x;`. Method syntax uses lambda expressions: `var result = list.Where(x =\u003e x \u003e 5);`. Both are functionally equivalent — compilers transform query syntax to method syntax internally. Query syntax suits complex joins; method syntax offers more flexibility for chained transformations.
