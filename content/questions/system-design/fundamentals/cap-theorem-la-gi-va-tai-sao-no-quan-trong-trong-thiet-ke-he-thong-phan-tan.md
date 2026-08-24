---
id: cap-theorem-la-gi-va-tai-sao-no-quan-trong-trong-thiet-ke-he-thong-phan-tan
position: system-design
technology: fundamentals
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CAP Theorem là gì và tại sao nó quan trọng trong thiết kế hệ thống phân tán?

## Question (EN)
What is the CAP Theorem and why does it matter in distributed system design?

## Đáp án chi tiết (VI)
CAP Theorem phát biểu rằng một hệ thống phân tán chỉ có thể đảm bảo đồng thời tối đa 2 trong 3 thuộc tính: Consistency (tính nhất quán – mọi node trả về dữ liệu mới nhất), Availability (tính sẵn sàng – mọi request đều nhận được response), và Partition Tolerance (chịu lỗi phân vùng – hệ thống tiếp tục hoạt động dù mạng bị chia cắt).\
\
Trong thực tế, Partition Tolerance luôn cần thiết vì lỗi mạng là không thể tránh khỏi, nên lựa chọn thực sự là giữa CP (chọn consistency, hi sinh availability) và AP (chọn availability, hi sinh consistency).\
\
**Ví dụ:** HBase, Zookeeper là CP; Cassandra, DynamoDB là AP; RDBMS truyền thống là CA (chỉ dùng trong môi trường không phân tán). Khi thiết kế, cần xác định nghiệp vụ ưu tiên gì: hệ thống ngân hàng cần CP, còn mạng xã hội có thể chấp nhận AP với eventual consistency.

## Detailed Answer (EN)
The CAP Theorem states that a distributed system can only guarantee at most two of three properties simultaneously: Consistency (every node returns the most recent data), Availability (every request receives a response), and Partition Tolerance (the system continues operating despite network partitions). In practice, Partition Tolerance is always required since network failures are unavoidable, so the real trade-off is between CP (prioritize consistency, sacrifice availability) and AP (prioritize availability, sacrifice consistency). Examples: HBase and Zookeeper are CP; Cassandra and DynamoDB are AP; traditional RDBMS is CA (only suitable in non-distributed environments). When designing, identify business priorities: banking systems need CP, while social networks can accept AP with eventual consistency.
