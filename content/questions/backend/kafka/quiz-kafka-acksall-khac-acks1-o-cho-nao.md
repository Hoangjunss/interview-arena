---
id: quiz-kafka-acksall-khac-acks1-o-cho-nao
position: backend
technology: kafka
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
acks=all khác acks=1 ở chỗ nào?

## Đáp án trắc nghiệm
- [x] Chờ mọi bản sao trong ISR xác nhận, không chỉ leader
- [ ] Chờ tin nhắn được ghi xuống đĩa bằng fsync trước khi trả về
- [ ] Chờ mọi broker trong cluster nhận được bản sao
- [ ] Chờ mọi consumer xác nhận đã xử lý xong tin nhắn

## Giải thích (VI)
acks=1 chỉ chờ leader ghi xong; leader chết trước khi bản sao kịp lấy dữ liệu là mất tin nhắn. acks=all chờ toàn bộ bản sao trong ISR xác nhận, nên bền hơn với giá là độ trễ cao hơn.

### Giải thích các phương án:
- **Chờ mọi bản sao trong ISR xác nhận, không chỉ leader** (Đúng): Nhờ đó leader chết ngay sau khi ghi cũng không làm mất tin nhắn.
- **Chờ tin nhắn được ghi xuống đĩa bằng fsync trước khi trả về** (Sai): Đó là flush.ms/flush.messages, không phải acks.
- **Chờ mọi broker trong cluster nhận được bản sao** (Sai): Chỉ các bản sao của partition đó, và chỉ những bản đang trong ISR.
- **Chờ mọi consumer xác nhận đã xử lý xong tin nhắn** (Sai): Producer không biết gì về consumer; acks chỉ liên quan tới broker.
