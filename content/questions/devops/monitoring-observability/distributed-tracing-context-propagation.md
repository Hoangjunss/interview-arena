---
id: distributed-tracing-context-propagation
position: devops
technology: monitoring-observability
level: senior
tags: [tracing, opentelemetry, kafka, architecture]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trace context propagation gặp khó khăn gì khi hệ thống có message queue (Kafka), tác vụ bất đồng bộ (async job), hoặc fan-out sang nhiều consumer? Bạn sẽ thiết kế giải pháp thế nào?

## Question (EN)
What challenges arise in trace context propagation when a system involves message queues (Kafka), asynchronous jobs, or fan-out to multiple consumers? How would you design a solution?

## Đáp án chi tiết (VI)
Context propagation qua HTTP (header `traceparent`) hoạt động tốt cho giao tiếp đồng bộ request/response, nhưng gãy hoàn toàn khi hệ thống chuyển sang giao tiếp bất đồng bộ.

**Vấn đề cụ thể**:

**1. Message queue (Kafka/RabbitMQ)**: producer publish message rồi kết thúc span ngay, consumer xử lý message ở một thời điểm hoàn toàn khác (có thể sau vài giây tới vài giờ nếu queue bị backlog). Nếu không chủ động inject trace context vào message, consumer sẽ tạo ra 1 trace **hoàn toàn mới, không liên quan** — mất khả năng thấy end-to-end flow.

**2. Fan-out 1-nhiều**: producer publish 1 message, N consumer cùng xử lý song song (ví dụ event "order.created" được 5 service khác nhau subscribe). Đây không còn là quan hệ cha-con tuyến tính mà là **1 span cha có nhiều span con chạy độc lập, không đồng bộ thời gian** — mô hình trace tree vẫn support được nhưng cần thiết kế đúng loại **span link** thay vì chỉ parent-child.

**3. Async job/batch job chạy sau**: job scheduler trigger xử lý dữ liệu đã tích lũy từ nhiều request khác nhau (ví dụ 1 cron job tổng hợp 1000 order) — không có 1 "request gốc" rõ ràng để làm trace cha, cần chiến lược khác (mỗi item giữ trace_id riêng, hoặc dùng "span link" nối tới nhiều trace gốc).

**Giải pháp thiết kế**:

**Với Kafka**, chủ động inject/extract context vào message headers (OTel hỗ trợ sẵn instrumentation cho các Kafka client phổ biến):
```java
// Producer: inject context vào Kafka headers
Context context = Context.current();
TextMapSetter<Headers> setter = (headers, key, value) ->
    headers.add(key, value.getBytes(StandardCharsets.UTF_8));
propagator.inject(context, record.headers(), setter);
producer.send(record);

// Consumer: extract context từ headers, tạo span con liên kết đúng trace
TextMapGetter<Headers> getter = ...;
Context extractedContext = propagator.extract(Context.current(), record.headers(), getter);
try (Scope scope = extractedContext.makeCurrent()) {
    Span span = tracer.spanBuilder("process-order-created")
        .setParent(extractedContext)
        .startSpan();
    // xử lý message
    span.end();
}
```

**Với fan-out**, dùng **span links** (OTel hỗ trợ native) thay vì parent-child cứng nếu quan hệ không tuyến tính — 1 span có thể "link" tới nhiều trace khác mà không bắt buộc đồng bộ thời gian sống.

**Với batch job không có request gốc rõ ràng**: chấp nhận **mỗi item xử lý là 1 trace/span riêng**, dùng `span link` để trỏ ngược về trace gốc đã tạo ra item đó (nếu cần), thay vì cố nhồi tất cả vào 1 trace cha khổng lồ kéo dài hàng giờ (Jaeger/Tempo không thiết kế cho trace tồn tại quá lâu — mặc định thường timeout/purge sau vài phút không nhận thêm span).

**Pitfall thực tế đã gặp**: team dùng Kafka nhưng chỉ enable auto-instrumentation HTTP, không cấu hình Kafka instrumentation → mọi trace bị "cắt đứt" ở producer, khiến khi debug latency end-to-end (từ lúc user bấm nút tới lúc email confirmation được gửi qua async worker), team phải correlate log thủ công bằng `order_id`, mất hàng giờ thay vì vài phút nếu trace được nối liền mạch.

## Detailed Answer (EN)
Context propagation over HTTP (`traceparent` header) works well for synchronous request/response communication, but breaks down completely once a system moves to asynchronous communication.

**Specific problems**:

**1. Message queues (Kafka/RabbitMQ)**: the producer publishes a message and immediately ends its span; the consumer processes the message at a completely different time (seconds to hours later if the queue backs up). Without actively injecting trace context into the message, the consumer starts an **entirely new, unrelated trace** — losing end-to-end visibility.

**2. One-to-many fan-out**: a producer publishes one message, and N consumers process it independently in parallel (e.g. an "order.created" event subscribed to by 5 different services). This is no longer a linear parent-child relationship but **one parent span with multiple independent, time-unsynchronized child spans** — trace trees can support this, but you need the right primitive: **span links** rather than plain parent-child.

**3. Async/batch jobs running later**: a scheduled job triggers processing of data accumulated from many different requests (e.g. a cron job aggregating 1000 orders) — there's no single clear "originating request" to be the parent trace, requiring a different strategy (each item keeps its own trace_id, or a "span link" points back to multiple originating traces).

**Design solutions**:

**For Kafka**, actively inject/extract context into message headers (OTel ships instrumentation for common Kafka clients):
```java
// Producer: inject context into Kafka headers
Context context = Context.current();
TextMapSetter<Headers> setter = (headers, key, value) ->
    headers.add(key, value.getBytes(StandardCharsets.UTF_8));
propagator.inject(context, record.headers(), setter);
producer.send(record);

// Consumer: extract context from headers, create a correctly-linked child span
TextMapGetter<Headers> getter = ...;
Context extractedContext = propagator.extract(Context.current(), record.headers(), getter);
try (Scope scope = extractedContext.makeCurrent()) {
    Span span = tracer.spanBuilder("process-order-created")
        .setParent(extractedContext)
        .startSpan();
    // process message
    span.end();
}
```

**For fan-out**, use **span links** (natively supported by OTel) instead of rigid parent-child when the relationship isn't linear — a span can "link" to multiple other traces without needing overlapping lifetimes.

**For batch jobs with no clear originating request**: accept that **each processed item is its own trace/span**, using a `span link` to point back to the originating trace that created that item (if needed), rather than forcing everything into one giant parent trace spanning hours (Jaeger/Tempo aren't designed for traces that live that long — they typically time out/purge after a few minutes of no new spans).

**Real pitfall encountered**: a team used Kafka but only enabled HTTP auto-instrumentation, without configuring Kafka instrumentation → every trace got "cut off" at the producer, so when debugging end-to-end latency (from a user's click to the confirmation email sent by an async worker), the team had to manually correlate logs by `order_id`, taking hours instead of minutes if the trace had stayed connected.
