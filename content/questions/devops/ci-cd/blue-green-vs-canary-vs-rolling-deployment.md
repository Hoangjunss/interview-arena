---
id: blue-green-vs-canary-vs-rolling-deployment
position: devops
technology: ci-cd
level: mid
tags: [deployment-strategy, kubernetes, reliability]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh Blue-Green, Canary và Rolling deployment. Khi nào bạn chọn chiến lược nào?

## Question (EN)
Compare Blue-Green, Canary, and Rolling deployments. When would you choose each strategy?

## Đáp án chi tiết (VI)
Cả ba đều nhằm mục tiêu **giảm downtime và rủi ro** khi release version mới, nhưng khác nhau ở cách chuyển traffic và tốc độ rollback.

| Tiêu chí | Rolling | Blue-Green | Canary |
|---|---|---|---|
| **Cách hoạt động** | Thay thế dần từng instance cũ bằng instance mới | Chạy song song 2 môi trường (blue=cũ, green=mới), chuyển toàn bộ traffic một lúc | Deploy version mới cho 1 nhóm nhỏ user/traffic, tăng dần nếu ổn |
| **Downtime** | Gần như 0, nhưng có giai đoạn 2 version cùng chạy | 0 nếu switch traffic tức thời (qua LB/DNS) | 0 |
| **Rollback** | Chậm hơn (phải rolling ngược lại) | Cực nhanh — chuyển traffic về blue | Nhanh — giảm traffic canary về 0 |
| **Chi phí hạ tầng** | Thấp (không cần double capacity) | Cao (cần gấp đôi capacity tạm thời) | Trung bình (thêm 1 phần nhỏ capacity) |
| **Risk exposure** | Trung bình — tất cả user có thể gặp version lỗi cùng lúc dần dần | Thấp về mặt kỹ thuật nhưng "tất cả hoặc không gì" — nếu lỗi phát hiện muộn thì đã ảnh hưởng 100% user | Thấp nhất — chỉ % nhỏ traffic bị ảnh hưởng nếu có lỗi |
| **Độ phức tạp** | Thấp (built-in trong Kubernetes Deployment mặc định) | Trung bình (cần LB/DNS switch, quản lý 2 env) | Cao (cần traffic splitting, metrics-based analysis) |

**Rolling deployment** (mặc định của Kubernetes `Deployment`):
```yaml
spec:
  strategy:
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
    type: RollingUpdate
```
Phù hợp cho hầu hết ứng dụng stateless nội bộ, không cần A/B test hay kiểm soát traffic tinh vi.

**Blue-Green:** dùng khi cần rollback tức thời tuyệt đối (ví dụ hệ thống tài chính) hoặc khi migration schema DB phức tạp cần test toàn bộ trước khi cutover. Nhược điểm lớn là tốn gấp đôi tài nguyên trong lúc chuyển đổi, và nếu DB có breaking schema change thì cả 2 version phải tương thích ngược với DB.

**Canary:** phù hợp khi muốn giảm thiểu blast radius và có khả năng đo lường (metrics: error rate, latency, business KPI) để quyết định tăng traffic hay rollback tự động. Thường kết hợp với công cụ như **Argo Rollouts**, **Flagger**, **Istio traffic splitting**:

```yaml
# Argo Rollouts canary step ví dụ
strategy:
  canary:
    steps:
      - setWeight: 10
      - pause: {duration: 5m}
      - setWeight: 50
      - pause: {duration: 10m}
      - setWeight: 100
```

**Pitfall thường gặp:**
- Chọn Blue-Green nhưng không xử lý session affinity — user đang login ở blue bị văng ra khi switch sang green.
- Canary mà không có auto-analysis (chỉ dựa vào mắt người theo dõi dashboard) thì mất hết lợi thế "phát hiện sớm, rollback tự động".
- Rolling update với `maxUnavailable: 0` nhưng resource quota không đủ cho `maxSurge` khiến pipeline treo mãi không rollout được.

## Detailed Answer (EN)
All three aim to **reduce downtime and risk** when releasing a new version, but differ in how traffic is shifted and how fast rollback can happen.

| Criterion | Rolling | Blue-Green | Canary |
|---|---|---|---|
| **How it works** | Gradually replaces old instances with new ones | Runs two parallel environments (blue=old, green=new), switches all traffic at once | Deploys the new version to a small subset of users/traffic, ramps up if healthy |
| **Downtime** | Near zero, but both versions run briefly together | Zero if the traffic switch (LB/DNS) is instant | Zero |
| **Rollback** | Slower (must roll back gradually) | Extremely fast — switch traffic back to blue | Fast — reduce canary traffic to 0 |
| **Infra cost** | Low (no need for double capacity) | High (needs temporary double capacity) | Medium (small extra capacity slice) |
| **Risk exposure** | Medium — all users can eventually hit a broken version, gradually | Low technically but "all or nothing" — if a bug surfaces late, 100% of users are already affected | Lowest — only a small % of traffic is affected if something breaks |
| **Complexity** | Low (built into Kubernetes `Deployment` by default) | Medium (needs LB/DNS switching, managing two environments) | High (needs traffic splitting, metrics-based analysis) |

**Rolling deployment** (Kubernetes `Deployment` default):
```yaml
spec:
  strategy:
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
    type: RollingUpdate
```
Fits most internal stateless applications that don't need A/B testing or fine-grained traffic control.

**Blue-Green:** use when you need absolute instant rollback (e.g. financial systems) or when a complex DB schema migration needs full validation before cutover. The major downside is doubled resource cost during the transition, and if there's a breaking DB schema change, both versions must remain backward compatible with the DB.

**Canary:** fits when you want to minimize blast radius and have the ability to measure (metrics: error rate, latency, business KPIs) to decide whether to ramp up traffic or auto-rollback. Usually paired with tools like **Argo Rollouts**, **Flagger**, or **Istio traffic splitting**:

```yaml
# Argo Rollouts canary step example
strategy:
  canary:
    steps:
      - setWeight: 10
      - pause: {duration: 5m}
      - setWeight: 50
      - pause: {duration: 10m}
      - setWeight: 100
```

**Common pitfalls:**
- Choosing Blue-Green without handling session affinity — users logged into blue get kicked out when switching to green.
- Running canary without auto-analysis (relying only on a human watching a dashboard) loses the whole point of "detect early, rollback automatically".
- Rolling update with `maxUnavailable: 0` but insufficient resource quota for `maxSurge`, leaving the rollout stuck forever.