---
id: quiz-rabbitmq-can-broadcast-mot-event-toi-moi-queue-da-bind-bo-qua-routing-key-chon-loai-excha
position: backend
technology: rabbitmq
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cần broadcast một event tới MỌI queue đã bind, bỏ qua routing key. Chọn loại exchange nào?

## Đáp án trắc nghiệm
- [x] Fanout
- [ ] Headers — match theo header thay vì routing key
- [ ] Direct — bind mọi queue với cùng một routing key
- [ ] Topic — dùng pattern để match nhiều queue

## Giải thích (VI)
Fanout. Nó sao chép message tới mọi queue đã bind và bỏ qua hoàn toàn routing key. Ghi nhớ nhanh 4 loại: direct = match key chính xác, topic = match theo pattern (*/#), fanout = broadcast tất cả, headers = match theo header của message.

### Giải thích các phương án:
- **Fanout** (Đúng): Fanout sao chép message tới mọi queue đã bind, không nhìn routing key.
- **Headers — match theo header thay vì routing key** (Sai): Headers exchange so khớp thuộc tính header, vẫn là định tuyến có điều kiện.
- **Direct — bind mọi queue với cùng một routing key** (Sai): Làm được nhưng vòng vèo; fanout tồn tại đúng cho việc này và nhanh hơn vì bỏ qua so khớp key.
- **Topic — dùng pattern để match nhiều queue** (Sai): Topic dành cho định tuyến chọn lọc theo pattern, không phải broadcast vô điều kiện.
