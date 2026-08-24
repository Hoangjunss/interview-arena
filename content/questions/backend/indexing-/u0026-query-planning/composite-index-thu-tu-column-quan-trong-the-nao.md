---
id: composite-index-thu-tu-column-quan-trong-the-nao
position: backend
technology: indexing-\u0026-query-planning
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Composite index thứ tự column quan trọng thế nào?

## Question (EN)
How important is column order in a composite index?

## Đáp án chi tiết (VI)
Trong composite index (index nhiều cột) kiểu B-tree, thứ tự cột rất quan trọng — giống danh bạ sắp theo \\"họ rồi tên\\": tra theo họ rất nhanh, nhưng tra chỉ theo tên thì gần như vô dụng. Index `(tenant_id, status, created_at)` phục vụ tốt query lọc `tenant_id`, rồi `status`, rồi sắp theo `created_at`; nó KHÔNG tương đương `(created_at, status, tenant_id)`.\
```sql\
CREATE INDEX idx_orders_tenant_status_created\
ON orders (tenant_id, status, created_at DESC);\
```\
Quy tắc: đặt cột lọc bằng (`=`) có tính phân biệt cao lên trước, cột khoảng/sắp xếp để sau. Luôn kiểm chứng bằng query thật và `EXPLAIN ANALYZE`.

## Detailed Answer (EN)
In a B-tree composite index (multi-column index), column order matters a lot — like a phone book sorted by \\"last name then first name\\": looking up by last name is fast, but by first name alone is almost useless. An index on `(tenant_id, status, created_at)` serves queries filtering `tenant_id`, then `status`, then ordering by `created_at`; it is NOT the same as `(created_at, status, tenant_id)`.\
```sql\
CREATE INDEX idx_orders_tenant_status_created\
ON orders (tenant_id, status, created_at DESC);\
```\
Rule: put highly distinctive equality (`=`) columns first, range/order columns last. Always validate with real queries and `EXPLAIN ANALYZE`.
