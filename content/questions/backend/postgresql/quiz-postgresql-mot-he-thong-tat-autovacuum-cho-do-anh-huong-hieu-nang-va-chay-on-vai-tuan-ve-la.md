---
id: quiz-postgresql-mot-he-thong-tat-autovacuum-cho-do-anh-huong-hieu-nang-va-chay-on-vai-tuan-ve-la
position: backend
technology: postgresql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một hệ thống tắt autovacuum "cho đỡ ảnh hưởng hiệu năng" và chạy ổn vài tuần. Về lâu dài chuyện gì sẽ xảy ra?

## Đáp án trắc nghiệm
- [ ] Chỉ các bảng có index bị ảnh hưởng, bảng không index vẫn bình thường
- [x] Bảng phình, query chậm dần, cuối cùng DB ngừng nhận ghi
- [ ] Không có gì nghiêm trọng nếu dung lượng đĩa còn đủ, vì dead tuple chỉ tốn chỗ lưu trữ
- [ ] Postgres tự bật lại autovacuum sau mỗi lần restart server

## Giải thích (VI)
Ba giai đoạn: (1) dead tuples tích tụ → bảng và index phình , (2) query chậm dần vì scan phải lướt qua tuple chết, thống kê planner cũ dần, (3) khi transaction ID tiến gần giới hạn 32-bit, Postgres chạy vacuum khẩn cấp và nếu vẫn không kịp thì từ chối nhận ghi để chống wraparound. Tắt autovacuum là khoản nợ chắc chắn phải trả.

### Giải thích các phương án:
- **Chỉ các bảng có index bị ảnh hưởng, bảng không index vẫn bình thường** (Sai): Dead tuples nằm ở heap của mọi bảng có ghi, không phụ thuộc index.
- **Bảng phình, query chậm dần, cuối cùng DB ngừng nhận ghi** (Đúng): Dead tuples tích tụ không ai dọn, và anti-wraparound là cơ chế tự vệ cuối cùng.
- **Không có gì nghiêm trọng nếu dung lượng đĩa còn đủ, vì dead tuple chỉ tốn chỗ lưu trữ** (Sai): Vấn đề không chỉ là đĩa: hiệu năng giảm dần và giới hạn transaction ID vẫn tiến tới.
- **Postgres tự bật lại autovacuum sau mỗi lần restart server** (Sai): Cấu hình tắt trong postgresql.conf giữ nguyên qua restart.
