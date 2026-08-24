---
id: quiz-nodejs-exports-so-voi-moduleexports-hai-file-commonjs-nhu-sau-chay-node-mainjs-in-ra-gi
position: backend
technology: nodejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
exports so với module.exports — hai file CommonJS như sau, chạy node main.js in ra gì?

## Đáp án trắc nghiệm
- [ ] 1 2
- [ ] undefined undefined
- [ ] 1 undefined
- [x] undefined 2

## Giải thích (VI)
In undefined 2. exports chỉ là biến alias trỏ tới module.exports ban đầu. Gán module.exports = {...} thay bằng object MỚI; property a gắn trên object cũ bị bỏ. require luôn trả về module.exports cuối cùng. (FREE)

### Giải thích các phương án:
- **1 2** (Sai): Sai — hiểu nhầm rằng hai cách gán được "merge". Gán lại module.exports vứt bỏ object cũ chứa a, không gộp.
- **undefined undefined** (Sai): Sai — module.exports = { b: 2 } hợp lệ và là thứ require trả về, nên lib.b là 2.
- **1 undefined** (Sai): Sai — ngược: thứ được require trả về là module.exports (object { b: 2 }), không phải object mà exports.a đã gắn vào.
- **undefined 2** (Đúng): exports chỉ là ALIAS ban đầu của module.exports. Gán module.exports = { b: 2 } thay object mới hoàn toàn; exports.a = 1 nằm trên object cũ đã bị bỏ — require chỉ trả về module.exports.
