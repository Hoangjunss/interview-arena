---
id: message-broker-khac-gi-so-voi-goi-api-truc-tiep-giua-cac-service
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Message broker khác gì so với gọi API trực tiếp giữa các service?

## Question (EN)
Explain the difference between a message broker and direct service-to-service communication.

## Đáp án chi tiết (VI)
Gọi API trực tiếp (REST, gRPC) yêu cầu cả hai service phải đang chạy đồng thời và biết nhau, tạo ra tight coupling — nếu service B chết thì service A cũng lỗi theo. Message broker đứng ở giữa: service A gửi message vào broker mà không cần biết ai sẽ nhận, broker giữ message và giao khi consumer sẵn sàng. Điều này tạo loose coupling, service hoạt động độc lập, và tự nhiên xử lý được lỗi. Đánh đổi là độ phức tạp tăng thêm và latency cao hơn một chút, nhưng đổi lại được độ tin cậy và linh hoạt hơn.

## Detailed Answer (EN)
Direct REST calls require both services running simultaneously and aware of each other — tight coupling causes cascading failures. A message broker decouples them: services publish without knowing who consumes, the broker delivers when consumers are ready. This enables services to operate independently, handle failures gracefully, and scale independently. The trade-off is added complexity and slight latency.
