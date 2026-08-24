---
id: quiz-golang-channel-co-buffer-doan-code-sau-in-ra-gi
position: backend
technology: golang
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Channel có buffer — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] 2 1
- [ ] fatal error: all goroutines are asleep - deadlock!
- [x] 1 2
- [ ] 1 1

## Giải thích (VI)
In 1 2. Channel buffer 2 cho phép gửi hai giá trị mà không cần bên nhận sẵn sàng — gửi chỉ chặn khi buffer ĐẦY. Buffer là hàng đợi FIFO nên nhận ra đúng thứ tự gửi. Nếu đổi thành make(chan int) (không buffer), dòng ch <- 1 chặn vĩnh viễn trong goroutine duy nhất → deadlock. (FREE)

### Giải thích các phương án:
- **2 1** (Sai): Sai — buffer của channel là hàng đợi FIFO (vào trước ra trước), không phải ngăn xếp LIFO.
- **fatal error: all goroutines are asleep - deadlock!** (Sai): Sai — deadlock chỉ xảy ra với channel KHÔNG buffer (gửi chặn tới khi có bên nhận) hoặc khi gửi quá sức chứa buffer mà không ai nhận. Ở đây buffer 2 chứa đủ hai giá trị.
- **1 2** (Đúng): Channel có buffer 2 nên hai lần gửi KHÔNG chặn (buffer chưa đầy sau lần gửi đầu, đầy sau lần thứ hai). Buffer là hàng đợi FIFO: nhận ra 1 trước, 2 sau.
- **1 1** (Sai): Sai — mỗi lần nhận LẤY một phần tử ra khỏi buffer; lần nhận thứ hai lấy giá trị kế tiếp (2), không đọc lại giá trị cũ.
