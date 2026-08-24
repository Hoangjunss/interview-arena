---
id: disaster-recovery-rto-rpo-strategy
position: devops
technology: cloud-aws-gcp-azure
level: senior
tags: [disaster-recovery, ha, architecture]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RTO và RPO là gì? Trình bày 4 chiến lược Disaster Recovery phổ biến trên AWS và cách chọn chiến lược phù hợp.

## Question (EN)
What are RTO and RPO? Describe the 4 common Disaster Recovery strategies on AWS and how to choose the right one.

## Đáp án chi tiết (VI)
- **RTO (Recovery Time Objective)**: thời gian tối đa chấp nhận được để **khôi phục hệ thống hoạt động lại** sau sự cố.
- **RPO (Recovery Point Objective)**: lượng dữ liệu tối đa chấp nhận **mất** (tính theo thời gian) — ví dụ RPO = 1 giờ nghĩa là chấp nhận mất tối đa 1 giờ dữ liệu gần nhất.

**4 chiến lược DR trên AWS (từ rẻ/chậm đến đắt/nhanh):**

| Chiến lược | RTO | RPO | Chi phí | Mô tả |
|---|---|---|---|---|
| **Backup & Restore** | Vài giờ - 1 ngày | Vài giờ (theo tần suất backup) | Thấp nhất | Backup định kỳ (snapshot RDS, S3 cross-region replication), khi có sự cố mới bắt đầu dựng lại hạ tầng ở region DR |
| **Pilot Light** | ~10-30 phút | Vài phút (dùng replication liên tục) | Trung bình | Core service (DB) luôn chạy ở region DR dạng thu nhỏ (nhân bản dữ liệu liên tục), phần compute (app) chỉ dựng lên khi failover |
| **Warm Standby** | Vài phút | Gần thời gian thực | Cao hơn | Bản sao **thu nhỏ nhưng đầy đủ** stack chạy sẵn ở region DR (ví dụ 1-2 instance thay vì 10), scale lên khi failover |
| **Multi-Site Active-Active** | Gần như 0 | Gần như 0 | Cao nhất | Cả 2 region đều phục vụ traffic thật, failover gần như tức thời |

**Cách chọn chiến lược — dựa trên bài toán kinh doanh, không phải công nghệ:**
1. Xác định **business impact** nếu downtime: hệ thống nội bộ ít quan trọng (báo cáo, admin tool) → Backup & Restore đủ dùng, tiết kiệm chi phí.
2. Hệ thống thanh toán/core business (ví dụ hệ thống bán hàng chính) → Warm Standby hoặc Active-Active tùy ngân sách và SLA cam kết với khách hàng.
3. **Tính toán chi phí downtime thực tế** (doanh thu mất/giờ, ảnh hưởng thương hiệu) so với chi phí duy trì DR — nếu downtime 1 giờ gây mất $500k doanh thu, đầu tư Warm Standby ($10k/tháng) hoàn toàn hợp lý.

**Ví dụ thiết kế Pilot Light cho hệ thống order:**
```
Region chính (ap-southeast-1):        Region DR (ap-northeast-1):
- Full stack đang chạy                - RDS Read Replica (luôn sync)
- RDS Primary                         - AMI/image mới nhất đã build sẵn
                                       - Launch Template sẵn sàng
                                       - Route 53 health check theo dõi region chính

Khi region chính down:
1. Promote RDS Read Replica thành Primary (vài phút)
2. Chạy Terraform/CloudFormation dựng ASG + ALB từ template có sẵn (vài phút - chục phút)
3. Cập nhật Route 53 trỏ sang region DR
```

**Gotcha thường gặp trong phỏng vấn senior:**
- Nhiều đội có kế hoạch DR trên giấy nhưng **chưa từng test thật (DR drill)** — RTO/RPO trên tài liệu chỉ là lý thuyết cho tới khi failover thật diễn ra đúng như dự kiến. Nên có lịch **game day / chaos engineering** định kỳ (ví dụ Netflix Chaos Monkey style) để verify.
- RPO không chỉ phụ thuộc backup frequency mà còn **backup validation** — backup bị lỗi/corrupt mà không ai biết cho tới khi cần restore là thảm họa kép.
- Đừng quên DR cho **thành phần phụ trợ** (DNS, secrets manager, message queue, config) — chỉ backup DB thôi không đủ nếu app cần Redis cache, Kafka topic, hay Parameter Store để khởi động đúng.

## Detailed Answer (EN)
- **RTO (Recovery Time Objective)**: the maximum acceptable time to **restore the system to operation** after an incident.
- **RPO (Recovery Point Objective)**: the maximum acceptable amount of **data loss** measured in time — e.g. an RPO of 1 hour means losing up to the most recent hour of data is acceptable.

**4 common DR strategies on AWS (cheapest/slowest to most expensive/fastest):**

| Strategy | RTO | RPO | Cost | Description |
|---|---|---|---|---|
| **Backup & Restore** | Hours to a day | Hours (backup frequency) | Lowest | Periodic backups (RDS snapshots, S3 cross-region replication); infrastructure in the DR region is only built when disaster strikes |
| **Pilot Light** | ~10-30 minutes | Minutes (continuous replication) | Moderate | Core service (DB) always running in the DR region at reduced scale (continuously replicated), compute (app) is only spun up on failover |
| **Warm Standby** | Minutes | Near real-time | Higher | A **scaled-down but full** copy of the stack running in the DR region (e.g. 1-2 instances instead of 10), scaled up on failover |
| **Multi-Site Active-Active** | Near zero | Near zero | Highest | Both regions actively serve real traffic; failover is nearly instant |

**How to choose — based on the business problem, not the technology:**
1. Determine the **business impact** of downtime: internal, low-priority systems (reports, admin tools) → Backup & Restore is sufficient, saves cost.
2. Payment/core business systems (e.g. the main sales system) → Warm Standby or Active-Active depending on budget and the SLA committed to customers.
3. **Calculate the real cost of downtime** (revenue lost per hour, brand impact) versus the cost of maintaining DR — if 1 hour of downtime costs $500k in revenue, investing in a $10k/month Warm Standby is entirely justified.

**Example Pilot Light design for an order system:**
```
Primary region (ap-southeast-1):      DR region (ap-northeast-1):
- Full stack running                  - RDS Read Replica (always synced)
- RDS Primary                         - Latest AMI/image pre-built
                                       - Launch Template ready
                                       - Route 53 health check monitors primary region

When the primary region goes down:
1. Promote the RDS Read Replica to Primary (a few minutes)
2. Run Terraform/CloudFormation to spin up ASG + ALB from templates (minutes to tens of minutes)
3. Update Route 53 to point to the DR region
```

**Common senior-level interview pitfall:**
- Many teams have a DR plan on paper but have **never actually tested it (DR drill)** — RTO/RPO figures are only theoretical until a real failover happens as expected. Schedule regular **game days / chaos engineering exercises** (e.g. Netflix Chaos Monkey style) to verify.
- RPO doesn't just depend on backup frequency but also **backup validation** — a broken/corrupt backup that nobody notices until a restore is needed is a double disaster.
- Don't forget DR for **supporting components** (DNS, secrets manager, message queues, config) — backing up only the DB isn't enough if the app needs Redis cache, a Kafka topic, or Parameter Store to boot correctly.
