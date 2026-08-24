---
id: structured-logging-best-practices
position: devops
technology: monitoring-observability
level: junior
tags: [logging, best-practices]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Structured logging là gì và khác gì với logging dạng text tự do? Vì sao nên dùng structured logging trong hệ thống production?

## Question (EN)
What is structured logging, and how does it differ from free-text logging? Why should production systems use structured logging?

## Đáp án chi tiết (VI)
**Logging dạng text tự do** ghi log như một câu văn bản, đọc dễ cho người nhưng khó cho máy xử lý:
```
2026-08-24 10:00:00 ERROR User 12345 failed to checkout order 987 - insufficient balance
```

**Structured logging** ghi log dưới dạng dữ liệu có cấu trúc (thường là JSON), mỗi thông tin là 1 field riêng biệt:
```json
{
  "timestamp": "2026-08-24T10:00:00Z",
  "level": "ERROR",
  "message": "checkout failed",
  "user_id": 12345,
  "order_id": 987,
  "reason": "insufficient_balance",
  "service": "checkout-service",
  "trace_id": "abc123"
}
```

**Vì sao nên dùng structured logging**:
- **Query/filter chính xác**: có thể query "tất cả lỗi `insufficient_balance` của `user_id=12345`" bằng field thay vì regex/grep text dễ sai (ví dụ text tự do có thể có nhiều định dạng khác nhau qua các version code khác nhau).
- **Aggregation dễ dàng**: đếm số lỗi theo `reason`, group theo `service`, mà không cần parse regex phức tạp (ELK Logstash grok filter, hay Loki `| json`).
- **Correlate với trace/metric**: field `trace_id` cho phép nối log với distributed trace tương ứng — đây là cầu nối quan trọng giữa 3 trụ cột observability.
- **Không phụ thuộc format thay đổi**: text tự do dễ bị thay đổi câu chữ giữa các lần code review/refactor, làm hỏng dashboard/alert đang parse theo regex cũ; JSON field ổn định hơn nhiều theo thời gian.

**Best practices khi implement**:
- Luôn có field chuẩn: `timestamp`, `level`, `service`, `trace_id` (nếu có tracing), `message`.
- Dùng logging library hỗ trợ structured logging sẵn (ví dụ `zap`/`zerolog` cho Go, `structlog` cho Python, `Serilog` cho .NET, `Logback` với `LogstashEncoder` cho Java) thay vì tự nối chuỗi.
- **Không log dữ liệu nhạy cảm** (password, token, thông tin thẻ tín dụng) vào bất kỳ field nào — dễ bị bỏ sót khi structured hóa vì tưởng "chỉ là 1 field, chắc an toàn".
- Đặt tên field **nhất quán toàn hệ thống** (ví dụ luôn `user_id` không phải lúc `userId` lúc `uid`) để query/dashboard dùng chung được across service.

**Ví dụ so sánh cụ thể**: khi cần tìm "tất cả request bị lỗi timeout khi gọi payment-service trong giờ cao điểm", với structured logging chỉ cần:
```logql
{service="checkout-service"} | json | downstream="payment-service" and error_type="timeout"
```
Với text tự do, phải viết regex phức tạp và dễ bỏ sót các case log có câu chữ hơi khác nhau.

## Detailed Answer (EN)
**Free-text logging** writes logs as prose, easy for humans to read but hard for machines to process:
```
2026-08-24 10:00:00 ERROR User 12345 failed to checkout order 987 - insufficient balance
```

**Structured logging** writes logs as structured data (usually JSON), with each piece of information as its own field:
```json
{
  "timestamp": "2026-08-24T10:00:00Z",
  "level": "ERROR",
  "message": "checkout failed",
  "user_id": 12345,
  "order_id": 987,
  "reason": "insufficient_balance",
  "service": "checkout-service",
  "trace_id": "abc123"
}
```

**Why use structured logging**:
- **Precise query/filter**: you can query "all `insufficient_balance` errors for `user_id=12345`" by field, instead of error-prone regex/grep on free text (which may vary in format across code versions).
- **Easy aggregation**: count errors by `reason`, group by `service`, without complex regex parsing (ELK Logstash grok filters, or Loki's `| json`).
- **Correlate with traces/metrics**: a `trace_id` field lets you join a log line to its corresponding distributed trace — a critical bridge across the three pillars of observability.
- **Not fragile to wording changes**: free text easily changes wording across code reviews/refactors, breaking dashboards/alerts parsing against an old regex; JSON fields stay far more stable over time.

**Best practices when implementing**:
- Always include standard fields: `timestamp`, `level`, `service`, `trace_id` (if tracing is set up), `message`.
- Use a logging library with built-in structured logging support (e.g. `zap`/`zerolog` for Go, `structlog` for Python, `Serilog` for .NET, `Logback` with `LogstashEncoder` for Java) instead of hand-building strings.
- **Never log sensitive data** (passwords, tokens, credit card info) in any field — this is easy to overlook once structured, because people assume "it's just a field, must be safe".
- Keep field naming **consistent across the whole system** (always `user_id`, never sometimes `userId` and sometimes `uid`) so queries/dashboards work uniformly across services.

**Concrete comparison**: to find "all requests that timed out calling payment-service during peak hours", structured logging just needs:
```logql
{service="checkout-service"} | json | downstream="payment-service" and error_type="timeout"
```
With free text, you'd need a complex regex that's easy to miss edge cases with slightly different wording.
