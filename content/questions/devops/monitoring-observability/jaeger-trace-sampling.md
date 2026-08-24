---
id: jaeger-trace-sampling
position: devops
technology: monitoring-observability
level: senior
tags: [tracing, jaeger, opentelemetry, scaling]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ở hệ thống có hàng chục nghìn request/giây, bạn thiết kế chiến lược sampling cho distributed tracing như thế nào? So sánh head-based và tail-based sampling.

## Question (EN)
For a system handling tens of thousands of requests per second, how would you design a sampling strategy for distributed tracing? Compare head-based and tail-based sampling.

## Đáp án chi tiết (VI)
Ở traffic lớn, trace 100% request là bất khả thi (chi phí storage, network overhead, và backend tracing như Jaeger/Tempo không chịu nổi tải). Cần chọn chiến lược sampling phù hợp.

**Head-based sampling** (quyết định ngay tại điểm bắt đầu trace, thường ở service đầu tiên nhận request):
- Ví dụ: sample 5% request ngẫu nhiên, quyết định này được gắn vào trace context và propagate xuống toàn bộ downstream service (mọi span trong trace đó đều được giữ hoặc bỏ theo cùng 1 quyết định).
- **Ưu điểm**: đơn giản, chi phí thấp (không cần buffer toàn bộ trace trước khi quyết định), dễ implement trong SDK (`ParentBased(TraceIdRatioBased(0.05))` trong OTel).
- **Nhược điểm**: quyết định "mù" — không biết trước trace này có lỗi hay chậm hay không. Nếu chỉ sample 5% ngẫu nhiên, một lỗi hiếm gặp (xảy ra ở 0.1% request) có thể **hoàn toàn không được trace**, mất khả năng debug đúng lúc cần nhất.

**Tail-based sampling** (quyết định **sau khi** toàn bộ trace đã hoàn thành, dựa trên đặc điểm của nó):
- Toàn bộ span của 1 trace được buffer tạm ở Collector cho tới khi trace kết thúc, sau đó áp rule: giữ lại nếu trace có lỗi, latency vượt ngưỡng (ví dụ p99), hoặc thuộc các endpoint quan trọng — bỏ phần lớn trace "bình thường".
- **Ưu điểm**: giữ lại đúng các trace có giá trị debug cao nhất (100% lỗi, 100% trace chậm) trong khi vẫn giảm volume tổng thể đáng kể.
- **Nhược điểm**: phức tạp hơn nhiều để vận hành — cần Collector có khả năng buffer + đợi toàn bộ trace hoàn thành (khó trong hệ thống có span đến muộn/mất mát), tốn memory hơn head-based, và cần điều phối giữa nhiều Collector instance nếu span của cùng 1 trace đến các instance khác nhau (thường giải quyết bằng cách route theo `trace_id` — consistent hashing).

**Bảng so sánh**:

| | Head-based | Tail-based |
|---|---|---|
| Thời điểm quyết định | Đầu trace | Cuối trace |
| Chi phí vận hành | Thấp | Cao (cần buffer, routing theo trace_id) |
| Bắt được lỗi hiếm | Không đảm bảo | Có, vì luôn giữ trace lỗi |
| Độ phức tạp implement | Đơn giản (OTel SDK có sẵn) | Cần Collector chuyên dụng (OTel Collector với tail_sampling processor) |

**Thiết kế thực tế cho hệ thống lớn** (kết hợp cả hai):
1. Head-based sampling ở mức thấp (ví dụ 100% cho request có lỗi ngay từ client như status 4xx/5xx đã biết trước, hoặc theo `traceparent` flag) để giảm tải đưa data lên Collector.
2. Dùng **OTel Collector với `tail_sampling` processor**, cấu hình policy:
```yaml
processors:
  tail_sampling:
    policies:
      - name: errors-policy
        type: status_code
        status_code: {status_codes: [ERROR]}
      - name: slow-traces-policy
        type: latency
        latency: {threshold_ms: 1000}
      - name: probabilistic-policy
        type: probabilistic
        probabilistic: {sampling_percentage: 5}
```
→ Giữ 100% trace lỗi, 100% trace latency > 1s, và 5% ngẫu nhiên phần còn lại để có baseline so sánh.

**Trade-off cần lưu ý khi thiết kế**: tail-based sampling yêu cầu tất cả span của cùng 1 trace phải đến cùng 1 Collector instance để có thể ra quyết định đúng — trong kiến trúc nhiều Collector, cần load balancer route theo `trace_id` (consistent hashing), nếu không quyết định sampling sẽ sai (một phần trace bị giữ, phần khác bị bỏ).

## Detailed Answer (EN)
At high traffic, tracing 100% of requests is infeasible (storage cost, network overhead, and tracing backends like Jaeger/Tempo can't handle the load). A sampling strategy is required.

**Head-based sampling** (decided at the very start of a trace, usually by the first service receiving the request):
- Example: randomly sample 5% of requests; this decision is embedded in the trace context and propagated to all downstream services (every span in that trace is kept or dropped consistently).
- **Pros**: simple, low cost (no need to buffer the whole trace before deciding), easy to implement in the SDK (`ParentBased(TraceIdRatioBased(0.05))` in OTel).
- **Cons**: a "blind" decision — you don't yet know if this trace will have an error or be slow. With only 5% random sampling, a rare error (occurring in 0.1% of requests) may **never get traced at all**, losing debuggability exactly when you need it most.

**Tail-based sampling** (decided **after** the entire trace completes, based on its characteristics):
- All spans of a trace are buffered temporarily at the Collector until the trace finishes, then a rule is applied: keep it if it has an error, exceeds a latency threshold (e.g. p99), or belongs to a critical endpoint — drop most "normal" traces.
- **Pros**: retains exactly the highest-value traces for debugging (100% of errors, 100% of slow traces) while still significantly reducing overall volume.
- **Cons**: much more complex to operate — requires a Collector capable of buffering and waiting for a trace to complete (hard when spans arrive late or get lost), uses more memory than head-based, and requires coordination across Collector instances if spans of the same trace land on different instances (usually solved by routing on `trace_id` via consistent hashing).

**Comparison table**:

| | Head-based | Tail-based |
|---|---|---|
| Decision point | Start of trace | End of trace |
| Operational cost | Low | High (needs buffering, trace_id-based routing) |
| Catches rare errors | Not guaranteed | Yes, always keeps error traces |
| Implementation complexity | Simple (built into OTel SDK) | Needs a dedicated Collector (OTel Collector with tail_sampling processor) |

**Practical design for a large system (combining both)**:
1. Light head-based sampling (e.g. 100% for requests already flagged as errors client-side like known 4xx/5xx, or based on a `traceparent` flag) to reduce load reaching the Collector.
2. Use an **OTel Collector with the `tail_sampling` processor**, configured with policies:
```yaml
processors:
  tail_sampling:
    policies:
      - name: errors-policy
        type: status_code
        status_code: {status_codes: [ERROR]}
      - name: slow-traces-policy
        type: latency
        latency: {threshold_ms: 1000}
      - name: probabilistic-policy
        type: probabilistic
        probabilistic: {sampling_percentage: 5}
```
→ Keep 100% of error traces, 100% of traces with latency > 1s, and a random 5% of the rest as a baseline for comparison.

**Key trade-off to keep in mind**: tail-based sampling requires that all spans of the same trace arrive at the same Collector instance to make a correct decision — in a multi-Collector architecture, you need a load balancer that routes by `trace_id` (consistent hashing); otherwise the sampling decision will be inconsistent (part of a trace kept, another part dropped).
