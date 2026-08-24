---
id: phan-biet-sql-va-nosql-khi-nao-dung-cai-nao
position: backend
technology: database
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt SQL và NoSQL, khi nào dùng cái nào?

## Question (EN)
SQL vs NoSQL — what is the difference and when to use each?

## Đáp án chi tiết (VI)
**SQL (quan hệ)**: dữ liệu ở bảng, **schema cố định**, quan hệ qua khóa chính/ngoại, **ACID** đầy đủ, thường scale dọc. Hợp hệ giao dịch cần nhất quán mạnh và quan hệ dữ liệu chặt (tài chính, đơn hàng).\
\
**NoSQL**: nhiều loại — **document** (JSON), **key-value**, **wide-column**, **graph**; **schema linh hoạt**, scale ngang qua cluster, throughput cao; đánh đổi nới lỏng một phần ACID. Hợp dữ liệu bán cấu trúc, cần lặp nhanh, đọc/ghi quy mô lớn (catalog, profile, IoT, real-time).\
\
Chọn theo **mô hình truy vấn + yêu cầu nhất quán + cách scale**, không theo trào lưu. Nhiều hệ dùng cả hai (polyglot persistence).

## Detailed Answer (EN)
**SQL (relational)**: data in tables, **fixed schema**, relationships via primary/foreign keys, full **ACID**, typically vertical scaling. Fits transactional systems needing strong consistency and tight relationships (finance, orders).\
\
**NoSQL**: several types — **document** (JSON), **key-value**, **wide-column**, **graph**; **flexible schema**, horizontal scaling across clusters, high throughput; trades away some ACID guarantees. Fits semi-structured data, fast iteration, large-scale read/write (catalogs, profiles, IoT, real-time).\
\
Choose by **query patterns + consistency needs + scaling model**, not by hype. Many systems use both (polyglot persistence).
