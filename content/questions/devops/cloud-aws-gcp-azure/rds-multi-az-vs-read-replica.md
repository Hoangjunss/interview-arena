---
id: rds-multi-az-vs-read-replica
position: devops
technology: cloud-aws-gcp-azure
level: mid
tags: [database, rds, ha]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RDS Multi-AZ và Read Replica khác nhau như thế nào? Chúng giải quyết vấn đề gì và có thể dùng cùng lúc không?

## Question (EN)
How do RDS Multi-AZ and Read Replica differ? What problems does each solve, and can they be used together?

## Đáp án chi tiết (VI)
| Đặc điểm | Multi-AZ | Read Replica |
|---|---|---|
| Mục đích chính | **High Availability** (failover khi primary lỗi) | **Scale đọc** (read scaling), giảm tải cho primary |
| Replication | Đồng bộ (synchronous) — standby luôn khớp dữ liệu primary | Bất đồng bộ (asynchronous) — có độ trễ (replication lag) |
| Đọc/ghi | Standby **không nhận query** trực tiếp (chỉ dùng khi failover) | Replica **nhận query đọc** trực tiếp |
| Failover | Tự động, DNS endpoint chuyển sang standby (~1-2 phút) | Không tự động — phải tự promote thành primary mới nếu cần |
| Vị trí | Cùng region, khác AZ | Có thể cùng region hoặc **khác region** (cross-region read replica) |
| Chi phí | x2 so với single instance | Thêm chi phí theo số replica |

**Vì sao 2 cái khác mục đích nhưng hay bị nhầm:** Multi-AZ **không giúp scale performance đọc** — standby chỉ tồn tại cho mục đích dự phòng, không xử lý query. Ngược lại Read Replica **không tự động failover** — nếu primary chết, ứng dụng vẫn mất khả năng ghi cho tới khi con người (hoặc automation) promote 1 replica lên làm primary.

**Kiến trúc kết hợp cả hai (khuyến nghị cho production):**
```
Primary (Multi-AZ: AZ-a) <-- sync --> Standby (AZ-b)
       |
       +-- async --> Read Replica 1 (cùng region, phục vụ reporting)
       +-- async --> Read Replica 2 (region khác, phục vụ DR + giảm latency đọc cho user xa)
```
- Ghi và đọc quan trọng (transactional) đi qua Primary (có Multi-AZ bảo vệ).
- Đọc không cần real-time tuyệt đối (dashboard, báo cáo, search) route sang Read Replica qua connection string riêng.

**Terraform ví dụ Read Replica:**
```hcl
resource "aws_db_instance" "read_replica" {
  identifier          = "prod-db-replica-1"
  replicate_source_db = aws_db_instance.primary.identifier
  instance_class      = "db.r6g.large"
}
```

**Gotcha:**
- Replication lag của Read Replica có thể tăng đột biến khi primary chịu tải ghi lớn — nếu app đọc dữ liệu vừa ghi ngay lập tức từ replica (read-after-write), có thể đọc phải dữ liệu cũ. Giải pháp: đọc ngay sau ghi thì đọc từ Primary, hoặc dùng route "read-your-writes" thông minh hơn.
- Multi-AZ failover không phải "zero downtime" — vẫn có gián đoạn ngắn (thường 60-120s) trong lúc DNS chuyển hướng và ứng dụng cần **retry logic + connection pool refresh** để phục hồi nhanh.

## Detailed Answer (EN)
| Feature | Multi-AZ | Read Replica |
|---|---|---|
| Main purpose | **High Availability** (failover when primary fails) | **Read scaling**, offloading the primary |
| Replication | Synchronous — standby always matches primary data | Asynchronous — has replication lag |
| Read/write | Standby does **not** serve queries directly (only used on failover) | Replica **serves read queries** directly |
| Failover | Automatic, DNS endpoint switches to standby (~1-2 min) | Not automatic — must manually promote to a new primary if needed |
| Location | Same region, different AZ | Can be same region or **cross-region** |
| Cost | ~2x a single instance | Additional cost per replica |

**Why they're often confused despite different purposes:** Multi-AZ does **not** help with read performance scaling — the standby exists purely for failover, it doesn't serve queries. Conversely, a Read Replica does **not** auto-failover — if the primary dies, the application loses write capability until a human (or automation) promotes a replica to primary.

**Combined architecture (recommended for production):**
```
Primary (Multi-AZ: AZ-a) <-- sync --> Standby (AZ-b)
       |
       +-- async --> Read Replica 1 (same region, serves reporting)
       +-- async --> Read Replica 2 (different region, serves DR + reduces read latency for distant users)
```
- Critical writes and transactional reads go through the Primary (protected by Multi-AZ).
- Reads that don't need absolute real-time freshness (dashboards, reports, search) route to a Read Replica via a separate connection string.

**Example Terraform for a Read Replica:**
```hcl
resource "aws_db_instance" "read_replica" {
  identifier          = "prod-db-replica-1"
  replicate_source_db = aws_db_instance.primary.identifier
  instance_class      = "db.r6g.large"
}
```

**Pitfalls:**
- Read Replica lag can spike under heavy write load on the primary — if the app reads data immediately after writing it (read-after-write) from a replica, it may see stale data. Fix: read immediately-after-write from the Primary, or use a smarter "read-your-writes" routing strategy.
- Multi-AZ failover isn't "zero downtime" — there's still a short gap (typically 60-120s) while DNS switches over, and the application needs **retry logic + connection pool refresh** to recover quickly.
