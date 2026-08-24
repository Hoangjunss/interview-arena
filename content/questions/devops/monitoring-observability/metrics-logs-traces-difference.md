---
id: metrics-logs-traces-difference
position: devops
technology: monitoring-observability
level: junior
tags: [observability, fundamentals, metrics, logging]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Metrics, logs và traces (ba trụ cột của observability) khác nhau như thế nào? Khi nào bạn dùng loại nào?

## Question (EN)
What is the difference between metrics, logs, and traces (the three pillars of observability)? When would you use each one?

## Đáp án chi tiết (VI)
Ba trụ cột observability bổ trợ cho nhau, mỗi loại trả lời một câu hỏi khác nhau khi debug sự cố.

| Loại | Câu hỏi trả lời | Đặc điểm dữ liệu | Ví dụ công cụ |
|---|---|---|---|
| **Metrics** | "Hệ thống đang khỏe không? Xu hướng ra sao?" | Số liệu dạng time-series, đã tổng hợp (counter, gauge, histogram), rẻ để lưu trữ lâu dài | Prometheus, Datadog |
| **Logs** | "Chính xác chuyện gì đã xảy ra tại thời điểm đó?" | Sự kiện rời rạc, có timestamp, chi tiết nhất nhưng dung lượng lớn | ELK, Loki, CloudWatch Logs |
| **Traces** | "Request này đi qua những service nào, chậm ở đâu?" | Chuỗi span có quan hệ cha-con, xuyên suốt nhiều service | Jaeger, Zipkin, Tempo |

**Ví dụ thực tế**: API `/checkout` bị chậm.
- **Metric** `http_request_duration_seconds` (histogram theo route) cho biết p99 latency tăng từ 200ms lên 2s bắt đầu từ 14:05.
- **Trace** của một request cụ thể cho thấy 1.8s trong tổng 2s nằm ở span gọi `payment-service`.
- **Log** của `payment-service` tại đúng khung giờ đó cho thấy exception `connection pool exhausted` khi gọi database.

Kết hợp cả ba: metric phát hiện *có vấn đề*, trace chỉ ra *vấn đề nằm ở đâu*, log giải thích *tại sao*.

**Pitfall thường gặp**:
- Chỉ dùng logs để giám sát production sẽ tốn kém (index toàn bộ log) và khó nhìn xu hướng theo thời gian — nên dùng metrics cho dashboard/alerting, logs để điều tra sâu.
- Không có trace ID xuyên suốt (propagate qua header như `traceparent`) thì log ở service A và service B không liên kết được với nhau, mất khả năng debug distributed system.
- Cardinality cao trong metrics (ví dụ gắn `user_id` làm label) sẽ làm nổ số lượng series — đây là lỗi thiết kế phổ biến của junior.
- Traces cũng tốn kém nếu sample 100% ở hệ thống traffic cao; hầu hết hệ thống production chỉ sample một tỉ lệ nhỏ (ví dụ 1-10%) hoặc dùng tail-based sampling để giữ lại các trace có lỗi/latency cao mà vẫn giảm chi phí lưu trữ.

## Detailed Answer (EN)
The three pillars of observability complement each other — each answers a different question when debugging an incident.

| Type | Answers | Data characteristics | Example tools |
|---|---|---|---|
| **Metrics** | "Is the system healthy? What's the trend?" | Aggregated time-series numbers (counter, gauge, histogram), cheap to store long-term | Prometheus, Datadog |
| **Logs** | "What exactly happened at that moment?" | Discrete timestamped events, most detailed but high volume | ELK, Loki, CloudWatch Logs |
| **Traces** | "Which services did this request pass through, and where was it slow?" | Parent-child spans across multiple services | Jaeger, Zipkin, Tempo |

**Concrete example**: The `/checkout` API is slow.
- The **metric** `http_request_duration_seconds` (a histogram per route) shows p99 latency jumped from 200ms to 2s starting at 14:05.
- A **trace** of one specific request shows 1.8s of the total 2s is spent in the span calling `payment-service`.
- The **logs** from `payment-service` at that exact time window show a `connection pool exhausted` exception when calling the database.

Combining all three: metrics *detect* there is a problem, traces *locate* where it is, logs *explain* why.

**Common pitfalls**:
- Relying only on logs for production monitoring is expensive (indexing everything) and makes it hard to see trends — use metrics for dashboards/alerting and logs for deep investigation.
- Without a trace ID propagated across services (e.g. via the `traceparent` header), logs in service A and service B can't be correlated, killing your ability to debug distributed systems.
- High-cardinality metric labels (e.g. tagging a metric with `user_id`) explode the number of time series — a very common junior-engineer mistake that can take down a Prometheus instance.
- Traces are also expensive at 100% sampling under high traffic; most production systems sample a small fraction (e.g. 1-10%) or use tail-based sampling to keep error/high-latency traces while still controlling storage cost.
