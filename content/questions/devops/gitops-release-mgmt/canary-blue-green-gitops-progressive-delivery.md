---
id: canary-blue-green-gitops-progressive-delivery
position: devops
technology: gitops-release-mgmt
level: senior
tags: [gitops, progressive-delivery, kubernetes, argocd]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để triển khai Canary hoặc Blue-Green deployment trong một pipeline GitOps thuần (declarative, không dùng script imperative)? Nêu công cụ và cách xử lý rollback tự động khi metric xấu.

## Question (EN)
How do you implement Canary or Blue-Green deployment in a pure GitOps pipeline (declarative, no imperative scripts)? Name the tools and how automated rollback works when metrics degrade.

## Đáp án chi tiết (VI)
Thách thức cốt lõi: GitOps controller (ArgoCD/Flux) chỉ biết **apply resource khớp với Git**, nó không tự có khái niệm "tăng dần traffic 10% → 30% → 100% rồi theo dõi metric". Cần một **progressive delivery controller** riêng làm việc **cùng** với GitOps controller, không thay thế nó.

### Kiến trúc kết hợp: ArgoCD + Argo Rollouts (phổ biến nhất)
Thay vì khai báo `Deployment` thuần, khai báo **`Rollout`** (CRD của Argo Rollouts) — vẫn hoàn toàn declarative, vẫn nằm trong Git, ArgoCD vẫn chỉ đơn giản `apply` resource này như bình thường.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: order-service
spec:
  replicas: 10
  strategy:
    canary:
      steps:
        - setWeight: 10        # 10% traffic vào version mới
        - pause: {duration: 5m}
        - analysis:            # tự động phân tích metric trong 5 phút
            templates:
              - templateName: success-rate-check
        - setWeight: 30
        - pause: {duration: 5m}
        - analysis:
            templates:
              - templateName: success-rate-check
        - setWeight: 100
  selector:
    matchLabels: {app: order-service}
  template:
    spec:
      containers:
        - name: order-service
          image: registry.company.vn/order-service:1.5.0   # <- đây là field Git commit thay đổi
```

**AnalysisTemplate — nơi tự động hoá quyết định rollback:**
```yaml
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: success-rate-check
spec:
  metrics:
    - name: error-rate
      interval: 1m
      successCondition: result[0] < 0.01   # error rate < 1%
      failureLimit: 2                       # fail 2 lần liên tiếp -> abort
      provider:
        prometheus:
          address: http://prometheus.monitoring:9090
          query: |
            sum(rate(http_requests_total{app="order-service",status=~"5.."}[1m]))
            / sum(rate(http_requests_total{app="order-service"}[1m]))
```

**Luồng end-to-end trong GitOps:**
```
1. Dev merge PR đổi image tag 1.4.2 -> 1.5.0 trong config repo (qua git, review bình thường)
2. ArgoCD phát hiện thay đổi, apply Rollout mới -> Argo Rollouts controller nhận diện
   thay đổi spec.template.image
3. Argo Rollouts controller (KHÔNG phải ArgoCD) tự thực hiện:
   - Tạo ReplicaSet mới (canary) song song ReplicaSet cũ (stable)
   - Điều chỉnh Service/Ingress weight theo từng step (setWeight)
   - Sau mỗi bước, query Prometheus qua AnalysisTemplate
4. Nếu error-rate vượt ngưỡng liên tục 2 lần -> Argo Rollouts TỰ ĐỘNG abort,
   set weight về 0%, giữ nguyên ReplicaSet cũ (stable) phục vụ 100% traffic
5. ArgoCD Application vẫn hiển thị Synced (vì Git không đổi) nhưng Health có thể
   là "Degraded" nếu Rollout ở trạng thái Paused/Aborted
```

**Điểm quan trọng cần nhấn mạnh khi trả lời senior:** đây vẫn là **GitOps thuần túy** vì:
- Git vẫn là nguồn sự thật duy nhất cho "ý định deploy" (image tag nào, chiến lược canary nào).
- Rollback tự động không đòi hỏi ai `git revert` — Argo Rollouts tự xử lý ở tầng runtime dựa trên **policy đã khai báo trong Git** (`failureLimit`, `successCondition`), không phải script imperative bên ngoài.
- Nếu muốn rollback **vĩnh viễn** (không chỉ pause tạm), vẫn cần `git revert` để Git phản ánh đúng ý định cuối cùng — tránh trường hợp lần deploy tiếp theo lại thử lại đúng version lỗi.

### Blue-Green với Argo Rollouts
```yaml
strategy:
  blueGreen:
    activeService: order-service-active
    previewService: order-service-preview
    autoPromotionEnabled: false   # chờ approval thủ công trước khi switch traffic
    prePromotionAnalysis:
      templates:
        - templateName: success-rate-check
