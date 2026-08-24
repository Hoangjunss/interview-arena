---
id: synthetic-vs-real-user-monitoring
position: devops
technology: monitoring-observability
level: junior
tags: [synthetic-monitoring, rum, uptime]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Synthetic monitoring và Real User Monitoring (RUM) khác nhau như thế nào? Vì sao nên dùng cả hai thay vì chỉ chọn một?

## Question (EN)
How do synthetic monitoring and Real User Monitoring (RUM) differ? Why should you use both instead of picking just one?

## Đáp án chi tiết (VI)
Cả hai đều đo trải nghiệm người dùng cuối, nhưng theo cách hoàn toàn khác nhau:

| | Synthetic Monitoring | Real User Monitoring (RUM) |
|---|---|---|
| Cách hoạt động | Bot/script giả lập giả định chạy định kỳ (ví dụ mỗi 1 phút), gọi API hoặc load trang từ nhiều địa điểm | Thu thập dữ liệu thực tế từ **trình duyệt/app của người dùng thật** khi họ dùng sản phẩm |
| Traffic | Nhân tạo, có kiểm soát | Thực tế, không kiểm soát được |
| Phát hiện sự cố | Chủ động — phát hiện ngay cả khi **chưa có user nào** truy cập (tốt cho off-peak hours) | Bị động — chỉ biết khi user thực sự gặp vấn đề |
| Độ phủ | Giới hạn (chỉ test được kịch bản đã định nghĩa trước, từ vị trí đã chọn) | Toàn diện (phủ mọi thiết bị, network, vị trí địa lý thực tế của user) |
| Ví dụ công cụ | Pingdom, Datadog Synthetics, Blackbox Exporter, Grafana Synthetic Monitoring | Google Analytics RUM, Datadog RUM, New Relic Browser, web-vitals.js |

**Vì sao cần cả hai**:
- **Synthetic phát hiện sớm, kể cả khi không có traffic**: ví dụ deploy lúc 3h sáng làm hỏng API nhưng chưa có user nào gọi tới — chỉ synthetic monitoring (chạy định kỳ 24/7 bất kể traffic) mới phát hiện được trước khi user đầu tiên gặp lỗi.
- **RUM phản ánh trải nghiệm thực tế đa dạng**: synthetic chỉ test 1 kịch bản cố định từ 1 vài location, không thể mô phỏng hết được: user ở vùng mạng yếu, thiết bị cũ, trình duyệt lạ, hay tương tác phức tạp thực tế (không phải luồng "happy path" mà script giả định).
- **Bổ trợ khi debug**: nếu RUM báo "latency tăng cho user ở Việt Nam" nhưng synthetic (chạy từ Singapore) vẫn bình thường → có thể là vấn đề network/CDN theo khu vực, không phải lỗi backend — đây là insight mà chỉ có cả 2 loại dữ liệu mới nhận ra được.

**Ví dụ thực tế kết hợp**: E-commerce site dùng synthetic monitoring để check uptime API `/checkout` mỗi phút từ 5 khu vực (phát hiện downtime trong <1 phút, kể cả nửa đêm không có user), đồng thời dùng RUM để đo Core Web Vitals (LCP, FID, CLS) thực tế của khách hàng — từ đó biết được nhóm user dùng mobile 3G có LCP tệ hơn hẳn desktop, điều mà synthetic (chạy từ server có mạng ổn định) không bao giờ phát hiện ra.

**Pitfall**: chỉ dùng synthetic monitoring rồi tự tin "uptime 99.99%" trong khi thực tế user ở một số khu vực/thiết bị vẫn trải nghiệm tệ — synthetic không thay thế được RUM để đánh giá chất lượng trải nghiệm thực sự.

## Detailed Answer (EN)
Both measure end-user experience, but in completely different ways:

| | Synthetic Monitoring | Real User Monitoring (RUM) |
|---|---|---|
| How it works | A simulated bot/script runs on a schedule (e.g. every minute), calling APIs or loading pages from multiple locations | Collects actual data from **real users' browsers/apps** as they use the product |
| Traffic | Artificial, controlled | Real, uncontrolled |
| Incident detection | Proactive — detects issues even when **no real user** has visited yet (great for off-peak hours) | Reactive — only knows once a real user actually hits the problem |
| Coverage | Limited (only tests predefined scenarios, from chosen locations) | Comprehensive (covers every device, network, and real geographic location users actually have) |
| Example tools | Pingdom, Datadog Synthetics, Blackbox Exporter, Grafana Synthetic Monitoring | Google Analytics RUM, Datadog RUM, New Relic Browser, web-vitals.js |

**Why you need both**:
- **Synthetic detects issues early, even without traffic**: e.g. a 3am deploy breaks an API but no user has called it yet — only synthetic monitoring (running 24/7 regardless of real traffic) catches this before the first real user is affected.
- **RUM reflects the diverse reality of actual experience**: synthetic only tests one fixed scenario from a handful of locations, and can't simulate: users on weak networks, older devices, uncommon browsers, or the complex real interactions that go beyond the "happy path" a script assumes.
- **Complementary for debugging**: if RUM reports "latency increased for users in Vietnam" but synthetic (running from Singapore) still looks normal → this might be a regional network/CDN issue, not a backend bug — an insight only possible with both data sources together.

**Combined real-world example**: an e-commerce site uses synthetic monitoring to check the `/checkout` API's uptime every minute from 5 regions (catching downtime in under a minute, even at midnight with no users), while also using RUM to measure customers' real Core Web Vitals (LCP, FID, CLS) — revealing that mobile-3G users have significantly worse LCP than desktop, something synthetic checks (running from a server with a stable connection) would never surface.

**Pitfall**: relying only on synthetic monitoring and confidently claiming "99.99% uptime" while real users in some regions/devices actually have a poor experience — synthetic monitoring cannot substitute for RUM when it comes to assessing true experience quality.
