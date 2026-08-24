---
id: horizontal-pod-autoscaler
position: devops
technology: kubernetes
level: mid
tags: [kubernetes, scaling, autoscaling]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HPA (Horizontal Pod Autoscaler) hoạt động như thế nào? Vì sao HPA đôi khi bị "flapping" (scale up/down liên tục) và cách khắc phục?

## Question (EN)
How does the Horizontal Pod Autoscaler (HPA) work? Why does it sometimes "flap" (scale up/down repeatedly), and how do you fix that?

## Đáp án chi tiết (VI)
**HPA** tự động điều chỉnh `spec.replicas` của Deployment/StatefulSet dựa trên metric quan sát được (CPU, memory, hoặc custom/external metric), theo chu kỳ mặc định 15s.

**Công thức tính replica mong muốn**:
```
desiredReplicas = ceil(currentReplicas × (currentMetricValue / desiredMetricValue))
```
Ví dụ: 4 Pod đang chạy trung bình 80% CPU, target là 50% → `ceil(4 × 80/50) = ceil(6.4) = 7` Pod.

**Điều kiện tiên quyết**: phải cài **metrics-server** (cho CPU/memory) hoặc **Prometheus Adapter** (cho custom metrics như queue length, request per second).

Ví dụ HPA dựa trên CPU:
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 60
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
        - type: Pods
          value: 4
          periodSeconds: 60
    scaleDown:
      stabilizationWindowSeconds: 300   # chờ 5 phút traffic thấp ổn định mới scale down
      policies:
        - type: Percent
          value: 10
          periodSeconds: 60
```

**Vì sao HPA bị "flapping" và cách khắc phục**:
1. **Nguyên nhân chính**: traffic dao động quanh ngưỡng target — CPU nhảy lên 65% rồi xuống 55% liên tục quanh target 60%, khiến HPA scale up rồi ngay lập tức scale down. → **Khắc phục**: dùng `behavior.scaleDown.stabilizationWindowSeconds` (mặc định 300s) để HPA lấy **giá trị max trong cửa sổ thời gian gần nhất** trước khi quyết định scale down, tránh phản ứng thái quá với dao động ngắn hạn. `scaleUp` nên để stabilization thấp/0 để phản ứng nhanh khi traffic tăng đột biến.
2. **Metric có độ trễ**: CPU sau khi scale up cần vài giây để Pod mới nhận traffic và "hạ nhiệt" — nếu HPA check quá thường xuyên trong lúc metric chưa kịp phản ánh thay đổi, nó tiếp tục scale up dư thừa. → set `--horizontal-pod-autoscaler-sync-period` hợp lý, và đảm bảo readiness probe không quá chậm khiến Pod mới không kịp gánh tải.
3. **Chọn sai metric**: dùng CPU cho ứng dụng I/O-bound (chờ DB/network nhiều hơn tính toán) khiến CPU luôn thấp dù ứng dụng đang quá tải request — nên dùng **custom metric** (request per second, queue depth) thay vì chỉ CPU/memory.
4. **`minReplicas` quá thấp**: khi traffic về gần 0, dao động nhỏ (từ 1 Pod lên 2 Pod) chiếm % thay đổi rất lớn (100%) → dễ flap. Đặt `minReplicas` đủ lớn để mẫu số ổn định hơn.

**Lưu ý**: HPA **không thay thế** VPA (Vertical Pod Autoscaler — chỉnh requests/limits) và Cluster Autoscaler (thêm/bớt node) — ba cái hoạt động ở tầng khác nhau và có thể phối hợp (HPA quyết định số Pod, Cluster Autoscaler quyết định số node để chứa đủ Pod đó).

## Detailed Answer (EN)
The **HPA** automatically adjusts a Deployment/StatefulSet's `spec.replicas` based on an observed metric (CPU, memory, or a custom/external metric), on a default 15s cycle.

**Desired replica formula**:
```
desiredReplicas = ceil(currentReplicas × (currentMetricValue / desiredMetricValue))
```
Example: 4 Pods averaging 80% CPU, target 50% → `ceil(4 × 80/50) = ceil(6.4) = 7` Pods.

**Prerequisite**: you must install **metrics-server** (for CPU/memory) or a **Prometheus Adapter** (for custom metrics like queue length or requests-per-second).

Example CPU-based HPA:
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 60
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
        - type: Pods
          value: 4
          periodSeconds: 60
    scaleDown:
      stabilizationWindowSeconds: 300   # wait 5 min of sustained low traffic before scaling down
      policies:
        - type: Percent
          value: 10
          periodSeconds: 60
```

**Why HPA "flaps" and how to fix it**:
1. **Main cause**: traffic oscillates around the target threshold — CPU bounces between 65% and 55% around a 60% target, causing HPA to scale up then immediately scale down. → **Fix**: use `behavior.scaleDown.stabilizationWindowSeconds` (default 300s) so HPA uses the **maximum value over the recent window** before deciding to scale down, avoiding overreaction to short-term noise. Keep `scaleUp` stabilization low/zero to react quickly to real traffic spikes.
2. **Metric lag**: after scaling up, CPU needs a few seconds for new Pods to receive traffic and "cool down" — if HPA checks too frequently before the metric reflects the change, it keeps over-scaling. → tune `--horizontal-pod-autoscaler-sync-period` sensibly, and make sure readiness probes aren't so slow that new Pods can't take load in time.
3. **Wrong metric choice**: using CPU for an I/O-bound app (mostly waiting on DB/network rather than computing) keeps CPU low even while the app is overloaded with requests — use a **custom metric** (requests/sec, queue depth) instead of just CPU/memory.
4. **`minReplicas` too low**: near-zero traffic means small absolute changes (1 Pod → 2 Pods) represent a huge percentage change (100%) → prone to flapping. Set `minReplicas` high enough to stabilize the denominator.

**Note**: HPA does **not** replace VPA (Vertical Pod Autoscaler — tunes requests/limits) or the Cluster Autoscaler (adds/removes nodes) — the three operate at different layers and work together (HPA decides Pod count, Cluster Autoscaler decides how many nodes are needed to host that many Pods).
