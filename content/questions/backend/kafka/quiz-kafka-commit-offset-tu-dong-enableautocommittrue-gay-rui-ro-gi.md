---
id: quiz-kafka-commit-offset-tu-dong-enableautocommittrue-gay-rui-ro-gi
position: backend
technology: kafka
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Commit offset tự động (enable.auto.commit=true) gây rủi ro gì?

## Đáp án trắc nghiệm
- [x] Offset có thể được commit trước khi xử lý xong nên mất tin nhắn
- [ ] Broker phải lưu thêm dữ liệu nên chậm đi rõ rệt
- [ ] Consumer không đọc được từ đầu topic nữa
- [ ] Offset bị commit hai lần nên tin nhắn bị xử lý trùng

## Giải thích (VI)
Offset được commit theo chu kỳ thời gian, không theo tiến độ xử lý thật . Nếu chu kỳ đó rơi vào giữa lúc đang xử lý và consumer chết, các tin nhắn đã được commit nhưng chưa xử lý sẽ không bao giờ được đọc lại — mất dữ liệu âm thầm.

### Giải thích các phương án:
- **Offset có thể được commit trước khi xử lý xong nên mất tin nhắn** (Đúng): Consumer chết sau khi commit mà chưa xử lý xong thì không ai đọc lại tin nhắn đó.
- **Broker phải lưu thêm dữ liệu nên chậm đi rõ rệt** (Sai): Chi phí lưu offset rất nhỏ và không phải vấn đề ở đây.
- **Consumer không đọc được từ đầu topic nữa** (Sai): Vẫn đặt lại offset về đầu được bất cứ lúc nào.
- **Offset bị commit hai lần nên tin nhắn bị xử lý trùng** (Sai): Commit trùng không gây xử lý trùng vì offset là một vị trí, không phải bộ đếm.
