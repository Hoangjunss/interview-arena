---
id: index-only-scan-la-gi-va-vi-sao-doi-khi-khong-xay-ra
position: backend
technology: indexing-\u0026-query-planning
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Index-only scan là gì và vì sao đôi khi không xảy ra?

## Question (EN)
What is an index-only scan and why might it not happen?

## Đáp án chi tiết (VI)
Index-only scan là khi database lấy được toàn bộ dữ liệu cần *ngay trong index*, khỏi phải mở thêm bảng (heap) — nên đỡ I/O và nhanh hơn. Điều kiện: index chứa đủ mọi cột query cần, và \\"visibility map\\" xác nhận vùng dữ liệu đó đã ổn định để khỏi kiểm tra lại bảng.\
\
Có thể giúp planner bằng covering index — thêm cột cần đọc vào `INCLUDE`:\
```sql\
CREATE INDEX idx_orders_user_created\
ON orders (user_id, created_at DESC) INCLUDE (total, status);\
```\
Nhưng nếu bảng vừa bị update nhiều, visibility map chưa kịp \\"sạch\\

## Detailed Answer (EN)
An index-only scan is when the database gets all the data it needs *from the index itself*, without opening the table (heap) — saving I/O and running faster. Conditions: the index contains every column the query needs, and the \\"visibility map\\" confirms that data region is settled enough to skip re-checking the table.\
\
You can help the planner with a covering index — add the extra columns to `INCLUDE`:\
```sql\
CREATE INDEX idx_orders_user_created\
ON orders (user_id, created_at DESC) INCLUDE (total, status);\
```\
But if the table was just updated a lot and the visibility map is not yet \\"clean\\
