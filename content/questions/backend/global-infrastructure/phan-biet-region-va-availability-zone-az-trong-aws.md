---
id: phan-biet-region-va-availability-zone-az-trong-aws
position: backend
technology: global-infrastructure
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt Region và Availability Zone (AZ) trong AWS.

## Question (EN)
What is the difference between a Region and an Availability Zone (AZ) in AWS?

## Đáp án chi tiết (VI)
Đây là hai tầng của hạ tầng vật lý AWS.\
\
- **Region** là một khu vực địa lý riêng biệt (ví dụ `ap-southeast-1` Singapore, `us-east-1` N. Virginia). Mỗi Region tách biệt hoàn toàn với Region khác về mặt vật lý và, theo mặc định, dữ liệu không rời khỏi Region trừ khi bạn chủ động chuyển.\
- **Availability Zone (AZ)** là một hoặc nhiều data center nằm *bên trong* một Region, có nguồn điện, làm mát và mạng độc lập. Mỗi Region gồm nhiều AZ (thường 3+), cách nhau đủ xa để không cùng chịu một sự cố cục bộ, nhưng nối với nhau bằng link độ trễ thấp.\
\
**Vì sao quan trọng:** chọn Region theo độ gần người dùng (giảm latency), yêu cầu chủ quyền dữ liệu (data residency), và giá. Còn AZ là công cụ để đạt **high availability**: deploy trên nhiều AZ (multi-AZ) để nếu một AZ hỏng, ứng dụng vẫn chạy — ví dụ RDS Multi-AZ giữ một standby ở AZ khác, hoặc đặt EC2 sau load balancer trải trên vài AZ.

## Detailed Answer (EN)
These are two tiers of the AWS physical infrastructure.\
\
- A **Region** is a separate geographic area (e.g. `ap-southeast-1` Singapore, `us-east-1` N. Virginia). Each Region is fully isolated from the others physically and, by default, data does not leave the Region unless you deliberately move it.\
- An **Availability Zone (AZ)** is one or more data centers *inside* a Region, with independent power, cooling, and networking. Each Region has multiple AZs (usually 3+), far enough apart to avoid a shared local failure but connected by low-latency links.\
\
**Why it matters:** choose a Region by proximity to users (lower latency), data residency requirements, and price. AZs are the tool for **high availability**: deploy across multiple AZs (multi-AZ) so the app survives a single AZ outage — e.g. RDS Multi-AZ keeps a standby in another AZ, or EC2 instances sit behind a load balancer spread over several AZs.
