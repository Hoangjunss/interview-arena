---
id: quiz-nodejs-nhng-phat-bieu-nao-dung-ve-spawn-exec-va-fork-trong-module-childprocess-chon-nhi
position: backend
technology: nodejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những phát biểu nào ĐÚNG về spawn(), exec() và fork() trong module child_process? (chọn nhiều)

## Đáp án trắc nghiệm
- [ ] exec() phù hợp nhất cho output dung lượng lớn vì nó stream dữ liệu theo từng chunk
- [x] spawn() trả về stdout/stderr dạng stream, không buffer toàn bộ output — hợp với dữ liệu lớn hoặc tiến trình chạy lâu
- [ ] fork() dùng để chạy lệnh shell bất kỳ với hiệu năng cao hơn spawn()

## Giải thích (VI)
Cả ba thuộc child_process, khác nhau ở cách nhận kết quả: spawn trả output dạng stream, không buffer — hợp dữ liệu lớn; exec chạy qua shell, buffer toàn bộ output trả một lần qua callback (giới hạn maxBuffer ~1MB); fork là spawn chuyên cho file Node.js, có sẵn kênh IPC để send() message. Mẹo nhớ: spawn = stream, exec = buffer + shell, fork = spawn Node có IPC.

### Giải thích các phương án:
- **exec() phù hợp nhất cho output dung lượng lớn vì nó stream dữ liệu theo từng chunk** (Sai): Đảo ngược vai trò: exec BUFFER toàn bộ output (nghẽn maxBuffer với dữ liệu lớn); muốn stream theo chunk phải dùng spawn.
- **spawn() trả về stdout/stderr dạng stream, không buffer toàn bộ output — hợp với dữ liệu lớn hoặc tiến trình chạy lâu** (Đúng): Đúng: spawn stream output theo chunk, không giữ cả output trong bộ nhớ, và mặc định không chạy qua shell.
- **fork() dùng để chạy lệnh shell bất kỳ với hiệu năng cao hơn spawn()** (Sai): fork chỉ dành cho việc khởi chạy một module Node.js khác; nó không chạy lệnh shell tùy ý và không phải bản "nhanh hơn" của spawn.
