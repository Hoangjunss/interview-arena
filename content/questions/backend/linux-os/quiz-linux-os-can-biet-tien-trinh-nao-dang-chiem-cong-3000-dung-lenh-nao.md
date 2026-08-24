---
id: quiz-linux-os-can-biet-tien-trinh-nao-dang-chiem-cong-3000-dung-lenh-nao
position: backend
technology: linux-os
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cần biết tiến trình nào đang chiếm cổng 3000. Dùng lệnh nào?

## Đáp án trắc nghiệm
- [ ] curl localhost:3000 để xem có gì trả về
- [ ] ps aux | grep 3000 để tìm trong danh sách tiến trình
- [ ] netstat -a rồi tìm bằng mắt trong danh sách
- [x] lsof -i :3000, hoặc ss -ltnp

## Giải thích (VI)
lsof -i :3000 hoặc ss -ltnp | grep 3000 — cả hai cho PID và tên tiến trình. ss là bản thay thế hiện đại của netstat; cờ -ltnp nghĩa là listening, TCP, số hoá, kèm tiến trình.

### Giải thích các phương án:
- **curl localhost:3000 để xem có gì trả về** (Sai): Biết cổng có phản hồi nhưng không biết tiến trình nào.
- **ps aux | grep 3000 để tìm trong danh sách tiến trình** (Sai): Chỉ khớp khi số cổng tình cờ xuất hiện trong dòng lệnh.
- **netstat -a rồi tìm bằng mắt trong danh sách** (Sai): Thiếu -p thì không có thông tin tiến trình, và netstat đã cũ.
- **lsof -i :3000, hoặc ss -ltnp** (Đúng): Cả hai đều cho PID cùng tên tiến trình đang lắng nghe cổng đó.
