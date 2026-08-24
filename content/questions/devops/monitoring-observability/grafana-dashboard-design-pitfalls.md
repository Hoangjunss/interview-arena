---
id: grafana-dashboard-design-pitfalls
position: devops
technology: monitoring-observability
level: junior
tags: [grafana, dashboard, best-practices]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kể tên một số lỗi phổ biến khi thiết kế dashboard giám sát (Grafana) mà bạn nên tránh?

## Question (EN)
What are some common mistakes to avoid when designing a monitoring dashboard (Grafana)?

## Đáp án chi tiết (VI)
Dashboard thiết kế tệ khiến việc debug lúc incident chậm hơn thay vì nhanh hơn. Một số lỗi thường gặp:

**1. Quá nhiều panel trên 1 dashboard ("dashboard rác")**
- Nhồi 30-40 panel vào 1 màn hình khiến không ai biết nhìn vào đâu khi có sự cố.
- Nên chia theo tầng: dashboard tổng quan (overview, 4-6 panel theo Golden Signals) → dashboard chi tiết theo service → dashboard debug sâu (theo endpoint, theo instance).

**2. Dùng average thay vì percentile cho latency**
- Average che giấu outlier. 1000 request với 990 request 50ms và 10 request 5s vẫn cho average ~100ms — trông "ổn" nhưng 1% user đang chịu trải nghiệm rất tệ.
- Luôn hiển thị p50/p95/p99 riêng biệt cho latency.

**3. Không đồng bộ time range và variables giữa các panel**
- Panel A xem 1h, panel B xem 24h trên cùng dashboard → so sánh sai lệch, kết luận sai khi debug.

**4. Threshold màu sắc không rõ ràng hoặc không có**
- Panel chỉ vẽ đường số mà không có ngưỡng (threshold) đỏ/vàng/xanh khiến người xem phải tự nhớ "bao nhiêu là bất thường" — nên set threshold trực quan ngay trên panel.

**5. Thiếu annotation cho sự kiện deploy**
- Không đánh dấu thời điểm deploy trên dashboard khiến khó liên hệ "latency tăng đúng lúc deploy version mới" — Grafana hỗ trợ annotation tự động từ CI/CD webhook.

**6. Dashboard không có "story" — không theo thứ tự logic**
- Panel xếp ngẫu nhiên thay vì theo luồng debug tự nhiên (traffic → error → latency → resource saturation) khiến người xem phải nhảy qua lại.

**7. Query nặng, cardinality cao trên dashboard tổng quan**
- Dùng query kiểu `sum by (pod, instance, path, method) (...)` trên dashboard overview làm chậm load dashboard và làm khó đọc — nên aggregate cao ở overview, drill-down chi tiết ở dashboard riêng.

**8. Không có "single pane of glass" cho on-call**
- Mỗi service một dashboard riêng biệt không liên kết, on-call phải tự nhớ để mở link — nên có 1 dashboard tổng gắn link tới từng dashboard chi tiết (dùng dashboard links hoặc variables).

**Ví dụ thực tế**: Team A build dashboard 45 panel cho 1 service, không phân trang, không threshold. Khi incident xảy ra lúc 3h sáng, on-call mất 15 phút chỉ để tìm panel liên quan thay vì tập trung fix — sau khi tái cấu trúc theo Golden Signals (4 panel overview + link tới dashboard chi tiết), thời gian xác định vấn đề giảm còn 2 phút.

## Detailed Answer (EN)
A poorly designed dashboard slows down incident debugging instead of speeding it up. Common mistakes include:

**1. Too many panels on one dashboard ("dashboard clutter")**
- Cramming 30-40 panels onto one screen means nobody knows where to look during an incident.
- Layer dashboards instead: overview (4-6 panels per the Golden Signals) → per-service detail → deep debug (per-endpoint, per-instance).

**2. Using averages instead of percentiles for latency**
- Averages hide outliers. 1000 requests with 990 at 50ms and 10 at 5s still average ~100ms — looks "fine" while 1% of users have a terrible experience.
- Always show p50/p95/p99 separately for latency.

**3. Time ranges and variables not synced across panels**
- Panel A shows 1h, panel B shows 24h on the same dashboard → mismatched comparisons and wrong conclusions during debugging.

**4. No clear color thresholds**
- A panel that's just a line with no red/yellow/green threshold forces viewers to remember "what number is abnormal" — set visible thresholds directly on the panel.

**5. Missing deploy annotations**
- Not marking deploy events on the dashboard makes it hard to correlate "latency jumped exactly when the new version deployed" — Grafana supports automatic annotations from CI/CD webhooks.

**6. Dashboard with no "story" — no logical order**
- Panels arranged randomly instead of following a natural debug flow (traffic → errors → latency → resource saturation) forces viewers to jump around.

**7. Heavy, high-cardinality queries on the overview dashboard**
- Using queries like `sum by (pod, instance, path, method) (...)` on an overview dashboard slows load times and is hard to read — aggregate heavily on the overview, drill down on dedicated dashboards.

**8. No "single pane of glass" for on-call**
- Every service has its own disconnected dashboard, forcing on-call to remember which link to open — have one top-level dashboard linking to each detailed one (via dashboard links or variables).

**Concrete example**: Team A built a 45-panel dashboard for one service, with no pagination and no thresholds. During a 3am incident, on-call spent 15 minutes just finding the relevant panel instead of fixing the issue — after restructuring around the Golden Signals (4 overview panels + links to detail dashboards), time-to-identify dropped to 2 minutes.
