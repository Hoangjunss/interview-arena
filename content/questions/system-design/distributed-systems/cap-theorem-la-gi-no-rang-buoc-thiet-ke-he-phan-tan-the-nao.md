---
id: cap-theorem-la-gi-no-rang-buoc-thiet-ke-he-phan-tan-the-nao
position: system-design
technology: distributed-systems
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CAP theorem là gì? Nó ràng buộc thiết kế hệ phân tán thế nào?

## Question (EN)
What is the CAP theorem and how does it constrain distributed design?

## Đáp án chi tiết (VI)
Trong hệ phân tán, ba thuộc tính **Consistency** (mọi node đọc thấy dữ liệu mới nhất), **Availability** (mọi request đều có phản hồi), **Partition tolerance** (vẫn chạy khi mạng chia cắt) — **không thể đảm bảo cả ba cùng lúc**.\
\
Vì partition (mạng lỗi) là điều **bắt buộc phải chịu** trong thực tế, lựa chọn thật sự là **khi có partition thì ưu tiên C hay A**:\
- **CP**: từ chối/chờ để không trả dữ liệu cũ (ví dụ hệ ngân hàng, ZooKeeper).\
- **AP**: vẫn trả lời nhưng có thể là dữ liệu cũ, hội tụ sau (ví dụ Cassandra, DynamoDB).\
\
Mở rộng PACELC: cả khi **không** partition, vẫn phải chọn giữa **latency** và **consistency**.

## Detailed Answer (EN)
In a distributed system the three properties **Consistency** (every node reads the latest write), **Availability** (every request gets a response), and **Partition tolerance** (keeps working when the network splits) **cannot all be guaranteed at once**.\
\
Since partitions (network failures) are **unavoidable** in practice, the real choice is **during a partition, favour C or A**:\
- **CP**: reject/wait rather than return stale data (e.g. banking, ZooKeeper).\
- **AP**: keep answering but possibly with stale data, converging later (e.g. Cassandra, DynamoDB).\
\
PACELC extends it: even **without** a partition, you still trade **latency** against **consistency**.
