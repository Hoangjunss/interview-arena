---
id: cac-chien-luoc-partition-trong-kafka-khi-nao-dung-key-based-round-robin-hay-cust
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các chiến lược partition trong Kafka: khi nào dùng key-based, round-robin, hay custom partitioner?

## Question (EN)
Partitioning strategies in Kafka: when should you use key-based, round-robin, or a custom partitioner?

## Đáp án chi tiết (VI)
Round-robin (khi message key là null): phân phối đều message sang các partition, tối ưu throughput nhưng không đảm bảo ordering. Key-based partitioning (hash của key % numPartitions): đảm bảo tất cả message cùng key vào một partition — bắt buộc khi cần ordering (ví dụ: tất cả event của user_id=123 phải theo thứ tự). Vấn đề hotspot: nếu key phân phối không đều (ví dụ: một số user_id hoạt động cực kỳ nhiều), một số partition sẽ overloaded — giải pháp là thêm random suffix vào key hoặc dùng custom partitioner với logic phức tạp hơn. Custom partitioner cho phép route theo business logic (ví dụ: VIP customer vào partition riêng để ưu tiên xử lý). Khi tăng số partition của existing topic, message key cũ có thể bị route sang partition khác — cần planning kỹ trước khi deploy.

## Detailed Answer (EN)
Round-robin (when the message key is null): distributes messages evenly across partitions, maximizing throughput but without ordering guarantees. Key-based partitioning (hash of key % numPartitions): ensures all messages with the same key go to the same partition — required when ordering matters (e.g., all events for user_id=123 must be in sequence). Hotspot problem: if keys are skewed (some user IDs generate far more events), certain partitions become overloaded — the fix is to append a random suffix to the key or use a custom partitioner with more sophisticated logic. A custom partitioner enables business-logic routing (e.g., VIP customers go to a dedicated partition for priority processing). When increasing the partition count of an existing topic, existing key-to-partition mappings change — plan carefully before deploying.
