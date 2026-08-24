---
id: capacity-planning-metrics
position: devops
technology: monitoring-observability
level: senior
tags: [capacity-planning, scaling, metrics, architecture]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bạn dùng dữ liệu observability (metrics) như thế nào để làm capacity planning cho hệ thống — dự đoán khi nào cần scale trước khi sự cố xảy ra?

## Question (EN)
How do you use observability data (metrics) for capacity planning — forecasting when to scale before an incident happens?

## Đáp án chi tiết (VI)
Capacity planning dựa trên metrics là việc dùng dữ liệu lịch sử (usage, growth trend) để **dự đoán chủ động** thời điểm hệ thống chạm giới hạn tài nguyên, thay vì phản ứng bị động khi đã xảy ra sự cố saturation.

**Các nhóm metric cần theo dõi cho capacity planning**:

| Nhóm | Metric cụ thể | Câu hỏi trả lời |
|---|---|---|
| Compute | CPU/memory utilization theo thời gian, theo growth trend | Bao lâu nữa thì đạt ngưỡng cảnh báo (ví dụ 70%)? |
| Storage | Disk usage growth rate (GB/ngày) | Bao lâu nữa disk đầy nếu giữ tốc độ tăng hiện tại? |
| Database | Connection pool usage, query latency theo QPS tăng dần | QPS bao nhiêu thì DB bắt đầu bottleneck? |
| Network | Bandwidth, packet rate theo traffic | Có cần nâng cấp instance type / network tier? |
| Business | Traffic theo mùa vụ (Tết, sale event, Black Friday) | Peak traffic dự kiến gấp bao nhiêu lần bình thường? |

**Phương pháp dự đoán cơ bản (dùng PromQL `predict_linear`)**:
```promql
predict_linear(node_filesystem_avail_bytes{mountpoint="/data"}[7d], 86400 * 14)
```
Dự đoán giá trị disk trống sau 14 ngày dựa trên xu hướng tuyến tính của 7 ngày gần nhất — nếu kết quả âm, nghĩa là disk sẽ đầy trong vòng 14 ngày tới, cần lên kế hoạch mở rộng ngay.

**Quy trình capacity planning bài bản**:
1. **Baseline hiện tại**: xác định mức sử dụng tài nguyên trung bình + peak hiện tại cho từng thành phần.
2. **Growth rate**: tính tốc độ tăng trưởng (theo tuần/tháng) dựa trên dữ liệu lịch sử — traffic, data volume, số lượng user active.
3. **Load testing xác nhận giới hạn thực tế**: dùng công cụ (k6, Locust, Gatling) để tìm điểm gãy (breaking point) thực sự của hệ thống — ví dụ hệ thống bắt đầu tăng latency đột ngột ở 5000 RPS dù CPU chỉ 60% (bottleneck ở nơi khác, ví dụ connection pool hoặc lock contention).
4. **Kết hợp growth rate + breaking point** → tính được **thời điểm cần scale** (ví dụ: hiện tại 2000 RPS, tăng 10%/tháng, breaking point 5000 RPS → còn khoảng 9-10 tháng, cần bắt đầu chuẩn bị scale trước 2-3 tháng để có đủ thời gian mua hardware/tối ưu kiến trúc).
5. **Buffer cho sự kiện đột biến**: cộng thêm margin cho các sự kiện traffic tăng đột biến đã biết trước (sale event, campaign marketing) — thường dùng hệ số nhân dựa trên dữ liệu lịch sử của sự kiện tương tự năm trước.

**Ví dụ thực tế**: Team thương mại điện tử theo dõi metric `checkout_requests_per_second` qua nhiều tháng, thấy tăng trưởng đều 8%/tháng. Load test cho thấy hệ thống hiện tại chịu được tối đa 3x traffic hiện tại trước khi p99 latency vượt SLO. Với tốc độ tăng trưởng này, hệ thống sẽ chạm giới hạn sau ~14 tháng bình thường — nhưng team biết trước sự kiện sale 11/11 sẽ gây spike gấp 8x so với ngày thường (dựa trên dữ liệu năm ngoái), nên phải scale hạ tầng **trước** sự kiện đó dù còn xa mốc 14 tháng của tăng trưởng tự nhiên.

