---
id: quiz-rabbitmq-voi-topic-exchange-duoi-day-queue-nao-nhan-duoc-message
position: backend
technology: rabbitmq
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Với topic exchange dưới đây, queue nào nhận được message?

## Đáp án trắc nghiệm
- [x] Chỉ q2
- [ ] Không queue nào, vì routing key có 3 phần
- [ ] Cả q1 và q2, vì đều bắt đầu bằng order
- [ ] Chỉ q1, vì * khớp rộng hơn #

## Giải thích (VI)
Chỉ q2 . Trong topic exchange: * thay đúng một từ (từ = đoạn giữa hai dấu chấm), # thay không hoặc nhiều từ. order.payment.failed có hai từ sau order nên order.* trượt, còn order.# khớp. Nếu publish order.created thì cả hai queue đều nhận.

### Giải thích các phương án:
- **Chỉ q2** (Đúng): order.# khớp order theo sau bởi bất kỳ số từ nào, gồm cả "payment.failed".
- **Không queue nào, vì routing key có 3 phần** (Sai): Số phần không bị giới hạn; order.# vẫn khớp key 3 phần.
- **Cả q1 và q2, vì đều bắt đầu bằng order** (Sai): q1 không match: * chỉ thay được đúng một từ, mà sau "order" có tới hai từ.
- **Chỉ q1, vì * khớp rộng hơn #** (Sai): Ngược lại — # mới là wildcard rộng (0 hoặc nhiều từ), * là hẹp (đúng 1 từ).
