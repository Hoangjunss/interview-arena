---
id: partition-key-design-trong-kafka-cach-chon-key-de-tranh-hotspot-va-dam-bao-order
position: backend
technology: architecture-patterns
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Partition key design trong Kafka: cách chọn key để tránh hotspot và đảm bảo ordering?

## Question (EN)
Partition key design in Kafka: how do you choose keys to avoid hotspots and ensure ordering?

## Đáp án chi tiết (VI)
Partition key quyết định message vào partition nào (hash(key) % numPartitions). Chọn key sai dẫn đến: hotspot (một partition bị overload), hoặc mất ordering (message liên quan vào partition khác nhau). **Nguyên tắc chọn key:** chọn field có cardinality cao và phân phối đều — `user_id`, `order_id`, `device_id` tốt hơn `country_code` hay `status`. Key phải là field mà ordering quan trọng trong context của nó: tất cả event của cùng `order_id` phải theo thứ tự → dùng `order_id` làm key. **Tránh hotspot:** nếu key phân phối không đều (một số user_id hoạt động cực nhiều), thêm random suffix: `user_id + '-' + random(0, N)` — nhưng sẽ mất ordering global per user. Kỹ thuật khác: key salting `key + timestamp_bucket` — partition thay đổi theo thời gian. Tăng số partition cũng giúp giảm hotspot nhưng không giải quyết root cause nếu key quá skewed.

## Detailed Answer (EN)
The partition key determines which partition a message goes to (hash(key) % numPartitions). Choosing the wrong key leads to: hotspots (one partition gets overloaded), or ordering violations (related messages land in different partitions). **Key selection principles:** choose a field with high cardinality and even distribution — `user_id`, `order_id`, `device_id` are better choices than `country_code` or `status`. The key should be the field for which ordering matters within its context: all events for the same `order_id` must be in sequence → use `order_id` as the key. **Avoiding hotspots:** if key distribution is skewed (some user_ids are extremely active), append a random suffix: `user_id + '-' + random(0, N)` — but this sacrifices global per-user ordering. Another technique: key salting with `key + timestamp_bucket` — the partition changes over time. Increasing the partition count also helps reduce hotspots but does not fix the root cause if the key distribution is inherently skewed.
