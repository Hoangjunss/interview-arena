---
id: thiet-ke-he-thong-dat-ve-chon-ghe-rap-phim-su-kien-xu-ly-concurrency-va-chong-ov
position: system-design
technology: interview-scenarios
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế hệ thống đặt vé / chọn ghế (rạp phim, sự kiện). Xử lý concurrency và chống oversell thế nào?

## Question (EN)
Design a ticket booking / seat selection system (cinema, events). How do you handle concurrency and prevent overselling?

## Đáp án chi tiết (VI)
**Yêu cầu**: hiển thị ghế trống gần realtime, cho giữ ghế trong lúc thanh toán, và hai người không đặt trùng một ghế.\
\
**Thành phần chính**:\
- **Seat map**: mỗi ghế có trạng thái `available / held / booked`.\
- **Seat locking (giữ ghế tạm)**: khi user chọn ghế → tạo *hold* có TTL (vd 5–10 phút) qua Redis `SET NX` (khóa phân tán) hoặc `SELECT ... FOR UPDATE`. Hết TTL tự nhả.\
- **Xác nhận**: thanh toán xong → chuyển `held → booked` trong một transaction; dùng optimistic locking (version) hoặc unique constraint `(event_id, seat_id)` để DB từ chối đặt trùng.\
- **Realtime**: WebSocket / SSE báo cho các client khác biết ghế vừa bị giữ.\
\
**Đánh đổi / bottleneck**: hàng nghìn người tranh vài ghế \\"đẹp\\" → *hot row*; TTL ngắn giảm ghế bị treo nhưng khó chịu cho user thanh toán chậm; tầng booking bắt buộc strong consistency (không eventual) nên giới hạn throughput → phải sharding theo event.

## Detailed Answer (EN)
**Requirements**: show available seats near real-time, hold a seat during payment, and never let two people book the same seat.\
\
**Core components**:\
- **Seat map**: each seat is `available / held / booked`.\
- **Seat locking (temporary hold)**: when a user picks a seat → create a *hold* with a TTL (e.g. 5–10 min) via Redis `SET NX` (distributed lock) or `SELECT ... FOR UPDATE`. It auto-releases on TTL expiry.\
- **Confirmation**: on successful payment → move `held → booked` inside one transaction; use optimistic locking (version) or a unique constraint `(event_id, seat_id)` so the DB rejects duplicate bookings.\
- **Real-time**: WebSocket / SSE notifies other clients when a seat gets held.\
\
**Trade-offs / bottlenecks**: thousands competing for a few \\"good\\" seats create a *hot row*; a short TTL frees stuck seats but frustrates slow payers; the booking tier must be strongly consistent (not eventual), which caps throughput → shard by event.
