---
id: network-policy-multi-tenancy
position: devops
technology: kubernetes
level: senior
tags: [kubernetes, security, multi-tenancy, networking]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bạn được giao thiết kế multi-tenancy cho một cluster Kubernetes dùng chung bởi nhiều team (soft multi-tenancy, cùng cluster khác namespace). NetworkPolicy đóng vai trò gì trong thiết kế đó, và những giới hạn nào của Namespace + NetworkPolicy khiến bạn phải cân nhắc thêm giải pháp khác cho tenant thực sự cần cách ly nghiêm ngặt?

## Question (EN)
You're asked to design multi-tenancy for a Kubernetes cluster shared by multiple teams (soft multi-tenancy — same cluster, different namespaces). What role does NetworkPolicy play in that design, and what limitations of Namespace + NetworkPolicy would push you toward other solutions for tenants that need strict isolation?

## Đáp án chi tiết (VI)
**Baseline: default deny + explicit allow** — nền tảng của mọi thiết kế multi-tenancy network trên Kubernetes:

```yaml
# 1. Default deny toàn bộ ingress trong namespace team-a
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: team-a
spec:
  podSelector: {}
  policyTypes: ["Ingress"]

---
# 2. Cho phép traffic từ chính namespace + 1 vài namespace được whitelist (VD ingress-controller)
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-same-ns-and-ingress
  namespace: team-a
spec:
  podSelector: {}
  policyTypes: ["Ingress"]
  ingress:
    - from:
        - podSelector: {}                              # cùng namespace
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: ingress-nginx
```

Nguyên tắc: **default-deny trước, allow rule sau** (whitelist model) — không bao giờ để mặc định "allow all" rồi cố deny từng trường hợp, vì dễ sót và không scale khi số namespace tăng.

**NetworkPolicy đóng vai trò gì trong multi-tenancy**:
- Ngăn Pod ở `team-a` gọi thẳng Pod ở `team-b` qua ClusterIP/Pod IP — đây là lỗ hổng lớn nhất nếu chỉ dựa vào Namespace (Namespace không tự cô lập network, đã phân tích ở câu hỏi Namespace).
- Kết hợp `namespaceSelector` + `podSelector` để định nghĩa policy dạng "chỉ service X ở namespace Y được gọi vào tôi" — mô hình zero-trust ở tầng L3/L4.

**Giới hạn của Namespace + NetworkPolicy khiến cần giải pháp khác — trọng tâm câu hỏi senior**:

1. **NetworkPolicy chỉ hoạt động ở Layer 3/4** (IP, port, protocol) — không kiểm soát được ở Layer 7 (HTTP method, path, mTLS identity thực sự của service). Một Pod bị compromise vẫn có thể giả IP nguồn trong cùng dải cho phép, hoặc gọi đúng port được allow nhưng thực hiện hành vi độc hại ở tầng ứng dụng. → Cần **service mesh** (Istio/Linkerd) với **mTLS + AuthorizationPolicy** để xác thực danh tính thực (cert-based identity) thay vì chỉ dựa vào IP/label, vốn có thể bị giả mạo nếu attacker chiếm được quyền trong Pod.
2. **Namespace không cô lập tài nguyên compute/kernel**: Pod nhiều tenant vẫn chia sẻ chung **kernel** của node (namespace chỉ là logical construct của Kubernetes, không phải Linux namespace/cgroup theo nghĩa cô lập cứng) — một lỗ hổng container escape (kernel exploit, misconfigured `hostPID`/`hostNetwork`/privileged container) cho phép Pod tenant A truy cập trực tiếp Pod/process của tenant B trên cùng node, **NetworkPolicy hoàn toàn không phòng vệ được** trường hợp này vì đây là tầng dưới network. → Cần **node isolation theo tenant** (dedicated node pool + taints/tolerations + `PodSecurityStandards: restricted` cấm privileged/hostNetwork), hoặc mạnh hơn là **sandboxed runtime** (gVisor, Kata Containers) cách ly kernel cho từng Pod.
3. **CNI không đồng nhất hỗ trợ NetworkPolicy**: như đã đề cập, Flannel default không enforce NetworkPolicy — nếu hạ tầng dùng CNI không hỗ trợ, toàn bộ thiết kế multi-tenancy network **là ảo tưởng** (policy tồn tại nhưng không được thực thi) — bước đầu tiên khi audit là xác nhận CNI đang dùng thực sự enforce NetworkPolicy (`kubectl get networkpolicy` không đủ, cần test thực tế bằng cách gọi chéo namespace và verify bị chặn).
4. **Tenant cần compliance nghiêm ngặt** (PCI-DSS, dữ liệu y tế/tài chính yêu cầu cô lập hạ tầng vật lý theo luật) — soft multi-tenancy (cùng cluster) **không bao giờ đủ** dù NetworkPolicy + RBAC + ResourceQuota được cấu hình hoàn hảo, vì kiểm toán viên thường yêu cầu bằng chứng cô lập ở tầng hạ tầng (control plane riêng, etcd riêng) — buộc phải chuyển sang **hard multi-tenancy** (cluster riêng per tenant, hoặc virtual cluster như vCluster/Kamaji cấp control plane ảo riêng trên cùng hạ tầng vật lý).
5. **Quản trị NetworkPolicy ở quy mô lớn (hàng chục namespace)**: viết tay NetworkPolicy cho từng namespace dễ drift, khó audit toàn cục "ai được gọi ai" — nên cân nhắc **Cilium Cluster-wide Network Policy** hoặc GitOps hóa toàn bộ policy với công cụ visualize (Cilium Hubble) để có cái nhìn tổng thể traffic flow giữa các tenant thay vì đọc YAML rời rạc.

