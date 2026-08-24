---
id: vacuum-trong-postgresql-lam-gi-va-vi-sao-can
position: backend
technology: postgresql-internals
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
VACUUM trong PostgreSQL làm gì và vì sao cần?

## Question (EN)
What does VACUUM do in PostgreSQL and why is it needed?

## Đáp án chi tiết (VI)
Do MVCC, `UPDATE`/`DELETE` không xóa dữ liệu ngay mà để lại **dead tuple** (phiên bản hàng cũ không còn transaction nào thấy). Tích lại gây **bloat** (bảng/index tăng kích thước dư thừa, chậm dần). `VACUUM` là tiến trình dọn dẹp:\
\
- **VACUUM (thường)**: thu hồi không gian dead tuple để **tái sử dụng** trong bảng (không trả lại OS), cập nhật **visibility map** (giúp index-only scan), và ngăn **transaction ID wraparound** (đóng băng tuple cũ).\
- **VACUUM FULL**: nén bảng, **trả lại không gian cho OS**, nhưng **khóa bảng độc quyền** và chậm → dùng hạn chế.\
- **ANALYZE**: cập nhật **thống kê** cho planner (thường chạy kèm autovacuum).\
\
**Autovacuum** chạy tự động theo ngưỡng thay đổi. Không vacuum định kỳ → bloat nặng, truy vấn chậm, nguy cơ wraparound gây dừng ghi. Hay bị hỏi cùng với \\"vì sao Postgres cần VACUUM còn nhiều DB khác thì không\\".

## Detailed Answer (EN)
Because of MVCC, `UPDATE`/`DELETE` don't remove data immediately but leave **dead tuples** (old row versions no transaction can see). These accumulate into **bloat** (tables/indexes grow and slow down). `VACUUM` is the cleanup process:\
\
- **VACUUM (plain)**: reclaims dead-tuple space for **reuse** within the table (not returned to the OS), updates the **visibility map** (enabling index-only scans), and prevents **transaction ID wraparound** (freezing old tuples).\
- **VACUUM FULL**: compacts the table and **returns space to the OS**, but takes an **exclusive lock** and is slow → use sparingly.\
- **ANALYZE**: refreshes **statistics** for the planner (usually runs with autovacuum).\
\
**Autovacuum** runs automatically based on change thresholds. Neglecting vacuum → heavy bloat, slow queries, and a wraparound risk that can halt writes. Often asked alongside \\"why does Postgres need VACUUM when many other DBs don't\\".
