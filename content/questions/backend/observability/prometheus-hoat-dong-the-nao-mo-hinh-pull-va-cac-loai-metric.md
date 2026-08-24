---
id: prometheus-hoat-dong-the-nao-mo-hinh-pull-va-cac-loai-metric
position: backend
technology: observability
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Prometheus hoạt động thế nào? Mô hình pull và các loại metric?

## Question (EN)
How does Prometheus work — the pull model and metric types?

## Đáp án chi tiết (VI)
Prometheus là hệ **monitoring kèm time-series database**, thu thập số liệu theo **mô hình pull**: server **tự đi scrape** endpoint `/metrics` của các target theo chu kỳ (khác mô hình push, nơi ứng dụng tự đẩy đi). Target được tìm qua **service discovery** (K8s, file, DNS).\
\
- **PromQL**: ngôn ngữ truy vấn để tổng hợp, tính rate, phân vị từ dữ liệu chuỗi thời gian.\
- **Alertmanager**: nhận alert từ rule và định tuyến/gom/khử trùng thông báo.\
- **Grafana**: thường ghép để trực quan hóa dashboard.\
\
**Bốn loại metric**:\
1. **Counter** — chỉ **tăng đơn điệu** (tổng request, lỗi); reset khi restart.\
2. **Gauge** — giá trị **lên xuống** (nhiệt độ, số kết nối, mức bộ nhớ).\
3. **Histogram** — đếm quan sát vào các **bucket** (phân phối độ trễ) → tính phân vị phía server.\
4. **Summary** — tự tính **quantile** phía client.\
\
Prometheus mạnh cho **metric số**; log/trace cần công cụ khác (ELK, Jaeger).

## Detailed Answer (EN)
Prometheus is a **monitoring system with a time-series database** that collects data via a **pull model**: the server **scrapes** each target's `/metrics` endpoint on an interval (unlike a push model where apps send data out). Targets are found via **service discovery** (K8s, files, DNS).\
\
- **PromQL**: a query language to aggregate, compute rates and percentiles over time series.\
- **Alertmanager**: takes alerts from rules and routes/groups/deduplicates notifications.\
- **Grafana**: commonly paired for dashboard visualization.\
\
**Four metric types**:\
1. **Counter** — **monotonically increasing** (total requests, errors); resets on restart.\
2. **Gauge** — a value that **goes up and down** (temperature, connections, memory).\
3. **Histogram** — counts observations into **buckets** (latency distribution) → server-side percentiles.\
4. **Summary** — computes **quantiles** client-side.\
\
Prometheus excels at **numeric metrics**; logs/traces need other tools (ELK, Jaeger).
