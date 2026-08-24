---
id: quiz-redis-rdb-va-aof-khac-nhau-o-diem-cot-loi-nao
position: backend
technology: redis
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RDB và AOF khác nhau ở điểm cốt lõi nào?

## Đáp án trắc nghiệm
- [ ] RDB nén dữ liệu còn AOF thì không bao giờ nén
- [ ] RDB dùng cho bản chính, AOF chỉ dùng cho bản sao
- [x] RDB chụp ảnh dữ liệu theo chu kỳ, AOF ghi lại từng lệnh ghi
- [ ] RDB ghi xuống đĩa còn AOF chỉ giữ trong bộ nhớ tiến trình

## Giải thích (VI)
RDB là ảnh chụp toàn bộ dữ liệu theo chu kỳ; AOF là nhật ký các lệnh ghi . RDB cho file gọn và khởi động lại nhanh nhưng mất dữ liệu từ lần chụp cuối; AOF mất ít nhất (thường ≤1 giây với everysec) nhưng file lớn hơn và nạp lại chậm hơn.

### Giải thích các phương án:
- **RDB nén dữ liệu còn AOF thì không bao giờ nén** (Sai): AOF cũng có cơ chế viết lại để thu gọn tệp.
- **RDB dùng cho bản chính, AOF chỉ dùng cho bản sao** (Sai): Cả hai đều dùng được ở bất kỳ vai trò nào.
- **RDB chụp ảnh dữ liệu theo chu kỳ, AOF ghi lại từng lệnh ghi** (Đúng): Nên AOF mất ít dữ liệu hơn khi sự cố, còn RDB khởi động lại nhanh hơn và file nhỏ hơn.
- **RDB ghi xuống đĩa còn AOF chỉ giữ trong bộ nhớ tiến trình** (Sai): Cả hai đều là cơ chế ghi xuống đĩa.
