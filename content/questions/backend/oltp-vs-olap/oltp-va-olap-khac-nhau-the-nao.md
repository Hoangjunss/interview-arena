---
id: oltp-va-olap-khac-nhau-the-nao
position: backend
technology: oltp-vs-olap
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
OLTP và OLAP khác nhau thế nào?

## Question (EN)
How do OLTP and OLAP differ?

## Đáp án chi tiết (VI)
Hai loại workload dữ liệu, tối ưu cho mục đích khác nhau:\
\
**OLTP (Online Transaction Processing)** — hệ giao dịch chạy ứng dụng:\
- Nhiều **giao dịch nhỏ, nhanh**: đọc/ghi vài hàng (đặt đơn, cập nhật hồ sơ).\
- Cần **ACID**, độ trễ thấp, đồng thời cao.\
- Dữ liệu **chuẩn hóa**, index cho tra cứu điểm. Vd Postgres/MySQL sau một web app.\
\
**OLAP (Online Analytical Processing)** — hệ phân tích/báo cáo:\
- **Truy vấn lớn, phức tạp**: quét/gộp hàng triệu hàng (tổng doanh thu theo quý).\
- Ghi theo lô (ETL), đọc là chính; chấp nhận dữ liệu trễ.\
- Thường **denormalized** (star schema), lưu **theo cột (columnar)** để quét/aggregate nhanh. Vd data warehouse: BigQuery, Redshift, Snowflake, ClickHouse.\
\
Hay bị hỏi kèm: vì sao **không chạy analytics nặng trực tiếp trên DB OLTP production** (làm chậm giao dịch) → tách sang replica/warehouse qua ETL/CDC. Lưu trữ **row-based** hợp OLTP, **column-based** hợp OLAP.

## Detailed Answer (EN)
Two data workload types, optimized for different goals:\
\
**OLTP (Online Transaction Processing)** — the transactional system running the app:\
- Many **small, fast transactions**: read/write a few rows (place an order, update a profile).\
- Needs **ACID**, low latency, high concurrency.\
- **Normalized** data, indexes for point lookups. E.g. Postgres/MySQL behind a web app.\
\
**OLAP (Online Analytical Processing)** — the analytics/reporting system:\
- **Large, complex queries**: scan/aggregate millions of rows (total revenue per quarter).\
- Batch writes (ETL), read-mostly; tolerates stale data.\
- Often **denormalized** (star schema), stored **columnar** for fast scans/aggregation. E.g. data warehouses: BigQuery, Redshift, Snowflake, ClickHouse.\
\
Common follow-up: why you **shouldn't run heavy analytics directly on the production OLTP DB** (it slows transactions) → offload to a replica/warehouse via ETL/CDC. **Row-based** storage fits OLTP, **column-based** fits OLAP.
