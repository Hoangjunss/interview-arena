---
id: quiz-kafka-tang-lingerms-tu-0-len-20-co-tac-dung-gi
position: backend
technology: kafka
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tăng linger.ms từ 0 lên 20 có tác dụng gì?

## Đáp án trắc nghiệm
- [ ] Consumer nhận được tin nhắn sớm hơn 20ms
- [x] Batch lớn hơn nên thông lượng cao hơn, đổi lại thêm chút độ trễ
- [ ] Producer giữ tin nhắn trong bộ đệm lâu hơn nếu broker chết
- [ ] Producer retry nhanh hơn khi gặp lỗi tạm thời

## Giải thích (VI)
Producer chờ tới 20ms để gom thêm bản ghi vào một batch: ít request hơn, nén tốt hơn, thông lượng cao hơn , đổi lại độ trễ tăng tối đa 20ms. Với pipeline theo lô thì đây là đánh đổi rất đáng.

### Giải thích các phương án:
- **Consumer nhận được tin nhắn sớm hơn 20ms** (Sai): Tin nhắn tới trễ hơn một chút, không sớm hơn.
- **Batch lớn hơn nên thông lượng cao hơn, đổi lại thêm chút độ trễ** (Đúng): Producer chờ tối đa 20ms để gom thêm bản ghi vào cùng một request.
- **Producer giữ tin nhắn trong bộ đệm lâu hơn nếu broker chết** (Sai): Thời gian giữ khi broker không sẵn sàng là delivery.timeout.ms.
- **Producer retry nhanh hơn khi gặp lỗi tạm thời** (Sai): Hành vi retry do retry.backoff.ms quyết định.
