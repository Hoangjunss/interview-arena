---
id: quiz-kafka-isr-in-sync-replicas-la-gi
position: backend
technology: kafka
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ISR (in-sync replicas) là gì?

## Đáp án trắc nghiệm
- [ ] Các bản sao nằm trên cùng rack với leader
- [x] Các bản sao đang theo kịp leader trong ngưỡng thời gian cho phép
- [ ] Toàn bộ bản sao của partition, kể cả bản đang tụt lại
- [ ] Các bản sao đã fsync dữ liệu xuống đĩa xong

## Giải thích (VI)
Tập bản sao đang theo kịp leader (không tụt quá replica.lag.time.max.ms). acks=all chờ đúng tập này, và khi cần chọn leader mới thì chỉ bản sao trong ISR được chọn nếu không muốn mất dữ liệu.

### Giải thích các phương án:
- **Các bản sao nằm trên cùng rack với leader** (Sai): Vị trí rack ảnh hưởng cách phân bổ bản sao, không định nghĩa ISR.
- **Các bản sao đang theo kịp leader trong ngưỡng thời gian cho phép** (Đúng): Chỉ bản sao trong ISR mới được chọn làm leader mới khi không cho phép mất dữ liệu.
- **Toàn bộ bản sao của partition, kể cả bản đang tụt lại** (Sai): Bản tụt quá replica.lag.time.max.ms bị loại khỏi ISR.
- **Các bản sao đã fsync dữ liệu xuống đĩa xong** (Sai): ISR tính theo việc theo kịp log của leader, không theo fsync.
