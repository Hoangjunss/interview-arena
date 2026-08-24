---
id: rbac-roles-and-rolebindings
position: devops
technology: kubernetes
level: mid
tags: [kubernetes, security, rbac]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RBAC trong Kubernetes hoạt động như thế nào? Role/RoleBinding khác ClusterRole/ClusterRoleBinding ở đâu, và tại sao cấp `cluster-admin` cho ServiceAccount là một rủi ro bảo mật lớn?

## Question (EN)
How does RBAC work in Kubernetes? How do Role/RoleBinding differ from ClusterRole/ClusterRoleBinding, and why is granting `cluster-admin` to a ServiceAccount a major security risk?

## Đáp án chi tiết (VI)
**RBAC (Role-Based Access Control)** quyết định **ai (subject)** được làm **gì (verb)** trên **resource nào**, thông qua 4 object chính:

| Object | Phạm vi | Vai trò |
|---|---|---|
| **Role** | Namespace-scoped | Định nghĩa tập quyền (verbs: get/list/watch/create/update/delete) trên resource trong **1 namespace** |
| **ClusterRole** | Cluster-scoped | Giống Role nhưng áp dụng **toàn cluster**, hoặc dùng cho resource cluster-scoped (Node, PV) |
| **RoleBinding** | Namespace-scoped | Gán Role (hoặc ClusterRole) cho subject (User/Group/ServiceAccount) **trong 1 namespace** |
| **ClusterRoleBinding** | Cluster-scoped | Gán ClusterRole cho subject **trên toàn cluster** |

**Điểm hay bị hỏi**: một **ClusterRole** có thể được bind qua **RoleBinding** để giới hạn phạm vi về 1 namespace — đây là cách hay dùng để tái sử dụng 1 ClusterRole định nghĩa sẵn (VD `view`, `edit`, `admin` — 3 ClusterRole built-in của Kubernetes) cho nhiều namespace khác nhau mà không cần định nghĩa lại Role trùng lặp.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: team-payment
  name: pod-reader
rules:
  - apiGroups: [""]
    resources: ["pods", "pods/log"]
    verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: team-payment
subjects:
  - kind: ServiceAccount
    name: ci-deployer
    namespace: team-payment
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

**Vì sao cấp `cluster-admin` cho ServiceAccount rủi ro cao**:
1. `cluster-admin` là ClusterRole built-in có quyền **`*` trên `*` resource ở `*` apiGroup** — tương đương root toàn cluster.
2. Một ServiceAccount thường được **gắn tự động vào mọi Pod** trong namespace nếu không set `automountServiceAccountToken: false` — nghĩa là bất kỳ ai **exec được vào 1 Pod bị compromise** (qua lỗ hổng RCE trong app) đều có thể đọc token tại `/var/run/secrets/kubernetes.io/serviceaccount/token` và **dùng token đó gọi thẳng kube-apiserver với quyền cluster-admin** — từ 1 lỗ hổng ứng dụng leo thang thành **chiếm toàn bộ cluster**.
3. Đây là nguyên nhân của rất nhiều sự cố bảo mật thực tế (container escape + over-privileged ServiceAccount = full cluster takeover).

**Best practice**:
- Áp dụng **nguyên tắc least privilege**: mỗi ServiceAccount chỉ có quyền tối thiểu cần thiết, dùng `Role` namespace-scoped thay vì `ClusterRole` khi có thể.
- `automountServiceAccountToken: false` cho Pod không cần gọi apiserver.
- Audit định kỳ bằng `kubectl auth can-i --list --as=system:serviceaccount:<ns>:<sa>` để kiểm tra quyền thực tế của một ServiceAccount.
- Không bao giờ dùng `cluster-admin` cho CI/CD pipeline — tạo Role riêng chỉ với verbs cần thiết (`create`, `update`, `patch` trên `deployments`, `services`... trong namespace được phép deploy).

## Detailed Answer (EN)
**RBAC (Role-Based Access Control)** decides **who (subject)** can do **what (verb)** on **which resource**, through four main objects:

| Object | Scope | Role |
|---|---|---|
| **Role** | Namespace-scoped | Defines a set of permissions (verbs: get/list/watch/create/update/delete) on resources in **one namespace** |
| **ClusterRole** | Cluster-scoped | Like a Role but applies **cluster-wide**, or used for cluster-scoped resources (Node, PV) |
| **RoleBinding** | Namespace-scoped | Grants a Role (or ClusterRole) to a subject (User/Group/ServiceAccount) **within one namespace** |
| **ClusterRoleBinding** | Cluster-scoped | Grants a ClusterRole to a subject **cluster-wide** |

**A point commonly probed**: a **ClusterRole** can be bound via a **RoleBinding** to limit its scope to one namespace — a common pattern for reusing predefined ClusterRoles (e.g. `view`, `edit`, `admin` — Kubernetes' three built-in ClusterRoles) across many different namespaces without duplicating Role definitions.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: team-payment
  name: pod-reader
rules:
  - apiGroups: [""]
    resources: ["pods", "pods/log"]
    verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: team-payment
subjects:
  - kind: ServiceAccount
    name: ci-deployer
    namespace: team-payment
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

**Why granting `cluster-admin` to a ServiceAccount is high-risk**:
1. `cluster-admin` is the built-in ClusterRole with `*` verbs on `*` resources across `*` apiGroups — effectively root over the entire cluster.
2. A ServiceAccount is typically **auto-mounted into every Pod** in a namespace unless `automountServiceAccountToken: false` is set — meaning anyone who can **exec into a compromised Pod** (via an RCE vulnerability in the app) can read the token at `/var/run/secrets/kubernetes.io/serviceaccount/token` and **use it to call the apiserver directly with cluster-admin privileges** — escalating from one application vulnerability to a **full cluster takeover**.
3. This is the root cause behind many real-world security incidents (container escape + over-privileged ServiceAccount = complete cluster compromise).

**Best practices**:
- Apply the **principle of least privilege**: every ServiceAccount gets only the minimum permissions it needs, using namespace-scoped `Role` instead of `ClusterRole` wherever possible.
- Set `automountServiceAccountToken: false` for Pods that never need to call the apiserver.
- Audit regularly with `kubectl auth can-i --list --as=system:serviceaccount:<ns>:<sa>` to check a ServiceAccount's actual permissions.
- Never use `cluster-admin` for CI/CD pipelines — create a dedicated Role with only the necessary verbs (`create`, `update`, `patch` on `deployments`, `services`, ... in the namespaces it's allowed to deploy to).
