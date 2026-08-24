---
id: quiz-rabbitmq-dead-letter-exchange-dlx-dung-de-lam-gi
position: backend
technology: rabbitmq
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dead Letter Exchange (DLX) dùng để làm gì?

## Đáp án trắc nghiệm
- [ ] Lưu bản sao mọi message đã được ack để đối soát
- [ ] Trả message lỗi ngược về producer đã publish
- [x] Nhận message bị loại khỏi queue để xử lý riêng
- [ ] Giữ lại message của một queue vừa bị xoá

## Giải thích (VI)
DLX là exchange nhận các message bị loại khỏi queue — thay vì biến mất, chúng được định tuyến sang một queue khác để điều tra hoặc retry. Khai báo qua argument x-dead-letter-exchange trên queue gốc.

### Giải thích các phương án:
- **Lưu bản sao mọi message đã được ack để đối soát** (Sai): Message đã ack bị xoá khỏi queue, không đi qua DLX.
- **Trả message lỗi ngược về producer đã publish** (Sai): RabbitMQ không đẩy message ngược về producer; DLX chỉ định tuyến sang exchange khác.
- **Nhận message bị loại khỏi queue để xử lý riêng** (Đúng): Message bị reject, hết TTL hoặc bị đẩy ra do queue đầy sẽ được định tuyến sang DLX.
- **Giữ lại message của một queue vừa bị xoá** (Sai): Xoá queue là mất message trong đó; DLX không phải cơ chế backup.
