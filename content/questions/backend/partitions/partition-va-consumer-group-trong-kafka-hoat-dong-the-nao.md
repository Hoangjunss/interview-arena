---
id: partition-va-consumer-group-trong-kafka-hoat-dong-the-nao
position: backend
technology: partitions
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Partition và consumer group trong Kafka hoạt động thế nào?

## Question (EN)
How do partitions and consumer groups work in Kafka?

## Đáp án chi tiết (VI)
Một **topic** Kafka được chia thành nhiều **partition** — mỗi partition là một log **append-only, có thứ tự**. Ghi/đọc song song trên nhiều partition là cách Kafka **scale throughput**.\
\
- **Thứ tự** chỉ đảm bảo **trong một partition**, không phải toàn topic. Message cùng **key** luôn vào cùng partition → giữ thứ tự theo key.\
- **Consumer group**: nhiều consumer chia nhau đọc; Kafka gán **mỗi partition cho tối đa một consumer** trong group → xử lý song song, không trùng. Do đó **số consumer hữu ích ≤ số partition** (consumer thừa sẽ idle, không được gán partition).\
- Mỗi group giữ **offset** riêng → nhiều group đọc độc lập cùng một topic (fan-out).\
\
Chọn số partition đủ lớn ngay từ đầu (khó giảm sau này), cân bằng giữa mức song song và chi phí quản lý.

## Detailed Answer (EN)
A Kafka **topic** is split into **partitions** — each partition is an **append-only, ordered** log. Reading/writing across partitions in parallel is how Kafka **scales throughput**.\
\
- **Ordering** is guaranteed **only within a partition**, not across the whole topic. Messages with the same **key** always land in the same partition → per-key ordering.\
- **Consumer group**: several consumers share the read load; Kafka assigns **each partition to at most one consumer** in the group → parallel, non-overlapping processing. So the **useful consumer count ≤ partition count** (extra consumers stay idle).\
- Each group keeps its own **offset** → multiple groups read the same topic independently (fan-out).\
\
Choose a large-enough partition count up front (hard to reduce later), balancing parallelism against management overhead.
