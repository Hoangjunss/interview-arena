---
id: log-aggregation-elk-stack
position: devops
technology: monitoring-observability
level: junior
tags: [elk, elasticsearch, logging]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ELK Stack là gì? Giải thích vai trò của từng thành phần (Elasticsearch, Logstash, Kibana) và luồng dữ liệu log đi qua hệ thống như thế nào.

## Question (EN)
What is the ELK Stack? Explain the role of each component (Elasticsearch, Logstash, Kibana) and how log data flows through the system.

## Đáp án chi tiết (VI)
**ELK Stack** là bộ công cụ phổ biến để thu thập, xử lý, lưu trữ và tìm kiếm log tập trung, gồm 3 thành phần chính (ngày nay thường thêm **Beats** hoặc **Fluentd** thành "Elastic Stack"):

| Thành phần | Vai trò |
|---|---|
| **Elasticsearch** | Database dạng search engine (dựa trên Lucene), lưu trữ log dưới dạng document JSON, index để tìm kiếm full-text cực nhanh |
| **Logstash** | Pipeline xử lý log: nhận (input) → parse/transform (filter) → gửi (output) tới Elasticsearch |
| **Kibana** | Giao diện web để tìm kiếm, trực quan hóa (dashboard), tạo alert trên dữ liệu trong Elasticsearch |
| **Beats** (bổ sung) | Agent nhẹ chạy trên từng server để thu thập log/metric và gửi tới Logstash hoặc thẳng Elasticsearch (ví dụ Filebeat cho log file) |

**Luồng dữ liệu điển hình**:
```
App server (ghi log ra file)
   → Filebeat (đọc file, gửi tới)
      → Logstash (parse log thành JSON có field, ví dụ tách timestamp, level, message)
         → Elasticsearch (lưu trữ, đánh index)
            → Kibana (query, dashboard, alert)
```

**Ví dụ cấu hình Logstash filter cơ bản** (parse log dạng text thành field có cấu trúc bằng Grok):
```
filter {
  grok {
    match => { "message" => "%{TIMESTAMP_ISO8601:timestamp} %{LOGLEVEL:level} %{GREEDYDATA:msg}" }
  }
  date {
    match => ["timestamp", "ISO8601"]
  }
}
```
Log dạng `2026-08-24T10:00:00Z ERROR Connection timeout` được parse thành field `timestamp`, `level=ERROR`, `msg=Connection timeout` — cho phép filter/aggregate theo `level` trong Kibana thay vì chỉ tìm chuỗi text thô.

**Ưu điểm của ELK**:
- Tìm kiếm full-text rất mạnh và nhanh (dựa trên inverted index của Lucene).
- Kibana có khả năng dashboard/visualization phong phú.
- Hệ sinh thái lớn, nhiều plugin, tài liệu phong phú.

**Nhược điểm cần biết**:
- **Tốn tài nguyên**: Elasticsearch cần RAM lớn (JVM heap), chi phí vận hành cluster cao khi log volume lớn.
- **Logstash tốn CPU** cho việc parse (grok filter đặc biệt tốn nếu regex phức tạp) — nhiều team thay Logstash bằng Fluentd/Fluent Bit (nhẹ hơn) hoặc Filebeat gửi thẳng tới Elasticsearch (bỏ qua bước transform phức tạp).
- **Cardinality/mapping explosion**: nếu log có field động (dynamic field) không kiểm soát, Elasticsearch tự tạo mapping mới cho từng field lạ, dễ dẫn tới "mapping explosion" làm cluster chậm dần theo thời gian.

## Detailed Answer (EN)
The **ELK Stack** is a popular toolset for centralized log collection, processing, storage, and search, made of 3 core components (today often extended with **Beats** or **Fluentd**, called the "Elastic Stack"):

| Component | Role |
|---|---|
| **Elasticsearch** | A search-engine-style database (built on Lucene), storing logs as JSON documents, indexed for extremely fast full-text search |
| **Logstash** | A log-processing pipeline: receive (input) → parse/transform (filter) → send (output) to Elasticsearch |
| **Kibana** | A web UI for searching, visualizing (dashboards), and alerting on data in Elasticsearch |
| **Beats** (add-on) | Lightweight agents running on each server to collect logs/metrics and forward them to Logstash or directly to Elasticsearch (e.g. Filebeat for log files) |

**Typical data flow**:
```
App server (writes logs to file)
   → Filebeat (reads the file, forwards it)
      → Logstash (parses raw logs into structured JSON — timestamp, level, message)
         → Elasticsearch (stores, indexes)
            → Kibana (query, dashboard, alert)
```

**Basic Logstash filter example** (parsing a text log line into structured fields with Grok):
```
filter {
  grok {
    match => { "message" => "%{TIMESTAMP_ISO8601:timestamp} %{LOGLEVEL:level} %{GREEDYDATA:msg}" }
  }
  date {
    match => ["timestamp", "ISO8601"]
  }
}
```
A log line like `2026-08-24T10:00:00Z ERROR Connection timeout` is parsed into fields `timestamp`, `level=ERROR`, `msg=Connection timeout` — letting you filter/aggregate by `level` in Kibana instead of just searching raw text.

**ELK's advantages**:
- Very powerful, fast full-text search (built on Lucene's inverted index).
- Kibana offers rich dashboarding/visualization.
- Large ecosystem, many plugins, extensive documentation.

**Drawbacks to know**:
- **Resource-heavy**: Elasticsearch needs a large amount of RAM (JVM heap); operating a cluster gets expensive at high log volume.
- **Logstash is CPU-heavy** for parsing (grok filters especially, with complex regexes) — many teams replace Logstash with Fluentd/Fluent Bit (lighter) or have Filebeat send directly to Elasticsearch, skipping heavy transforms.
- **Cardinality/mapping explosion**: if logs contain uncontrolled dynamic fields, Elasticsearch auto-creates a new mapping for each unfamiliar field, easily causing "mapping explosion" that slows the cluster down over time.
