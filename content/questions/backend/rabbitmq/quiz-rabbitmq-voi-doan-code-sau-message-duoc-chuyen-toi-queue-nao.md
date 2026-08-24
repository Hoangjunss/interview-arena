---
id: quiz-rabbitmq-voi-doan-code-sau-message-duoc-chuyen-toi-queue-nao
position: backend
technology: rabbitmq
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Với đoạn code sau, message được chuyển tới queue nào?

## Đáp án trắc nghiệm
- [ ] Cả q error lẫn q info, vì cùng bind vào một exchange
- [ ] Không queue nào — thiếu tham số queue trong lệnh publish
- [x] Chỉ q error
- [ ] q info, vì info là mức mặc định của exchange

## Giải thích (VI)
Chỉ q error . Direct exchange so khớp chính xác routing key của message (error) với binding key của từng queue. q_info bind với key info nên không nhận. Nếu nhiều queue cùng bind key error, tất cả đều nhận một bản sao.

### Giải thích các phương án:
- **Cả q error lẫn q info, vì cùng bind vào một exchange** (Sai): Direct exchange chỉ chuyển tới queue có binding key trùng khớp chính xác.
- **Không queue nào — thiếu tham số queue trong lệnh publish** (Sai): Publish không bao giờ chỉ định queue; exchange tự tìm queue qua binding.
- **Chỉ q error** (Đúng): Routing key "error" khớp chính xác binding key "error" của q error.
- **q info, vì info là mức mặc định của exchange** (Sai): Không có khái niệm mức mặc định; chỉ có so khớp routing key với binding key.
