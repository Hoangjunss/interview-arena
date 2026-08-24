---
id: quiz-redis-vi-sao-khong-nen-dung-keys-pattern-tren-production
position: backend
technology: redis
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao không nên dùng KEYS pattern trên production?

## Đáp án trắc nghiệm
- [x] Nó quét toàn bộ keyspace trong một lệnh và chặn server
- [ ] Nó chỉ trả về tối đa 1000 key nên kết quả bị thiếu key
- [ ] Nó xoá TTL của các key được liệt kê
- [ ] Nó yêu cầu quyền admin nên thường bị chặn

## Giải thích (VI)
Vì nó quét toàn bộ keyspace trong một lệnh, mà Redis chỉ có một luồng thực thi — mọi client khác phải chờ. Trên vài triệu key, thời gian chặn đủ để gây timeout hàng loạt. Dùng SCAN với cursor để chia nhỏ.

### Giải thích các phương án:
- **Nó quét toàn bộ keyspace trong một lệnh và chặn server** (Đúng): SCAN chia việc quét thành nhiều lần gọi qua cursor nên không giữ luồng quá lâu.
- **Nó chỉ trả về tối đa 1000 key nên kết quả bị thiếu key** (Sai): KEYS trả về mọi key khớp, vấn đề chính là chi phí chứ không phải giới hạn.
- **Nó xoá TTL của các key được liệt kê** (Sai): KEYS chỉ đọc, không đổi gì trên dữ liệu.
- **Nó yêu cầu quyền admin nên thường bị chặn** (Sai): Đây là lệnh thường, không cần quyền đặc biệt.
