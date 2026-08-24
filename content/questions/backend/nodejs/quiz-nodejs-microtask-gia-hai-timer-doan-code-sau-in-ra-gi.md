---
id: quiz-nodejs-microtask-gia-hai-timer-doan-code-sau-in-ra-gi
position: backend
technology: nodejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Microtask giữa hai timer — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [x] timer1 micro timer2
- [ ] timer1 timer2 micro
- [ ] timer2 timer1 micro
- [ ] micro timer1 timer2

## Giải thích (VI)
In timer1, micro, timer2. Hai timer cùng delay chạy theo thứ tự đăng ký, nhưng hàng đợi microtask được xả sạch sau TỪNG callback — không chờ hết batch timers — nên micro chen giữa hai timer. (FREE)

### Giải thích các phương án:
- **timer1 micro timer2** (Đúng): Hai timer cùng delay chạy theo thứ tự đăng ký. Sau MỖI callback, hàng đợi microtask được xả sạch, nên micro chen vào giữa timer1 và timer2.
- **timer1 timer2 micro** (Sai): Sai — hiểu nhầm rằng microtask chỉ chạy khi "hết mọi macrotask". Microtask được xả ngay sau TỪNG callback, không chờ cả batch timers xong.
- **timer2 timer1 micro** (Sai): Sai — hai timer cùng delay 0 chạy theo thứ tự đăng ký (FIFO), timer1 đăng ký trước nên chạy trước.
- **micro timer1 timer2** (Sai): Sai — promise được đăng ký BÊN TRONG callback của timer1, nên không thể chạy trước timer1.
