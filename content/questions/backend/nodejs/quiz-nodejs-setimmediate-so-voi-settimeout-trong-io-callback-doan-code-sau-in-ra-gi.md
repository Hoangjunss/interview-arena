---
id: quiz-nodejs-setimmediate-so-voi-settimeout-trong-io-callback-doan-code-sau-in-ra-gi
position: backend
technology: nodejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
setImmediate so với setTimeout trong I/O callback — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [x] immediate timeout
- [ ] (không in gì)
- [ ] timeout immediate
- [ ] Thứ tự thay đổi giữa các lần chạy, không xác định

## Giải thích (VI)
In immediate rồi timeout. Callback của fs chạy ở poll phase; event loop đi tiếp sang check phase — nơi setImmediate chạy — trước khi vòng sau quay lại timers phase cho setTimeout(0). Bên trong I/O callback, thứ tự này luôn xác định; ở top-level thì không. (FREE)

### Giải thích các phương án:
- **immediate timeout** (Đúng): Callback của fs chạy ở poll phase. Phase kế tiếp là CHECK — nơi setImmediate chạy; timer phải đợi tới phase timers của vòng lặp sau. Trong I/O callback, thứ tự này là xác định.
- **(không in gì)** (Sai): Sai — fs.readFile(__filename) đọc chính file đang chạy nên luôn thành công; callback chạy và cả hai lịch hẹn đều được thực thi.
- **timeout immediate** (Sai): Sai — hiểu nhầm rằng đăng ký trước thì chạy trước. Đang đứng ở poll phase, event loop đi tới check phase (setImmediate) TRƯỚC khi quay lại timers phase ở vòng sau.
- **Thứ tự thay đổi giữa các lần chạy, không xác định** (Sai): Sai — điều này chỉ đúng khi hai hàm được gọi ở top-level (ngoài I/O callback), vì lúc đó việc timer 0ms kịp đến hạn hay chưa phụ thuộc tốc độ khởi động. BÊN TRONG một I/O callback, setImmediate luôn chạy trước.
