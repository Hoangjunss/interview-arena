---
id: deployment-replicaset-statefulset-va-daemonset-khac-nhau-the-nao
position: backend
technology: workloads-\u0026-networking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Deployment, ReplicaSet, StatefulSet và DaemonSet khác nhau thế nào?

## Question (EN)
How are Deployment, ReplicaSet, StatefulSet and DaemonSet different?

## Đáp án chi tiết (VI)
Deployment quản lý stateless replicas và rolling updates, tạo ReplicaSet phía dưới. ReplicaSet đảm bảo số Pod replicas nhưng hiếm khi tạo trực tiếp. StatefulSet dùng cho workloads cần identity ổn định, persistent storage và thứ tự rollout. DaemonSet chạy một Pod trên mỗi node phù hợp, ví dụ log agent hoặc node exporter.\
\
Chọn workload theo lifecycle và state. API stateless dùng Deployment, database/queue stateful cân nhắc StatefulSet hoặc managed service, node-level agent dùng DaemonSet.

## Detailed Answer (EN)
Deployment manages stateless replicas and rolling updates, creating ReplicaSets underneath. ReplicaSet ensures a replica count but is rarely created directly. StatefulSet is for workloads needing stable identity, persistent storage and ordered rollout. DaemonSet runs one Pod on each suitable node, such as a log agent or node exporter.\
\
Choose the workload by lifecycle and state. Stateless APIs use Deployment, stateful databases/queues may use StatefulSet or managed services, and node-level agents use DaemonSet.
