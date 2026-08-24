---
id: quiz-redis-pipelining-trong-redis-giup-gi
position: backend
technology: redis
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pipelining trong Redis giúp gì?

## Đáp án trắc nghiệm
- [ ] Nén các lệnh lại để giảm băng thông
- [ ] Bọc nhiều lệnh lại thành một giao dịch atomic trên server
- [ ] Chạy các lệnh song song trên nhiều luồng của server
- [x] Gửi nhiều lệnh mà không chờ từng phản hồi, giảm số vòng mạng

## Giải thích (VI)
Gửi liên tiếp nhiều lệnh mà không chờ phản hồi từng cái , rồi đọc toàn bộ phản hồi. Chi phí chi phối trong Redis thường là độ trễ mạng, nên gộp 1000 lệnh vào một pipeline nhanh hơn cả trăm lần so với gửi lẻ.

### Giải thích các phương án:
- **Nén các lệnh lại để giảm băng thông** (Sai): Pipeline không nén dữ liệu, nó chỉ bỏ bớt thời gian chờ.
- **Bọc nhiều lệnh lại thành một giao dịch atomic trên server** (Sai): Đó là MULTI/EXEC; pipeline không bảo đảm không có lệnh khác chen giữa.
- **Chạy các lệnh song song trên nhiều luồng của server** (Sai): Server vẫn thực thi lần lượt trên một luồng.
- **Gửi nhiều lệnh mà không chờ từng phản hồi, giảm số vòng mạng** (Đúng): Với 1000 lệnh, thời gian chuyển từ 1000 lần round-trip xuống gần một lần.
