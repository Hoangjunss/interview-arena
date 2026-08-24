---
id: explicit-loading-trong-ef-core-la-gi
position: backend
technology: entity-framework
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Explicit loading trong EF Core là gì?

## Question (EN)
What is explicit loading in EF Core?

## Đáp án chi tiết (VI)
Explicit loading tải related data thủ công sau khi đã tải parent: `context.Entry(order).Reference(o =\u003e o.Customer).Load()` cho single reference hoặc `context.Entry(order).Collection(o =\u003e o.Items).Load()` cho collection. Cung cấp kiểm soát chính xác — chỉ tải khi thực sự cần, tiết kiệm bandwidth. Tuy nhiên chậm hơn eager loading nếu cuối cùng cần tải tất cả.

## Detailed Answer (EN)
Explicit loading manually loads related data after the parent is loaded: `context.Entry(order).Reference(o =\u003e o.Customer).Load()` for single references or `context.Entry(order).Collection(o =\u003e o.Items).Load()` for collections. It gives precise control, loading data only when needed and saving bandwidth. However, it is slower than eager loading if you end up loading everything anyway.
