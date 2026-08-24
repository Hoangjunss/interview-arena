---
id: service-mesh-la-gi-giai-quyet-van-de-gi-trong-microservice
position: backend
technology: kubernetes
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Service mesh là gì? Giải quyết vấn đề gì trong microservice?

## Question (EN)
What is a service mesh and what problem does it solve for microservices?

## Đáp án chi tiết (VI)
Service mesh là một **lớp hạ tầng chuyên quản lý giao tiếp service-to-service** trong hệ microservice, **tách khỏi mã ứng dụng**. Hiện thực phổ biến là **sidecar proxy** (Envoy) đặt cạnh mỗi service, **chặn toàn bộ traffic vào/ra** của service đó.\
\
Cung cấp — mà không phải sửa code:\
- **Traffic management**: canary/split traffic, retry, timeout, circuit breaking, load balancing.\
- **Security**: **mTLS** mã hóa và xác thực lẫn nhau giữa các service (zero-trust), chính sách authz.\
- **Observability**: tự sinh **metric, trace, log** cho mọi lời gọi giữa service.\
\
**Control plane** (Istio) cấu hình và phân phối chính sách xuống các proxy (data plane).\
\
Vấn đề nó giải quyết: khi có **nhiều service**, các lo ngại về mạng (bảo mật, quan sát, độ tin cậy) bị lặp lại ở từng service — mesh gom về hạ tầng chung. Đánh đổi: **thêm độ phức tạp và overhead**; chỉ nên dùng khi quy mô service đủ lớn.

## Detailed Answer (EN)
$85
