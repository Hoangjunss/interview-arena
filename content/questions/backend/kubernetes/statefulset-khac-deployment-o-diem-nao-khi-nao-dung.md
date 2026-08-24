---
id: statefulset-khac-deployment-o-diem-nao-khi-nao-dung
position: backend
technology: kubernetes
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
StatefulSet khác Deployment ở điểm nào? Khi nào dùng?

## Question (EN)
How does a StatefulSet differ from a Deployment, and when do you use it?

## Đáp án chi tiết (VI)
Deployment hợp cho app **stateless** (pod thay thế nhau tùy ý). StatefulSet dành cho app **stateful** cần **danh tính bền vững**.\
\
- **Tên/thứ tự ổn định**: pod đánh số `-0`, `-1`... giữ nguyên khi tạo lại (không random như Deployment).\
- **Storage riêng cho từng pod**: mỗi pod có PersistentVolumeClaim riêng, gắn lại đúng volume cũ sau restart.\
- **Triển khai/scale có thứ tự**: tạo và xóa tuần tự (`-0` trước rồi `-1`...).\
- **Headless Service**: mỗi pod có DNS riêng ổn định để đồng đội tìm nhau.\
\
Dùng cho **database, message broker, cluster có quorum** (PostgreSQL, Kafka, Zookeeper, Elasticsearch) — nơi mỗi node có danh tính và dữ liệu riêng.

## Detailed Answer (EN)
A Deployment suits **stateless** apps (pods are interchangeable). A StatefulSet is for **stateful** apps needing **stable identity**.\
\
- **Stable name/ordinal**: pods are numbered `-0`, `-1`... and keep the name across recreation (not random like a Deployment).\
- **Per-pod storage**: each pod has its own PersistentVolumeClaim, reattaching the same volume after restart.\
- **Ordered rollout/scaling**: created and deleted in sequence (`-0` before `-1`...).\
- **Headless Service**: each pod gets a stable DNS name so peers can find each other.\
\
Use for **databases, message brokers, quorum clusters** (PostgreSQL, Kafka, Zookeeper, Elasticsearch) — where each node has its own identity and data.
