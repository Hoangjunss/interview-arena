---
id: connection-pooling-la-gi-va-tai-sao-no-quan-trong-cho-database-performance
position: system-design
technology: scaling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Connection Pooling là gì và tại sao nó quan trọng cho database performance?

## Question (EN)
What is Connection Pooling and why is it critical for database performance?

## Đáp án chi tiết (VI)
Connection Pooling duy trì sẵn một pool các kết nối đã được khởi tạo; application lấy connection từ pool và trả lại sau khi dùng xong — thay vì mở/đóng từng kết nối mới với overhead TCP handshake + authentication (20-100ms/lần).\
\
**Lợi ích:** giảm latency đáng kể, giới hạn số connection đến DB (PostgreSQL thường giới hạn max_connections ~100-500), tăng throughput tổng thể. Pool size quan trọng: quá nhỏ gây bottleneck, quá lớn gây OOM hoặc quá tải DB. Công thức sizing phổ biến từ PostgreSQL Wiki: `pool_size ≈ (core_count * 2) + effective_spindle_count` — đây là gợi ý từ phía DB server, không phải từ PgBouncer cụ thể; PgBouncer khuyến nghị pool_size dựa trên max_connections và concurrency thực tế. Công cụ phổ biến: PgBouncer (PostgreSQL), HikariCP (Java), pg-pool (Node.js).

## Detailed Answer (EN)
Connection Pooling maintains a pool of already-initialized connections; the application borrows a connection and returns it after use — instead of opening a new connection with TCP handshake + authentication overhead (20–100ms each time).\
\
**Benefits:** significantly reduced latency, capping connections to the database (PostgreSQL typically limits max_connections to ~100–500), higher overall throughput. Pool size matters: too small causes a bottleneck, too large causes OOM or database overload. A common sizing formula from the PostgreSQL Wiki: `pool_size ≈ (core_count × 2) + effective_spindle_count` — this is a DB server sizing guideline, not a PgBouncer-specific formula; PgBouncer recommends pool_size based on max_connections and expected concurrency. Popular tools: PgBouncer (PostgreSQL), HikariCP (Java), pg-pool (Node.js).
