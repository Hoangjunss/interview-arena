---
id: advisory-lock-trong-postgresql-dung-khi-nao
position: backend
technology: transactions-\u0026-concurrency
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Advisory lock trong PostgreSQL dùng khi nào?

## Question (EN)
When should you use advisory locks in PostgreSQL?

## Đáp án chi tiết (VI)
Advisory lock là khóa do chính app định nghĩa bằng một key dạng số, *không* gắn với dòng hay bảng nào cả — database chỉ giữ giúp cái khóa, còn ý nghĩa là do bạn quy ước. Hợp cho \\"chỉ một tiến trình được chạy tại một thời điểm\\" nhẹ nhàng, ví dụ đảm bảo job tính tiền của mỗi tenant chỉ chạy một bản.\
```sql\
SELECT pg_advisory_xact_lock(hashtext('tenant:42:billing'));\
```\
Dùng cẩn thận: vì database không hiểu \\"vật thể nghiệp vụ\\" sau cái khóa, nên quy ước cách sinh key phải thống nhất toàn hệ thống, và đừng giữ khóa quá lâu.

## Detailed Answer (EN)
An advisory lock is a lock your app defines with a numeric key, *not* tied to any row or table — the database just holds the lock for you; the meaning is your convention. It fits lightweight \\"only one process at a time\\
