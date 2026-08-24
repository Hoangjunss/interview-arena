---
id: histogram-vs-summary-prometheus
position: devops
technology: monitoring-observability
level: mid
tags: [prometheus, metrics, promql]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Prometheus có những loại metric nào? Phân biệt Histogram và Summary — khi nào dùng loại nào, và vì sao Histogram thường được khuyến nghị hơn cho việc tính percentile trên nhiều instance?

## Question (EN)
What metric types does Prometheus support? Distinguish Histogram from Summary — when to use each, and why is Histogram usually recommended over Summary for computing percentiles across multiple instances?

## Đáp án chi tiết (VI)
Prometheus có 4 loại metric cơ bản:

| Loại | Mô tả | Ví dụ |
|---|---|---|
| **Counter** | Chỉ tăng (hoặc reset về 0 khi restart) | `http_requests_total` |
| **Gauge** | Có thể tăng/giảm tự do | `memory_usage_bytes`, `queue_length` |
| **Histogram** | Đếm số lượng observation rơi vào từng "bucket" ngưỡng | `http_request_duration_seconds` |
| **Summary** | Tính sẵn quantile phía client, cộng với count/sum | `http_request_duration_seconds` (kiểu summary) |

**Histogram hoạt động thế nào**: mỗi observation được phân vào các bucket có ngưỡng định trước (`le` = less than or equal), Prometheus lưu counter riêng cho từng bucket cộng dồn:
```
http_request_duration_seconds_bucket{le="0.1"} 8000
http_request_duration_seconds_bucket{le="0.5"} 9500
http_request_duration_seconds_bucket{le="1.0"} 9900
http_request_duration_seconds_bucket{le="+Inf"} 10000
http_request_duration_seconds_sum 1234.5
http_request_duration_seconds_count 10000
```
Percentile được tính **phía server** bằng hàm `histogram_quantile()`, nội suy tuyến tính giữa các bucket — đây là **approximation**, độ chính xác phụ thuộc số lượng và vị trí bucket đã định nghĩa.

**Summary hoạt động thế nào**: percentile (quantile) được tính **phía client** ngay khi ghi nhận observation, dùng thuật toán streaming (ví dụ CKMS), lưu trực tiếp giá trị quantile đã tính sẵn cộng với `_sum`/`_count`.

**So sánh và lý do chọn Histogram trong đa số trường hợp**:

| | Histogram | Summary |
|---|---|---|
| Nơi tính quantile | Server-side (PromQL) | Client-side |
| **Aggregate qua nhiều instance** | Được — `sum()` các bucket từ nhiều instance rồi mới tính `histogram_quantile` | **Không được** — quantile đã tính sẵn không thể cộng gộp toán học đúng (trung bình của các p99 không phải là p99 tổng) |
| Độ chính xác | Approximation, phụ thuộc bucket boundary đã chọn trước | Chính xác hơn tại thời điểm ghi (nhưng chỉ cho 1 instance) |
| Chi phí client | Thấp (chỉ tăng counter bucket) | Cao hơn (tính streaming quantile tốn CPU) |
| Cấu hình trước | Cần định nghĩa bucket boundary hợp lý trước | Cần định nghĩa quantile objective trước (0.5, 0.9, 0.99) |

**Đây chính là lý do quan trọng nhất khiến Histogram được khuyến nghị**: trong hệ thống có N pod/instance chạy song song (rất phổ biến với Kubernetes), câu hỏi thường gặp là "p99 latency của **toàn bộ service**" (không phải riêng 1 pod). Với Summary, không thể tính đúng vì các quantile đã tính sẵn riêng lẻ ở mỗi pod **không thể cộng gộp**. Với Histogram, `sum(rate(bucket[5m])) by (le)` gộp đúng dữ liệu thô từ nhiều pod trước khi tính quantile:
```promql
histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))
```

**Pitfall khi dùng Histogram**: chọn bucket boundary sai (ví dụ toàn bộ traffic rơi vào bucket `le="1.0"` trong khi cần phân biệt 50ms vs 200ms) sẽ khiến `histogram_quantile` cho kết quả không chính xác — cần chọn bucket dựa trên phân bố latency thực tế của hệ thống (thường bắt đầu từ giá trị nhỏ như 5ms, tăng dần theo cấp số nhân).

## Detailed Answer (EN)
Prometheus has 4 basic metric types:

| Type | Description | Example |
|---|---|---|
| **Counter** | Only increases (or resets to 0 on restart) | `http_requests_total` |
| **Gauge** | Can go up or down freely | `memory_usage_bytes`, `queue_length` |
| **Histogram** | Counts observations falling into predefined threshold "buckets" | `http_request_duration_seconds` |
| **Summary** | Pre-computes quantiles client-side, plus count/sum | `http_request_duration_seconds` (summary variant) |

**How a Histogram works**: each observation is bucketed against predefined thresholds (`le` = less than or equal), and Prometheus stores a cumulative counter per bucket:
```
http_request_duration_seconds_bucket{le="0.1"} 8000
http_request_duration_seconds_bucket{le="0.5"} 9500
http_request_duration_seconds_bucket{le="1.0"} 9900
http_request_duration_seconds_bucket{le="+Inf"} 10000
http_request_duration_seconds_sum 1234.5
http_request_duration_seconds_count 10000
```
Percentiles are computed **server-side** with `histogram_quantile()`, using linear interpolation between buckets — this is an **approximation**, with accuracy depending on the number and placement of chosen buckets.

**How a Summary works**: quantiles are computed **client-side** at observation time using a streaming algorithm (e.g. CKMS), storing the pre-computed quantile values directly alongside `_sum`/`_count`.

**Comparison and why Histogram is recommended in most cases**:

| | Histogram | Summary |
|---|---|---|
| Where quantiles are computed | Server-side (PromQL) | Client-side |
| **Aggregating across instances** | Possible — `sum()` the buckets from multiple instances, then apply `histogram_quantile` | **Not possible** — pre-computed quantiles cannot be mathematically combined (the average of several p99s is not the overall p99) |
| Accuracy | Approximate, depends on chosen bucket boundaries | More accurate at capture time (but only for that one instance) |
| Client cost | Low (just increments bucket counters) | Higher (streaming quantile computation costs CPU) |
| Requires pre-configuration | Sensible bucket boundaries must be chosen upfront | Quantile objectives must be chosen upfront (0.5, 0.9, 0.99) |

**This is the key reason Histogram is recommended**: in a system with N pods/instances running in parallel (very common in Kubernetes), the usual question is "what's the p99 latency of the **whole service**" (not one pod). With Summary, this can't be computed correctly because per-pod pre-computed quantiles **cannot be aggregated**. With Histogram, `sum(rate(bucket[5m])) by (le)` correctly merges raw data from multiple pods before computing the quantile:
```promql
histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))
```

**Histogram pitfall**: choosing bad bucket boundaries (e.g. all traffic falling into the `le="1.0"` bucket when you need to distinguish 50ms from 200ms) makes `histogram_quantile` inaccurate — choose buckets based on the system's actual latency distribution (typically starting small, e.g. 5ms, and scaling up exponentially).
