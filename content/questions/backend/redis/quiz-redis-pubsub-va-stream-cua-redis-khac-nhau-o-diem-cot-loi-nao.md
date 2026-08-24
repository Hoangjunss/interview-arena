---
id: quiz-redis-pubsub-va-stream-cua-redis-khac-nhau-o-diem-cot-loi-nao
position: backend
technology: redis
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pub/Sub và Stream của Redis khác nhau ở điểm cốt lõi nào?

## Đáp án trắc nghiệm
- [x] Pub/Sub không lưu tin, Stream lưu lại được
- [ ] Pub/Sub bảo đảm giao đúng một lần
- [ ] Stream chỉ cho một consumer, Pub/Sub cho nhiều
- [ ] Pub/Sub nhanh hơn vì dùng UDP

## Giải thích (VI)
Pub/Sub là fire-and-forget : ai không đang nghe thì mất tin. Stream lưu lại tin nhắn kèm id tăng dần, có consumer group, có xác nhận xử lý, nên đọc lại được và biết tin nào chưa xong.

### Giải thích các phương án:
- **Pub/Sub không lưu tin, Stream lưu lại được** (Đúng): Subscriber offline lúc tin nhắn được gửi thì mất luôn, còn stream giữ lịch sử theo id.
- **Pub/Sub bảo đảm giao đúng một lần** (Sai): Pub/Sub không bảo đảm giao hàng, nó là fire-and-forget.
- **Stream chỉ cho một consumer, Pub/Sub cho nhiều** (Sai): Stream có consumer group để nhiều consumer chia nhau công việc.
- **Pub/Sub nhanh hơn vì dùng UDP** (Sai): Cả hai đều đi trên cùng giao thức TCP của Redis.
