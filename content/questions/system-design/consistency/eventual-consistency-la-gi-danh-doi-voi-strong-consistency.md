---
id: eventual-consistency-la-gi-danh-doi-voi-strong-consistency
position: system-design
technology: consistency
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Eventual consistency là gì? Đánh đổi với strong consistency?

## Question (EN)
What is eventual consistency and how does it trade off against strong consistency?

## Đáp án chi tiết (VI)
**Eventual consistency**: trong hệ phân tán, sau một lần ghi các bản sao **không đồng bộ tức thì**; nhưng nếu ngừng ghi thì **sau một khoảng thời gian mọi bản sao sẽ hội tụ về cùng giá trị**. Đọc trong lúc đó có thể thấy dữ liệu cũ.\
\
Đối lại **strong consistency**: mọi đọc luôn thấy lần ghi mới nhất, nhưng phải phối hợp giữa các node → chậm hơn và giảm sẵn sàng khi có sự cố mạng (liên hệ CAP: chọn A thì nới C).\
\
**Đánh đổi**:\
- Eventual → độ trễ thấp, sẵn sàng cao, scale tốt; đổi lại dữ liệu tạm lệch. Hợp like/view count, feed, giỏ hàng, DNS.\
- Strong → đúng đắn tức thì; đổi lại chậm/kém sẵn sàng hơn. Bắt buộc cho số dư ngân hàng, tồn kho, đặt chỗ.\
\
Nhiều hệ chọn theo từng dữ liệu: nơi cần chính xác dùng strong, nơi chịu được trễ dùng eventual.

## Detailed Answer (EN)
**Eventual consistency**: in a distributed system, after a write the replicas are **not synchronized instantly**; but if writes stop, **after some time all replicas converge to the same value**. Reads in between may see stale data.\
\
Against **strong consistency**: every read always sees the latest write, but nodes must coordinate → slower and less available during network trouble (per CAP: choosing A relaxes C).\
\
**Trade-offs**:\
- Eventual → low latency, high availability, scales well; at the cost of temporarily divergent data. Fits like/view counts, feeds, carts, DNS.\
- Strong → immediate correctness; at the cost of being slower/less available. Required for bank balances, inventory, seat booking.\
\
Many systems choose per-datum: strong where correctness matters, eventual where latency tolerance is fine.
