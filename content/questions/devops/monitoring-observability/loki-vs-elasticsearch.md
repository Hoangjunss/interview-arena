---
id: loki-vs-elasticsearch
position: devops
technology: monitoring-observability
level: mid
tags: [loki, elasticsearch, logging, cost-optimization]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh Grafana Loki với Elasticsearch (ELK) cho log aggregation. Khi nào nên chọn Loki thay vì ELK?

## Question (EN)
Compare Grafana Loki with Elasticsearch (ELK) for log aggregation. When should you choose Loki over ELK?

## Đáp án chi tiết (VI)
Khác biệt cốt lõi nằm ở **cách index dữ liệu**, dẫn tới chi phí vận hành và mô hình query rất khác nhau.

| | Elasticsearch (ELK) | Loki |
|---|---|---|
| Cách index | Full-text index **toàn bộ nội dung log** (Lucene inverted index) | Chỉ index **labels/metadata** (giống Prometheus labels), nội dung log nén và lưu riêng, không index |
| Chi phí lưu trữ | Cao (index tốn nhiều dung lượng, thường gấp 1.5-3x dữ liệu gốc) | Thấp hơn nhiều (chỉ index label, log content chỉ nén, không index) |
| Ngôn ngữ query | Query DSL / Lucene query, tìm kiếm full-text mạnh | LogQL (cú pháp giống PromQL), filter theo label trước rồi mới grep nội dung |
| Tốc độ query | Nhanh cho full-text search bất kỳ | Nhanh nếu filter theo label tốt, chậm hơn nếu phải scan nội dung không có label |
| Hệ sinh thái | Kibana, mature, nhiều tính năng | Tích hợp liền mạch với Grafana, dùng chung label với Prometheus |
| Vận hành | Phức tạp hơn (JVM tuning, shard management) | Đơn giản hơn, thiết kế theo kiến trúc giống Prometheus (dễ scale ngang) |

**Ý tưởng thiết kế của Loki** ("giống Prometheus nhưng cho logs"): thay vì index toàn bộ nội dung, Loki chỉ index một tập nhỏ label (ví dụ `app`, `namespace`, `pod`), sau đó dùng label để tìm đúng "stream" log cần thiết, rồi mới grep tuần tự nội dung trong stream đó — giảm chi phí index cực lớn, đổi lại full-text search trên toàn bộ log (không qua label) sẽ chậm hơn ELK.

**Ví dụ LogQL**:
```logql
{namespace="payment", app="checkout-service"} |= "connection timeout" | json | duration > 5s
```
Filter theo label trước (`namespace`, `app` — rẻ), rồi mới lọc nội dung (`|= "connection timeout"` — grep tuần tự trong stream đã lọc).

**Khi nào chọn Loki**:
- Đã dùng Grafana + Prometheus cho metrics, muốn thống nhất 1 hệ sinh thái (cùng label, cùng UI) — Loki tích hợp "liền mạch" hơn.
- Chi phí lưu trữ log là mối quan tâm lớn (log volume cao, budget hạn chế) — Loki rẻ hơn đáng kể.
- Pattern truy vấn chủ yếu là "filter theo service/namespace/pod rồi mới xem log", không cần full-text search phức tạp trên toàn bộ dữ liệu.

**Khi nào chọn ELK**:
- Cần full-text search mạnh, phức tạp (fuzzy search, aggregation phức tạp trên nội dung log, không chỉ theo label).
- Đã có hạ tầng/kinh nghiệm vận hành Elasticsearch sẵn, hoặc cần các tính năng nâng cao (machine learning anomaly detection của Elastic, security analytics...).
- Compliance/audit yêu cầu khả năng search full-text chi tiết trên toàn bộ log lịch sử.

**Pitfall khi chọn Loki**: nếu team thiết kế label không tốt (gắn quá nhiều label động như `request_id`, `user_id` làm label thay vì chỉ để trong nội dung log), Loki sẽ gặp vấn đề tương tự "cardinality explosion" như Prometheus — mỗi tổ hợp label tạo ra 1 stream riêng, quá nhiều stream nhỏ làm giảm hiệu năng và tăng chi phí ngược lại với mục đích ban đầu.

## Detailed Answer (EN)
The core difference lies in **how data is indexed**, which drives very different operating costs and query models.

| | Elasticsearch (ELK) | Loki |
|---|---|---|
| Indexing approach | Full-text index of the **entire log content** (Lucene inverted index) | Indexes only **labels/metadata** (like Prometheus labels); log content is compressed and stored separately, not indexed |
| Storage cost | High (index overhead often 1.5-3x the raw data) | Much lower (only labels are indexed; log content is just compressed) |
| Query language | Query DSL / Lucene query, powerful full-text search | LogQL (PromQL-like syntax), filter by label first, then grep content |
| Query speed | Fast for arbitrary full-text search | Fast if filtering by label well; slower when scanning unlabeled content |
| Ecosystem | Kibana, mature, feature-rich | Integrates seamlessly with Grafana, shares labels with Prometheus |
| Operations | More complex (JVM tuning, shard management) | Simpler, designed like Prometheus's architecture (easy horizontal scaling) |

**Loki's design philosophy** ("like Prometheus but for logs"): instead of indexing all content, Loki only indexes a small set of labels (e.g. `app`, `namespace`, `pod`), uses those labels to find the right log "stream", and then does a sequential grep over that stream's content — massively reducing index cost, at the cost of slower full-text search across unlabeled content compared to ELK.

**LogQL example**:
```logql
{namespace="payment", app="checkout-service"} |= "connection timeout" | json | duration > 5s
```
Filter by labels first (`namespace`, `app` — cheap), then filter content (`|= "connection timeout"` — sequential grep within the filtered stream).

**When to choose Loki**:
- Already using Grafana + Prometheus for metrics and want one unified ecosystem (shared labels, same UI) — Loki integrates more seamlessly.
- Log storage cost is a major concern (high log volume, limited budget) — Loki is significantly cheaper.
- Query pattern is mostly "filter by service/namespace/pod, then read logs", without needing complex full-text search across all content.

**When to choose ELK**:
- Need powerful, complex full-text search (fuzzy search, complex aggregations over log content, not just labels).
- Already have Elasticsearch infrastructure/expertise, or need advanced features (Elastic's ML anomaly detection, security analytics, etc.).
- Compliance/audit requirements demand detailed full-text search over all historical logs.

**Loki pitfall**: if a team designs labels poorly (attaching high-cardinality dynamic values like `request_id` or `user_id` as labels instead of leaving them in the log content), Loki suffers the same "cardinality explosion" problem as Prometheus — each label combination creates its own stream, and too many small streams degrade performance and increase cost, defeating the original purpose.