**Sai lầm thường gặp (senior cần biết để tránh)**:
- Chỉ nhìn **utilization trung bình** mà bỏ qua **peak** — hệ thống có thể trung bình 40% CPU nhưng peak giờ cao điểm đã 90%, capacity thực tế còn rất ít.
- Giả định **linear scaling** cho mọi thành phần — nhiều hệ thống có bottleneck phi tuyến tính (ví dụ lock contention trong database tăng vọt sau 1 ngưỡng connection nhất định, không tăng đều theo tải).
- Không tính tới **thời gian lead-time** thực tế để scale (mua hardware, review budget, thực hiện migration) — dự đoán đúng nhưng hành động quá trễ vẫn dẫn tới sự cố.
- Capacity planning chỉ dựa 1 chiều (compute) mà bỏ qua ràng buộc downstream (ví dụ scale app server dễ nhưng database là stateful, khó scale ngang nhanh như vậy) — cần xác định đâu là **thành phần giới hạn thực sự** (bottleneck) của toàn hệ thống, không phải thành phần dễ đo nhất.

## Detailed Answer (EN)
Metrics-driven capacity planning uses historical data (usage, growth trends) to **proactively predict** when a system will hit a resource limit, rather than reacting after a saturation incident has already occurred.

**Metric groups to track for capacity planning**:

| Group | Specific metric | Question answered |
|---|---|---|
| Compute | CPU/memory utilization over time, growth trend | How long until it hits a warning threshold (e.g. 70%)? |
| Storage | Disk usage growth rate (GB/day) | How long until disk fills up at the current growth rate? |
| Database | Connection pool usage, query latency vs increasing QPS | At what QPS does the DB start bottlenecking? |
| Network | Bandwidth, packet rate vs traffic | Do we need a bigger instance type / network tier? |
| Business | Seasonal traffic patterns (holidays, sale events, Black Friday) | How many times normal is expected peak traffic? |

**Basic forecasting method (using PromQL `predict_linear`)**:
```promql
predict_linear(node_filesystem_avail_bytes{mountpoint="/data"}[7d], 86400 * 14)
```
Predicts remaining free disk space 14 days from now, based on the linear trend of the past 7 days — a negative result means disk will fill up within the next 14 days, requiring immediate capacity planning.

**A rigorous capacity planning process**:
1. **Establish the current baseline**: identify average and peak resource usage for each component.
2. **Growth rate**: compute the growth rate (weekly/monthly) from historical data — traffic, data volume, active user count.
3. **Load testing to confirm real limits**: use tools (k6, Locust, Gatling) to find the system's actual breaking point — e.g. latency suddenly spikes at 5000 RPS even though CPU is only at 60% (the bottleneck lies elsewhere, e.g. connection pool or lock contention).
4. **Combine growth rate + breaking point** → determine **when scaling is needed** (e.g.: currently 2000 RPS, growing 10%/month, breaking point at 5000 RPS → roughly 9-10 months until the limit, so start preparing to scale 2-3 months earlier to allow time to procure hardware/optimize the architecture).
5. **Buffer for known spike events**: add margin for known traffic-spike events (sale events, marketing campaigns) — usually using a multiplier derived from the previous year's data for similar events.

**Concrete example**: an e-commerce team tracks `checkout_requests_per_second` over months and sees a steady 8%/month growth. Load testing shows the current system can handle up to 3x current traffic before p99 latency breaches the SLO. At this growth rate, the system would hit its limit in ~14 months under normal conditions — but the team knows in advance that the 11/11 sale event causes an 8x spike over a normal day (based on last year's data), so infrastructure must be scaled **before** that event, well ahead of the 14-month natural-growth timeline.

**Common mistakes (senior engineers should watch for)**:
- Only looking at **average utilization** while ignoring **peaks** — a system might average 40% CPU but hit 90% during peak hours, leaving very little real headroom.
- Assuming **linear scaling** for every component — many systems have nonlinear bottlenecks (e.g. database lock contention spikes sharply past a certain connection threshold, not scaling proportionally with load).
- Not accounting for the real **lead time** needed to scale (procuring hardware, budget review, running a migration) — an accurate forecast with too-late action still results in an incident.
- Capacity planning that only looks at one dimension (compute) while ignoring downstream constraints (e.g. scaling app servers is easy, but the database is stateful and can't scale horizontally as quickly) — identify the system's **actual bottleneck component**, not just the easiest one to measure.
