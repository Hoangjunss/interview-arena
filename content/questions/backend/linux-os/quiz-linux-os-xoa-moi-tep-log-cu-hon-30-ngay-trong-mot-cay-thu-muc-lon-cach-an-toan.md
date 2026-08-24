---
id: quiz-linux-os-xoa-moi-tep-log-cu-hon-30-ngay-trong-mot-cay-thu-muc-lon-cach-an-toan
position: backend
technology: linux-os
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Xoá mọi tệp .log cũ hơn 30 ngày trong một cây thư mục lớn. Cách an toàn?

## Đáp án trắc nghiệm
- [x] find . -name "*.log" -mtime +30 -delete, chạy thử trước khi xoá
- [ ] find . -name "*.log" | xargs rm cho nhanh gọn
- [ ] rm -rf *.log trong từng thư mục con một
- [ ] ls -R | grep .log rồi xoá theo danh sách in ra

## Giải thích (VI)
find . -name "*.log" -mtime +30 -delete. Luôn chạy không có -delete trước để xem danh sách. Nếu phải nối với lệnh khác thì dùng -print0 | xargs -0 để tên tệp có dấu cách không làm vỡ.

### Giải thích các phương án:
- **find . -name "*.log" -mtime +30 -delete, chạy thử trước khi xoá** (Đúng): Bỏ -delete ra để xem danh sách trước là bước không nên bỏ qua.
- **find . -name "*.log" | xargs rm cho nhanh gọn** (Sai): Vỡ với tên tệp có dấu cách; cần -print0 cùng xargs -0.
- **rm -rf *.log trong từng thư mục con một** (Sai): Không lọc theo thời gian và phải làm tay từng thư mục.
- **ls -R | grep .log rồi xoá theo danh sách in ra** (Sai): Không xử lý được tên tệp có dấu cách và không lọc theo tuổi tệp.
