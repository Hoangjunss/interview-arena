---
id: qos-classes-explained
position: devops
technology: kubernetes
level: mid
tags: [kubernetes, resources, scheduling]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kubernetes có những QoS class nào? Chúng ảnh hưởng thế nào tới việc Pod bị evict khi node gặp áp lực tài nguyên?

## Question (EN)
What QoS classes does Kubernetes have? How do they affect which Pods get evicted when a node is under resource pressure?

## Đáp án chi tiết (VI)
Kubernetes tự động gán **QoS class** cho mỗi Pod dựa trên cách bạn set `requests`/`limits`, không cần khai báo thủ công:

| QoS Class | Điều kiện | Đặc điểm |
|---|---|---|
| **Guaranteed** | Mọi container trong Pod đều có `requests == limits` cho **cả CPU và memory** | Ưu tiên cao nhất, được đảm bảo tài nguyên đã request, bị evict cuối cùng |
| **Burstable** | Có ít nhất 1 container set `requests` (không bằng `limits`), hoặc chỉ set 1 trong 2 loại resource | Được đảm bảo tối thiểu `requests`, có thể "burst" dùng thêm tới `limits` nếu node còn rảnh |
| **BestEffort** | Không set `requests` lẫn `limits` cho bất kỳ resource nào | Không có đảm bảo gì, bị evict đầu tiên khi node thiếu tài nguyên |

**Ảnh hưởng tới eviction** — đây là phần hay bị hỏi sâu:
Khi node gặp áp lực (memory pressure, disk pressure), kubelet thực hiện **node-pressure eviction** theo thứ tự ưu tiên:
1. **BestEffort** bị evict trước tiên.
2. **Burstable** bị evict tiếp theo, và trong nhóm Burstable, Pod nào **sử dụng vượt xa `requests`** của mình bị evict trước (dùng "usage - requests" để xếp hạng).
3. **Guaranteed** bị evict cuối cùng, chỉ khi cực kỳ cần thiết (ví dụ chính container Guaranteed đó vượt `limits` của nó).

Cơ chế xếp hạng dùng `oom_score_adj` — Kubernetes set giá trị này khác nhau theo QoS: Guaranteed có `oom_score_adj` thấp nhất (khó bị OOM-killer chọn nhất), BestEffort có giá trị cao nhất (dễ bị chọn nhất khi kernel OOM-killer can thiệp ở cấp node, độc lập với kubelet eviction).

**Ví dụ thực tế và bài học vận hành**:
```yaml
# Pod Guaranteed — dùng cho workload nhạy cảm latency (ví dụ database, payment service)
resources:
  requests: { cpu: "1", memory: "2Gi" }
  limits:   { cpu: "1", memory: "2Gi" }
```
```yaml
# Pod BestEffort — nguy hiểm cho production, chỉ nên dùng cho job batch không quan trọng
# (không set resources gì cả)
```

**Lỗi thực tế phổ biến**: một team để Pod chạy **không set resources** (vô tình BestEffort) nghĩ rằng "app nhẹ, không cần set" — khi node bị áp lực memory do một Pod khác leak, Pod BestEffort của họ **bị evict đầu tiên dù đang hoạt động bình thường**, gây incident khó hiểu ("tại sao Pod của tôi tự nhiên bị Terminated mà không có lỗi gì?"). Kiểm tra bằng:
```bash
kubectl get pod <pod> -o jsonpath='{.status.qosClass}'
kubectl describe node <node> | grep -A5 "Conditions"   # xem MemoryPressure/DiskPressure
```

**Khuyến nghị**: workload quan trọng (database, service critical path) nên set Guaranteed; workload thông thường dùng Burstable với requests hợp lý; tránh BestEffort trong production trừ khi thực sự là job có thể mất mà không ảnh hưởng gì.

## Detailed Answer (EN)
Kubernetes automatically assigns a **QoS class** to each Pod based on how you set `requests`/`limits` — you never declare it manually:

| QoS Class | Condition | Characteristics |
|---|---|---|
| **Guaranteed** | Every container in the Pod has `requests == limits` for **both CPU and memory** | Highest priority, guaranteed the requested resources, evicted last |
| **Burstable** | At least one container sets `requests` (not equal to `limits`), or only one resource type is set | Guaranteed at least its `requests`, can "burst" up to `limits` if the node has spare capacity |
| **BestEffort** | Neither `requests` nor `limits` set for any resource | No guarantees at all, evicted first when the node runs short on resources |

**Impact on eviction** — a point often probed deeper:
When a node is under pressure (memory pressure, disk pressure), kubelet performs **node-pressure eviction** in this priority order:
1. **BestEffort** is evicted first.
2. **Burstable** is next, and within Burstable, Pods **using far more than their `requests`** are evicted first (ranked by "usage minus requests").
3. **Guaranteed** is evicted last, only when absolutely necessary (e.g. that Guaranteed container itself exceeds its own `limits`).

The ranking mechanism uses `oom_score_adj` — Kubernetes sets this differently per QoS class: Guaranteed gets the lowest `oom_score_adj` (least likely to be picked by the OOM-killer), BestEffort gets the highest (most likely to be picked when the kernel's node-level OOM-killer intervenes, independent of kubelet's own eviction).

**Real-world example and operational lesson**:
```yaml
# Guaranteed Pod — for latency-sensitive workloads (e.g. databases, payment services)
resources:
  requests: { cpu: "1", memory: "2Gi" }
  limits:   { cpu: "1", memory: "2Gi" }
```
```yaml
# BestEffort Pod — dangerous in production, only for unimportant batch jobs
# (no resources set at all)
```

**A common real-world bug**: a team leaves a Pod with **no resources set** (accidentally BestEffort), assuming "the app is lightweight, no need to set it" — when the node comes under memory pressure from a different leaking Pod, their BestEffort Pod gets **evicted first even though it was behaving normally**, causing a confusing incident ("why did my Pod get Terminated with no errors?"). Check with:
```bash
kubectl get pod <pod> -o jsonpath='{.status.qosClass}'
kubectl describe node <node> | grep -A5 "Conditions"   # check MemoryPressure/DiskPressure
```

**Recommendation**: set Guaranteed for critical workloads (databases, critical-path services); use Burstable with sensible requests for normal workloads; avoid BestEffort in production unless the job is genuinely disposable with no impact if lost.
