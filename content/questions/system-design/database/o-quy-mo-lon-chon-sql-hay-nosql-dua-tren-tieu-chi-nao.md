---
id: o-quy-mo-lon-chon-sql-hay-nosql-dua-tren-tieu-chi-nao
position: system-design
technology: database
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ở quy mô lớn, chọn SQL hay NoSQL dựa trên tiêu chí nào?

## Question (EN)
At scale, what criteria drive the choice between SQL and NoSQL?

## Đáp án chi tiết (VI)
Không phải \\"cái nào tốt hơn\\" mà là **khớp mẫu truy cập và yêu cầu nhất quán**.\
\
Chọn **SQL (quan hệ)** khi:\
- Dữ liệu quan hệ chặt, cần **join**, giao dịch **ACID** mạnh (tài chính, đơn hàng).\
- Truy vấn linh hoạt, ad-hoc; schema ổn định.\
\
Chọn **NoSQL** khi:\
- Cần **scale ghi ngang** cực lớn, độ trễ thấp, throughput cao.\
- Mẫu truy cập biết trước và đơn giản (key-based); schema linh hoạt/bán cấu trúc.\
- **Document** cho JSON lồng nhau, **key-value** cho cache/session, **wide-column** cho time-series/ghi lớn, **graph** cho quan hệ nhiều bậc.\
\
Thực tế thường **dùng cả hai** (polyglot persistence): SQL cho lõi giao dịch, NoSQL cho catalog/feed/analytics.

## Detailed Answer (EN)
It is not \\"which is better\\" but **matching access patterns and consistency needs**.\
\
Pick **SQL (relational)** when:\
- Data is tightly relational, you need **joins** and strong **ACID** transactions (finance, orders).\
- Queries are flexible/ad-hoc; the schema is stable.\
\
Pick **NoSQL** when:\
- You need massive **horizontal write scaling**, low latency, high throughput.\
- Access patterns are known and simple (key-based); schema is flexible/semi-structured.\
- **Document** for nested JSON, **key-value** for cache/session, **wide-column** for time-series/heavy writes, **graph** for multi-hop relationships.\
\
In practice teams **use both** (polyglot persistence): SQL for the transactional core, NoSQL for catalog/feed/analytics.
