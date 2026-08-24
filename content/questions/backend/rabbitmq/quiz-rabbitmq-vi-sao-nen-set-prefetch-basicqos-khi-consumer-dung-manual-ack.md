---
id: quiz-rabbitmq-vi-sao-nen-set-prefetch-basicqos-khi-consumer-dung-manual-ack
position: backend
technology: rabbitmq
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao nên set prefetch (basic.qos) khi consumer dùng manual ack?

## Đáp án trắc nghiệm
- [ ] Prefetch bật chế độ nén batch giúp tăng thông lượng mạng
- [ ] Prefetch là điều kiện bắt buộc để manual ack hoạt động
- [x] Chặn broker dồn không giới hạn message chưa ack vào một consumer
- [ ] Bảo đảm message được ghi xuống đĩa trước khi giao đi

## Giải thích (VI)
Không set prefetch, broker đẩy message không giới hạn cho consumer: một consumer ôm hàng nghìn message unacked trong bộ nhớ trong khi consumer khác ngồi không, và consumer đó crash thì tất cả phải giao lại. prefetch(n) giới hạn tối đa n message chưa ack trên mỗi consumer — hết hạn mức thì broker chờ ack rồi mới giao tiếp.

### Giải thích các phương án:
- **Prefetch bật chế độ nén batch giúp tăng thông lượng mạng** (Sai): Prefetch không liên quan tới nén; nó là giới hạn số message unacked.
- **Prefetch là điều kiện bắt buộc để manual ack hoạt động** (Sai): Manual ack chạy được không cần prefetch; vấn đề là chạy không kiểm soát.
- **Chặn broker dồn không giới hạn message chưa ack vào một consumer** (Đúng): Không có prefetch, broker đẩy message nhanh hết mức có thể cho consumer bất kể tiến độ xử lý.
- **Bảo đảm message được ghi xuống đĩa trước khi giao đi** (Sai): Độ bền trên đĩa thuộc về durable queue + persistent message, không phải qos.
