---
id: namespace-trong-kubernetes-dung-de-lam-gi
position: backend
technology: kubernetes
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Namespace trong Kubernetes dùng để làm gì?

## Question (EN)
What are Kubernetes namespaces used for?

## Đáp án chi tiết (VI)
Namespace **phân vùng logic** một cluster thành nhiều không gian tách biệt — như nhiều \\"thư mục\\" chia sẻ cùng một cluster vật lý.\
\
- **Tách môi trường/team**: `dev`, `staging`, `prod`, hoặc theo nhóm.\
- **Tránh trùng tên**: cùng một tên resource (vd Service `api`) tồn tại song song ở các namespace khác nhau.\
- **Gắn giới hạn**: `ResourceQuota` và `LimitRange` áp theo namespace; **RBAC** phân quyền theo namespace.\
\
Namespace mặc định: `default`, `kube-system` (thành phần hệ thống), `kube-public`. Lưu ý: một số resource là **cluster-scoped** (Node, PersistentVolume) nên không thuộc namespace nào.

## Detailed Answer (EN)
A namespace **logically partitions** a cluster into isolated spaces — like multiple \\"folders\\" sharing one physical cluster.\
\
- **Separate environments/teams**: `dev`, `staging`, `prod`, or per team.\
- **Avoid name clashes**: the same resource name (e.g. Service `api`) can coexist in different namespaces.\
- **Attach limits**: `ResourceQuota` and `LimitRange` apply per namespace; **RBAC** grants permissions per namespace.\
\
Default namespaces: `default`, `kube-system` (system components), `kube-public`. Note: some resources are **cluster-scoped** (Node, PersistentVolume) and belong to no namespace.
