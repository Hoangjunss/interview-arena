---
id: multi-region-active-active-ha-design
position: devops
technology: cloud-aws-gcp-azure
level: senior
tags: [architecture, ha, multi-region]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế một kiến trúc multi-region active-active cho một hệ thống thương mại điện tử cần uptime 99.99%. Những thách thức lớn nhất là gì?

## Question (EN)
Design a multi-region active-active architecture for an e-commerce system requiring 99.99% uptime. What are the biggest challenges?

## Đáp án chi tiết (VI)
**Yêu cầu 99.99% uptime** cho phép downtime ~52 phút/năm — multi-AZ trong 1 region (thường đạt 99.9-99.95%) không đủ nếu cần chống **region-wide outage**, nên cần kiến trúc **active-active đa region**.

**Kiến trúc tổng quan:**
```
                     Route 53 (latency-based / geo routing + health check)
                    /                                              \
        Region A (ap-southeast-1)                        Region B (us-east-1)
   ALB -> ASG (app) -> DynamoDB Global Table              ALB -> ASG (app) -> DynamoDB Global Table
              \                                                  /
               \------------- Aurora Global Database -----------/
                      (1 writer region + read replica region)
```

**Các thách thức chính và cách giải quyết:**

**1. Đồng bộ dữ liệu (data consistency) giữa các region:**
- **DynamoDB Global Tables**: multi-master, đồng bộ bất đồng bộ (~1s), dùng **last-writer-wins** để giải quyết conflict — chấp nhận eventual consistency cho dữ liệu không critical (cart, session, catalog cache).
- **Aurora Global Database**: 1 region writer, các region khác là read replica với replication lag <1s — nếu cần ghi ở nhiều region cùng lúc (true multi-master) thì phải chấp nhận độ phức tạp conflict resolution cao hơn nhiều (hoặc dùng giải pháp bên thứ 3 như CockroachDB/Spanner-style).
- **Nguyên tắc thực tế:** phân loại dữ liệu theo mức độ cần **strong consistency** (đơn hàng, thanh toán — nên có 1 "region chủ" xử lý ghi theo user/partition) vs dữ liệu chấp nhận eventual consistency (catalog, review, session).

**2. Routing traffic và failover:**
- **Route 53 latency-based routing** đưa user tới region gần nhất, kết hợp **health check** để tự động loại region lỗi khỏi DNS.
- Vấn đề: DNS TTL + resolver cache khiến failover **không tức thời** (có thể mất vài phút cho tới khi toàn bộ client cập nhật DNS mới) — cần TTL thấp (60s) đánh đổi với tăng số lượng DNS query.

**3. Session/state của người dùng:**
- Session phải được replicate cross-region (ElastiCache Global Datastore) hoặc thiết kế **stateless** (JWT token) để user có thể được route tới bất kỳ region nào mà không mất session.

**4. Chi phí và độ phức tạp vận hành:**
- Chạy full stack ở 2+ region tăng chi phí gần gấp đôi (hoặc hơn nếu cần capacity dự phòng cho failover).
- CI/CD phải deploy đồng thời/tuần tự an toàn tới nhiều region — cần **canary theo region** thay vì deploy toàn bộ cùng lúc để giảm blast radius nếu có bug.

**5. Split-brain và conflict trong ghi dữ liệu:**
- Nếu network partition giữa 2 region (rất hiếm nhưng có thể xảy ra), cả 2 region vẫn nhận ghi độc lập → conflict khi network phục hồi. Cần chiến lược resolve rõ ràng (timestamp-based, vector clock, hoặc business logic ưu tiên 1 region).

**Đánh giá thực tế:** active-active đa region cực kỳ tốn kém và phức tạp — trước khi build, cần đặt câu hỏi "liệu active-passive (1 region chính, 1 region DR sẵn sàng failover trong vài phút) có đáp ứng đủ 99.99% không?" — với RTO/RPO hợp lý, active-passive với warm standby thường đã đủ cho hầu hết doanh nghiệp, và active-active chỉ thực sự cần thiết khi latency toàn cầu là yêu cầu bắt buộc (ví dụ platform toàn cầu với người dùng phân bố đều).

## Detailed Answer (EN)
A **99.99% uptime** requirement allows roughly 52 minutes of downtime per year — single-region multi-AZ (typically 99.9-99.95%) isn't enough if you need to survive a **region-wide outage**, so a **multi-region active-active** architecture is needed.

**Overall architecture:**
```
                     Route 53 (latency-based / geo routing + health check)
                    /                                              \
        Region A (ap-southeast-1)                        Region B (us-east-1)
   ALB -> ASG (app) -> DynamoDB Global Table              ALB -> ASG (app) -> DynamoDB Global Table
              \                                                  /
               \------------- Aurora Global Database -----------/
                      (1 writer region + read replica region)
```

**Main challenges and how to address them:**

**1. Data consistency across regions:**
- **DynamoDB Global Tables**: multi-master, asynchronous replication (~1s), uses **last-writer-wins** for conflict resolution — acceptable eventual consistency for non-critical data (cart, session, catalog cache).
- **Aurora Global Database**: one writer region, other regions are read replicas with <1s replication lag — if you need true multi-master writes across regions, you must accept far more conflict-resolution complexity (or use a third-party solution like CockroachDB/Spanner-style databases).
- **Practical principle:** classify data by how much **strong consistency** it needs (orders, payments — should have one "owning region" handle writes per user/partition) vs data that can tolerate eventual consistency (catalog, reviews, session).

**2. Traffic routing and failover:**
- **Route 53 latency-based routing** sends users to their nearest region, combined with **health checks** to automatically remove a failing region from DNS.
- Problem: DNS TTL + resolver caching mean failover **isn't instant** (can take several minutes for all clients to pick up the new DNS) — low TTL (60s) helps but trades off against higher DNS query volume.

**3. User session/state:**
- Sessions must either be replicated cross-region (ElastiCache Global Datastore) or the system must be designed **stateless** (JWT tokens) so a user can be routed to any region without losing their session.

**4. Cost and operational complexity:**
- Running the full stack in 2+ regions nearly doubles cost (or more, if reserve capacity is needed for failover).
- CI/CD must deploy safely, concurrently or sequentially, across multiple regions — needs **per-region canary** deploys rather than deploying everywhere at once, to reduce blast radius if a bug ships.

**5. Split-brain and write conflicts:**
- If a network partition occurs between regions (rare but possible), both regions may keep accepting writes independently → conflicts when the network recovers. A clear resolution strategy is needed (timestamp-based, vector clocks, or business-logic-driven region priority).

**Practical assessment:** multi-region active-active is extremely expensive and complex — before building it, ask "would active-passive (one primary region, one DR region ready to fail over within minutes) meet 99.99%?" With reasonable RTO/RPO, active-passive with a warm standby is usually sufficient for most businesses; true active-active is only necessary when global low latency is a hard requirement (e.g. a global platform with evenly distributed users).
