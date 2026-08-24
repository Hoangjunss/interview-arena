---
id: scale-doc-vertical-va-scale-ngang-horizontal-khac-nhau-the-nao-danh-doi-ra-sao
position: system-design
technology: scaling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Scale dọc (vertical) và scale ngang (horizontal) khác nhau thế nào? Đánh đổi ra sao?

## Question (EN)
Vertical vs horizontal scaling — what is the difference and the trade-offs?

## Đáp án chi tiết (VI)
- **Scale dọc (scale up)**: làm **một máy mạnh hơn** — thêm CPU, RAM, ổ đĩa. Đơn giản, **không cần đổi kiến trúc/code**, tránh được độ phức tạp phân tán. Nhược: có **trần phần cứng**, giá tăng phi tuyến ở cấu hình cao, và vẫn là **một điểm chết duy nhất** (single point of failure).\
- **Scale ngang (scale out)**: thêm **nhiều máy** rồi chia tải qua load balancer. Ưu: mở rộng gần như **không giới hạn**, **chịu lỗi** tốt (một máy chết vẫn còn máy khác), tận dụng phần cứng phổ thông rẻ. Nhược: đòi hỏi **service stateless** (đẩy state ra Redis/DB dùng chung), thêm độ phức tạp của **dữ liệu phân tán** (replication/sharding, nhất quán).\
\
Thực tế: **scale dọc trước** vì nhanh và rẻ về công sức tới khi chạm trần hoặc cần tính sẵn sàng cao; sau đó **scale ngang** cho tầng ứng dụng (dễ, nếu đã stateless) và xử lý tầng dữ liệu riêng bằng read replica/sharding. Hai hướng không loại trừ nhau — thường kết hợp.

## Detailed Answer (EN)
- **Vertical scaling (scale up)**: make **one machine more powerful** — add CPU, RAM, disk. Simple, **no architecture/code changes**, avoids distributed-systems complexity. Cons: a **hardware ceiling**, non-linear cost at high-end configs, and it remains a **single point of failure**.\
- **Horizontal scaling (scale out)**: add **more machines** and spread load via a load balancer. Pros: near-**unlimited** growth, better **fault tolerance** (one machine dies, others remain), uses cheap commodity hardware. Cons: requires **stateless services** (push state to shared Redis/DB) and adds **distributed data** complexity (replication/sharding, consistency).\
\
In practice: **scale up first** since it is fast and cheap in effort until you hit the ceiling or need high availability; then **scale out** the application tier (easy if already stateless) and handle the data tier separately with read replicas/sharding. The two are not mutually exclusive — usually combined.
