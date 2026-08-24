---
id: region-va-availability-zone-az-khac-nhau-the-nao
position: backend
technology: global-infrastructure
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Region và Availability Zone (AZ) khác nhau thế nào?

## Question (EN)
What is the difference between a Region and an Availability Zone (AZ)?

## Đáp án chi tiết (VI)
- **Region**: một **khu vực địa lý** (vd `us-east-1`, `ap-southeast-1` Singapore). Các region **tách biệt hoàn toàn** với nhau; chọn theo **độ trễ tới người dùng, giá, và tuân thủ dữ liệu (data residency)**.\
- **Availability Zone (AZ)**: một hoặc nhiều **data center rời nhau** trong cùng một region, có nguồn điện/mạng riêng nhưng nối với nhau bằng **liên kết độ trễ thấp**. Mỗi region có **nhiều AZ** (thường ≥3).\
\
Ý nghĩa thiết kế: trải tài nguyên **qua nhiều AZ** để chịu lỗi khi **một AZ sập** (Multi-AZ) mà vẫn giữ độ trễ thấp. Trải **qua nhiều region** để chống thảm họa vùng và phục vụ người dùng toàn cầu.\
\
Đừng nhầm với **edge location** (điểm CDN, nhiều hơn và nhỏ hơn AZ).

## Detailed Answer (EN)
- **Region**: a **geographic area** (e.g. `us-east-1`, `ap-southeast-1` Singapore). Regions are **fully isolated** from each other; choose by **latency to users, price, and data residency/compliance**.\
- **Availability Zone (AZ)**: one or more **discrete data centers** within a region, with independent power/networking but connected by **low-latency links**. Each region has **multiple AZs** (usually ≥3).\
\
Design implication: spread resources **across AZs** to survive a **single-AZ failure** (Multi-AZ) while keeping low latency. Spread **across regions** for disaster resilience and serving global users.\
\
Do not confuse with **edge locations** (CDN points of presence, far more numerous and smaller than AZs).
