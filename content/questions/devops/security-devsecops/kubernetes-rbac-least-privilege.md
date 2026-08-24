---
id: kubernetes-rbac-least-privilege
position: devops
technology: security-devsecops
level: mid
tags: [kubernetes, rbac, least-privilege]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích cơ chế RBAC trong Kubernetes (Role, ClusterRole, RoleBinding, ClusterRoleBinding). Làm sao để audit và phát hiện các cấu hình RBAC quá lỏng lẻo trong một cluster đang chạy?

## Question (EN)
Explain Kubernetes RBAC (Role, ClusterRole, RoleBinding, ClusterRoleBinding). How would you audit a running cluster to detect overly permissive RBAC configurations?

## Đáp án chi tiết (VI)
**Bốn resource cốt lõi của RBAC:**

| Resource | Phạm vi | Dùng để làm gì |
|---|---|---|
| `Role` | Namespace cụ thể | Định nghĩa tập quyền (verbs) trên resource trong 1 namespace |
| `ClusterRole` | Toàn cluster | Định nghĩa tập quyền trên resource cluster-scoped (nodes, PV) hoặc namespaced resource áp dụng cho mọi namespace |
| `RoleBinding` | Namespace cụ thể | Gán một Role (hoặc ClusterRole) cho user/group/ServiceAccount, chỉ có hiệu lực trong namespace đó |
| `ClusterRoleBinding` | Toàn cluster | Gán một ClusterRole cho user/group/ServiceAccount, có hiệu lực ở MỌI namespace |

**Điểm dễ nhầm lẫn nhất:** một `ClusterRole` có thể được bind bằng `RoleBinding` (namespace-scoped) — lúc đó quyền chỉ áp dụng trong namespace của RoleBinding đó, dù định nghĩa là ClusterRole. Đây là pattern hữu ích: định nghĩa 1 ClusterRole tái sử dụng được (VD: `view`, `edit` có sẵn của K8s) rồi bind riêng theo từng namespace mà không cần định nghĩa lại Role trùng lặp.

**Ví dụ cụ thể:**
```yaml
# ClusterRole định nghĩa quyền, có thể tái sử dụng nhiều nơi
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: pod-reader
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list", "watch"]
---
# RoleBinding: chỉ cấp quyền pod-reader trong namespace "dev-team-a"
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: dev-team-a
subjects:
  - kind: User
    name: alice
roleRef:
  kind: ClusterRole
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```
`alice` chỉ đọc được pods trong `dev-team-a`, KHÔNG đọc được ở namespace khác — vì binding là `RoleBinding` (namespace-scoped) dù `ClusterRole` được định nghĩa ở cấp cluster.

**Audit RBAC trong cluster đang chạy — các dấu hiệu nguy hiểm cần tìm:**

1. **Tìm mọi ClusterRoleBinding gắn với `cluster-admin`:**
```bash
kubectl get clusterrolebindings -o json | \
  jq -r '.items[] | select(.roleRef.name=="cluster-admin") | .subjects[]?.name'
```
Mỗi user/ServiceAccount xuất hiện ở đây có toàn quyền trên TOÀN BỘ cluster — cần review từng cái, hầu hết trường hợp là quá thừa quyền so với nhu cầu thực tế.

2. **Tìm Role/ClusterRole có wildcard `*`:**
```bash
kubectl get clusterroles -o json | \
  jq -r '.items[] | select(.rules[]? | .resources[]?=="*" or .verbs[]?=="*") | .metadata.name'
```
Wildcard trong `resources` hoặc `verbs` gần như luôn là dấu hiệu thiết kế cẩu thả — nên chỉ định rõ resource/verb cần thiết.

3. **Dùng công cụ chuyên dụng thay vì tự viết script:**
```bash
# rbac-tool: visualize và audit quyền của mọi ServiceAccount
rbac-tool analysis --output wide

# kubeaudit: quét toàn cluster tìm best-practice vi phạm
kubeaudit rbac -f cluster-manifests/
```

4. **Kiểm tra ServiceAccount mặc định (`default`) có bị gán quyền không cần thiết:**
- Mặc định K8s không tự cấp quyền gì cho SA `default`, nhưng nhiều team vô tình bind quyền rộng vào nó vì "tiện" — mọi Pod không khai báo `serviceAccountName` rõ ràng sẽ dùng SA `default`, nên nếu SA này có quyền cao, MỌI Pod trong namespace vô tình có quyền đó.

