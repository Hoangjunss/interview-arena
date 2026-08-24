---
id: custom-scalar-dung-de-lam-gi-va-co-bay-nao-can-tranh
position: backend
technology: kiểu-dữ-liệu
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Custom scalar dùng để làm gì và có bẫy nào cần tránh?

## Question (EN)
What are custom scalars for and what trap should be avoided?

## Đáp án chi tiết (VI)
Custom scalar cho phép **kiểm tra và chuẩn hoá định dạng ngay ở tầng schema**: giá trị sai bị từ chối trước khi vào resolver, và mọi client nhận cùng một định dạng. Các kiểu hay dùng: ngày giờ, thư điện tử, địa chỉ web, số thập phân chính xác cho tiền tệ.\
\
```graphql\
scalar DateTime   # you must implement serialize / parseValue / parseLiteral\
\
type Post { publishedAt: DateTime! }\
```\
\
Cần tránh kiểu tuỳ ý dạng JSON. Nó tiện khi dữ liệu không có cấu trúc cố định nhưng **đánh mất toàn bộ lợi ích của hệ kiểu**: client không biết bên trong có gì, công cụ codegen không giúp được, và mọi thay đổi bên trong đều âm thầm.\
\
Một lưu ý riêng về tiền tệ: dùng số thực là sai lầm quen thuộc vì phép làm tròn nhị phân gây lệch. Cách an toàn là truyền dưới dạng chuỗi hoặc số nguyên đơn vị nhỏ nhất, và mô tả rõ quy ước đó trong schema.

## Detailed Answer (EN)
Custom scalars allow **format validation and normalisation at the schema layer**: invalid values are rejected before reaching resolvers and every client receives one format. Common ones: date and time, email, URL, precise decimals for money.\
\
```graphql\
scalar DateTime   # you must implement serialize / parseValue / parseLiteral\
\
type Post { publishedAt: DateTime! }\
```\
\
The trap is a free-form JSON scalar. It is convenient for unstructured data but **discards the benefits of the type system**: clients cannot see inside, code generation cannot help, and internal changes happen silently.\
\
A money note: floating point is a familiar mistake because binary rounding drifts. The safe approaches are a string or an integer of the smallest unit, with the convention documented in the schema.
