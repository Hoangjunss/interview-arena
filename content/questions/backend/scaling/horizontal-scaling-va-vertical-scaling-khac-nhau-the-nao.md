---
id: horizontal-scaling-va-vertical-scaling-khac-nhau-the-nao
position: backend
technology: scaling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Horizontal scaling và vertical scaling khác nhau thế nào?

## Question (EN)
What is the difference between horizontal and vertical scaling?

## Đáp án chi tiết (VI)
Hai cách tăng năng lực xử lý khi tải lớn lên:\
\
- **Vertical scaling (scale up)**: **tăng tài nguyên cho một máy** — thêm CPU, RAM, đổi sang instance mạnh hơn. Đơn giản, không đổi kiến trúc, nhưng có **trần phần cứng**, thường cần **downtime** khi nâng cấp, và máy đó vẫn là **single point of failure**.\
- **Horizontal scaling (scale out)**: **thêm nhiều máy/instance** rồi chia tải qua **load balancer**. Gần như **không có trần**, đồng thời **tăng độ sẵn sàng** (một máy chết còn máy khác). Đổi lại cần app **stateless**, có LB và **đẩy state ra ngoài** (DB, cache dùng chung).\
\
Cloud và Kubernetes ưu tiên **scale out** (Auto Scaling Group, HPA). Câu hỏi hay kèm: vì sao ứng dụng **stateless** dễ scale ngang — vì mọi request đi vào bản nào cũng như nhau.

## Detailed Answer (EN)
Two ways to add capacity as load grows:\
\
- **Vertical scaling (scale up)**: **add resources to one machine** — more CPU, RAM, or a bigger instance. Simple, no architecture change, but there is a **hardware ceiling**, it usually needs **downtime** to upgrade, and that machine is still a **single point of failure**.\
- **Horizontal scaling (scale out)**: **add more machines/instances** and spread load through a **load balancer**. Practically **no ceiling** and it also **increases availability** (one dies, others serve). In return the app must be **stateless**, with an LB and **state pushed out** (shared DB, cache).\
\
Cloud and Kubernetes favor **scale out** (Auto Scaling Groups, HPA). A common follow-up: why **stateless** apps scale horizontally — because any request can hit any replica identically.
