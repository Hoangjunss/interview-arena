---
id: quiz-rabbitmq-consumer-gap-message-loi-dinh-dang-va-goi-basicnack-voi-requeuetrue-rui-ro-la-gi
position: backend
technology: rabbitmq
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Consumer gặp message lỗi định dạng và gọi basic.nack với requeue=true. Rủi ro là gì?

## Đáp án trắc nghiệm
- [x] Vòng lặp vô hạn: message được giao lại và lỗi tiếp
- [ ] Broker tự giãn dần khoảng cách giữa các lần giao lại
- [ ] Queue bị khoá tới khi message đó được ack thành công
- [ ] Message bị mất vì nack nghĩa là từ chối vĩnh viễn

## Giải thích (VI)
Poison message loop : message lỗi vĩnh viễn (sai định dạng, thiếu field) sẽ được giao lại ngay và lỗi tiếp, chiếm CPU và làm ngập log vô hạn — RabbitMQ không có backoff hay giới hạn số lần giao lại mặc định. Lỗi vĩnh viễn thì nack với requeue=false kèm dead-letter exchange.

### Giải thích các phương án:
- **Vòng lặp vô hạn: message được giao lại và lỗi tiếp** (Đúng): Message sai định dạng sẽ lỗi mãi; requeue đưa nó quay lại để lỗi tiếp ngay lập tức.
- **Broker tự giãn dần khoảng cách giữa các lần giao lại** (Sai): RabbitMQ không có backoff sẵn cho redelivery; giao lại là ngay lập tức.
- **Queue bị khoá tới khi message đó được ack thành công** (Sai): Queue vẫn giao các message khác bình thường trong lúc đó.
- **Message bị mất vì nack nghĩa là từ chối vĩnh viễn** (Sai): requeue=true giữ message lại trong queue chứ không xoá.
