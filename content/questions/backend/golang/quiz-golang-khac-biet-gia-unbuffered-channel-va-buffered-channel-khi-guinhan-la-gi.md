---
id: quiz-golang-khac-biet-gia-unbuffered-channel-va-buffered-channel-khi-guinhan-la-gi
position: backend
technology: golang
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác biệt giữa unbuffered channel và buffered channel khi gửi/nhận là gì?

## Đáp án trắc nghiệm
- [x] Unbuffered channel đồng bộ (gửi chặn tới khi có bên nhận)
- [ ] Chỉ buffered channel mới có thể đóng bằng close()
- [ ] Buffered channel không bao giờ chặn dù buffer đầy hay rỗng
- [ ] Unbuffered channel nhanh hơn vì bỏ qua bước đồng bộ

## Giải thích (VI)
Unbuffered channel (make(chan T)) đồng bộ: mỗi lần gửi chặn cho tới khi có bên nhận, tạo điểm bắt tay giữa hai goroutine. Buffered channel (make(chan T, n)) có sức chứa n: gửi chỉ chặn khi buffer đầy, nhận chỉ chặn khi buffer rỗng, giúp tách nhịp giữa producer và consumer.

### Giải thích các phương án:
- **Unbuffered channel đồng bộ (gửi chặn tới khi có bên nhận)** (Đúng): Buffered channel cho phép gửi không chặn cho tới khi buffer đầy. Với make(chan T) (unbuffered), thao tác gửi và nhận bắt tay đồng bộ. Với make(chan T, n), gửi chỉ chặn khi buffer đã đủ n phần tử; nhận chỉ chặn khi buffer rỗng.
- **Chỉ buffered channel mới có thể đóng bằng close()** (Sai): Cả hai loại đều đóng được bằng close(); buffering không liên quan tới khả năng đóng channel.
- **Buffered channel không bao giờ chặn dù buffer đầy hay rỗng** (Sai): Buffered channel vẫn chặn: gửi chặn khi buffer đầy, nhận chặn khi buffer rỗng. Nó chỉ giảm chặn chứ không loại bỏ.
- **Unbuffered channel nhanh hơn vì bỏ qua bước đồng bộ** (Sai): Unbuffered channel bản chất là đồng bộ hoàn toàn (mỗi lần gửi phải chờ nhận), không hề bỏ qua đồng bộ.
