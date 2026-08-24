---
id: pod-disruption-budget
position: devops
technology: kubernetes
level: senior
tags: [kubernetes, reliability, scaling]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
PodDisruptionBudget (PDB) giải quyết vấn đề gì? Phân biệt "voluntary disruption" và "involuntary disruption", và điều gì xảy ra khi PDB xung đột với node drain trong lúc nâng cấp cluster?

## Question (EN)
What problem does a PodDisruptionBudget (PDB) solve? Distinguish "voluntary" from "involuntary" disruption, and what happens when a PDB conflicts with a node drain during a cluster upgrade?

## Đáp án chi tiết (VI)
Kubernetes phân biệt 2 loại gián đoạn (disruption) với triết lý xử lý khác hẳn nhau:

- **Involuntary disruption**: ngoài ý muốn — node hardware fail, kernel panic, network partition, mất điện. Kubernetes **không thể ngăn** loại này, chỉ có thể giảm tác động bằng replicas + anti-affinity + multi-zone.
- **Voluntary disruption**: có chủ đích, do **con người/hệ thống chủ động** gây ra — `kubectl drain` node để bảo trì, cluster autoscaler scale-down node thừa, rolling update Node (upgrade K8s version), preemption khi Pod priority cao hơn cần chỗ.

**PDB chỉ áp dụng cho voluntary disruption** — nó là một **hợp đồng ràng buộc API drain/eviction**: "dù bạn (admin/autoscaler) muốn evict Pod để bảo trì, hãy đảm bảo tối thiểu N Pod / tối đa X% Pod bị mất tại một thời điểm".

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: api-pdb
spec:
  minAvailable: 2        # hoặc dùng maxUnavailable: 1 (chọn 1 trong 2, không dùng cùng lúc)
  selector:
    matchLabels:
      app: api
```

**Cơ chế thực thi**: `kubectl drain` không tự ý xóa Pod trực tiếp — nó gọi **Eviction API** (`POST /pods/{name}/eviction`), API này **kiểm tra PDB trước khi cho phép**. Nếu evict Pod sẽ khiến số Pod khả dụng thấp hơn `minAvailable`, request bị từ chối với HTTP 429 (`Too Many Requests`), drain sẽ **retry liên tục** cho tới khi điều kiện PDB được thỏa (thường là chờ Pod khác lên `Ready` bù vào, hoặc admin can thiệp).

**Tình huống xung đột thực tế trong upgrade cluster — đây là phần senior hay bị hỏi sâu**:
1. **Deadlock khi drain nhiều node cùng lúc**: nếu Deployment có `replicas: 2` và PDB `minAvailable: 2` (yêu cầu **cả 2 Pod luôn available**, không cho phép mất bất kỳ Pod nào), thì `kubectl drain` trên node chứa 1 trong 2 Pod sẽ **treo vĩnh viễn** — vì evict Pod đó sẽ làm số available xuống 1, vi phạm PDB, mà PDB `minAvailable: 2` với `replicas: 2` **về bản chất là bất khả thi** để evict bất kỳ Pod nào. Đây là lỗi cấu hình kinh điển: PDB phải để "biên độ" (VD `minAvailable: 1` với `replicas: 2`, hoặc scale replicas lên đủ lớn trước khi set `minAvailable` cao).
2. **Cluster autoscaler scale-down bị chặn vô thời hạn**: node có Pod PDB-protected không đủ điều kiện evict sẽ khiến node đó **không bao giờ được scale-down** dù đang gần rỗng — gây lãng phí chi phí cloud nếu không giám sát.
3. **`maxUnavailable` cho trường hợp cần "làm hết N node cùng lúc"** (VD nâng cấp toàn bộ node pool nhanh): dùng PDB `maxUnavailable` phối hợp với budget rộng hơn (VD `maxUnavailable: 30%`), chấp nhận rủi ro giảm capacity tạm thời để đổi lấy tốc độ upgrade.

**Best practice cho senior**: khi thiết kế PDB, luôn tính tới **worst case node failure đồng thời với maintenance đang diễn ra** — nếu PDB quá chặt (đòi 100% available), bạn thực chất **chặn khả năng vận hành/upgrade cluster**; nếu quá lỏng, mất SLA khi upgrade trùng lúc traffic cao. Nguyên tắc chung: `minAvailable` nên để room cho ít nhất 1 Pod gián đoạn mà vẫn đáp ứng SLA, và luôn test PDB bằng `kubectl drain --dry-run` trước khi upgrade thật.

## Detailed Answer (EN)
Kubernetes distinguishes two kinds of disruption with entirely different handling philosophies:

- **Involuntary disruption**: unplanned — hardware failure, kernel panic, network partition, power loss. Kubernetes **cannot prevent** this; it can only mitigate impact via replicas + anti-affinity + multi-zone spread.
- **Voluntary disruption**: intentional, caused **deliberately by a human/system** — `kubectl drain` for node maintenance, cluster autoscaler scaling down an underused node, rolling node updates (Kubernetes version upgrades), preemption when a higher-priority Pod needs the space.

**A PDB only applies to voluntary disruption** — it's a **contract that constrains the drain/eviction API**: "even though you (admin/autoscaler) want to evict Pods for maintenance, guarantee at least N Pods / at most X% of Pods are lost at any given moment".

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: api-pdb
spec:
  minAvailable: 2        # or use maxUnavailable: 1 (pick one, not both)
  selector:
    matchLabels:
      app: api
```

**Enforcement mechanism**: `kubectl drain` doesn't delete Pods directly — it calls the **Eviction API** (`POST /pods/{name}/eviction`), which **checks the PDB before allowing it**. If evicting a Pod would push available count below `minAvailable`, the request is rejected with HTTP 429 (`Too Many Requests`), and drain **keeps retrying** until the PDB condition is satisfied (usually waiting for another Pod to become `Ready` to compensate, or requiring admin intervention).

**A real-world conflict during a cluster upgrade — a point often probed at the senior level**:
1. **Deadlock when draining multiple nodes at once**: if a Deployment has `replicas: 2` and a PDB with `minAvailable: 2` (requiring **both Pods always available**, allowing zero Pod loss), then `kubectl drain` on a node holding one of the two Pods will **hang forever** — evicting that Pod would drop availability to 1, violating the PDB, and a `minAvailable: 2` PDB with `replicas: 2` is **fundamentally infeasible** to ever satisfy an eviction against. This is a classic configuration mistake: a PDB needs "slack" built in (e.g. `minAvailable: 1` with `replicas: 2`, or scale replicas up sufficiently before setting a high `minAvailable`).
2. **Cluster autoscaler scale-down blocked indefinitely**: a node holding a PDB-protected Pod that can't be evicted means that node can **never be scaled down** even when nearly empty — wasting cloud cost if left unmonitored.
3. **`maxUnavailable` for "drain N nodes at once" scenarios** (e.g. upgrading an entire node pool quickly): use a looser PDB `maxUnavailable` budget (e.g. `maxUnavailable: 30%`), accepting temporary capacity reduction in exchange for upgrade speed.

**Senior-level best practice**: when designing a PDB, always account for **worst-case simultaneous node failure alongside ongoing maintenance** — a PDB that's too strict (demanding 100% availability) effectively **blocks the cluster's ability to be operated/upgraded**; too loose and you lose SLA when an upgrade coincides with high traffic. General rule: `minAvailable` should leave room for at least one Pod's disruption while still meeting SLA, and always test a PDB with `kubectl drain --dry-run` before a real upgrade.
