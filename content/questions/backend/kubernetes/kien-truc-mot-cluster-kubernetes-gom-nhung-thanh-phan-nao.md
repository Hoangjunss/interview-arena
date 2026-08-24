---
id: kien-truc-mot-cluster-kubernetes-gom-nhung-thanh-phan-nao
position: backend
technology: kubernetes
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kiến trúc một cluster Kubernetes gồm những thành phần nào?

## Question (EN)
What components make up a Kubernetes cluster?

## Đáp án chi tiết (VI)
Một cluster có hai lớp: **control plane** (bộ não ra quyết định) và các **worker node** (nơi chạy workload).\
\
**Control plane:**\
- **kube-apiserver** — cửa ngõ duy nhất của cluster; mọi thao tác (kubectl, controller, kubelet) đều đi qua REST API này.\
- **etcd** — kho key-value nhất quán, lưu toàn bộ state mong muốn của cluster. Đây là nguồn sự thật.\
- **kube-scheduler** — chọn node phù hợp cho từng Pod chưa được gán.\
- **kube-controller-manager** — chạy các control loop (Deployment, ReplicaSet, Node...) để đưa state thực tế về state mong muốn.\
\
**Trên mỗi worker node:**\
- **kubelet** — agent nhận PodSpec từ API server và bảo container runtime chạy container, báo cáo tình trạng ngược lại.\
- **kube-proxy** — cấu hình network rule trên node để Service định tuyến tới đúng Pod.\
- **container runtime** (containerd, CRI-O) — thực sự chạy container.\
\
Hình dung: control plane là trung tâm điều phối, worker node là các nhà máy; kubelet là quản đốc nhận lệnh và điều hành nhà máy đó.

## Detailed Answer (EN)
$87