**Best practice khắc phục:**
- Set `automountServiceAccountToken: false` cho Pod không cần gọi K8s API — giảm attack surface nếu Pod bị compromise.
- Định kỳ chạy audit (CI job hàng tuần) thay vì chỉ audit một lần rồi quên — RBAC dễ "phình" theo thời gian khi có thêm team/service mới.
- Áp dụng OPA Gatekeeper/Kyverno để **chặn** việc tạo mới ClusterRoleBinding với `cluster-admin` ngoại trừ danh sách whitelist rõ ràng, thay vì chỉ audit bị động sau khi đã tạo.

**Pitfall:** audit một lần rồi coi là xong — RBAC trong cluster thực tế thay đổi liên tục do CI/CD tự động tạo Role mới, nếu không có kiểm soát liên tục (policy-as-code) thì cấu hình sẽ lại lỏng lẻo dần theo thời gian.

## Detailed Answer (EN)
**Four core RBAC resources:**

| Resource | Scope | Purpose |
|---|---|---|
| `Role` | A specific namespace | Defines a set of permissions (verbs) on resources within one namespace |
| `ClusterRole` | Whole cluster | Defines permissions on cluster-scoped resources (nodes, PVs) or on namespaced resources applicable across all namespaces |
| `RoleBinding` | A specific namespace | Binds a Role (or ClusterRole) to a user/group/ServiceAccount, effective only in that namespace |
| `ClusterRoleBinding` | Whole cluster | Binds a ClusterRole to a user/group/ServiceAccount, effective in EVERY namespace |

**The most common source of confusion:** a `ClusterRole` can be bound via a `RoleBinding` (namespace-scoped) — in that case the permission only applies within that RoleBinding's namespace, even though the definition is a ClusterRole. This is a useful pattern: define one reusable ClusterRole (e.g., K8s's built-in `view`, `edit`) and bind it per-namespace without redefining duplicate Roles.

**Concrete example:**
```yaml
# ClusterRole defines permissions, reusable in multiple places
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: pod-reader
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list", "watch"]
---
# RoleBinding: grants pod-reader only within namespace "dev-team-a"
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: dev-team-a
subjects:
  - kind: User
    name: alice
roleRef:
  kind: ClusterRole
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```
`alice` can only read pods in `dev-team-a`, NOT in other namespaces — because the binding is a namespace-scoped `RoleBinding`, even though the `ClusterRole` itself is cluster-level.

**Auditing RBAC in a running cluster — red flags to look for:**

1. **Find every ClusterRoleBinding attached to `cluster-admin`:**
```bash
kubectl get clusterrolebindings -o json | \
  jq -r '.items[] | select(.roleRef.name=="cluster-admin") | .subjects[]?.name'
```
Every user/ServiceAccount that shows up here has full control of the ENTIRE cluster — review each one; most are over-privileged relative to actual need.

2. **Find Roles/ClusterRoles using wildcards `*`:**
```bash
kubectl get clusterroles -o json | \
  jq -r '.items[] | select(.rules[]? | .resources[]?=="*" or .verbs[]?=="*") | .metadata.name'
```
A wildcard in `resources` or `verbs` is almost always a sign of careless design — specify exactly the resources/verbs needed.

3. **Use dedicated tools instead of hand-rolling scripts:**
```bash
# rbac-tool: visualize and audit every ServiceAccount's effective permissions
rbac-tool analysis --output wide

# kubeaudit: scan the whole cluster for best-practice violations
kubeaudit rbac -f cluster-manifests/
```

4. **Check whether the default ServiceAccount (`default`) has unintended permissions bound to it:**
- By default, Kubernetes grants the `default` SA no special permissions, but teams often accidentally bind broad permissions to it "for convenience" — any Pod that doesn't explicitly declare `serviceAccountName` uses the `default` SA, so if it has elevated permissions, EVERY Pod in that namespace unintentionally inherits them.

**Remediation best practices:**
- Set `automountServiceAccountToken: false` for Pods that don't need to call the K8s API — reduces attack surface if the Pod is compromised.
- Run audits on a schedule (a weekly CI job) rather than once and forgetting — RBAC configs tend to "creep" wider over time as new teams/services get added.
- Use OPA Gatekeeper/Kyverno to **prevent** creating new `cluster-admin` ClusterRoleBindings except for an explicit allowlist, instead of only auditing after the fact.

**Pitfall:** auditing once and considering it done — RBAC in a real cluster changes continuously as CI/CD auto-generates new Roles; without continuous enforcement (policy-as-code), configurations gradually loosen over time again.
