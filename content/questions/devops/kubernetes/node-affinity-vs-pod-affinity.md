---
id: node-affinity-vs-pod-affinity
position: devops
technology: kubernetes
level: mid
tags: [kubernetes, scheduling, affinity]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Node affinity, pod affinity và pod anti-affinity khác nhau như thế nào? Cho ví dụ thực tế dùng pod anti-affinity để tăng độ sẵn sàng.

## Question (EN)
How do node affinity, pod affinity, and pod anti-affinity differ? Give a real example of using pod anti-affinity to improve availability.

## Đáp án chi tiết (VI)
Cả ba đều là cơ chế **ảnh hưởng tới quyết định của scheduler** khi chọn node cho Pod, nhưng dựa trên tiêu chí khác nhau:

| | Dựa vào | Trả lời câu hỏi |
|---|---|---|
| **Node affinity** | Label của **Node** | "Pod này nên/phải chạy trên node có đặc điểm gì?" (VD: `disktype=ssd`, `zone=us-east-1a`) |
| **Pod affinity** | Label của **Pod khác** đang chạy | "Pod này nên chạy **gần** Pod nào?" (cùng node/zone) |
| **Pod anti-affinity** | Label của **Pod khác** đang chạy | "Pod này nên chạy **tránh xa** Pod nào?" (khác node/zone) |

Mỗi loại có 2 mức độ:
- **`requiredDuringSchedulingIgnoredDuringExecution`**: **bắt buộc** (hard constraint) — không tìm được node khớp thì Pod ở trạng thái `Pending`.
- **`preferredDuringSchedulingIgnoredDuringExecution`**: **ưu tiên** (soft constraint) — scheduler cố gắng thỏa nhưng vẫn schedule nếu không có node nào khớp, có `weight` (1-100) để so sánh nhiều rule.

Cụm từ "IgnoredDuringExecution" nghĩa là: rule chỉ áp dụng lúc **schedule ban đầu** — nếu label node/pod đổi sau đó khiến Pod đang chạy không còn thỏa điều kiện, **Pod không bị evict** (khác với taint/toleration có `NoExecute` sẽ evict).

**Ví dụ node affinity — chỉ chạy trên node SSD**:
```yaml
affinity:
  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
        - matchExpressions:
            - key: disktype
              operator: In
              values: ["ssd"]
```

**Ví dụ thực tế pod anti-affinity — tăng độ sẵn sàng (rất hay được hỏi)**:
Vấn đề: một Deployment 3 replicas, nếu scheduler vô tình đặt cả 3 Pod lên **cùng 1 node**, node đó chết → mất 100% capacity dù đang chạy 3 replicas.

Giải pháp — bắt buộc mỗi Pod nằm trên node khác nhau:
```yaml
affinity:
  podAntiAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchExpressions:
            - key: app
              operator: In
              values: ["api"]
        topologyKey: "kubernetes.io/hostname"   # mỗi node là 1 topology domain
```
Mở rộng thêm cho multi-zone (tránh cả 3 Pod cùng rơi vào 1 Availability Zone):
```yaml
        topologyKey: "topology.kubernetes.io/zone"
```

**Lưu ý về trade-off**: dùng `required` anti-affinity với cluster nhỏ (ít node hơn số replicas) sẽ khiến một số Pod **Pending vĩnh viễn** vì không đủ node trống để thỏa mãn "mỗi node 1 Pod". Trong trường hợp đó nên dùng `preferred` để chấp nhận rủi ro thấp hơn thay vì block hoàn toàn deployment. Kubernetes 1.19+ khuyến nghị dùng **Pod Topology Spread Constraints** (`topologySpreadConstraints`) cho use case phân bổ đều — linh hoạt và dễ đọc hơn anti-affinity cho trường hợp "spread evenly across zones/nodes".

## Detailed Answer (EN)
All three are mechanisms that **influence the scheduler's node choice** for a Pod, but based on different criteria:

| | Based on | Answers the question |
|---|---|---|
| **Node affinity** | Labels of the **Node** | "What kind of node should/must this Pod run on?" (e.g. `disktype=ssd`, `zone=us-east-1a`) |
| **Pod affinity** | Labels of **other running Pods** | "Which Pods should this Pod run **near**?" (same node/zone) |
| **Pod anti-affinity** | Labels of **other running Pods** | "Which Pods should this Pod **avoid** running near?" (different node/zone) |

Each has two strengths:
- **`requiredDuringSchedulingIgnoredDuringExecution`**: a **hard constraint** — if no node matches, the Pod stays `Pending`.
- **`preferredDuringSchedulingIgnoredDuringExecution`**: a **soft constraint** — the scheduler tries to satisfy it but still schedules if no node matches, with a `weight` (1-100) to compare multiple rules.

The phrase "IgnoredDuringExecution" means the rule only applies at **initial scheduling time** — if node/pod labels change later such that a running Pod no longer satisfies the condition, the **Pod is not evicted** (unlike taints/tolerations with `NoExecute`, which do evict).

**Node affinity example — only run on SSD nodes**:
```yaml
affinity:
  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
        - matchExpressions:
            - key: disktype
              operator: In
              values: ["ssd"]
```

**Real-world pod anti-affinity example — improving availability (frequently asked)**:
Problem: a Deployment with 3 replicas — if the scheduler happens to place all 3 Pods on the **same node**, that node dying wipes out 100% of capacity despite having "3 replicas".

Solution — force each Pod onto a different node:
```yaml
affinity:
  podAntiAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchExpressions:
            - key: app
              operator: In
              values: ["api"]
        topologyKey: "kubernetes.io/hostname"   # each node is one topology domain
```
Extending it further for multi-zone (avoiding all 3 Pods landing in one Availability Zone):
```yaml
        topologyKey: "topology.kubernetes.io/zone"
```

**Trade-off to note**: using `required` anti-affinity on a small cluster (fewer nodes than replicas) will leave some Pods **permanently Pending** because there aren't enough free nodes to satisfy "one Pod per node". In that case, prefer `preferred` to accept some risk rather than blocking the deployment entirely. Kubernetes 1.19+ recommends **Pod Topology Spread Constraints** (`topologySpreadConstraints`) for even-distribution use cases — more flexible and readable than anti-affinity for "spread evenly across zones/nodes" scenarios.
