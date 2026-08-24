---
id: promql-basics
position: devops
technology: monitoring-observability
level: mid
tags: [prometheus, promql, metrics]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hãy viết một câu PromQL tính tỉ lệ lỗi HTTP 5xx trong 5 phút gần nhất và giải thích các hàm bạn dùng. `rate()` và `irate()` khác nhau thế nào? Vì sao không được dùng `rate()` trực tiếp trên gauge?

## Question (EN)
Write a PromQL query that computes the 5xx HTTP error rate over the last 5 minutes, and explain the functions you use. How do `rate()` and `irate()` differ? Why shouldn't `rate()` be applied directly to a gauge?

## Đáp án chi tiết (VI)
Giả sử có counter `http_requests_total{status="500"}` và `http_requests_total` (tổng), câu truy vấn tỉ lệ lỗi 5xx trong 5 phút:

```promql
sum(rate(http_requests_total{status=~"5.."}[5m]))
/
sum(rate(http_requests_total[5m]))
```

**Giải thích từng phần**:
- `http_requests_total{status=~"5.."}`: lọc theo label bằng regex, lấy các series có status bắt đầu bằng 5.
- `rate(...[5m])`: tính tốc độ tăng trung bình mỗi giây của counter trong cửa sổ 5 phút, tự động xử lý counter reset (khi service restart, counter về 0).
- `sum(...)`: gộp tất cả instance/pod lại thành 1 con số tổng, bỏ qua sự khác biệt giữa các label không cần thiết.
- Chia hai kết quả `sum(rate(...))` cho ra tỉ lệ lỗi (0.0 - 1.0), nhân 100 nếu muốn phần trăm.

**`rate()` vs `irate()`**:

| | `rate()` | `irate()` |
|---|---|---|
| Cách tính | Trung bình tốc độ tăng trên toàn bộ range | Chỉ dùng 2 điểm dữ liệu cuối cùng trong range |
| Phù hợp | Alerting, dashboard xu hướng dài hạn (mượt, ổn định) | Xem biến động tức thời (graph có độ phân giải cao) |
| Nhược điểm | Có độ trễ do làm mượt | Nhiễu, dễ nhảy đột ngột, không nên dùng để alert |

Quy tắc chung: **dùng `rate()` khi alert, dùng `irate()` chỉ khi vẽ graph cần độ nhạy cao**.

**Vì sao không dùng `rate()` trên gauge?**
`rate()` được thiết kế cho **counter** (chỉ tăng, có thể reset về 0). Nó giả định giá trị luôn tăng, nếu giá trị giảm giữa 2 điểm thì coi đó là "reset" và cộng dồn lại (extrapolation) — logic này sai hoàn toàn với **gauge** (giá trị có thể tăng/giảm tự nhiên, ví dụ `memory_usage_bytes`, `queue_length`). Áp `rate()` lên gauge cho ra con số vô nghĩa. Với gauge, dùng trực tiếp giá trị, hoặc `deriv()`/`delta()` nếu cần biết mức thay đổi.

**Lưu ý về window size**: window trong `rate()` nên lớn hơn tối thiểu 4 lần `scrape_interval` để có đủ điểm dữ liệu tính toán chính xác — nếu scrape 15s thì window 5m là an toàn, nhưng window 30s sẽ cho kết quả không ổn định.

**Edge case dễ bị hỏi thêm**: khi mẫu số `sum(rate(http_requests_total[5m]))` bằng 0 (không có request nào trong 5 phút), phép chia sẽ ra `NaN` chứ không phải lỗi — nếu dùng kết quả này trong rule alert mà không xử lý, alert có thể không bao giờ fire (Prometheus coi `NaN` là không thỏa điều kiện so sánh) dẫn đến "im lặng nguy hiểm" khi traffic về 0 do sự cố. Cách xử lý an toàn: bọc bằng `clamp_min` cho mẫu số hoặc dùng `... or vector(0)` để có giá trị mặc định.

## Detailed Answer (EN)
Given counters `http_requests_total{status="500"}` and the overall `http_requests_total`, the 5xx error-rate query over 5 minutes is:

```promql
sum(rate(http_requests_total{status=~"5.."}[5m]))
/
sum(rate(http_requests_total[5m]))
```

**Breaking it down**:
- `http_requests_total{status=~"5.."}`: filters by label using regex, matching series whose status starts with 5.
- `rate(...[5m])`: computes the average per-second increase of the counter over the 5-minute window, automatically handling counter resets (e.g. when the service restarts and the counter drops to 0).
- `sum(...)`: aggregates across all instances/pods into a single number, discarding label dimensions you don't need.
- Dividing the two `sum(rate(...))` results gives an error ratio (0.0–1.0); multiply by 100 for a percentage.

**`rate()` vs `irate()`**:

| | `rate()` | `irate()` |
|---|---|---|
| Calculation | Average increase across the whole range | Uses only the last 2 data points in the range |
| Best for | Alerting, long-term dashboard trends (smooth, stable) | Instantaneous fluctuation, high-resolution graphs |
| Drawback | Introduces smoothing latency | Noisy, can spike suddenly — should not be used for alerting |

Rule of thumb: **use `rate()` for alerts, use `irate()` only for graphs that need high sensitivity**.

**Why not use `rate()` on a gauge?**
`rate()` is designed for **counters** (monotonically increasing, may reset to 0). It assumes the value always increases; if it drops between two points, `rate()` treats it as a reset and extrapolates accordingly — this logic is completely wrong for a **gauge** (a value that naturally goes up and down, e.g. `memory_usage_bytes`, `queue_length`). Applying `rate()` to a gauge produces meaningless numbers. For gauges, use the raw value directly, or `deriv()`/`delta()` if you need the rate of change.

**Note on window size**: the `rate()` window should be at least 4x the `scrape_interval` to have enough data points for an accurate calculation — with a 15s scrape interval, a 5m window is safe, but a 30s window would give unstable results.

**Edge case worth mentioning**: when the denominator `sum(rate(http_requests_total[5m]))` is 0 (no requests in the last 5 minutes), the division produces `NaN`, not an error — if an alert rule uses this ratio unguarded, the alert may never fire (Prometheus treats `NaN` as failing any comparison), creating a dangerous silent gap exactly when traffic drops to zero due to an outage. Guard it with `clamp_min()` on the denominator or append `... or vector(0)` to supply a default value.
