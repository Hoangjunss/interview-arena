---
id: resource-requests-and-limits
position: devops
technology: kubernetes
level: junior
tags: [kubernetes, resources, scheduling]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`requests` và `limits` trong Kubernetes khác nhau như thế nào? Điều gì xảy ra nếu container vượt quá `limits` của CPU so với của memory?

## Question (EN)
How do `requests` and `limits` differ in Kubernetes? What happens if a container exceeds its CPU `limits` versus its memory `limits`?

## Đáp án chi tiết (VI)
- **`requests`**: lượng tài nguyên **tối thiểu đảm bảo** container được cấp — scheduler dùng con số này để quyết định **node nào đủ chỗ** để đặt Pod (tổng requests của các Pod trên 1 node không được vượt quá capacity node).
- **`limits`**: mức tài nguyên **tối đa** container được phép dùng — kernel/cgroup thực thi giới hạn này.

```yaml
resources:
  requests:
    cpu: "250m"      # 0.25 core, dùng để scheduling
    memory: "256Mi"
  limits:
    cpu: "500m"      # trần CPU
    memory: "512Mi"  # trần memory
```

**Khác biệt cực kỳ quan trọng — vượt CPU vs vượt memory**:

| | Vượt **CPU limit** | Vượt **memory limit** |
|---|---|---|
| Cơ chế | CPU là tài nguyên **compressible** (nén được) | Memory là tài nguyên **incompressible** (không nén được) |
| Hành vi | Container bị **throttle** (CFS bandwidth control giới hạn số CPU time mỗi chu kỳ) — app chạy chậm lại, **không bị kill** | Container bị **OOMKilled** ngay lập tức bởi kernel — process chết đột ngột |
| Hậu quả | Latency tăng, request timeout — khó phát hiện nếu không có metric `container_cpu_cfs_throttled_seconds_total` | Pod restart, mất session/state trong bộ nhớ, log thường chỉ có dòng cuối cùng trước khi chết |

**QoS Class** được suy ra tự động từ requests/limits (liên quan trực tiếp câu hỏi này):
- **Guaranteed**: `requests == limits` cho cả CPU và memory ở mọi container.
- **Burstable**: có `requests` nhưng `limits` cao hơn (hoặc chỉ set 1 trong 2 loại).
- **BestEffort**: không set gì cả.

QoS quyết định **thứ tự bị evict** khi node thiếu tài nguyên: BestEffort bị evict trước, Guaranteed bị evict sau cùng.

**Lỗi thực tế hay gặp**:
1. Không set `limits` memory → một Pod bị memory leak có thể "ăn hết" RAM node, kéo theo **các Pod khác trên cùng node bị OOMKilled oan** (kernel OOM-killer chọn process theo `oom_score`, Pod BestEffort/Burstable có điểm cao hơn dễ bị giết trước).
2. Set `limits.cpu` quá thấp so với nhu cầu thực → throttling liên tục dù `kubectl top` báo CPU usage "chưa chạm limit" (vì throttle tính theo từng chu kỳ 100ms, có thể spike ngắn rồi hạ trung bình xuống).
3. `requests` cao hơn thực tế cần → lãng phí tài nguyên, cluster autoscaler scale thêm node không cần thiết dù tài nguyên thực tế còn dư.

## Detailed Answer (EN)
- **`requests`**: the **guaranteed minimum** amount of resources a container gets — the scheduler uses this number to decide **which node has room** for the Pod (the sum of requests on a node cannot exceed the node's capacity).
- **`limits`**: the **maximum** a container is allowed to use — enforced by the kernel/cgroup.

```yaml
resources:
  requests:
    cpu: "250m"      # 0.25 core, used for scheduling
    memory: "256Mi"
  limits:
    cpu: "500m"      # CPU ceiling
    memory: "512Mi"  # memory ceiling
```

**A crucial difference — exceeding CPU vs. exceeding memory**:

| | Exceeding **CPU limit** | Exceeding **memory limit** |
|---|---|---|
| Mechanism | CPU is a **compressible** resource | Memory is an **incompressible** resource |
| Behavior | Container is **throttled** (CFS bandwidth control caps CPU time per period) — the app slows down, it is **not killed** | Container is **OOMKilled** immediately by the kernel — the process dies abruptly |
| Consequence | Increased latency, request timeouts — hard to spot without the `container_cpu_cfs_throttled_seconds_total` metric | Pod restarts, in-memory session/state is lost, logs usually only show the last line before death |

**QoS Class** is automatically derived from requests/limits (directly related to this question):
- **Guaranteed**: `requests == limits` for both CPU and memory, on every container.
- **Burstable**: has `requests` but a higher `limits` (or only one of the two is set).
- **BestEffort**: neither is set.

QoS determines **eviction order** when a node runs low on resources: BestEffort is evicted first, Guaranteed is evicted last.

**Common real-world bugs**:
1. No memory `limits` set → a Pod with a memory leak can consume all node RAM, causing **unrelated Pods on the same node to be OOMKilled** too (the kernel OOM-killer picks victims by `oom_score`, and BestEffort/Burstable Pods score higher and get killed first).
2. `limits.cpu` set too low relative to real demand → constant throttling even though `kubectl top` shows CPU usage "not near the limit" (throttling is measured per 100ms period, so short spikes can throttle even as the average looks fine).
3. `requests` set higher than actually needed → wasted resources, causing the cluster autoscaler to add unnecessary nodes even though real usage has headroom.
