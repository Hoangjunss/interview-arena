---
id: khi-nao-nen-dung-subscription-va-chi-phi-van-hanh-cua-no-la-gi
position: backend
technology: subscription
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên dùng subscription và chi phí vận hành của nó là gì?

## Question (EN)
When should subscriptions be used and what do they cost operationally?

## Đáp án chi tiết (VI)
Subscription hợp với **sự kiện không đoán trước và cần đẩy ngay**: tin nhắn mới, giá thay đổi, trạng thái đơn hàng. Với dữ liệu đổi đều đặn, hỏi lại theo lịch thường đơn giản và rẻ hơn nhiều.\
\
Chi phí vận hành hay bị đánh giá thấp: mỗi client giữ một kết nối lâu dài nên server chịu tải kết nối chứ không chỉ tải yêu cầu, và việc mở rộng theo chiều ngang cần một lớp phát tán sự kiện giữa các server.\
\
Các vấn đề phải xử lý ở client: kết nối rớt và nối lại; dữ liệu bỏ lỡ trong lúc mất kết nối; và trùng lặp khi vừa nhận sự kiện vừa tải lại. Mẫu thường dùng là nối lại rồi tải lại một lần để đồng bộ.\
\
Một lựa chọn nhẹ hơn: server đẩy một thông báo ngắn báo có dữ liệu mới, còn client tự gọi truy vấn để lấy — giữ được đường dẫn dữ liệu duy nhất.

## Detailed Answer (EN)
Subscriptions suit **unpredictable events needing immediate push**: new messages, price changes, order status. For data changing on a regular cadence, polling is usually simpler and much cheaper.\
\
The operational cost is commonly underestimated: each client holds a long-lived connection so the server carries connection load, and horizontal scaling needs an event distribution layer across instances.\
\
Client-side problems to handle: dropped connections and reconnection; data missed while disconnected; and duplicates when events and refetches overlap. The usual pattern is reconnect then refetch once to resynchronise.\
\
A lighter alternative: the server pushes a small signal that new data exists and the client fetches with a normal query — keeping a single data path.
