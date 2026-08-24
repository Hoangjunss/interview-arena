---
id: cac-thuat-toan-load-balancing-pho-bien-la-gi-uu-nhuoc-diem-cua-tung-loai
position: backend
technology: web-\u0026-api
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các thuật toán load balancing phổ biến là gì? Ưu nhược điểm của từng loại?

## Question (EN)
What are the common load balancing algorithms? What are the pros and cons of each?

## Đáp án chi tiết (VI)
Load balancing phân phối request qua nhiều server — thuật toán phổ biến bao gồm Round Robin, Least Connections, và IP Hash, mỗi loại phù hợp với use case khác nhau.\
\
- Round Robin: phân phối request lần lượt qua các server — đơn giản nhưng không tính đến load thực tế.\
- Weighted Round Robin: server mạnh hơn nhận nhiều request hơn theo tỷ lệ cấu hình.\
- Least Connections: gửi đến server có ít active connections nhất — tốt khi request duration không đều nhau.\
- Least Response Time: chọn server có response time thấp nhất — cần monitoring liên tục.\
- IP Hash: hash IP client để luôn route đến cùng một server (sticky session) — quan trọng khi app có state (session).\
- Random: chọn ngẫu nhiên — đơn giản, hoạt động tốt với số lượng server lớn.\
\
Trong thực tế: Nginx/HAProxy/AWS ALB hỗ trợ hầu hết các thuật toán này; Kubernetes dùng iptables/ipvs với round-robin mặc định. Health check là thành phần bắt buộc — LB phải tự động loại server unhealthy khỏi pool.

## Detailed Answer (EN)
$89
