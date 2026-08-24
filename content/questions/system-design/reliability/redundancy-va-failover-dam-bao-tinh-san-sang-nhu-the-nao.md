---
id: redundancy-va-failover-dam-bao-tinh-san-sang-nhu-the-nao
position: system-design
technology: reliability
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Redundancy và failover đảm bảo tính sẵn sàng như thế nào?

## Question (EN)
How do redundancy and failover ensure availability?

## Đáp án chi tiết (VI)
**Redundancy**: nhân bản thành phần để **không có single point of failure (SPOF)** — nhiều app server, nhiều DB replica, nhiều load balancer, trải trên nhiều **availability zone/region**.\
\
**Failover**: khi thành phần chính hỏng, tự động chuyển sang bản dự phòng.\
- **Active–passive**: bản standby chờ sẵn, chỉ nhận traffic khi primary chết (đơn giản, nhưng tài nguyên dự phòng nhàn rỗi).\
- **Active–active**: mọi bản đều phục vụ và chia tải; một bản chết thì phần còn lại gánh (tận dụng tốt nhưng phức tạp hơn về nhất quán).\
\
Điểm hay bị hỏi:\
- Failover phải **tự động + nhanh** và được **kiểm thử định kỳ** (nếu không, lúc cần lại hỏng).\
- Cảnh giác **split-brain** (hai primary cùng nhận ghi) → dùng quorum/leader election.\
- Đo bằng **RTO** (thời gian phục hồi) và **RPO** (mức mất dữ liệu chấp nhận được).

## Detailed Answer (EN)
**Redundancy**: duplicate components so there is **no single point of failure (SPOF)** — multiple app servers, DB replicas, load balancers, spread across **availability zones/regions**.\
\
**Failover**: when the primary fails, automatically switch to a standby.\
- **Active–passive**: a standby waits and only takes traffic when the primary dies (simple, but the standby sits idle).\
- **Active–active**: all replicas serve and share load; if one dies the rest absorb it (efficient but more complex for consistency).\
\
Common follow-ups:\
- Failover must be **automatic + fast** and **tested regularly** (or it fails when you need it).\
- Beware **split-brain** (two primaries accepting writes) → use quorum/leader election.\
- Measured by **RTO** (recovery time) and **RPO** (acceptable data loss).
