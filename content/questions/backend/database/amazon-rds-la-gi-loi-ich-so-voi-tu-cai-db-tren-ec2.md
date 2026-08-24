---
id: amazon-rds-la-gi-loi-ich-so-voi-tu-cai-db-tren-ec2
position: backend
technology: database
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Amazon RDS là gì? Lợi ích so với tự cài DB trên EC2?

## Question (EN)
What is Amazon RDS and its benefit over self-managing a DB on EC2?

## Đáp án chi tiết (VI)
RDS (Relational Database Service) là **CSDL quan hệ được quản lý (managed)** — hỗ trợ PostgreSQL, MySQL, MariaDB, Oracle, SQL Server (và Aurora).\
\
AWS lo phần vận hành nặng: **backup tự động**, **patch**, **cập nhật**, **giám sát**. Bạn tập trung vào schema và query.\
\
Lợi ích so với tự cài trên EC2:\
- **Multi-AZ**: standby đồng bộ ở AZ khác, **tự failover** khi primary hỏng → độ sẵn sàng cao.\
- **Read replica**: bản sao chỉ đọc để **scale đọc** và giảm tải primary.\
- **Automated backup + point-in-time recovery**.\
\
Đánh đổi: ít quyền kiểm soát OS/DB sâu, chi phí cao hơn tự quản. Muốn serverless/scale mạnh hơn → cân nhắc **Aurora** hoặc **DynamoDB** (NoSQL).

## Detailed Answer (EN)
RDS (Relational Database Service) is a **managed relational database** — supporting PostgreSQL, MySQL, MariaDB, Oracle, SQL Server (and Aurora).\
\
AWS handles the heavy operations: **automated backups**, **patching**, **upgrades**, **monitoring**. You focus on schema and queries.\
\
Benefits over self-managing on EC2:\
- **Multi-AZ**: a synchronous standby in another AZ with **automatic failover** when the primary fails → high availability.\
- **Read replicas**: read-only copies to **scale reads** and offload the primary.\
- **Automated backups + point-in-time recovery**.\
\
Trade-off: less deep OS/DB control, higher cost than self-managing. For serverless/greater scale → consider **Aurora** or **DynamoDB** (NoSQL).
