---
id: quiz-kubernetes-quan-he-gia-node-pod-va-container-la-gi
position: backend
technology: kubernetes
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Quan hệ giữa Node, Pod và container là gì?

## Đáp án trắc nghiệm
- [ ] Node nằm trong Pod, Pod nằm trong container
- [x] Node là máy (vật lý hoặc ảo) trong cụm
- [ ] Mỗi Node chỉ chạy được đúng một Pod
- [ ] Node và Pod là hai tên gọi của cùng một thứ

## Giải thích (VI)
Cụm gồm nhiều Node (máy). Mỗi Node chạy nhiều Pod. Mỗi Pod bọc một hoặc nhiều container dùng chung IP và volume. Ngoài ra cụm có control plane (API server, scheduler, controller manager, etcd) điều phối mọi thứ.

### Giải thích các phương án:
- **Node nằm trong Pod, Pod nằm trong container** (Sai): Thứ tự lồng nhau ngược hoàn toàn.
- **Node là máy (vật lý hoặc ảo) trong cụm** (Đúng): Trên mỗi Node chạy nhiều Pod; mỗi Pod chứa một hoặc nhiều container dùng chung mạng và volume. Đây đúng ba tầng lồng nhau của mô hình Kubernetes.
- **Mỗi Node chỉ chạy được đúng một Pod** (Sai): Một Node chạy được nhiều Pod, giới hạn bởi tài nguyên và cấu hình.
- **Node và Pod là hai tên gọi của cùng một thứ** (Sai): Node là máy, Pod là đơn vị workload chạy trên máy đó.
