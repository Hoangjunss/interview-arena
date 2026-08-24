---
id: b-tree-index-hoat-dong-the-nao-vi-sao-tra-cuu-nhanh
position: backend
technology: indexing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
B-tree index hoạt động thế nào? Vì sao tra cứu nhanh?

## Question (EN)
How does a B-tree index work and why is lookup fast?

## Đáp án chi tiết (VI)
Index là **cấu trúc dữ liệu có thứ tự** giữ giá trị cột đã sắp xếp + con trỏ tới hàng thật. Loại phổ biến nhất là **B-tree** (cây cân bằng):\
\
- **Root → branch → leaf**: cây cân bằng nên mọi leaf ở cùng độ sâu; đi từ gốc xuống leaf chỉ vài bước dù bảng lớn.\
- Tra cứu là **O(log n)** thay vì **O(n)** của quét toàn bảng (full table scan).\
- Leaf nối thành **danh sách liên kết đôi có thứ tự** → hỗ trợ tốt truy vấn khoảng (`BETWEEN`, `\u003e`, `\u003c`) và `ORDER BY` mà không cần sort lại.\
\
Nhờ có thứ tự, DB \\"đi cây\\" để tới đúng vùng dữ liệu thay vì đọc hết bảng. Đánh đổi: tốn dung lượng và làm chậm ghi (mỗi INSERT/UPDATE/DELETE phải cập nhật index).

## Detailed Answer (EN)
An index is an **ordered data structure** holding sorted column values + pointers to the real rows. The most common type is the **B-tree** (balanced tree):\
\
- **Root → branch → leaf**: the tree is balanced so every leaf is at the same depth; reaching a leaf takes only a few steps even for a huge table.\
- Lookup is **O(log n)** instead of the **O(n)** of a full table scan.\
- Leaf nodes form an **ordered doubly-linked list** → great for range queries (`BETWEEN`, `\u003e`, `\u003c`) and `ORDER BY` without a re-sort.\
\
Because it is ordered, the DB \\"walks the tree\\" to the right data region instead of scanning the whole table. Trade-off: extra storage and slower writes (each INSERT/UPDATE/DELETE must maintain the index).
