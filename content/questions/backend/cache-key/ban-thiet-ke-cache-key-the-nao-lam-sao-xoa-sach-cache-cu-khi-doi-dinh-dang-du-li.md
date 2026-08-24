---
id: ban-thiet-ke-cache-key-the-nao-lam-sao-xoa-sach-cache-cu-khi-doi-dinh-dang-du-li
position: backend
technology: cache-key
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bạn thiết kế cache key thế nào? Làm sao xoá sạch cache cũ khi đổi định dạng dữ liệu?

## Question (EN)
How do you design cache keys? How do you retire old entries when the data format changes?

## Đáp án chi tiết (VI)
Key phải **tự mô tả** và chứa **đủ mọi tham số ảnh hưởng tới kết quả**. Quy ước phổ biến: `\u003capp\u003e:\u003centity\u003e:\u003cid\u003e:\u003cbiến-thể\u003e`.\
\
```\
shop:product:1234:v2\
shop:product-list:cat=5:page=2:sort=price_asc:v2\
auth:session:8f2c...\
```\
\
Nguyên tắc:\
- **Thiếu tham số là bug**: nếu response đổi theo `locale`, `currency` hay `user role` mà key không có, hai người dùng sẽ nhận nhầm dữ liệu của nhau.\
- **Đừng nhét dữ liệu cá nhân** (email, token) vào key — key hiển thị trong log, `SCAN`, dashboard.\
- Key dài thì hash phần tham số (`sha1` của query string) nhưng giữ tiền tố đọc được để còn debug.\
\
**Đổi định dạng dữ liệu:** đừng đi xoá từng key. Thêm **số phiên bản** vào tiền tố (`:v2`) rồi deploy — toàn bộ key `v1` trở thành mồ côi và tự hết hạn theo TTL. Cách này không cần `KEYS`/`FLUSHDB` (nguy hiểm trên production) và cho phép rollback về `v1` ngay lập tức.

## Detailed Answer (EN)
A key must be **self-describing** and contain **every parameter that affects the result**. A common convention: `\u003capp\u003e:\u003centity\u003e:\u003cid\u003e:\u003cvariant\u003e`.\
\
```\
shop:product:1234:v2\
shop:product-list:cat=5:page=2:sort=price_asc:v2\
auth:session:8f2c...\
```\
\
Rules:\
- **A missing parameter is a bug**: if the response varies by `locale`, `currency`, or `user role` and the key does not encode it, two users will read each other's data.\
- **Never put personal data** (email, token) in the key — keys show up in logs, `SCAN` output, dashboards.\
- If the key gets long, hash the parameter part (`sha1` of the query string) but keep a readable prefix for debugging.\
\
**When the format changes:** do not hunt down individual keys. Add a **version segment** to the prefix (`:v2`) and deploy — all `v1` keys become orphans and expire on their own TTL. No `KEYS`/`FLUSHDB` needed (both dangerous in production), and rolling back to `v1` is instant.
