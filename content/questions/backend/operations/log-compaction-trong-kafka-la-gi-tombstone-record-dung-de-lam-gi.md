---
id: log-compaction-trong-kafka-la-gi-tombstone-record-dung-de-lam-gi
position: backend
technology: operations
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Log compaction trong Kafka là gì? Tombstone record dùng để làm gì?

## Question (EN)
What is log compaction in Kafka? What are tombstone records used for?

## Đáp án chi tiết (VI)
Log compaction là cơ chế Kafka chỉ giữ lại message mới nhất cho mỗi message key, xóa các phiên bản cũ — thay vì xóa theo thời gian (`log.retention.hours`). Cấu hình: `cleanup.policy=compact`. Ứng dụng: KTable trong Kafka Streams (compacted topic lưu state mới nhất), changelog topic của Kafka Connect, event sourcing snapshot (chỉ cần state cuối). **Tombstone record**: message có key nhưng value=null — báo hiệu cho log compaction xóa tất cả message có key đó khỏi compacted log. Dùng để xóa data khỏi KTable hoặc downstream systems (GDPR right-to-erasure). Log compaction không chạy real-time: `log.cleaner.min.cleanable.ratio` và `log.cleaner.backoff.ms` control tần suất. Active segment (segment đang ghi) không bao giờ bị compact — chỉ inactive segments. Consumer đọc compacted topic có thể thấy cả message cũ và mới trong một scrub cycle.

## Detailed Answer (EN)
Log compaction is a Kafka mechanism that retains only the most recent message for each message key, discarding older versions — as opposed to time-based deletion (`log.retention.hours`). Configuration: `cleanup.policy=compact`. Use cases: KTables in Kafka Streams (a compacted topic stores the latest state), Kafka Connect changelog topics, and event-sourcing snapshots (only the final state is needed). **Tombstone record**: a message with a key but a null value — signals log compaction to delete all messages with that key from the compacted log. Used to delete data from a KTable or downstream systems (e.g., GDPR right-to-erasure). Log compaction does not run in real time: `log.cleaner.min.cleanable.ratio` and `log.cleaner.backoff.ms` control its frequency. The active segment (the one currently being written to) is never compacted — only inactive segments are processed. Consumers reading a compacted topic may see both old and new versions during a scrub cycle.
