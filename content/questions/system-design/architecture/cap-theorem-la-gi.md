---
id: cap-theorem-la-gi
position: system-design
technology: architecture
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CAP theorem là gì?

## Question (EN)
What is the CAP theorem?

## Đáp án chi tiết (VI)
CAP theorem: một hệ dữ liệu phân tán chỉ đảm bảo **tối đa 2 trong 3** tính chất:\
\
- **Consistency**: mọi đọc thấy lần ghi mới nhất (hoặc báo lỗi) — mọi node cùng một dữ liệu.\
- **Availability**: mọi request tới node không lỗi đều nhận phản hồi (dù có thể không mới nhất).\
- **Partition tolerance**: hệ vẫn chạy dù mạng giữa các node bị mất/trễ gói.\
\
Khi **KHÔNG có partition**, hệ có thể vừa C vừa A. Nhưng **khi có partition**, phải chọn:\
- **CP**: ưu tiên nhất quán, chịu trả lỗi (vd MongoDB, etcd/ZooKeeper).\
- **AP**: ưu tiên sẵn sàng, chấp nhận dữ liệu tạm thời lệch (vd Cassandra, CouchDB).\
\
Vì partition là điều không tránh được trong hệ phân tán, thực chất là chọn **C hay A khi partition xảy ra**.

## Detailed Answer (EN)
The CAP theorem: a distributed data store can guarantee **at most 2 of 3** properties:\
\
- **Consistency**: every read sees the most recent write (or an error) — all nodes agree.\
- **Availability**: every request to a non-failing node gets a response (possibly not the latest).\
- **Partition tolerance**: the system keeps working despite dropped/delayed messages between nodes.\
\
With **no partition**, a system can be both C and A. But **during a partition**, you must choose:\
- **CP**: favor consistency, may return errors (e.g. MongoDB, etcd/ZooKeeper).\
- **AP**: favor availability, accept temporarily divergent data (e.g. Cassandra, CouchDB).\
\
Since partitions are unavoidable in distributed systems, it is really about choosing **C or A when a partition happens**.
