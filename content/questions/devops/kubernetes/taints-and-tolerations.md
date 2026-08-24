---
id: taints-and-tolerations
position: devops
technology: kubernetes
level: mid
tags: [kubernetes, scheduling, taints]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Taint và toleration hoạt động như thế nào? Phân biệt 3 loại effect: `NoSchedule`, `PreferNoSchedule`, `NoExecute`.

## Question (EN)
How do taints and tolerations work? Distinguish the three effect types: `NoSchedule`, `PreferNoSchedule`, and `NoExecute`.

## Đáp án chi tiết (VI)
**Taint** và **toleration** hoạt động theo cơ chế **ngược lại với affinity**: thay vì Pod "chọn" node, **node từ chối Pod** trừ khi Pod khai báo "chịu được" (tolerate) taint đó.

- **Taint** gắn trên **Node**: `key=value:effect`.
- **Toleration** gắn trên **Pod**: khai báo Pod này chịu được taint nào.

```bash
kubectl taint node node1 dedicated=gpu:NoSchedule
```
```yaml
tolerations:
  - key: "dedicated"
    operator: "Equal"
    value: "gpu"
    effect: "NoSchedule"
```

**3 loại effect**:

| Effect | Ý nghĩa | Ảnh hưởng Pod đang chạy |
|---|---|---|
| **NoSchedule** | Scheduler **không đặt Pod mới** lên node này trừ khi Pod tolerate | Pod **đang chạy sẵn** trên node (trước khi taint được thêm) **không bị ảnh hưởng** |
| **PreferNoSchedule** | Scheduler **cố tránh** đặt Pod lên node này, nhưng vẫn đặt nếu không còn lựa chọn nào khác (soft) | Không ảnh hưởng |
| **NoExecute** | Không đặt Pod mới, **VÀ evict cả Pod đang chạy** nếu không tolerate | Pod đang chạy **bị đuổi ngay** (trừ khi có toleration, có thể set `tolerationSeconds` để chịu được taint này trong X giây trước khi bị evict) |

**Use case thực tế phổ biến nhất**:
1. **Dedicated node cho GPU/workload đặc biệt**: taint node có GPU với `NoSchedule`, chỉ Pod ML nào có toleration tương ứng mới được đặt lên — tránh Pod thường vô tình chiếm chỗ node đắt tiền.
2. **Control-plane node**: mặc định taint `node-role.kubernetes.io/control-plane:NoSchedule` để Pod thường không bị đặt lên node quản lý cluster — đây là lý do DaemonSet monitoring cần toleration riêng để chạy được cả trên control-plane (đã đề cập ở câu DaemonSet).
3. **`NoExecute` cho node không khỏe**: Kubernetes tự động taint node với `node.kubernetes.io/not-ready:NoExecute` và `node.kubernetes.io/unreachable:NoExecute` khi node mất kết nối — mặc định mọi Pod có toleration ngầm cho 2 taint này với `tolerationSeconds: 300`, nghĩa là Pod chờ tối đa 300s trước khi bị evict sang node khác (đây là cấu hình liên quan trực tiếp tới tốc độ failover khi node chết).

**Phân biệt với node affinity — điểm hay bị nhầm khi phỏng vấn**: taint/toleration chỉ **cho phép** Pod được đặt lên node (permissive), **không ép buộc** Pod phải chọn node đó — một Pod tolerate taint GPU vẫn có thể bị đặt lên node thường không có GPU. Muốn **ép** Pod phải chạy đúng node GPU, cần kết hợp thêm **node affinity/nodeSelector** — taint để "đuổi Pod không mong muốn ra", affinity để "kéo Pod mong muốn vào" — hai cơ chế bổ sung cho nhau chứ không thay thế nhau.

## Detailed Answer (EN)
**Taints** and **tolerations** work in the **opposite direction from affinity**: instead of a Pod "choosing" a node, the **node rejects Pods** unless the Pod declares it can "tolerate" that taint.

- A **taint** is set on a **Node**: `key=value:effect`.
- A **toleration** is set on a **Pod**: declaring which taints this Pod can tolerate.

```bash
kubectl taint node node1 dedicated=gpu:NoSchedule
```
```yaml
tolerations:
  - key: "dedicated"
    operator: "Equal"
    value: "gpu"
    effect: "NoSchedule"
```

**The three effect types**:

| Effect | Meaning | Impact on already-running Pods |
|---|---|---|
| **NoSchedule** | The scheduler **won't place new Pods** on this node unless they tolerate it | Pods **already running** on the node (before the taint was added) are **unaffected** |
| **PreferNoSchedule** | The scheduler **tries to avoid** placing Pods here, but still will if there's no other choice (soft) | No effect |
| **NoExecute** | No new Pods scheduled, **AND running Pods are evicted** if they don't tolerate it | Running Pods are **evicted immediately** (unless tolerated, optionally with `tolerationSeconds` to tolerate the taint for X seconds before eviction) |

**Most common real-world use cases**:
1. **Dedicated nodes for GPU/special workloads**: taint GPU nodes with `NoSchedule`, so only ML Pods with the matching toleration get placed there — preventing regular Pods from accidentally occupying expensive nodes.
2. **Control-plane nodes**: taint `node-role.kubernetes.io/control-plane:NoSchedule` by default so ordinary Pods aren't placed on cluster-management nodes — this is exactly why monitoring DaemonSets need their own toleration to run on the control-plane too (covered in the DaemonSet question).
3. **`NoExecute` for unhealthy nodes**: Kubernetes automatically taints a node with `node.kubernetes.io/not-ready:NoExecute` and `node.kubernetes.io/unreachable:NoExecute` when it loses connectivity — by default every Pod has an implicit toleration for these two taints with `tolerationSeconds: 300`, meaning it waits up to 300s before being evicted to another node (this configuration directly affects how fast failover happens when a node dies).

**Distinguishing from node affinity — a common interview confusion**: taints/tolerations only **allow** a Pod to be placed on a node (permissive), they don't **force** the Pod to choose that node — a Pod tolerating the GPU taint can still land on a regular node without a GPU. To **force** a Pod onto the GPU node specifically, you must combine it with **node affinity/nodeSelector** — taints "push unwanted Pods away", affinity "pulls wanted Pods in" — the two mechanisms complement each other rather than replacing one another.
