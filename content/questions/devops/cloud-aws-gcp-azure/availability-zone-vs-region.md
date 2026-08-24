---
id: availability-zone-vs-region
position: devops
technology: cloud-aws-gcp-azure
level: junior
tags: [ha, networking, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Region và Availability Zone (AZ) khác nhau như thế nào? Vì sao nên deploy ứng dụng qua nhiều AZ?

## Question (EN)
What is the difference between a Region and an Availability Zone (AZ)? Why should applications be deployed across multiple AZs?

## Đáp án chi tiết (VI)
- **Region**: một khu vực địa lý độc lập (ví dụ `ap-southeast-1` - Singapore, `us-east-1` - Virginia), mỗi region hoàn toàn tách biệt về hạ tầng, dữ liệu không tự động đồng bộ giữa các region.
- **Availability Zone (AZ)**: một hoặc nhiều **data center vật lý riêng biệt** trong cùng 1 region, có nguồn điện, network, làm mát độc lập với các AZ khác, nhưng kết nối với nhau qua mạng tốc độ cao, độ trễ thấp (thường <2ms).

**Quan hệ:** 1 Region thường có 3+ AZ (ví dụ `ap-southeast-1a`, `1b`, `1c`).

**Vì sao deploy đa AZ:**
- Nếu 1 data center (AZ) gặp sự cố (cháy nổ, mất điện, thiên tai), ứng dụng vẫn chạy nhờ instance ở AZ khác — đây là cách đạt **High Availability trong 1 region** mà không cần multi-region phức tạp.
- RDS Multi-AZ, ASG trải nhiều subnet ở nhiều AZ, ALB tự phân phối traffic qua nhiều AZ là các pattern chuẩn.

**Ví dụ minh họa kiến trúc tối thiểu HA trong 1 region:**
```
Region: ap-southeast-1
├── AZ-a: EC2 (ASG), RDS Primary, Subnet public+private
├── AZ-b: EC2 (ASG), RDS Standby, Subnet public+private
└── ALB phân phối traffic vào cả AZ-a và AZ-b
```

**Khi nào cần multi-region (không chỉ multi-AZ):** khi cần chống lại sự cố ở **cấp toàn region** (region-wide outage — hiếm nhưng đã từng xảy ra), yêu cầu tuân thủ dữ liệu theo địa lý (data residency), hoặc muốn giảm latency cho người dùng ở nhiều châu lục.

**Gotcha:** nhiều đội nghĩ deploy 2 instance trong cùng 1 AZ là "đã có HA" — sai, vì nếu AZ đó down thì cả 2 instance đều down. Phải đảm bảo instance/replica nằm ở **AZ khác nhau** mới thực sự chống được lỗi hạ tầng.

## Detailed Answer (EN)
- **Region**: an independent geographic area (e.g. `ap-southeast-1` - Singapore, `us-east-1` - Virginia), each fully isolated in infrastructure; data doesn't automatically replicate between regions.
- **Availability Zone (AZ)**: one or more **physically separate data centers** within the same region, each with independent power, networking, and cooling from other AZs, but connected via high-speed, low-latency links (typically <2ms).

**Relationship:** a Region typically contains 3+ AZs (e.g. `ap-southeast-1a`, `1b`, `1c`).

**Why deploy across multiple AZs:**
- If one data center (AZ) fails (fire, power outage, natural disaster), the application keeps running via instances in other AZs — this is how you achieve **High Availability within a single region** without the complexity of multi-region.
- RDS Multi-AZ, an ASG spread across multiple subnets in multiple AZs, and an ALB auto-distributing traffic across AZs are the standard patterns.

**Minimal single-region HA architecture example:**
```
Region: ap-southeast-1
├── AZ-a: EC2 (ASG), RDS Primary, public+private subnets
├── AZ-b: EC2 (ASG), RDS Standby, public+private subnets
└── ALB distributes traffic to both AZ-a and AZ-b
```

**When you need multi-region (not just multi-AZ):** when you need to survive a **region-wide outage** (rare but has happened), meet data residency/compliance requirements, or want to reduce latency for users across multiple continents.

**Pitfall:** many teams believe deploying 2 instances in the same AZ counts as "HA" — wrong, because if that AZ goes down, both instances go down together. Instances/replicas must reside in **different AZs** to actually protect against infrastructure failure.
