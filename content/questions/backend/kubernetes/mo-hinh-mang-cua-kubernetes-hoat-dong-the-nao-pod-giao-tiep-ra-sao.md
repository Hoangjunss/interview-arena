---
id: mo-hinh-mang-cua-kubernetes-hoat-dong-the-nao-pod-giao-tiep-ra-sao
position: backend
technology: kubernetes
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mô hình mạng của Kubernetes hoạt động thế nào? Pod giao tiếp ra sao?

## Question (EN)
How does the Kubernetes networking model work, and how do pods communicate?

## Đáp án chi tiết (VI)
Mô hình mạng K8s dựa trên một quy tắc nền: **mọi pod có IP riêng** và **mọi pod gọi được nhau trực tiếp, không NAT** (mạng \\"phẳng\\" toàn cluster). Việc hiện thực do **CNI plugin** đảm nhận (Calico, Cilium, Flannel).\
\
Các mảnh ghép chính:\
- **Pod-to-pod**: đi qua CNI với IP phẳng — pod ở node A gọi thẳng IP pod ở node B.\
- **Service**: IP pod hay đổi, nên Service cấp **ClusterIP ổn định + load balance** tới nhóm pod. **kube-proxy** lập trình `iptables`/IPVS trên mỗi node để định tuyến traffic tới Service.\
- **Cluster DNS (CoreDNS)**: phân giải **tên service** (`api.default.svc.cluster.local`) sang ClusterIP → pod gọi nhau bằng tên thay vì IP.\
- **Ingress**: cổng vào **L7** cho traffic HTTP từ ngoài.\
- **NetworkPolicy**: mặc định mọi pod nói chuyện được với nhau; NetworkPolicy **giới hạn** pod nào được kết nối tới pod nào (phân đoạn mạng, zero-trust nội bộ).\
\
Đây là điểm hay bị hỏi sâu: từ một tên service, request được phân giải DNS → tới ClusterIP → kube-proxy chọn một pod đích.

## Detailed Answer (EN)
$89
