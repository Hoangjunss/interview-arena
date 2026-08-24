---
id: quiz-linux-os-can-dem-so-dong-chua-error-trong-log-2gb-cach-gon-nhat
position: backend
technology: linux-os
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cần đếm số dòng chứa "ERROR" trong log 2GB. Cách gọn nhất?

## Đáp án trắc nghiệm
- [x] grep -c ERROR app.log
- [ ] cat app.log | grep ERROR | wc -l
- [ ] Mở tệp bằng editor rồi dùng chức năng tìm kiếm
- [ ] awk /ERROR/ app.log rồi đếm kết quả bằng mắt

## Giải thích (VI)
grep -c ERROR app.log. Với log lớn thì grep rất nhanh vì nó đọc theo luồng. Cần đếm theo nhóm thì thêm sort | uniq -c; cần theo dõi trực tiếp thì tail -f app.log | grep ERROR.

### Giải thích các phương án:
- **grep -c ERROR app.log** (Đúng): grep -c đếm trực tiếp nên không phải đưa dữ liệu qua lệnh khác.
- **cat app.log | grep ERROR | wc -l** (Sai): Cho kết quả đúng nhưng dùng ba tiến trình cho việc một lệnh làm được.
- **Mở tệp bằng editor rồi dùng chức năng tìm kiếm** (Sai): Tệp 2GB sẽ làm editor rất chậm hoặc không mở được.
- **awk /ERROR/ app.log rồi đếm kết quả bằng mắt** (Sai): In ra hàng nghìn dòng thì không đếm bằng mắt được.
