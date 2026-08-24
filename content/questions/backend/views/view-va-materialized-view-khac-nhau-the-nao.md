---
id: view-va-materialized-view-khac-nhau-the-nao
position: backend
technology: views
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
View và materialized view khác nhau thế nào?

## Question (EN)
What is the difference between a view and a materialized view?

## Đáp án chi tiết (VI)
- **View**: một truy vấn lưu sẵn dưới dạng tên gọi — **không lưu dữ liệu**. Mỗi lần query view, DB chạy lại câu SQL bên dưới trên dữ liệu **hiện tại** → luôn mới, không tốn storage, nhưng nặng nếu truy vấn phức tạp và gọi nhiều.\
- **Materialized view**: **lưu kết quả truy vấn thành bảng vật lý**. Đọc nhanh như đọc bảng thường, nhưng dữ liệu là **ảnh chụp tại lúc refresh** → có thể cũ; phải `REFRESH MATERIALIZED VIEW` (PostgreSQL có `CONCURRENTLY` để không khóa đọc) để cập nhật.\
\
Khi nào dùng gì:\
- View: cần dữ liệu luôn mới, đơn giản hóa/đóng gói truy vấn, phân quyền.\
- Materialized view: truy vấn/aggregate tốn kém, đọc nhiều, chấp nhận dữ liệu trễ (dashboard, báo cáo). Đây là dạng denormalization có kiểm soát.\
\
```sql\
CREATE MATERIALIZED VIEW daily_sales AS\
SELECT date, SUM(amount) FROM orders GROUP BY date;\
\
REFRESH MATERIALIZED VIEW daily_sales;\
```

## Detailed Answer (EN)
- **View**: a saved query given a name — it **stores no data**. Each time you query it, the DB re-runs the underlying SQL on the **current** data → always fresh, no storage cost, but expensive if the query is complex and called often.\
- **Materialized view**: **stores the query result as a physical table**. Reads are as fast as a normal table, but the data is a **snapshot from the last refresh** → can be stale; you must `REFRESH MATERIALIZED VIEW` (PostgreSQL offers `CONCURRENTLY` to avoid blocking reads) to update it.\
\
When to use which:\
- View: need always-fresh data, to simplify/encapsulate a query, or for access control.\
- Materialized view: expensive queries/aggregations, read-heavy, tolerating stale data (dashboards, reports). It is a controlled form of denormalization.\
\
```sql\
CREATE MATERIALIZED VIEW daily_sales AS\
SELECT date, SUM(amount) FROM orders GROUP BY date;\
\
REFRESH MATERIALIZED VIEW daily_sales;\
```
