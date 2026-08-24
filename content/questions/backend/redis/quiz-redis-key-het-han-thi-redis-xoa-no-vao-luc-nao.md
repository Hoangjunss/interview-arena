---
id: quiz-redis-key-het-han-thi-redis-xoa-no-vao-luc-nao
position: backend
technology: redis
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Key hết hạn thì Redis xoá nó vào lúc nào?

## Đáp án trắc nghiệm
- [ ] Chỉ khi bộ nhớ chạm ngưỡng maxmemory đã đặt
- [x] Khi có ai truy cập, cộng thêm một tiến trình quét mẫu
- [ ] Vào lần chụp ảnh dữ liệu RDB kế tiếp
- [ ] Ngay đúng giây hết hạn nhờ một hẹn giờ riêng cho mỗi key

## Giải thích (VI)
Hai cách kết hợp: lazy — key hết hạn bị xoá khi có ai truy cập nó; và active — Redis lấy mẫu ngẫu nhiên các key có TTL rồi xoá cái đã hết hạn. Nên bộ nhớ không giảm ngay đúng giây key hết hạn.

### Giải thích các phương án:
- **Chỉ khi bộ nhớ chạm ngưỡng maxmemory đã đặt** (Sai): Đó là eviction, một cơ chế khác với hết hạn.
- **Khi có ai truy cập, cộng thêm một tiến trình quét mẫu** (Đúng): Hai cơ chế bù nhau: xoá lúc truy cập là chính xác, quét định kỳ dọn phần không ai chạm tới.
- **Vào lần chụp ảnh dữ liệu RDB kế tiếp** (Sai): Việc chụp ảnh dữ liệu không liên quan tới thời điểm xoá key hết hạn.
- **Ngay đúng giây hết hạn nhờ một hẹn giờ riêng cho mỗi key** (Sai): Một hẹn giờ cho mỗi key sẽ quá tốn kém khi có hàng triệu key.
