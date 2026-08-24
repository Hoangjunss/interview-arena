---
id: deployment-va-replicaset-khac-nhau-the-nao
position: backend
technology: kubernetes
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Deployment và ReplicaSet khác nhau thế nào?

## Question (EN)
What is the difference between a Deployment and a ReplicaSet?

## Đáp án chi tiết (VI)
- **ReplicaSet**: đảm bảo luôn có **đúng số bản sao (replicas)** của một pod đang chạy. Pod chết → tạo lại. Nhưng ReplicaSet **không xử lý cập nhật phiên bản**.\
- **Deployment**: lớp quản lý **cao hơn**, sở hữu ReplicaSet và thêm khả năng **rollout/rollback**. Khi đổi image, Deployment tạo ReplicaSet mới và **chuyển dần** pod (rolling update), giữ lịch sử để `rollback`.\
\
Thực tế bạn khai báo **Deployment**, còn ReplicaSet do nó tự tạo/quản lý — hiếm khi tạo ReplicaSet tay. Deployment = ReplicaSet + quản lý vòng đời phiên bản.

## Detailed Answer (EN)
- **ReplicaSet**: guarantees a **specified number of replicas** of a pod are running. A dead pod is recreated. But a ReplicaSet **does not handle version updates**.\
- **Deployment**: a **higher-level** controller that owns ReplicaSets and adds **rollout/rollback**. On an image change, the Deployment creates a new ReplicaSet and **shifts pods gradually** (rolling update), keeping history for `rollback`.\
\
In practice you declare a **Deployment**, and it creates/manages the ReplicaSet for you — you rarely create ReplicaSets by hand. Deployment = ReplicaSet + version lifecycle management.
