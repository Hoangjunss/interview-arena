---
id: prometheus-scrape-model
position: devops
technology: monitoring-observability
level: junior
tags: [prometheus, metrics, architecture]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Prometheus thu thập metrics theo mô hình pull hay push? Giải thích cách hoạt động và ưu nhược điểm so với mô hình còn lại.

## Question (EN)
Does Prometheus collect metrics using a pull or push model? Explain how it works and the trade-offs compared to the other model.

## Đáp án chi tiết (VI)
Prometheus dùng mô hình **pull (scrape)**: Prometheus server chủ động gọi HTTP GET tới endpoint `/metrics` của từng target theo chu kỳ (`scrape_interval`, mặc định 15s hoặc 1 phút) để lấy dữ liệu ở định dạng text exposition.

**Cấu hình scrape cơ bản** (`prometheus.yml`):
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'my-app'
    metrics_path: /metrics
    static_configs:
      - targets: ['app-1:8080', 'app-2:8080']
    # Trong Kubernetes thường dùng service discovery thay vì static
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
```

Ứng dụng chỉ cần expose một endpoint `/metrics` (thường qua client library như `prometheus_client`), không cần biết Prometheus ở đâu.

**Ưu điểm của pull**:
- Prometheus biết chính xác target nào "sống" hay "chết" — nếu scrape thất bại, metric `up` = 0, dễ alert khi mất kết nối.
- Dễ debug: có thể `curl` trực tiếp endpoint `/metrics` để xem dữ liệu thô.
- Không cần app gửi dữ liệu ra ngoài, giảm rủi ro bảo mật (app không cần biết địa chỉ collector).
- Kiểm soát tải tập trung: Prometheus tự quyết định tần suất scrape, tránh app "spam" quá nhiều dữ liệu.

**Nhược điểm / khi nào cần push**:
- Với **short-lived jobs** (cron job, batch job chạy vài giây rồi thoát), Prometheus không kịp scrape trước khi job kết thúc → dùng **Pushgateway**: job push metric vào Pushgateway, Prometheus scrape Pushgateway thay vì job trực tiếp.
- Trong môi trường mạng phức tạp (app ở sau NAT, Prometheus không reach tới được) thì push (như StatsD, hoặc Prometheus remote_write) phù hợp hơn.
- Pull yêu cầu Prometheus phải biết danh sách target — cần cơ chế service discovery (Kubernetes SD, Consul SD, file SD) để tự động cập nhật khi target thay đổi.

**So sánh nhanh**:

| | Pull (Prometheus) | Push (StatsD, Pushgateway) |
|---|---|---|
| Ai chủ động | Server | Client |
| Phát hiện target chết | Tự động (metric `up`) | Khó hơn |
| Phù hợp | Service dài hạn, có network trực tiếp | Batch job ngắn, network hạn chế |

**Gotcha thường gặp**: nếu `scrape_timeout` (mặc định 10s) lớn hơn `scrape_interval`, Prometheus sẽ báo lỗi cấu hình — timeout luôn phải nhỏ hơn interval. Ngoài ra, endpoint `/metrics` sinh ra quá chậm (ví dụ tính toán nặng mỗi lần scrape) sẽ làm scrape timeout liên tục và metric `up=0` giả, gây báo động nhầm — nên cache hoặc tính toán bất đồng bộ nếu `/metrics` tốn nhiều tài nguyên.

## Detailed Answer (EN)
Prometheus uses a **pull (scrape) model**: the Prometheus server actively sends an HTTP GET to each target's `/metrics` endpoint on a schedule (`scrape_interval`, default 15s or 1 minute) to collect data in the text exposition format.

**Basic scrape config** (`prometheus.yml`):
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'my-app'
    metrics_path: /metrics
    static_configs:
      - targets: ['app-1:8080', 'app-2:8080']
    # In Kubernetes, service discovery is used instead of static targets
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
```

The application just needs to expose a `/metrics` endpoint (usually via a client library like `prometheus_client`) — it doesn't need to know where Prometheus lives.

**Advantages of pull**:
- Prometheus knows exactly which targets are alive or dead — a failed scrape sets the `up` metric to 0, making it easy to alert on lost connectivity.
- Easy to debug: you can `curl` the `/metrics` endpoint directly to inspect raw data.
- The app never sends data outward, reducing attack surface (it doesn't need to know the collector's address).
- Centralized load control: Prometheus decides the scrape cadence, preventing apps from flooding it with data.

**Drawbacks / when push is needed**:
- For **short-lived jobs** (a cron/batch job that runs for a few seconds and exits), Prometheus can't scrape in time → use the **Pushgateway**: the job pushes its metrics to the Pushgateway, and Prometheus scrapes the Pushgateway instead of the job directly.
- In complex network topologies (app behind NAT, unreachable from Prometheus), push-based systems (StatsD, or Prometheus `remote_write`) fit better.
- Pull requires Prometheus to know the target list — you need service discovery (Kubernetes SD, Consul SD, file SD) to keep that list current as targets come and go.

**Quick comparison**:

| | Pull (Prometheus) | Push (StatsD, Pushgateway) |
|---|---|---|
| Who initiates | Server | Client |
| Dead-target detection | Automatic (`up` metric) | Harder |
| Best fit | Long-running services with direct network access | Short batch jobs, restricted networks |

**Common gotcha**: if `scrape_timeout` (default 10s) is larger than `scrape_interval`, Prometheus rejects the config — timeout must always be smaller than the interval. Also, if generating `/metrics` is slow (heavy computation on every scrape), scrapes will time out repeatedly, producing a false `up=0` and noisy alerts — cache expensive metrics or compute them asynchronously instead of inline in the handler.
