---
id: offset-management-trong-kafka-la-gi-phan-biet-auto-commit-va-manual-commit
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Offset management trong Kafka là gì? Phân biệt auto commit và manual commit?

## Question (EN)
What is offset management in Kafka? What is the difference between auto commit and manual commit?

## Đáp án chi tiết (VI)
Offset là số thứ tự của message trong một partition, bắt đầu từ 0. Kafka lưu offset của consumer vào một internal topic tên `__consumer_offsets`. Auto commit (`enable.auto.commit=true`) sẽ tự động commit offset theo chu kỳ `auto.commit.interval.ms` (mặc định 5000ms), nhưng có thể dẫn đến mất message nếu consumer crash SAU khi auto-commit nhưng TRƯỚC khi xử lý xong message đó, hoặc xử lý trùng nếu consumer crash sau khi xử lý nhưng trước khi auto commit. Manual commit (`commitSync()` hoặc `commitAsync()`) cho phép kiểm soát chính xác: chỉ commit sau khi xử lý thành công. `commitSync()` block cho đến khi commit thành công, `commitAsync()` không block nhưng cần callback để xử lý lỗi. Trong production, nên dùng manual commit kết hợp với idempotent processing để đảm bảo at-least-once hoặc exactly-once semantics.

## Detailed Answer (EN)
An offset is the sequential position of a message within a partition, starting at 0. Kafka stores consumer offsets in an internal topic called `__consumer_offsets`. Auto commit (`enable.auto.commit=true`) commits offsets periodically based on `auto.commit.interval.ms` (default 5000ms), but can cause message loss if the consumer crashes after committing but before finishing processing, or duplicate processing if it crashes after processing but before the auto commit fires. Manual commit (`commitSync()` or `commitAsync()`) gives precise control: only commit after successful processing. `commitSync()` blocks until the commit succeeds; `commitAsync()` is non-blocking but requires a callback for error handling. In production, use manual commit combined with idempotent processing to achieve at-least-once or exactly-once semantics.
