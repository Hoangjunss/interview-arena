---
id: quiz-linux-os-server-bao-loi-too-many-open-files-kiem-tra-va-xu-ly-the-nao
position: backend
technology: linux-os
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Server báo lỗi "too many open files". Kiểm tra và xử lý thế nào?

## Đáp án trắc nghiệm
- [x] Xem ulimit -n và số fd đang mở, tìm chỗ rò rỉ
- [ ] Tăng ulimit -n lên mức tối đa và coi như xong
- [ ] Restart server định kỳ để giải phóng file descriptor
- [ ] Xoá các tệp không cần thiết để giảm số tệp đang mở

## Giải thích (VI)
Xem giới hạn bằng ulimit -n, xem thực tế bằng lsof -p <pid> | wc -l. Nếu số fd tăng đều theo thời gian thì đó là rò rỉ — kết nối hay tệp không được đóng. Tăng giới hạn chỉ mua thêm thời gian.

### Giải thích các phương án:
- **Xem ulimit -n và số fd đang mở, tìm chỗ rò rỉ** (Đúng): Tăng giới hạn là biện pháp tạm; nếu rò rỉ thì nó sẽ đầy lại.
- **Tăng ulimit -n lên mức tối đa và coi như xong** (Sai): Che vấn đề: rò rỉ fd sẽ lại chạm giới hạn mới.
- **Restart server định kỳ để giải phóng file descriptor** (Sai): Giải pháp tạm bợ và không giải quyết nguyên nhân.
- **Xoá các tệp không cần thiết để giảm số tệp đang mở** (Sai): Số tệp trên đĩa không liên quan tới số fd đang mở.
