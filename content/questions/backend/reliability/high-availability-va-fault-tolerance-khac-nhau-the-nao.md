---
id: high-availability-va-fault-tolerance-khac-nhau-the-nao
position: backend
technology: reliability
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
High availability và fault tolerance khác nhau thế nào?

## Question (EN)
What is the difference between high availability and fault tolerance?

## Đáp án chi tiết (VI)
- **High Availability (HA)**: hệ thống **giảm tối đa downtime**, phục hồi nhanh sau lỗi — nhưng có thể có **gián đoạn ngắn** khi failover. Đo bằng \\"số 9\\" (99.9%, 99.99%). Cách làm: **loại bỏ single point of failure**, chạy đa AZ, health check + auto failover, load balancing.\
- **Fault Tolerance (FT)**: mạnh hơn — **không gián đoạn** dù thành phần hỏng, nhờ **dư thừa (redundancy)** đủ để không ai nhận ra lỗi. Tốn kém hơn nhiều.\
\
Hai khái niệm liên quan hay hỏi:\
- **RTO** (Recovery Time Objective): bao lâu để khôi phục.\
- **RPO** (Recovery Point Objective): chấp nhận mất tối đa bao nhiêu dữ liệu.\
\
Nguyên tắc chung: bỏ SPOF, dư thừa qua nhiều AZ/region, tự động phát hiện + thay thế, sao lưu và diễn tập khôi phục.

## Detailed Answer (EN)
- **High Availability (HA)**: the system **minimizes downtime** and recovers quickly from failures — but may have a **brief interruption** during failover. Measured in \\"nines\\" (99.9%, 99.99%). Achieved by **removing single points of failure**, multi-AZ, health checks + auto failover, load balancing.\
- **Fault Tolerance (FT)**: stronger — **no interruption** even when a component fails, via enough **redundancy** that nobody notices. Considerably more expensive.\
\
Two related terms often asked:\
- **RTO** (Recovery Time Objective): how long to recover.\
- **RPO** (Recovery Point Objective): how much data loss is acceptable.\
\
General principles: eliminate SPOFs, add redundancy across AZs/regions, auto-detect and replace, back up and rehearse recovery.
