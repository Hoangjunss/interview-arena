---
id: quiz-nodejs-once-so-voi-on-cua-eventemitter-doan-code-sau-in-ra-gi
position: backend
technology: nodejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
once so với on của EventEmitter — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] once: a on: a once: b on: b
- [ ] on: a once: a on: b
- [ ] once: a on: a
- [x] once: a on: a on: b

## Giải thích (VI)
In once: a, on: a, on: b. emit gọi listener ĐỒNG BỘ theo thứ tự đăng ký, nên lần emit đầu chạy cả hai. Listener đăng ký bằng once tự gỡ sau lần chạy đầu tiên; emit thứ hai chỉ còn listener on. (FREE)

### Giải thích các phương án:
- **once: a on: a once: b on: b** (Sai): Sai — hiểu nhầm once nghĩa là "ít nhất một lần". once đăng ký listener TỰ GỠ sau lần được gọi đầu tiên; emit thứ hai không còn thấy nó.
- **on: a once: a on: b** (Sai): Sai — listener chạy theo thứ tự ĐĂNG KÝ, và once không bị xếp sau on. Muốn chen listener lên đầu phải dùng prependListener/prependOnceListener.
- **once: a on: a** (Sai): Sai — chỉ listener once bị gỡ sau lần đầu; listener on vẫn còn và tiếp tục nhận emit thứ hai.
- **once: a on: a on: b** (Đúng): emit gọi listener ĐỒNG BỘ theo thứ tự đăng ký: lần đầu chạy cả once lẫn on. Listener once bị gỡ ngay sau lần chạy đầu, nên lần emit thứ hai chỉ còn listener on.
