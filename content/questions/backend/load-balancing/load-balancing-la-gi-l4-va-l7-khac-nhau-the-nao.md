---
id: load-balancing-la-gi-l4-va-l7-khac-nhau-the-nao
position: backend
technology: load-balancing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Load balancing là gì? L4 và L7 khác nhau thế nào?

## Question (EN)
What is load balancing, and how do L4 and L7 differ?

## Đáp án chi tiết (VI)
Load balancer **phân phối request tới nhiều server backend** để không máy nào quá tải — tăng throughput, độ sẵn sàng và khả năng scale. Nó cũng làm **health check**, ngừng gửi tới server hỏng.\
\
Hai tầng:\
- **L4 (transport)**: định tuyến theo **IP + port**, không nhìn nội dung request. Rất nhanh, throughput cao. (AWS NLB.)\
- **L7 (application)**: hiểu **HTTP** — route theo **path, host, header, cookie**; làm TLS termination, sticky session, rewrite. Linh hoạt hơn nhưng nặng hơn. (AWS ALB, nginx.)\
\
Thuật toán phân phối: **round robin**, **least connections**, **IP hash** (giữ client về cùng server), weighted.\
\
So sánh nhanh: cần **định tuyến theo nội dung HTTP** → L7; cần **hiệu năng thô, non-HTTP** → L4.

## Detailed Answer (EN)
A load balancer **distributes requests across multiple backend servers** so none is overloaded — improving throughput, availability and scalability. It also runs **health checks**, stopping traffic to unhealthy servers.\
\
Two layers:\
- **L4 (transport)**: routes by **IP + port**, without inspecting request content. Very fast, high throughput. (AWS NLB.)\
- **L7 (application)**: understands **HTTP** — routes by **path, host, header, cookie**; does TLS termination, sticky sessions, rewrites. More flexible but heavier. (AWS ALB, nginx.)\
\
Distribution algorithms: **round robin**, **least connections**, **IP hash** (pin a client to one server), weighted.\
\
Quick comparison: need **HTTP content-based routing** → L7; need **raw performance, non-HTTP** → L4.
