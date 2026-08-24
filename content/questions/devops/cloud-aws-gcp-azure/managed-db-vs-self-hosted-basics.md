---
id: managed-db-vs-self-hosted-basics
position: devops
technology: cloud-aws-gcp-azure
level: junior
tags: [database, rds, cost]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dùng managed database (như RDS) khác gì so với tự cài database trên EC2? Ưu nhược điểm là gì?

## Question (EN)
How does using a managed database (like RDS) differ from self-hosting a database on EC2? What are the trade-offs?

## Đáp án chi tiết (VI)
| Tiêu chí | Managed DB (RDS/Cloud SQL/Azure SQL) | Self-hosted trên EC2/VM |
|---|---|---|
| Cài đặt & patching | Cloud provider tự động patch OS, engine | Tự cài, tự vá lỗi bảo mật |
| Backup | Tự động, point-in-time recovery có sẵn | Tự viết script backup, tự test restore |
| High Availability | Bật Multi-AZ bằng 1 checkbox/flag | Tự dựng replication, failover |
| Kiểm soát | Hạn chế — không SSH vào máy chủ DB, không cài extension tùy ý | Toàn quyền — cài bất kỳ extension, tune kernel |
| Chi phí | Cao hơn cho cùng cấu hình (trả phí quản lý) | Rẻ hơn về hạ tầng nhưng tốn công vận hành (opportunity cost) |
| Version engine | Đôi khi chậm hơn 1-2 version so với bản mới nhất | Có thể dùng version mới nhất ngay lập tức |

**Ví dụ thực tế:** startup nhỏ đội DevOps 1-2 người nên dùng **RDS** — tiết kiệm thời gian vận hành, tự động backup/failover, tập trung vào sản phẩm thay vì quản lý DB. Ngược lại, công ty cần tuning sâu (custom PostgreSQL extension, custom replication topology phức tạp) hoặc chi phí license đặc biệt mới cân nhắc self-host.

**Ví dụ tạo RDS Multi-AZ (AWS CLI):**
```bash
aws rds create-db-instance \
  --db-instance-identifier prod-db \
  --engine postgres \
  --db-instance-class db.r6g.large \
  --allocated-storage 100 \
  --multi-az \
  --master-username admin \
  --master-user-password "$(aws secretsmanager get-random-password --output text --query RandomPassword)" \
  --backup-retention-period 7
```

**Gotcha:** nhiều đội nghĩ RDS là "tự động HA hoàn toàn" nhưng Multi-AZ chỉ chống lỗi **hạ tầng** (AZ down, instance crash) — nó không thay thế cho việc thiết kế schema tốt, indexing hợp lý, hay chống **application-level bug** (ví dụ transaction leak, deadlock) làm chậm DB.

## Detailed Answer (EN)
| Criteria | Managed DB (RDS/Cloud SQL/Azure SQL) | Self-hosted on EC2/VM |
|---|---|---|
| Setup & patching | Cloud provider auto-patches OS, engine | You install and patch security issues yourself |
| Backup | Automatic, point-in-time recovery built in | You write your own backup scripts and test restores |
| High Availability | Enable Multi-AZ with a flag/checkbox | You build replication and failover yourself |
| Control | Limited — no SSH into the DB server, no arbitrary extensions | Full control — install any extension, tune the kernel |
| Cost | Higher for the same specs (paying for management) | Cheaper infra cost but higher operational effort (opportunity cost) |
| Engine version | Sometimes 1-2 versions behind the latest | Can run the very latest version immediately |

**Real example:** a small startup with a 1-2 person DevOps team should use **RDS** — saving operational time, automatic backup/failover, letting the team focus on the product instead of DB administration. Conversely, a company needing deep tuning (custom PostgreSQL extensions, a complex custom replication topology) or specific licensing arrangements might consider self-hosting.

**Example — creating a Multi-AZ RDS instance (AWS CLI):**
```bash
aws rds create-db-instance \
  --db-instance-identifier prod-db \
  --engine postgres \
  --db-instance-class db.r6g.large \
  --allocated-storage 100 \
  --multi-az \
  --master-username admin \
  --master-user-password "$(aws secretsmanager get-random-password --output text --query RandomPassword)" \
  --backup-retention-period 7
```

**Pitfall:** many teams assume RDS gives "fully automatic HA," but Multi-AZ only protects against **infrastructure** failures (AZ outage, instance crash) — it doesn't replace good schema design, proper indexing, or protection against **application-level bugs** (e.g. transaction leaks, deadlocks) that slow the DB down.
