---
id: quiz-kafka-chi-so-underreplicatedpartitions-lon-hon-0-nghia-la-gi
position: backend
technology: kafka
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chỉ số UnderReplicatedPartitions lớn hơn 0 nghĩa là gì?

## Đáp án trắc nghiệm
- [ ] Có partition chưa được consumer nào đăng ký đọc
- [x] Có partition thiếu bản sao trong ISR so với cấu hình
- [ ] Số bản sao cấu hình lớn hơn số broker trong cluster
- [ ] Có partition đang bị nén lại nên tạm thời chưa đủ bản sao

## Giải thích (VI)
Có partition mà số bản sao trong ISR ít hơn replication factor. Đây là chỉ số cảnh báo hàng đầu: giá trị lớn hơn 0 kéo dài nghĩa là cluster đang mất khả năng chịu lỗi.

### Giải thích các phương án:
- **Có partition chưa được consumer nào đăng ký đọc** (Sai): Việc có consumer hay không nằm ở chỉ số khác, không phải replication.
- **Có partition thiếu bản sao trong ISR so với cấu hình** (Đúng): Thường do một broker chết, mạng chậm, hoặc đĩa của broker đó quá tải.
- **Số bản sao cấu hình lớn hơn số broker trong cluster** (Sai): Trường hợp đó bị từ chối ngay khi tạo topic.
- **Có partition đang bị nén lại nên tạm thời chưa đủ bản sao** (Sai): Compaction không làm bản sao rơi khỏi ISR.
