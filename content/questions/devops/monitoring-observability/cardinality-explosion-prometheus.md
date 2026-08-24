---
id: cardinality-explosion-prometheus
position: devops
technology: monitoring-observability
level: senior
tags: [prometheus, scaling, cardinality, incident]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cardinality explosion trong Prometheus là gì, vì sao nó nguy hiểm ở quy mô lớn, và bạn sẽ thiết kế/phát hiện/khắc phục vấn đề này như thế nào trong một hệ thống production đang gặp sự cố?

## Question (EN)
What is cardinality explosion in Prometheus, why is it dangerous at scale, and how would you design for, detect, and remediate this problem in a production system that's actively affected by it?

## Đáp án chi tiết (VI)
**Cardinality** của một metric = số lượng tổ hợp **giá trị label** khác nhau tạo ra time series riêng biệt. Ví dụ metric `http_requests_total{method, status, path}` với 5 method x 10 status x 200 path = 10,000 series. Thêm 1 label có giá trị **không giới hạn** (như `user_id` với hàng triệu user) sẽ khiến số series tăng theo cấp số nhân — đây là **cardinality explosion**.

**Vì sao nguy hiểm ở quy mô lớn**:
- Prometheus lưu **mỗi time series trong RAM** (in-memory index + head block trước khi ghi xuống đĩa) — mỗi series tốn khoảng vài KB overhead cố định bất kể có bao nhiêu data point. Hàng triệu series dư thừa có thể làm Prometheus **OOM** (out of memory) và crash.
- Query trên metric có cardinality cao trở nên cực chậm (phải scan quá nhiều series), làm cả dashboard lẫn alerting rule bị timeout.
- Chi phí lưu trữ (đặc biệt với remote_write tới hệ thống như Thanos/Cortex/Mimir tính phí theo số series active) tăng vọt không kiểm soát.
- Đây là loại sự cố **âm thầm tích lũy**: không gây crash ngay lập tức mà làm hệ thống chậm dần qua nhiều tuần/tháng cho tới khi đạt ngưỡng tới hạn rồi sụp đổ đột ngột — rất khó phát hiện sớm nếu không chủ động theo dõi.

**Nguồn gây cardinality explosion phổ biến**:
- Gắn `user_id`, `request_id`, `session_id`, `email` làm label.
- Gắn full URL path chưa normalize làm label (ví dụ `/order/12345` thay vì `/order/:id` — mỗi order ID tạo 1 series mới).
- Kubernetes: label tự động như `pod_name` (thay đổi mỗi lần pod restart/reschedule) tích lũy vô hạn theo thời gian nếu không có retention/cleanup phù hợp.

**Cách phát hiện (proactive)**:
```promql
# Top 10 metric có nhiều series nhất
topk(10, count by (__name__)({__name__=~".+"}))

# Tổng số series đang active
prometheus_tsdb_head_series
```
Nên có alert riêng: `prometheus_tsdb_head_series` tăng bất thường so với baseline, hoặc dùng `scrape_samples_scraped` per job để phát hiện job nào đột ngột "nổ" số lượng.

**Cách khắc phục khi đã xảy ra sự cố**:
1. **Xác định metric/label thủ phạm** bằng query top-k ở trên, hoặc dùng công cụ như `mimirtool analyze` / `promtool tsdb analyze` trên snapshot.
2. **Drop label ngay tại nguồn** (relabeling ở scrape config) nếu không sửa được code ngay:
```yaml
metric_relabel_configs:
  - source_labels: [user_id]
    regex: '.*'
    action: labeldrop
```
3. **Sửa code** để loại bỏ label cardinality cao khỏi metric — chuyển thông tin đó (nếu cần) sang logs/traces, nơi cardinality cao là chấp nhận được (log/trace không bị giới hạn bởi mô hình time-series như Prometheus).
4. **Đặt giới hạn cứng** (`sample_limit` trong scrape config) để một job lỗi không thể làm sập toàn bộ Prometheus instance khác đang share tài nguyên.

**Bài học kiến trúc quan trọng**: cardinality cao không phải lỗi "chỉ sửa 1 dòng code" — nó đòi hỏi **văn hóa review metric trước khi merge** (metric mới cần review label cardinality như review schema database), và công cụ giám sát chính "sức khỏe của hệ thống giám sát" (monitoring the monitoring system) để phát hiện sớm trước khi tới ngưỡng sụp đổ.

## Detailed Answer (EN)
**Cardinality** of a metric = the number of distinct **label value combinations**, each creating a separate time series. E.g. `http_requests_total{method, status, path}` with 5 methods x 10 statuses x 200 paths = 10,000 series. Adding one **unbounded** label (like `user_id` with millions of users) makes the series count explode exponentially — this is **cardinality explosion**.

**Why it's dangerous at scale**:
- Prometheus keeps **every time series in memory** (in-memory index + head block before it's flushed to disk) — each series costs a few KB of fixed overhead regardless of how much data it holds. Millions of excess series can cause Prometheus to **OOM** and crash.
- Queries against high-cardinality metrics become extremely slow (scanning too many series), causing both dashboards and alerting rules to time out.
- Storage cost (especially with remote_write to systems like Thanos/Cortex/Mimir that bill by active series) spikes out of control.
- This kind of incident **accumulates silently**: it doesn't crash the system immediately but slowly degrades it over weeks/months until it hits a critical threshold and collapses suddenly — hard to catch early without proactive monitoring.

**Common sources of cardinality explosion**:
- Attaching `user_id`, `request_id`, `session_id`, `email` as labels.
- Attaching an unnormalized full URL path as a label (e.g. `/order/12345` instead of `/order/:id` — every order ID creates a new series).
- Kubernetes: auto-generated labels like `pod_name` (changing on every pod restart/reschedule) accumulating indefinitely without proper retention/cleanup.

**Detection (proactive)**:
```promql
# Top 10 metrics with the most series
topk(10, count by (__name__)({__name__=~".+"}))

# Total active series
prometheus_tsdb_head_series
```
There should be a dedicated alert for `prometheus_tsdb_head_series` rising abnormally against a baseline, or `scrape_samples_scraped` per job to spot which job suddenly "exploded" its sample count.

**Remediation once it's already happening**:
1. **Identify the offending metric/label** with the top-k query above, or use a tool like `mimirtool analyze` / `promtool tsdb analyze` on a snapshot.
2. **Drop the label right at the source** (scrape config relabeling) if code can't be fixed immediately:
```yaml
metric_relabel_configs:
  - source_labels: [user_id]
    regex: '.*'
    action: labeldrop
```
3. **Fix the code** to remove the high-cardinality label from the metric entirely — move that information (if still needed) to logs/traces, where high cardinality is acceptable (logs/traces aren't bound by the time-series model that limits Prometheus).
4. **Set hard limits** (`sample_limit` in the scrape config) so one misbehaving job can't take down an entire shared Prometheus instance.

**The important architectural lesson**: high cardinality isn't a "fix one line of code" bug — it requires a **culture of reviewing metric label cardinality before merge** (a new metric needs review the way a database schema change does), and dedicated tooling to monitor "the health of the monitoring system itself" so problems are caught long before they hit the collapse threshold.
