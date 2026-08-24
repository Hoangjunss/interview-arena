---
id: quiz-kafka-kafka-bao-dam-thu-tu-tin-nhan-o-pham-vi-nao
position: backend
technology: kafka
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kafka bảo đảm thứ tự tin nhắn ở phạm vi nào?

## Đáp án trắc nghiệm
- [ ] Trong một topic, bất kể có bao nhiêu partition
- [ ] Trong một consumer group, theo thứ tự nhận được
- [ ] Trong một broker, theo đúng thời điểm tin nhắn tới broker
- [x] Trong phạm vi một partition

## Giải thích (VI)
Chỉ trong một partition . Muốn các sự kiện của cùng một thực thể giữ đúng thứ tự thì ghi chúng với cùng key (ví dụ orderId) — cùng key thì cùng partition.

### Giải thích các phương án:
- **Trong một topic, bất kể có bao nhiêu partition** (Sai): Nhiều partition được ghi và đọc song song nên không có thứ tự toàn cục.
- **Trong một consumer group, theo thứ tự nhận được** (Sai): Các consumer trong group đọc partition khác nhau nên không thể có thứ tự chung.
- **Trong một broker, theo đúng thời điểm tin nhắn tới broker** (Sai): Broker giữ nhiều partition của nhiều topic, không có thứ tự chung.
- **Trong phạm vi một partition** (Đúng): Giữa các partition không có thứ tự nào, nên muốn cùng thứ tự thì phải cùng key.
