---
id: quiz-redis-redis-xu-ly-lenh-tren-mot-luong-don-thi-tai-sao-van-nhanh
position: backend
technology: redis
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Redis xử lý lệnh trên một luồng đơn thì tại sao vẫn nhanh?

## Đáp án trắc nghiệm
- [x] Dữ liệu nằm trong RAM và mỗi lệnh chỉ tốn vài micro giây
- [ ] Nó chạy các lệnh song song trên nhiều core nhờ SIMD
- [ ] Nó nén dữ liệu nên đọc ghi ít byte hơn
- [ ] Nó tạo một luồng riêng cho mỗi kết nối client gửi lệnh

## Giải thích (VI)
Vì dữ liệu ở RAM và mỗi lệnh chỉ tốn vài micro giây, nên một luồng vẫn phục vụ được hàng trăm nghìn lệnh mỗi giây. Đơn luồng còn là một tính năng: mọi lệnh là atomic, không cần lock, độ trễ ổn định.

### Giải thích các phương án:
- **Dữ liệu nằm trong RAM và mỗi lệnh chỉ tốn vài micro giây** (Đúng): Không có lock, không có context switch giữa các lệnh nên độ trễ rất ổn định.
- **Nó chạy các lệnh song song trên nhiều core nhờ SIMD** (Sai): Không có việc thực thi song song các lệnh trong cùng một instance.
- **Nó nén dữ liệu nên đọc ghi ít byte hơn** (Sai): Nén không phải lý do chính và không áp dụng cho mọi kiểu dữ liệu.
- **Nó tạo một luồng riêng cho mỗi kết nối client gửi lệnh** (Sai): Việc thực thi lệnh vẫn nằm trên một luồng; chỉ I/O mới có thể tách luồng.
