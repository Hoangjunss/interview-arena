---
id: quiz-kubernetes-co-10-service-http-can-cho-truy-cap-tu-internet-vi-sao-ingress-thuong-hop-ly-hon
position: backend
technology: kubernetes
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Có 10 service HTTP cần cho truy cập từ internet. Vì sao Ingress thường hợp lý hơn 10 Service kiểu LoadBalancer?

## Đáp án trắc nghiệm
- [x] Nhiều service dùng chung MỘT điểm vào, định tuyến theo host/path
- [ ] Ingress tự động mã hóa toàn bộ traffic giữa các Pod trong cụm
- [ ] Ingress nhanh hơn vì bỏ qua lớp Service
- [ ] LoadBalancer chỉ dùng được cho service nội bộ, không mở ra internet được

## Giải thích (VI)
Mỗi Service LoadBalancer thường tốn một load balancer và một IP công khai — 10 service là 10 lần chi phí. Ingress cho tất cả dùng chung một điểm vào, định tuyến theo tên miền và đường dẫn, và quản lý chứng chỉ TLS tập trung.

### Giải thích các phương án:
- **Nhiều service dùng chung MỘT điểm vào, định tuyến theo host/path** (Đúng): Ingress là router tầng 7, giải quyết đúng bài toán nhiều service HTTP. Việc quản lý TLS cũng gom về một chỗ.
- **Ingress tự động mã hóa toàn bộ traffic giữa các Pod trong cụm** (Sai): Mã hóa nội bộ giữa các Pod là việc của service mesh.
- **Ingress nhanh hơn vì bỏ qua lớp Service** (Sai): Ingress vẫn định tuyến qua Service; nó không thay thế Service.
- **LoadBalancer chỉ dùng được cho service nội bộ, không mở ra internet được** (Sai): LoadBalancer chính là loại để mở ra bên ngoài.
