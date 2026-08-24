---
id: quiz-linux-os-21-trong-command-outlog-21-co-tac-dung-gi
position: backend
technology: linux-os
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
2>&1 trong command > out.log 2>&1 có tác dụng gì?

## Đáp án trắc nghiệm
- [x] Chuyển stderr vào nơi stdout đang trỏ tới
- [ ] Ghi log theo hai tệp riêng cho hai luồng
- [ ] Chuyển stdout vào stderr để hiện ra terminal
- [ ] Chạy lệnh hai lần rồi gộp kết quả đầu ra lại

## Giải thích (VI)
Chuyển stderr (2) vào cùng đích mà stdout (1) đang trỏ tới — ở đây là out.log. Nhờ đó cả output thường và lỗi vào cùng một tệp, quan trọng khi chạy script trong cron vì lỗi cũng cần được lưu.

### Giải thích các phương án:
- **Chuyển stderr vào nơi stdout đang trỏ tới** (Đúng): Thứ tự quan trọng: đặt 2>&1 trước > sẽ cho kết quả khác.
- **Ghi log theo hai tệp riêng cho hai luồng** (Sai): Muốn tách riêng thì dùng > out.log 2> err.log.
- **Chuyển stdout vào stderr để hiện ra terminal** (Sai): Ngược chiều: 2>&1 chuyển stderr theo stdout.
- **Chạy lệnh hai lần rồi gộp kết quả đầu ra lại** (Sai): Không có ý nghĩa chạy lại lệnh ở đây.
