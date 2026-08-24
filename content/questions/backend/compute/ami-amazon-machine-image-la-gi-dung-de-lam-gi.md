---
id: ami-amazon-machine-image-la-gi-dung-de-lam-gi
position: backend
technology: compute
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
AMI (Amazon Machine Image) là gì? Dùng để làm gì?

## Question (EN)
What is an AMI (Amazon Machine Image)? What is it used for?

## Đáp án chi tiết (VI)
AMI (Amazon Machine Image) là một **template chỉ-đọc** chứa đầy đủ thông tin để khởi chạy một EC2 instance. Một AMI gồm:\
\
- Một hoặc nhiều **EBS snapshot** (hoặc template cho instance-store) — tức trạng thái ổ đĩa: OS, thư viện, ứng dụng đã cài, cấu hình.\
- **Quyền launch** (ai được dùng AMI này).\
- **Block device mapping** — mô tả volume nào gắn khi instance khởi động.\
\
**Dùng để làm gì:** mỗi lần launch một instance, bạn phải chọn một AMI làm điểm xuất phát. Nguồn AMI gồm: AWS cung cấp (Amazon Linux, Ubuntu, Windows), AWS Marketplace, cộng đồng, hoặc **custom AMI của chính bạn**.\
\
**Giá trị thực tế** nằm ở custom AMI (golden image): cài sẵn runtime, agent, và cấu hình bảo mật vào một máy, rồi tạo AMI từ nó. Sau đó Auto Scaling Group launch hàng loạt instance giống hệt trong vài giây thay vì cài từ đầu — vừa nhanh, vừa đảm bảo mọi máy đồng nhất (immutable infrastructure). AMI **gắn với một Region**; muốn dùng ở Region khác phải copy sang.

## Detailed Answer (EN)
$84
