---
id: consumer-group-va-partition-assignment-cach-kafka-phan-phoi-partition-cho-consum
position: backend
technology: producers-\u0026-consumers
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Consumer group và partition assignment: cách Kafka phân phối partition cho consumers?

## Question (EN)
Consumer groups and partition assignment: how does Kafka distribute partitions to consumers?

## Đáp án chi tiết (VI)
Kafka Group Coordinator (broker) quản lý consumer group lifecycle và partition assignment. Khi consumer join group, Group Coordinator trigger rebalance và chọn một consumer làm Group Leader — Leader thực hiện partition assignment theo strategy đã cấu hình và gửi kết quả về Coordinator. **RangeAssignor** (default): assign partition liên tiếp theo topic — consumer 0 nhận partition 0,1; consumer 1 nhận 2,3. Nếu partition không chia đều, consumer đầu tiên nhận nhiều hơn (uneven distribution across topics). **RoundRobinAssignor**: phân phối đều hơn bằng cách xen kẽ — mỗi consumer nhận partition luân phiên. **StickyAssignor**: cố gắng minimize sự thay đổi so với assignment trước. **CooperativeStickyAssignor**: như Sticky nhưng dùng cooperative protocol (không stop-the-world) — khuyến nghị cho ứng dụng mới theo KIP-429. Thực tế: số consumer không nên vượt số partition — consumer thừa sẽ idle. Khi scale out, thêm partition TRƯỚC khi thêm consumer để tránh idle consumers.

## Detailed Answer (EN)
$7c
