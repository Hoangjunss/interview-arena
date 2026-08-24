---
id: phan-biet-b-tree-index-cua-postgresql-va-b-tree-index-cua-mongodb
position: backend
technology: indexes
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt `B-tree` index của PostgreSQL và `B-tree` index của MongoDB?

## Question (EN)
What is the difference between PostgreSQL B-tree index and MongoDB B-tree index?

## Đáp án chi tiết (VI)
Cả hai đều dùng B-tree làm cấu trúc index nền, nên đều có độ phức tạp tìm kiếm O(log N) và hỗ trợ range query như nhau.\
\
**Khác biệt nằm ở data model:**\
- MongoDB index \\"đào sâu\\" được vào **nested document** (vd `address.zipcode`) và tự index **từng phần tử của mảng** (multikey index).\
- PostgreSQL có index chuyên biệt cho mảng/JSONB (như GIN); còn B-tree mặc định của nó *không* tự index từng phần tử mảng như MongoDB.\
\
Tóm lại: thuật toán giống nhau, khác nhau là cách mỗi DB áp B-tree lên mô hình dữ liệu của mình.

## Detailed Answer (EN)
Both use B-tree as the underlying index structure, so both have O(log N) search complexity and equal range-query support.\
\
**The difference is the data model:**\
- MongoDB indexes can reach into **nested documents** (e.g. `address.zipcode`) and automatically index **each array element** (multikey index).\
- PostgreSQL has specialized indexes for arrays/JSONB (like GIN); its default B-tree does *not* auto-index individual array elements like MongoDB.\
\
In short: same algorithm, different ways each DB applies B-tree to its data model.
