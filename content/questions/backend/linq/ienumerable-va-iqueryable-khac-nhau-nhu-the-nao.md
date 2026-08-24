---
id: ienumerable-va-iqueryable-khac-nhau-nhu-the-nao
position: backend
technology: linq
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`IEnumerable` và `IQueryable` khác nhau như thế nào?

## Question (EN)
What is the difference between IEnumerable and IQueryable?

## Đáp án chi tiết (VI)
`IEnumerable\u003cT\u003e` hoạt động trên in-memory collections, tải toàn bộ dữ liệu rồi mới filter (LINQ to Objects). `IQueryable\u003cT\u003e` nhắm vào nguồn dữ liệu remote (database), xây dựng expression tree và thực thi filter tại nguồn để tiết kiệm băng thông. Dùng `IQueryable` cho dataset lớn; dùng `IEnumerable` cho collections đã có sẵn trong bộ nhớ.

## Detailed Answer (EN)
`IEnumerable\u003cT\u003e` operates on in-memory collections, filtering after loading all data (LINQ to Objects). `IQueryable\u003cT\u003e` targets remote sources like databases, building expression trees and executing filtering at the source for efficiency. Use `IQueryable` for large datasets; use `IEnumerable` for in-memory collections.
