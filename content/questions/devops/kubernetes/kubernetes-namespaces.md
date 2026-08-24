---
id: kubernetes-namespaces
position: devops
technology: kubernetes
level: junior
tags: [kubernetes, namespaces, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Namespace trong Kubernetes dùng để làm gì? Có phải Namespace cách ly hoàn toàn tài nguyên giữa các team không?

## Question (EN)
What is a Namespace used for in Kubernetes? Does a Namespace fully isolate resources between teams?

## Đáp án chi tiết (VI)
**Namespace** là cơ chế **chia một cluster vật lý thành nhiều "cluster ảo"** về mặt logic, giúp:
- **Tổ chức tài nguyên** theo team/môi trường (`dev`, `staging`, `team-payment`...).
- **Tránh trùng tên**: hai Deployment cùng tên `api` có thể tồn tại song song ở `namespace-a` và `namespace-b`.
- **Áp policy theo namespace**: `ResourceQuota` (giới hạn tổng CPU/memory/số object), `LimitRange` (giới hạn mặc định/min/max cho mỗi Pod), `NetworkPolicy`, `RBAC RoleBinding` (phân quyền theo namespace).
- **DNS namespaced**: gọi service khác namespace phải ghi rõ `service.namespace.svc.cluster.local`, cùng namespace chỉ cần `service`.

**Những gì Namespace KHÔNG cách ly** (điểm hay bị hỏi bẫy):
- **Node** là tài nguyên **cluster-scoped**, không thuộc namespace nào — Pod ở namespace A và B vẫn có thể chạy chung 1 node, chia sẻ CPU/memory vật lý nếu không set resource limit.
- Không cách ly network mặc định — Pod ở namespace A gọi thẳng được Pod ở namespace B qua ClusterIP/Pod IP trừ khi có `NetworkPolicy` chặn.
- Một số resource là **cluster-scoped**, không nằm trong namespace nào: `Node`, `PersistentVolume` (PVC thì có namespace, PV thì không), `ClusterRole`, `ClusterRoleBinding`, `StorageClass`, `Namespace` chính nó.
- Không giới hạn tài nguyên nếu không đi kèm `ResourceQuota` — namespace không có quota nghĩa là team đó có thể "ăn hết" tài nguyên cluster.

Ví dụ ResourceQuota để giới hạn:
```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: team-payment-quota
  namespace: team-payment
spec:
  hard:
    requests.cpu: "10"
    requests.memory: 20Gi
    limits.cpu: "20"
    pods: "50"
```

**Kết luận**: Namespace là ranh giới **tổ chức và quản trị (logical boundary)**, không phải ranh giới **bảo mật/hiệu năng cứng (hard isolation)**. Muốn cách ly thật sự về network/tài nguyên/tenant, cần kết hợp thêm NetworkPolicy, ResourceQuota, và trong trường hợp multi-tenant nghiêm ngặt thì cân nhắc cluster riêng hoặc namespace + node pool riêng (taints/tolerations) hoặc vCluster/virtual cluster.

## Detailed Answer (EN)
A **Namespace** is a mechanism to **logically split one physical cluster into multiple "virtual clusters"**, helping to:
- **Organize resources** by team/environment (`dev`, `staging`, `team-payment`, ...).
- **Avoid name collisions**: two Deployments both named `api` can coexist in `namespace-a` and `namespace-b`.
- **Apply per-namespace policy**: `ResourceQuota` (caps total CPU/memory/object counts), `LimitRange` (default/min/max per Pod), `NetworkPolicy`, RBAC `RoleBinding` (namespace-scoped permissions).
- **Namespaced DNS**: calling a service in another namespace requires the full `service.namespace.svc.cluster.local`; same-namespace calls just use `service`.

**What a Namespace does NOT isolate** (a common trick-question point):
- **Nodes** are **cluster-scoped** resources, belonging to no namespace — Pods in namespace A and B can still run on the same node, sharing physical CPU/memory if no resource limits are set.
- No network isolation by default — a Pod in namespace A can call a Pod in namespace B directly via ClusterIP/Pod IP unless a `NetworkPolicy` blocks it.
- Some resources are **cluster-scoped** and belong to no namespace at all: `Node`, `PersistentVolume` (the PVC is namespaced, the PV is not), `ClusterRole`, `ClusterRoleBinding`, `StorageClass`, and `Namespace` itself.
- No resource cap without a `ResourceQuota` attached — a namespace with no quota means that team can consume unlimited cluster resources.

Example ResourceQuota:
```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: team-payment-quota
  namespace: team-payment
spec:
  hard:
    requests.cpu: "10"
    requests.memory: 20Gi
    limits.cpu: "20"
    pods: "50"
```

**Bottom line**: a Namespace is an **organizational/administrative (logical) boundary**, not a **hard security/performance isolation** boundary. For true network/resource/tenant isolation you need to add NetworkPolicy, ResourceQuota, and for strict multi-tenancy, consider dedicated clusters, or namespace-plus-dedicated-node-pools (taints/tolerations), or a vCluster/virtual-cluster approach.
