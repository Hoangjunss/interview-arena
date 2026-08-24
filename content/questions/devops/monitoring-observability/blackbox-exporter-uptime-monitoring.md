---
id: blackbox-exporter-uptime-monitoring
position: devops
technology: monitoring-observability
level: junior
tags: [prometheus, blackbox-exporter, uptime]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Blackbox Exporter của Prometheus là gì và dùng để làm gì? Nó khác gì so với việc app tự expose metric qua `/metrics` (white-box monitoring)?

## Question (EN)
What is the Prometheus Blackbox Exporter used for? How does it differ from an app exposing its own metrics via `/metrics` (white-box monitoring)?

## Đáp án chi tiết (VI)
**Blackbox Exporter** là một exporter chính thức của Prometheus, dùng để kiểm tra endpoint **từ bên ngoài** (không cần biết gì về nội bộ hệ thống đích) — kiểm tra qua HTTP, HTTPS, TCP, ICMP (ping), DNS. Kết quả trả về dưới dạng metric Prometheus chuẩn để scrape như bình thường.

**Khác biệt cốt lõi giữa Blackbox và White-box monitoring**:

| | White-box (app tự expose `/metrics`) | Black-box (Blackbox Exporter) |
|---|---|---|
| Góc nhìn | Từ **bên trong** ứng dụng | Từ **bên ngoài**, như 1 client thực sự |
| Biết gì | Chi tiết nội bộ (số connection pool, queue depth, business metric) | Chỉ biết kết quả cuối: "endpoint có phản hồi không, mất bao lâu, response code gì" |
| Phát hiện | Vấn đề đang hình thành bên trong (trước khi ảnh hưởng user) | Vấn đề user **thực sự đang gặp** (network, DNS, TLS, load balancer...) |
| Ví dụ | `http_requests_total`, `db_connection_pool_active` | `probe_success`, `probe_duration_seconds`, `probe_http_status_code` |

**Cấu hình cơ bản** (`blackbox.yml`):
```yaml
modules:
  http_2xx:
    prober: http
    timeout: 5s
    http:
      valid_status_codes: [200]
      method: GET
```

**Cấu hình scrape trong Prometheus** (dùng kỹ thuật "relabel" đặc trưng của Blackbox Exporter):
```yaml
scrape_configs:
  - job_name: 'blackbox-http'
    metrics_path: /probe
    params:
      module: [http_2xx]
    static_configs:
      - targets:
          - https://example.com
          - https://api.example.com/health
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: blackbox-exporter:9115
```
Prometheus không gọi trực tiếp `https://example.com` — nó gọi Blackbox Exporter tại `blackbox-exporter:9115/probe?target=https://example.com`, Exporter mới là bên thực hiện request thật và trả metric về.

**Ví dụ alert dựa trên Blackbox**:
```promql
probe_success == 0
```
→ Alert ngay khi endpoint không phản hồi thành công, độc lập hoàn toàn với việc app có tự đo lường tốt hay không (hữu ích khi app bị crash hoàn toàn, không còn khả năng tự expose `/metrics`).

**Vì sao cần cả hai (không thay thế nhau)**:
- Nếu app crash hoàn toàn hoặc network bị đứt, white-box monitoring **không hoạt động được nữa** (không có gì để scrape) — lúc này chỉ blackbox mới phát hiện được "service down" từ góc nhìn bên ngoài.
- Ngược lại, blackbox không thể biết "connection pool đang cạn dần" hay "queue đang backlog" — cần white-box để phát hiện sớm trước khi ảnh hưởng tới response từ bên ngoài.

**Pitfall thường gặp**: chỉ tin vào white-box monitoring (dashboard app "trông ổn") mà không có blackbox check từ bên ngoài — có thể bỏ sót các sự cố ở tầng hạ tầng ngoài tầm kiểm soát của app (DNS sai, cert TLS hết hạn, load balancer misconfigure) vì các vấn đề này không xuất hiện trong bất kỳ metric nội bộ nào của app.

## Detailed Answer (EN)
**Blackbox Exporter** is an official Prometheus exporter used to probe endpoints **from the outside** (without needing any knowledge of the target system's internals) — over HTTP, HTTPS, TCP, ICMP (ping), or DNS. Results come back as standard Prometheus metrics, scraped as usual.

**Core difference between black-box and white-box monitoring**:

| | White-box (app exposes its own `/metrics`) | Black-box (Blackbox Exporter) |
|---|---|---|
| Vantage point | From **inside** the application | From **outside**, as an actual client would see it |
| What it knows | Internal detail (connection pool count, queue depth, business metrics) | Only the end result: "did the endpoint respond, how long, what status code" |
| Detects | Problems forming internally (before they affect users) | Problems users are **actually experiencing** (network, DNS, TLS, load balancer, etc.) |
| Example metrics | `http_requests_total`, `db_connection_pool_active` | `probe_success`, `probe_duration_seconds`, `probe_http_status_code` |

**Basic configuration** (`blackbox.yml`):
```yaml
modules:
  http_2xx:
    prober: http
    timeout: 5s
    http:
      valid_status_codes: [200]
      method: GET
```

**Prometheus scrape configuration** (using Blackbox Exporter's characteristic "relabel" trick):
```yaml
scrape_configs:
  - job_name: 'blackbox-http'
    metrics_path: /probe
    params:
      module: [http_2xx]
    static_configs:
      - targets:
          - https://example.com
          - https://api.example.com/health
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: blackbox-exporter:9115
```
Prometheus doesn't call `https://example.com` directly — it calls the Blackbox Exporter at `blackbox-exporter:9115/probe?target=https://example.com`, and the Exporter is the one making the real request and returning the metric.

**Example alert based on Blackbox**:
```promql
probe_success == 0
```
→ Fires immediately when an endpoint fails to respond successfully, entirely independent of whether the app instruments itself well (useful when the app has crashed entirely and can no longer expose `/metrics`).

**Why you need both (they don't replace each other)**:
- If the app crashes entirely or the network is severed, white-box monitoring **stops working altogether** (nothing left to scrape) — only blackbox monitoring can detect "service down" from an external vantage point at that point.
- Conversely, blackbox can't tell you "the connection pool is slowly draining" or "the queue is backing up" — you need white-box monitoring to catch that early, before it affects external response.

**Common pitfall**: trusting white-box monitoring alone (the app's dashboard "looks fine") without an external blackbox check — this can miss infrastructure-level incidents outside the app's control (wrong DNS, expired TLS cert, misconfigured load balancer) since these issues never show up in any of the app's own internal metrics.
