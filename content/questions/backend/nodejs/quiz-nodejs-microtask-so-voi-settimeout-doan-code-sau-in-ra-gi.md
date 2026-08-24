---
id: quiz-nodejs-microtask-so-voi-settimeout-doan-code-sau-in-ra-gi
position: backend
technology: nodejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Microtask so với setTimeout — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] start timeout promise end
- [ ] start end timeout promise
- [ ] start promise timeout end
- [x] start end promise timeout

## Giải thích (VI)
In start end promise timeout. Code đồng bộ chạy hết trước; sau đó hàng đợi microtask (promise) được xả toàn bộ trước khi event loop xử lý macrotask (setTimeout), kể cả với delay 0. (FREE)

### Giải thích các phương án:
- **start timeout promise end** (Sai): Sai — code đồng bộ luôn chạy trọn stack hiện tại trước; không callback nào chạy trước khi end được in.
- **start end timeout promise** (Sai): Sai — hiểu nhầm phổ biến rằng setTimeout(0) chạy "ngay". Timer là macrotask, luôn xếp SAU toàn bộ microtask đang chờ, nên promise phải in trước timeout.
- **start promise timeout end** (Sai): Sai — cả promise callback lẫn timer callback đều bất đồng bộ, không thể chen vào giữa hai dòng console.log đồng bộ.
- **start end promise timeout** (Đúng): Code đồng bộ chạy hết trước (start, end). Sau đó hàng đợi MICROTASK (promise callback) được xả trước khi event loop lấy MACROTASK (timer callback), nên promise in trước timeout.
