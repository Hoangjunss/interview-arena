---
id: child-process-trong-node-js-spawn-fork-va-exec-khac-nhau-the-nao
position: backend
technology: node.js-core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Child process trong Node.js: `spawn()`, `fork()` và `exec()` khác nhau thế nào?

## Question (EN)
Child processes in Node.js: how do `spawn()`, `fork()`, and `exec()` differ?

## Đáp án chi tiết (VI)
Cả ba đều thuộc module `child_process`, tạo tiến trình con để chạy việc ngoài event loop, nhưng khác về cách nhận kết quả:\
\
- **`spawn(cmd, args)`**: chạy lệnh và trả về stream `stdout`/`stderr`. Không buffer toàn bộ output → hợp với dữ liệu lớn hoặc tiến trình chạy lâu. Mặc định không qua shell.\
- **`exec(cmd, cb)`**: chạy lệnh **trong shell**, **buffer** toàn bộ output rồi trả một lần qua callback. Tiện cho lệnh ngắn; output vượt `maxBuffer` (mặc định ~1MB) sẽ lỗi. Vì qua shell nên cẩn thận command injection.\
- **`fork(module)`**: trường hợp đặc biệt của `spawn` chỉ để chạy **một file Node.js khác**, tự lập sẵn kênh **IPC** để cha–con `send()` message cho nhau. Dùng cho worker/tiến trình nền.\
\
Mẹo nhớ: `spawn` = stream, `exec` = buffer + shell, `fork` = spawn Node có IPC.

## Detailed Answer (EN)
All three live in `child_process` and create a child process to run work off the event loop, differing in how you get the result:\
\
- **`spawn(cmd, args)`**: runs a command and returns `stdout`/`stderr` as **streams**. No full-output buffering → good for large data or long-running processes. No shell by default.\
- **`exec(cmd, cb)`**: runs the command **in a shell** and **buffers** all output, handing it back once via callback. Handy for short commands; output past `maxBuffer` (~1MB default) errors. The shell means you must guard against command injection.\
- **`fork(module)`**: a special case of `spawn` just for launching **another Node.js file**, with an **IPC** channel set up so parent and child can `send()` messages. Used for workers/background processes.\
\
Mnemonic: `spawn` = stream, `exec` = buffer + shell, `fork` = a Node spawn with IPC.
