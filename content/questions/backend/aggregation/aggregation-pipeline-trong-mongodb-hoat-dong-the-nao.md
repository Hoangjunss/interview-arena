---
id: aggregation-pipeline-trong-mongodb-hoat-dong-the-nao
position: backend
technology: aggregation
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Aggregation pipeline trong MongoDB hoạt động thế nào?

## Question (EN)
How does the MongoDB aggregation pipeline work?

## Đáp án chi tiết (VI)
Aggregation pipeline xử lý document qua **một chuỗi stage**, mỗi stage biến đổi luồng document rồi truyền sang stage kế — như pipeline, giống `GROUP BY`/JOIN/biến đổi trong SQL nhưng theo từng bước.\
\
Các stage hay dùng:\
- **`$match`**: lọc (như `WHERE`) — đặt sớm để giảm dữ liệu và tận dụng index.\
- **`$group`**: gộp theo khóa và tính tổng hợp (`$sum`, `$avg`, `$max`).\
- **`$project`** / **`$addFields`**: chọn/định hình lại field, tính field mới.\
- **`$sort`**, **`$limit`**, **`$skip`**: sắp xếp/phân trang.\
- **`$lookup`**: \\"join\\" sang collection khác.\
- **`$unwind`**: tách mỗi phần tử mảng thành một document.\
- **`$facet`**: chạy nhiều nhánh song song trên cùng input (faceted search); **`$graphLookup`**: lookup đệ quy cho dữ liệu cây/đồ thị.\
\
Mẹo hiệu năng: đặt `$match`/`$sort` **sớm nhất có thể** để dùng index và cắt bớt luồng trước các stage nặng. Dùng `explain()` để xem index có được tận dụng không.

## Detailed Answer (EN)
The aggregation pipeline processes documents through **a sequence of stages**, each transforming the document stream and passing it to the next — like a pipe, similar to SQL `GROUP BY`/JOIN/transforms but step by step.\
\
Commonly used stages:\
- **`$match`**: filter (like `WHERE`) — put it early to shrink data and use indexes.\
- **`$group`**: group by a key and compute aggregates (`$sum`, `$avg`, `$max`).\
- **`$project`** / **`$addFields`**: select/reshape fields, compute new ones.\
- **`$sort`**, **`$limit`**, **`$skip`**: sorting/pagination.\
- **`$lookup`**: \\"join\\" to another collection.\
- **`$unwind`**: split each array element into its own document.\
- **`$facet`**: run several branches in parallel on the same input (faceted search); **`$graphLookup`**: recursive lookups for tree/graph data.\
\
Performance tip: place `$match`/`$sort` **as early as possible** to use indexes and trim the stream before heavy stages. Use `explain()` to check index usage.
