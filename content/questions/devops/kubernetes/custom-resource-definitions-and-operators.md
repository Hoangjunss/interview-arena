---
id: custom-resource-definitions-and-operators
position: devops
technology: kubernetes
level: senior
tags: [kubernetes, crd, operators, architecture]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CRD (Custom Resource Definition) và Operator pattern là gì? Vì sao nhiều công ty chọn xây Operator thay vì dùng script/CI job để tự động hóa vận hành database trên Kubernetes?

## Question (EN)
What is a CRD (Custom Resource Definition) and the Operator pattern? Why do many companies build an Operator instead of using scripts/CI jobs to automate database operations on Kubernetes?

## Đáp án chi tiết (VI)
**CRD** cho phép mở rộng Kubernetes API bằng cách định nghĩa **loại resource tùy chỉnh** (ngoài Pod, Deployment, Service có sẵn) — ví dụ `PostgresCluster`, `KafkaTopic`, `Certificate`. Sau khi apply CRD, apiserver chấp nhận object thuộc kind mới đó y hệt object built-in (validate schema qua OpenAPI v3, lưu vào etcd, hỗ trợ `kubectl get/describe`).

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: postgresclusters.db.example.com
spec:
  group: db.example.com
  names:
    kind: PostgresCluster
    plural: postgresclusters
  scope: Namespaced
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                replicas: { type: integer }
                version: { type: string }
```

Riêng CRD **chỉ là schema/storage** — không có logic gì cả. Đây là lý do cần **Operator**: một controller tùy chỉnh chạy trong cluster, **watch CR (Custom Resource) instance**, và triển khai **reconcile loop** để đưa trạng thái thực tế khớp với `spec` mong muốn — đúng triết lý điều khiển của Kubernetes áp dụng cho domain logic riêng.

**Operator pattern = CRD + Controller** đóng gói **operational knowledge** (kiến thức vận hành) của một hệ thống phức tạp thành code:
```
User apply PostgresCluster (spec: replicas=3, version=15) 
  → Operator watch thấy CR mới
  → Operator tự: tạo StatefulSet, Service, Secret credential, 
    join replica vào primary, setup backup schedule,
    theo dõi health, tự failover khi primary chết,
    tự apply minor version patch an toàn...
```

**Vì sao chọn Operator thay vì script/CI job — đây là câu senior thực sự cần trả lời được**:
1. **Continuous reconciliation vs. one-shot execution**: CI job chạy 1 lần rồi kết thúc — nếu trạng thái cluster trôi dạt (drift) sau đó (node chết, Pod bị xóa nhầm, ai đó `kubectl edit` tay), không có gì tự sửa lại. Operator chạy **watch loop liên tục** (thường là `for {}` với informer/work queue), tự phát hiện và sửa sai lệch **24/7**, không cần trigger thủ công.
2. **Xử lý domain-specific failure mode**: script CI thường chỉ handle "happy path" (deploy mới). Operator được thiết kế để xử lý các tình huống vận hành phức tạp: failover an toàn khi primary DB chết (chọn replica nào lên làm primary mới, tránh split-brain), rolling upgrade version DB theo đúng thứ tự (đảm bảo backward-compatible trong lúc mixed-version), tự scale storage khi gần đầy — những logic này **cần trạng thái/lịch sử để quyết định**, khó biểu diễn bằng script tuyến tính.
3. **API nhất quán, tận dụng RBAC/audit của Kubernetes**: `kubectl apply -f postgrescluster.yaml` cho developer dùng cùng 1 UX với mọi resource khác, được RBAC kiểm soát, được `kubectl diff`/GitOps track như bất kỳ resource nào — script/CI job custom thường có UX/audit trail riêng biệt, khó tích hợp.
4. **Tận dụng lại hạ tầng Kubernetes có sẵn** (leader election, event, finalizer để đảm bảo dọn dẹp đúng thứ tự khi xóa) thay vì tự build lại từ đầu trong script.

**Trade-off cần cân nhắc**: viết Operator tốn effort ban đầu lớn hơn nhiều so với script (cần hiểu client-go, informer, work queue, xử lý race condition khi nhiều reconcile chạy song song) — chỉ nên đầu tư Operator khi: (a) vận hành hệ thống đó lặp lại nhiều lần/nhiều cluster, (b) logic vận hành đủ phức tạp để hưởng lợi từ continuous reconciliation, (c) có đủ engineering bandwidth để maintain Operator lâu dài (nó là 1 phần mềm sống, cần test, versioning, CI/CD riêng). Với tác vụ đơn giản chạy 1 lần, CronJob/script vẫn là lựa chọn hợp lý và rẻ hơn.

## Detailed Answer (EN)
A **CRD** extends the Kubernetes API by defining a **custom resource type** (beyond built-ins like Pod, Deployment, Service) — for example `PostgresCluster`, `KafkaTopic`, `Certificate`. Once a CRD is applied, the apiserver accepts objects of that new kind exactly like built-in objects (schema-validated via OpenAPI v3, stored in etcd, supports `kubectl get/describe`).

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: postgresclusters.db.example.com
spec:
  group: db.example.com
  names:
    kind: PostgresCluster
    plural: postgresclusters
  scope: Namespaced
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                replicas: { type: integer }
                version: { type: string }
```

