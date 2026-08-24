---
id: unwind-trong-aggregation-pipeline-dung-lam-gi
position: backend
technology: aggregation
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`$unwind` trong aggregation pipeline dùng làm gì?

## Question (EN)
What is the purpose of `$unwind` in the aggregation pipeline?

## Đáp án chi tiết (VI)
`$unwind` \\"bung\\" một mảng trong document ra thành nhiều document riêng, mỗi document ứng với một phần tử của mảng. Thường dùng *trước* `$group` hay `$lookup` để xử lý từng phần tử riêng lẻ.\
\
**Ví dụ:** một post có `tags: [\\"A\\

## Detailed Answer (EN)
`$unwind` \\"explodes\\" an array in a document into several documents, one per array element. It is typically used *before* `$group` or `$lookup` to process each element individually.\
\
**Example:** a post with `tags: [\\"A\\
