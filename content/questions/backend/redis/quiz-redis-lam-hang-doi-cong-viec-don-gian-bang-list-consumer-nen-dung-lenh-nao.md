---
id: quiz-redis-lam-hang-doi-cong-viec-don-gian-bang-list-consumer-nen-dung-lenh-nao
position: backend
technology: redis
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm hàng đợi công việc đơn giản bằng list, consumer nên dùng lệnh nào?

## Đáp án trắc nghiệm
- [ ] RPOP trong một vòng lặp có sleep ngắn giữa các lần gọi
- [x] BRPOP — chờ chặn tới khi có việc, không phải polling
- [ ] LRANGE rồi tự bỏ qua những phần tử đã xử lý xong
- [ ] SUBSCRIBE vào một channel trùng tên với hàng đợi đó

## Giải thích (VI)
BRPOP — nó chặn tới khi có phần tử hoặc hết thời gian chờ, nên consumer không phải polling. Ghi việc vào bằng LPUSH, lấy ra bằng BRPOP là mẫu hàng đợi FIFO cơ bản.

### Giải thích các phương án:
- **RPOP trong một vòng lặp có sleep ngắn giữa các lần gọi** (Sai): Chạy được nhưng tốn tài nguyên và chậm hơn hẳn so với lệnh chờ chặn.
- **BRPOP — chờ chặn tới khi có việc, không phải polling** (Đúng): Polling bằng RPOP trong vòng lặp tốn CPU và thêm độ trễ bằng chu kỳ ngủ.
- **LRANGE rồi tự bỏ qua những phần tử đã xử lý xong** (Sai): Đọc mà không lấy ra khỏi danh sách nên nhiều consumer sẽ xử lý trùng.
- **SUBSCRIBE vào một channel trùng tên với hàng đợi đó** (Sai): Pub/Sub không liên quan tới list và không giữ việc lại khi consumer offline.
