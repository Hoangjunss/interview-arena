---
id: quiz-nodejs-cache-cua-require-hai-file-commonjs-nhu-sau-chay-node-mainjs-in-ra-gi
position: backend
technology: nodejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cache của require — hai file CommonJS như sau, chạy node main.js in ra gì?

## Đáp án trắc nghiệm
- [ ] 2
- [ ] 0
- [x] 3
- [ ] 1

## Giải thích (VI)
In 3. require cache module theo đường dẫn đã resolve: file chỉ chạy một lần, mọi require sau trả về cùng object exports. c1 và c2 chia sẻ biến count, nên ba lần increment cộng dồn thành 3. (FREE)

### Giải thích các phương án:
- **2** (Sai): Sai — ++count là pre-increment, trả về giá trị SAU khi tăng: count đang là 2, lời gọi thứ ba trả 3.
- **0** (Sai): Sai — increment luôn tăng trước rồi trả về, không thể trả 0.
- **3** (Đúng): require CACHE module sau lần load đầu: c1 và c2 là CÙNG MỘT object, chia sẻ biến count. Hai lần tăng qua c1 đưa count lên 2, lần thứ ba qua c2 trả về 3.
- **1** (Sai): Sai — hiểu nhầm rằng mỗi require tạo một instance mới với count riêng. Module chỉ chạy MỘT lần rồi được cache; c2 dùng chung state với c1.
