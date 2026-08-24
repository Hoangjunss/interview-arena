---
id: quiz-mongodb-can-tu-dong-xoa-cac-session-het-han-sau-24-gio-mongodb-ho-tro-san-co-che-nao
position: backend
technology: mongodb
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cần tự động xóa các session hết hạn sau 24 giờ. MongoDB hỗ trợ sẵn cơ chế nào?

## Đáp án trắc nghiệm
- [ ] Không có sẵn — phải tự viết cron job gọi deleteMany định kỳ
- [x] TTL index — index trên trường ngày kèm expireAfterSeconds
- [ ] Dùng capped collection, nó tự xóa document cũ theo thời gian
- [ ] Đặt maxAge trong lược đồ collection lúc tạo

## Giải thích (VI)
TTL index: db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 }). Một tiến trình nền chạy khoảng mỗi 60 giây sẽ xóa document có createdAt quá hạn. Trường được đánh index phải là kiểu ngày, và việc xóa không diễn ra tức thời tại đúng giây hết hạn.

### Giải thích các phương án:
- **Không có sẵn — phải tự viết cron job gọi deleteMany định kỳ** (Sai): Việc đó làm được nhưng MongoDB đã có sẵn TTL index.
- **TTL index — index trên trường ngày kèm expireAfterSeconds** (Đúng): TTL index sinh ra đúng cho nhu cầu tự hết hạn dữ liệu; nền tảng chạy một tiến trình định kỳ để xoá document quá hạn.
- **Dùng capped collection, nó tự xóa document cũ theo thời gian** (Sai): Capped collection xóa theo giới hạn DUNG LƯỢNG chứ không theo thời gian.
- **Đặt maxAge trong lược đồ collection lúc tạo** (Sai): Không tồn tại tùy chọn như vậy.
