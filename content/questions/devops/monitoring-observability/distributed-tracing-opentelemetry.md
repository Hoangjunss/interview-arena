---
id: distributed-tracing-opentelemetry
position: devops
technology: monitoring-observability
level: mid
tags: [tracing, opentelemetry, microservices]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Distributed tracing hoạt động như thế nào? Giải thích các khái niệm span, trace, context propagation và vai trò của OpenTelemetry.

## Question (EN)
How does distributed tracing work? Explain the concepts of span, trace, context propagation, and the role of OpenTelemetry.

## Đáp án chi tiết (VI)
**Distributed tracing** theo dõi hành trình của **một request duy nhất** khi nó đi qua nhiều service trong hệ thống phân tán, giúp trả lời "request này mất bao lâu ở mỗi bước, và chậm ở đâu".

**Các khái niệm cốt lõi**:
- **Trace**: đại diện cho toàn bộ hành trình của 1 request, có 1 `trace_id` duy nhất xuyên suốt mọi service.
- **Span**: 1 đơn vị công việc trong trace (ví dụ "gọi API payment-service", "query database"). Mỗi span có `span_id`, thời gian bắt đầu/kết thúc, và có thể có `parent_span_id` để tạo quan hệ cha-con.
- **Context propagation**: cơ chế truyền `trace_id` + `span_id` hiện tại từ service này sang service khác, thường qua HTTP header chuẩn `traceparent` (W3C Trace Context) hoặc header cũ hơn như `X-B3-TraceId` (Zipkin B3).

**Ví dụ cấu trúc trace cho request `/checkout`**:
```
Trace ID: abc123
└─ Span: api-gateway (50ms)
   └─ Span: checkout-service (45ms)
      ├─ Span: inventory-service (5ms)
      └─ Span: payment-service (38ms)
         └─ Span: postgres query (35ms)  ← nút thắt cổ chai
```
Nhìn vào cây span này, ta biết ngay 35ms/50ms tổng thời gian nằm ở query database trong payment-service.

**Vai trò của OpenTelemetry (OTel)**:
- OTel là **chuẩn vendor-neutral** (CNCF) cho việc instrument code để sinh ra metrics, logs, traces — thay thế các SDK riêng lẻ của từng vendor (Jaeger client, Zipkin client cũ).
- Gồm: **API** (interface để code gọi), **SDK** (implementation, xử lý sampling, batching), **Collector** (nhận data từ nhiều nguồn, xử lý/transform, rồi export tới backend như Jaeger, Tempo, Datadog).
- Lợi ích lớn nhất: **instrument 1 lần, đổi backend tùy ý** — không cần sửa code khi đổi từ Jaeger sang Tempo hay Datadog, chỉ cần đổi cấu hình exporter của Collector.

**Ví dụ instrument cơ bản (Node.js, auto-instrumentation)**:
```javascript
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({ url: 'http://otel-collector:4318/v1/traces' }),
  instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();
```
Auto-instrumentation tự động tạo span cho HTTP request, DB query, Redis call... mà không cần sửa business logic.

**Pitfall thường gặp**:
- Quên propagate context qua **message queue** (Kafka, RabbitMQ) — trace bị "đứt gãy" giữa producer và consumer nếu không inject/extract trace context vào message headers thủ công.
- Sampling 100% ở hệ thống traffic cao gây tốn kém storage và overhead — cần chiến lược sampling hợp lý (head-based hoặc tail-based).
- Chỉ instrument tầng HTTP mà bỏ qua tầng DB/cache khiến trace "thiếu" đúng nơi thường là bottleneck thực sự.

## Detailed Answer (EN)
**Distributed tracing** follows the journey of **a single request** as it crosses multiple services in a distributed system, answering "how long did this request take at each step, and where was it slow?"

**Core concepts**:
- **Trace**: represents the entire journey of one request, sharing a single `trace_id` across every service.
- **Span**: one unit of work within a trace (e.g. "call payment-service", "query database"). Each span has a `span_id`, start/end time, and optionally a `parent_span_id` forming a parent-child relationship.
- **Context propagation**: the mechanism that carries the current `trace_id` + `span_id` from one service to the next, typically via the standard HTTP header `traceparent` (W3C Trace Context) or older headers like `X-B3-TraceId` (Zipkin B3).

**Example trace structure for a `/checkout` request**:
```
Trace ID: abc123
└─ Span: api-gateway (50ms)
   └─ Span: checkout-service (45ms)
      ├─ Span: inventory-service (5ms)
      └─ Span: payment-service (38ms)
         └─ Span: postgres query (35ms)  ← bottleneck
```
Looking at this span tree, we immediately know 35ms of the 50ms total is spent in the database query inside payment-service.

**OpenTelemetry's (OTel) role**:
- OTel is a **vendor-neutral standard** (CNCF) for instrumenting code to emit metrics, logs, and traces — replacing per-vendor SDKs (old Jaeger client, Zipkin client).
- Consists of: an **API** (interface code calls), an **SDK** (implementation handling sampling, batching), and a **Collector** (ingests data from many sources, processes/transforms it, then exports to a backend like Jaeger, Tempo, or Datadog).
- Biggest benefit: **instrument once, swap backends freely** — no code changes needed to move from Jaeger to Tempo or Datadog; just reconfigure the Collector's exporter.

**Basic instrumentation example (Node.js, auto-instrumentation)**:
```javascript
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({ url: 'http://otel-collector:4318/v1/traces' }),
  instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();
```
Auto-instrumentation automatically creates spans for HTTP requests, DB queries, Redis calls, etc., without touching business logic.

**Common pitfalls**:
- Forgetting to propagate context across **message queues** (Kafka, RabbitMQ) — the trace "breaks" between producer and consumer unless you manually inject/extract trace context into message headers.
- 100% sampling under high traffic causes expensive storage and overhead — use a sensible sampling strategy (head-based or tail-based).
- Instrumenting only the HTTP layer while skipping DB/cache layers leaves the trace "missing" exactly where the real bottleneck usually lives.
