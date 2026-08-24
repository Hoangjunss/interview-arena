---
id: quiz-rabbitmq-producer-dung-confirm-channel-nhu-duoi-day-waitforconfirms-tra-ve-thanh-cong-ngh
position: backend
technology: rabbitmq
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Producer dùng confirm channel như dưới đây. waitForConfirms() trả về thành công nghĩa là gì?

## Đáp án trắc nghiệm
- [x] Broker đã nhận message và chịu trách nhiệm về nó
- [ ] Transaction AMQP đã được commit trên broker
- [ ] Message đã được ghi xuống đĩa trên mọi node của cluster
- [ ] Consumer đã nhận và xử lý xong message

## Giải thích (VI)
Broker đã nhận message và chịu trách nhiệm về nó — với message persistent trên queue durable, confirm chỉ bắn sau khi đã ghi đĩa. Không có confirm, publish là fire-and-forget: mạng đứt giữa chừng là mất message mà producer không hề biết.

### Giải thích các phương án:
- **Broker đã nhận message và chịu trách nhiệm về nó** (Đúng): Từ thời điểm confirm, mất message là lỗi của broker chứ không còn là rủi ro đường truyền.
- **Transaction AMQP đã được commit trên broker** (Sai): Publisher confirm là cơ chế riêng, nhẹ hơn nhiều so với transaction AMQP.
- **Message đã được ghi xuống đĩa trên mọi node của cluster** (Sai): Với quorum queue, confirm bắn khi đa số replica nhận, không cần đủ mọi node.
- **Consumer đã nhận và xử lý xong message** (Sai): Confirm là chuyện giữa producer và broker; broker không biết consumer xử lý tới đâu.