A CRD by itself is **just schema/storage** — no logic at all. This is exactly why an **Operator** is needed: a custom controller running in the cluster that **watches Custom Resource (CR) instances** and implements a **reconcile loop** to drive actual state toward the desired `spec` — applying Kubernetes' own control philosophy to domain-specific logic.

**Operator pattern = CRD + Controller**, encapsulating a system's **operational knowledge** as code:
```
User applies PostgresCluster (spec: replicas=3, version=15)
  → the Operator's watch sees the new CR
  → the Operator automatically: creates a StatefulSet, Service, credential Secret,
    joins replicas to the primary, sets up a backup schedule,
    monitors health, auto-failovers when the primary dies,
    safely applies minor version patches...
```

**Why choose an Operator over scripts/CI jobs — the real senior-level question**:
1. **Continuous reconciliation vs. one-shot execution**: a CI job runs once and finishes — if cluster state drifts afterward (a node dies, someone accidentally deletes a Pod, someone `kubectl edit`s manually), nothing self-corrects. An Operator runs a **continuous watch loop** (typically a `for {}` with an informer/work queue), constantly detecting and fixing drift **24/7** with no manual trigger needed.
2. **Handling domain-specific failure modes**: CI scripts usually only handle the "happy path" (a fresh deploy). Operators are designed to handle complex operational scenarios: safe failover when the primary DB dies (choosing which replica becomes the new primary, avoiding split-brain), version-ordered rolling DB upgrades (ensuring backward compatibility during mixed-version windows), auto-scaling storage as it fills up — this logic **requires state/history to decide correctly**, which is hard to express in a linear script.
3. **A consistent API leveraging Kubernetes' own RBAC/audit**: `kubectl apply -f postgrescluster.yaml` gives developers the same UX as any other resource, controlled by RBAC, tracked by `kubectl diff`/GitOps like any other resource — custom scripts/CI jobs usually have their own bespoke UX/audit trail that's hard to integrate.
4. **Reusing existing Kubernetes infrastructure** (leader election, events, finalizers to guarantee correctly-ordered cleanup on deletion) instead of rebuilding all of that from scratch in a script.

**Trade-offs to weigh**: writing an Operator requires far more upfront effort than a script (you need to understand client-go, informers, work queues, and race conditions when multiple reconciles run concurrently) — only invest in an Operator when: (a) that system's operations repeat many times across many clusters, (b) the operational logic is complex enough to benefit from continuous reconciliation, and (c) there's enough engineering bandwidth to maintain the Operator long-term (it's a living piece of software needing its own tests, versioning, CI/CD). For simple, one-off tasks, a CronJob/script remains the sensible, cheaper choice.
