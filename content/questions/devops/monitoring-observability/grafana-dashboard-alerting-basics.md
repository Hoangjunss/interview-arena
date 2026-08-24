---
id: grafana-dashboard-alerting-basics
position: devops
technology: monitoring-observability
level: junior
tags: [grafana, dashboard, alerting]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Grafana dùng để làm gì và khác gì với Prometheus? Grafana có tự lưu dữ liệu metric không? Giải thích cách tạo một alert rule cơ bản trong Grafana.

## Question (EN)
What is Grafana used for, and how does it differ from Prometheus? Does Grafana store metric data itself? Explain how to create a basic alert rule in Grafana.

## Đáp án chi tiết (VI)
**Grafana** là công cụ **visualization và alerting** — nó **không tự lưu trữ metric data**, mà kết nối tới các **data source** (Prometheus, Loki, InfluxDB, Elasticsearch, MySQL...) để truy vấn và vẽ dashboard. Prometheus là nơi lưu trữ + query time-series data; Grafana là lớp giao diện phía trên để trực quan hóa và cấu hình alert dựa trên dữ liệu đó.

| | Prometheus | Grafana |
|---|---|---|
| Vai trò | Thu thập + lưu trữ + query time-series | Visualization + alerting layer |
| Lưu data | Có (TSDB riêng) | Không (chỉ query qua data source) |
| Ngôn ngữ query | PromQL | Không có ngôn ngữ riêng, dùng query của data source |
| Alerting | Có (Alertmanager riêng) | Có (Grafana Alerting, từ v8 trở lên tích hợp unified alerting) |

**Cấu trúc dashboard cơ bản**: 1 Dashboard chứa nhiều Panel, mỗi Panel có 1 hoặc nhiều Query (PromQL nếu data source là Prometheus) + 1 kiểu visualization (time series, gauge, table, stat...).

**Tạo alert rule cơ bản trong Grafana (unified alerting)**:
1. Vào panel → "Alert" tab → "New alert rule".
2. Định nghĩa **query + condition**, ví dụ:
   ```
   Query A: avg(rate(http_requests_total{status=~"5.."}[5m])) / avg(rate(http_requests_total[5m]))
   Condition: WHEN last() OF A IS ABOVE 0.05
   ```
3. Cấu hình **"for"** (thời gian phải duy trì điều kiện trước khi alert fire) — ví dụ `for: 5m` để tránh alert vì spike tức thời.
4. Gắn **labels** (severity=critical, team=payments) để routing đúng contact point.
5. Cấu hình **Contact point** (Slack, PagerDuty, email, webhook) và **Notification policy** (route theo label).

**Ví dụ thực tế**: alert "5xx error rate > 5% trong 5 phút liên tục" → gửi Slack channel `#alerts-payments` nếu label `team=payments`, đồng thời page qua PagerDuty nếu label `severity=critical`.

**Pitfall thường gặp**:
- Quên set `for` duration → alert nhấp nháy (flapping) mỗi khi có spike tức thời, gây alert fatigue.
- Alert rule query khác với query hiển thị trên dashboard (dùng aggregation khác nhau) → dashboard "trông ổn" nhưng alert vẫn fire, gây mất niềm tin vào hệ thống alert.
- Không set `No Data` handling — nếu Prometheus down hoặc mất data source, mặc định Grafana có thể coi là "OK" thay vì báo động, che giấu sự cố nghiêm trọng hơn.

## Detailed Answer (EN)
**Grafana** is a **visualization and alerting** tool — it **does not store metric data itself**; it connects to **data sources** (Prometheus, Loki, InfluxDB, Elasticsearch, MySQL, etc.) to query and render dashboards. Prometheus is where time-series data is stored and queried; Grafana is the UI layer on top for visualizing and configuring alerts based on that data.

| | Prometheus | Grafana |
|---|---|---|
| Role | Collect + store + query time-series | Visualization + alerting layer |
| Stores data | Yes (own TSDB) | No (only queries via data sources) |
| Query language | PromQL | None of its own; uses the data source's query language |
| Alerting | Yes (separate Alertmanager) | Yes (Grafana Alerting, unified alerting since v8) |

**Basic dashboard structure**: a Dashboard contains multiple Panels; each Panel has one or more Queries (PromQL if the data source is Prometheus) plus one visualization type (time series, gauge, table, stat, etc.).

**Creating a basic alert rule in Grafana (unified alerting)**:
1. Go to a panel → "Alert" tab → "New alert rule".
2. Define the **query + condition**, e.g.:
   ```
   Query A: avg(rate(http_requests_total{status=~"5.."}[5m])) / avg(rate(http_requests_total[5m]))
   Condition: WHEN last() OF A IS ABOVE 0.05
   ```
3. Configure the **"for"** duration (how long the condition must hold before firing) — e.g. `for: 5m` to avoid alerting on a momentary spike.
4. Attach **labels** (severity=critical, team=payments) for routing to the right contact point.
5. Configure a **Contact point** (Slack, PagerDuty, email, webhook) and a **Notification policy** (route by label).

**Concrete example**: alert "5xx error rate > 5% sustained for 5 minutes" → posts to Slack channel `#alerts-payments` if `team=payments`, and also pages via PagerDuty if `severity=critical`.

**Common pitfalls**:
- Forgetting to set the `for` duration → the alert flaps on every momentary spike, causing alert fatigue.
- The alert rule's query differing from the dashboard panel's query (different aggregation) → the dashboard "looks fine" while the alert still fires, eroding trust in the alerting system.
- Not configuring `No Data` handling — if Prometheus is down or the data source is unreachable, Grafana can default to treating that as "OK" instead of alerting, masking an even more serious incident.