```
Khác biệt với Canary: Blue-Green chuyển **toàn bộ traffic** trong một lần (qua Service selector), không chia dần theo %; ưu tiên rollback tức thời (chỉ switch selector ngược) nhưng tốn gấp đôi resource trong lúc chạy song song 2 version.

**So sánh nhanh Canary vs Blue-Green trong GitOps:**

| | Canary | Blue-Green |
|---|---|---|
| Resource cần | Ít hơn (scale dần) | Gấp đôi tạm thời (2 full version chạy song song) |
| Tốc độ phát hiện lỗi | Chậm hơn (traffic nhỏ ban đầu, lỗi hiếm khó phát hiện sớm) | Nhanh (nhưng ảnh hưởng 100% traffic nếu preview test không kỹ) |
| Rollback | Giảm weight về 0% (tự động) | Switch Service selector ngược (gần như tức thời) |
| Độ phức tạp cấu hình | Cao hơn (nhiều step, nhiều threshold) | Đơn giản hơn |

**Pitfall senior cần biết:** AnalysisTemplate phụ thuộc vào metric có sẵn trong Prometheus với đủ **cardinality và độ trễ scrape phù hợp** — nếu scrape interval của Prometheus là 1 phút nhưng bước canary chỉ pause 30 giây, hệ thống sẽ đưa ra quyết định dựa trên dữ liệu chưa đủ, dẫn tới false positive/negative trong quyết định rollback tự động.

## Detailed Answer (EN)
The core challenge: a GitOps controller (ArgoCD/Flux) only knows how to **apply resources matching Git** — it has no native concept of "gradually shift traffic 10% → 30% → 100% while monitoring metrics." You need a separate **progressive delivery controller** working **alongside** the GitOps controller, not replacing it.

### Combined architecture: ArgoCD + Argo Rollouts (the most common setup)
Instead of declaring a plain `Deployment`, declare a **`Rollout`** (an Argo Rollouts CRD) — still entirely declarative, still living in Git, with ArgoCD still simply `apply`ing this resource like any other.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: order-service
spec:
  replicas: 10
  strategy:
    canary:
      steps:
        - setWeight: 10        # 10% of traffic to the new version
        - pause: {duration: 5m}
        - analysis:            # auto-analyze metrics for 5 minutes
            templates:
              - templateName: success-rate-check
        - setWeight: 30
        - pause: {duration: 5m}
        - analysis:
            templates:
              - templateName: success-rate-check
        - setWeight: 100
  selector:
    matchLabels: {app: order-service}
  template:
    spec:
      containers:
        - name: order-service
          image: registry.company.vn/order-service:1.5.0   # <- the field a Git commit changes
```

**AnalysisTemplate — where rollback decisions get automated:**
```yaml
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: success-rate-check
spec:
  metrics:
    - name: error-rate
      interval: 1m
      successCondition: result[0] < 0.01   # error rate < 1%
      failureLimit: 2                       # fail 2 times consecutively -> abort
      provider:
        prometheus:
          address: http://prometheus.monitoring:9090
          query: |
            sum(rate(http_requests_total{app="order-service",status=~"5.."}[1m]))
            / sum(rate(http_requests_total{app="order-service"}[1m]))
```

**End-to-end flow in GitOps:**
```
1. Dev merges a PR changing the image tag from 1.4.2 -> 1.5.0 in the config
   repo (via git, normal review)
2. ArgoCD detects the change, applies the new Rollout -> the Argo Rollouts
   controller notices the spec.template.image change
3. The Argo Rollouts controller (NOT ArgoCD) automatically:
   - Creates a new (canary) ReplicaSet alongside the old (stable) one
   - Adjusts the Service/Ingress weight per step (setWeight)
   - After each step, queries Prometheus via the AnalysisTemplate
4. If the error rate exceeds the threshold 2 times consecutively -> Argo
   Rollouts AUTOMATICALLY aborts, sets weight back to 0%, keeping the old
   (stable) ReplicaSet serving 100% of traffic
5. The ArgoCD Application still shows Synced (since Git hasn't changed) but
   Health may show "Degraded" if the Rollout is in a Paused/Aborted state
```

**A key point to emphasize in a senior answer:** this is still **pure GitOps** because:
- Git remains the single source of truth for "deploy intent" (which image tag, which canary strategy).
- Automated rollback doesn't require anyone to `git revert` — Argo Rollouts handles it at the runtime layer based on **policy declared in Git** (`failureLimit`, `successCondition`), not an external imperative script.
- If you want a **permanent** rollback (not just a temporary pause), you still need `git revert` so Git reflects the final intent — otherwise the next deploy attempt could retry the same broken version.

### Blue-Green with Argo Rollouts
```yaml
strategy:
  blueGreen:
    activeService: order-service-active
    previewService: order-service-preview
    autoPromotionEnabled: false   # wait for manual approval before switching traffic
    prePromotionAnalysis:
      templates:
        - templateName: success-rate-check
```
The difference from Canary: Blue-Green switches **all traffic** in a single step (via the Service selector), not gradually by percentage; it favors instant rollback (just switching the selector back) but costs double the resources while both versions run in parallel.

**Quick comparison of Canary vs Blue-Green in GitOps:**

| | Canary | Blue-Green |
|---|---|---|
| Resource needed | Less (gradual scale-up) | Temporarily double (2 full versions run in parallel) |
| Failure detection speed | Slower (initial traffic is small, rare bugs are hard to catch early) | Fast (but affects 100% of traffic if the preview wasn't tested thoroughly) |
| Rollback | Reduce weight to 0% (automatic) | Switch the Service selector back (nearly instant) |
| Configuration complexity | Higher (many steps, many thresholds) | Simpler |

**A pitfall senior engineers should know:** an AnalysisTemplate depends on metrics being available in Prometheus with sufficient **cardinality and an appropriate scrape delay** — if Prometheus's scrape interval is 1 minute but a canary step only pauses for 30 seconds, the system makes decisions on insufficient data, leading to false positives/negatives in automated rollback decisions.
