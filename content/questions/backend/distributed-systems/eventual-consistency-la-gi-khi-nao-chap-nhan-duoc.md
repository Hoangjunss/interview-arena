---
id: eventual-consistency-la-gi-khi-nao-chap-nhan-duoc
position: backend
technology: distributed-systems
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Eventual consistency là gì? Khi nào chấp nhận được?

## Question (EN)
What is eventual consistency and when is it acceptable?

## Đáp án chi tiết (VI)
Eventual consistency là mô hình nhất quán **yếu**: sau một thao tác ghi, các bản sao **không lập tức giống nhau**, nhưng nếu ngừng ghi thì **cuối cùng mọi bản sao sẽ hội tụ** về cùng giá trị. Trong khoảng đó, đọc từ node khác nhau có thể ra kết quả khác nhau (dữ liệu cũ).\
\
Trái ngược là **strong consistency**: mọi read luôn thấy write mới nhất, đổi lại độ trễ cao hơn / khả dụng thấp hơn lúc partition (theo CAP).\
\
**Khi nào chấp nhận được**:\
- Dữ liệu chịu được trễ vài trăm ms–vài giây: đếm like, số view, feed mạng xã hội, gợi ý.\
- Cần **khả dụng cao và scale ngang** hơn là chính xác tức thời.\
\
**Khi nào KHÔNG**:\
- Số dư tài khoản, tồn kho, đặt vé — cần strong consistency / giao dịch.\
\
Mô hình liên quan: **read-your-writes**, **monotonic reads** — các mức nhất quán trung gian giúp trải nghiệm hợp lý mà không cần strong consistency toàn cục.

## Detailed Answer (EN)
Eventual consistency is a **weak** consistency model: after a write, replicas are **not immediately identical**, but if writes stop, **all replicas eventually converge** to the same value. In the meantime, reads from different nodes may differ (stale data).\
\
The opposite is **strong consistency**: every read always sees the latest write, at the cost of higher latency / lower availability during a partition (per CAP).\
\
**When it's acceptable**:\
- Data tolerating a few hundred ms–seconds of lag: like counts, view counts, social feeds, recommendations.\
- You need **high availability and horizontal scale** more than instant accuracy.\
\
**When it's NOT**:\
- Account balances, inventory, ticket booking — need strong consistency / transactions.\
\
Related models: **read-your-writes**, **monotonic reads** — intermediate consistency levels that give a sensible experience without global strong consistency.
