---
id: dead-tuple-la-gi-table-bloat-gay-anh-huong-gi-va-phat-hien-bang-cach-nao
position: backend
technology: vacuum-\u0026-bloat
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dead tuple là gì? Table bloat gây ảnh hưởng gì và phát hiện bằng cách nào?

## Question (EN)
What is a dead tuple? What does table bloat cause and how do you detect it?

## Đáp án chi tiết (VI)
**Dead tuple** là phiên bản dòng đã bị `UPDATE` thay thế hoặc `DELETE` đánh dấu, nhưng không transaction nào còn cần nhìn thấy nữa. Nó vẫn nằm trong file dữ liệu cho tới khi `VACUUM` đánh dấu vùng đó tái sử dụng được.\
\
**Bloat** là khi lượng dead tuple tích luỹ khiến bảng (và index của nó) chiếm nhiều trang đĩa hơn dữ liệu sống rất nhiều.\
\
Ảnh hưởng:\
- Sequential scan phải đọc thêm trang rỗng → chậm hơn.\
- Buffer cache chứa toàn trang gần như rỗng → tỉ lệ hit giảm.\
- Backup và disk usage tăng theo phần thừa.\
\
Phát hiện:\
\
```sql\
select relname,\
       n_live_tup,\
       n_dead_tup,\
       last_autovacuum\
from pg_stat_user_tables\
order by n_dead_tup desc\
limit 10;\
```\
\
Nếu `n_dead_tup` lớn so với `n_live_tup` và `last_autovacuum` cũ hoặc rỗng thì bảng đó đang bloat. Nguyên nhân thường gặp: bảng job/queue bị update liên tục, batch `DELETE` lớn, hoặc có transaction chạy dài giữ snapshot khiến vacuum không dọn được.

## Detailed Answer (EN)
A **dead tuple** is a row version that an `UPDATE` replaced or a `DELETE` marked, and that no running transaction still needs to see. It stays in the data file until `VACUUM` marks that space reusable.\
\
**Bloat** is when accumulated dead tuples make a table (and its indexes) occupy far more disk pages than the live data warrants.\
\
Impact:\
- Sequential scans read extra near-empty pages → slower.\
- The buffer cache fills with mostly-empty pages → lower hit ratio.\
- Backups and disk usage grow with the waste.\
\
Detection:\
\
```sql\
select relname,\
       n_live_tup,\
       n_dead_tup,\
       last_autovacuum\
from pg_stat_user_tables\
order by n_dead_tup desc\
limit 10;\
```\
\
If `n_dead_tup` is large relative to `n_live_tup` and `last_autovacuum` is old or empty, that table is bloating. Common causes: a job/queue table updated constantly, a large batch `DELETE`, or a long-running transaction holding a snapshot that prevents vacuum from cleaning up.