**Kết luận thiết kế**: Namespace + NetworkPolicy phù hợp cho **soft multi-tenancy giữa các team nội bộ tin cậy lẫn nhau ở mức độ vừa phải** (cùng công ty, cùng chịu trách nhiệm bảo mật chung); với tenant thù địch tiềm tàng hoặc yêu cầu compliance luật định, phải leo thang lên service mesh + sandboxed runtime + node isolation, hoặc hard multi-tenancy với cluster/control-plane riêng.

## Detailed Answer (EN)
**Baseline: default deny + explicit allow** — the foundation of any Kubernetes network multi-tenancy design:

```yaml
# 1. Default-deny all ingress in the team-a namespace
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: team-a
spec:
  podSelector: {}
  policyTypes: ["Ingress"]

---
# 2. Allow traffic from within the same namespace plus a whitelisted namespace (e.g. ingress-controller)
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-same-ns-and-ingress
  namespace: team-a
spec:
  podSelector: {}
  policyTypes: ["Ingress"]
  ingress:
    - from:
        - podSelector: {}                              # same namespace
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: ingress-nginx
```

Principle: **default-deny first, then allow rules** (a whitelist model) — never default to "allow all" and try to deny case by case, since that's easy to miss and doesn't scale as the number of namespaces grows.

**NetworkPolicy's role in multi-tenancy**:
- Prevents a Pod in `team-a` from calling a Pod in `team-b` directly via ClusterIP/Pod IP — this is the biggest gap if you rely on Namespace alone (Namespace doesn't isolate networking by itself, as covered in the Namespace question).
- Combining `namespaceSelector` + `podSelector` lets you write policies like "only service X in namespace Y may call me" — a zero-trust model at the L3/L4 layer.

**Limitations of Namespace + NetworkPolicy that push toward other solutions — the heart of this senior question**:

1. **NetworkPolicy only operates at Layer 3/4** (IP, port, protocol) — it has no visibility into Layer 7 (HTTP method, path, or a service's true mTLS identity). A compromised Pod can still spoof a source IP within an allowed range, or call an allowed port while performing malicious behavior at the application layer. → You need a **service mesh** (Istio/Linkerd) with **mTLS + AuthorizationPolicy** to verify true identity (certificate-based) rather than relying only on IP/labels, which can be forged if an attacker gains a foothold inside a Pod.
2. **Namespace doesn't isolate compute/kernel resources**: Pods from multiple tenants still share the **same kernel** on a node (Namespace is only a logical Kubernetes construct, not a Linux namespace/cgroup providing hard isolation) — a container escape vulnerability (kernel exploit, misconfigured `hostPID`/`hostNetwork`/privileged container) lets tenant A's Pod directly access tenant B's Pod/process on the same node, and **NetworkPolicy offers zero protection** here because it's a lower layer than networking. → You need **per-tenant node isolation** (dedicated node pools + taints/tolerations + `PodSecurityStandards: restricted` forbidding privileged/hostNetwork), or something stronger like a **sandboxed runtime** (gVisor, Kata Containers) providing per-Pod kernel isolation.
3. **CNI support for NetworkPolicy is inconsistent**: as mentioned earlier, Flannel's default doesn't enforce NetworkPolicy at all — if the infrastructure runs an unsupporting CNI, the entire network multi-tenancy design **is an illusion** (policies exist but aren't enforced) — the first step of any audit is confirming the actual CNI in use enforces NetworkPolicy (`kubectl get networkpolicy` isn't enough; you must actually test cross-namespace calls and verify they're blocked).
4. **Tenants needing strict compliance** (PCI-DSS, healthcare/financial data requiring legally-mandated physical infrastructure isolation) — soft multi-tenancy (shared cluster) is **never sufficient**, no matter how perfectly NetworkPolicy + RBAC + ResourceQuota are configured, because auditors typically require infrastructure-level isolation evidence (a separate control plane, separate etcd) — forcing a move to **hard multi-tenancy** (a dedicated cluster per tenant, or a virtual cluster like vCluster/Kamaji giving each tenant its own virtual control plane on shared physical infrastructure).
5. **Managing NetworkPolicy at scale (dozens of namespaces)**: hand-writing NetworkPolicies per namespace is prone to drift and hard to audit globally ("who can call whom?") — consider **Cilium Cluster-wide Network Policy** or fully GitOps-managed policies plus visualization tooling (Cilium Hubble) to see the overall traffic flow between tenants rather than reading disjoint YAML files.

**Design conclusion**: Namespace + NetworkPolicy suit **soft multi-tenancy among reasonably trusted internal teams** (same company, sharing overall security accountability); for potentially adversarial tenants or legally-mandated compliance requirements, you must escalate to service mesh + sandboxed runtime + node isolation, or hard multi-tenancy with a dedicated cluster/control plane.
