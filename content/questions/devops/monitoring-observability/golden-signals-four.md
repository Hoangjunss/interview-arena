---
id: golden-signals-four
position: devops
technology: monitoring-observability
level: junior
tags: [sre, fundamentals, metrics]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
"Four Golden Signals" của Google SRE là gì? Vì sao chỉ cần 4 chỉ số này là đủ để giám sát hầu hết mọi service?

## Question (EN)
What are Google SRE's "Four Golden Signals"? Why are these four metrics enough to monitor almost any service?

## Đáp án chi tiết (VI)
Bốn tín hiệu vàng được định nghĩa trong sách Google SRE, dùng làm bộ chỉ số tối thiểu cho bất kỳ service nào (đặc biệt là service dạng request/response):

| Tín hiệu | Ý nghĩa | Ví dụ metric |
|---|---|---|
| **Latency** | Thời gian xử lý request | `http_request_duration_seconds` (tách riêng latency của request thành công và lỗi) |
| **Traffic** | Lượng nhu cầu hệ thống đang chịu | `http_requests_total` (requests/giây), số kết nối đồng thời |
| **Errors** | Tỉ lệ request thất bại | `http_requests_total{status=~"5.."}` / tổng số request |
| **Saturation** | Hệ thống đang "đầy" tới đâu (tài nguyên còn lại) | CPU %, memory %, queue depth, connection pool usage |

**Vì sao đủ**: 4 tín hiệu này bao phủ hầu hết câu hỏi "hệ thống có đang khỏe không" mà không cần biết chi tiết nội bộ của service:
- Traffic + Errors + Latency mô tả **trải nghiệm người dùng** trực tiếp.
- Saturation là **chỉ báo sớm** — hệ thống thường chậm/lỗi *sau khi* saturation tăng cao, nên theo dõi saturation giúp cảnh báo trước khi khách hàng bị ảnh hưởng.

**Lưu ý khi áp dụng thực tế**:
- **Latency nên tách theo percentile** (p50, p95, p99), không dùng trung bình (average) vì trung bình che giấu outlier — 1% request chậm 5s có thể không ảnh hưởng average nhưng ảnh hưởng nghiêm trọng đến UX.
- Với batch/queue system (không phải request/response), 4 tín hiệu này biến thể thành "throughput, queue time, error rate, backlog size" — ý tưởng giữ nguyên nhưng cách đo khác.
- Đây là điểm khởi đầu tối thiểu, không phải toàn bộ observability — vẫn cần logs/traces để điều tra sâu khi 1 trong 4 tín hiệu báo bất thường.

**Ví dụ dashboard Grafana cho 1 service**: 4 panel tương ứng 4 signal, đặt trên cùng 1 dashboard, cùng time range, giúp on-call nhìn 1 lần là biết "chậm do traffic tăng đột biến hay do lỗi backend hay do server sắp hết CPU".

## Detailed Answer (EN)
The Four Golden Signals, defined in the Google SRE book, form the minimum metric set for almost any service (especially request/response-style services):

| Signal | Meaning | Example metric |
|---|---|---|
| **Latency** | Time to process a request | `http_request_duration_seconds` (separate latency for successful vs failed requests) |
| **Traffic** | Demand the system is handling | `http_requests_total` (requests/sec), concurrent connections |
| **Errors** | Rate of failed requests | `http_requests_total{status=~"5.."}` / total requests |
| **Saturation** | How "full" the system is (remaining headroom) | CPU %, memory %, queue depth, connection pool usage |

**Why these are enough**: these four signals cover most of "is the system healthy" without needing internal service knowledge:
- Traffic + Errors + Latency directly describe the **user experience**.
- Saturation is a **leading indicator** — systems usually get slow/error-prone *after* saturation rises, so watching it warns you before customers are impacted.

**Practical notes**:
- **Latency should be tracked by percentile** (p50, p95, p99), not average — averages hide outliers: 1% of requests taking 5s might not move the average but severely hurts UX.
- For batch/queue systems (not request/response), the four signals map to "throughput, queue time, error rate, backlog size" — same idea, different measurement.
- This is a minimum starting point, not the whole of observability — you still need logs/traces to dig deeper when one of the four signals goes abnormal.

**Example Grafana dashboard for one service**: four panels, one per signal, on the same dashboard and time range, so an on-call engineer can tell at a glance whether it's a traffic spike, a backend error, or the server about to run out of CPU.
