---
id: quiz-nodejs-chuong-trinh-sau-in-ra-gi-va-vi-sao
position: backend
technology: nodejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chương trình sau in ra gì, và vì sao?

## Đáp án trắc nghiệm
- [ ] In ra 1 — mỗi lần require nạp một bản module mới với count riêng
- [x] In ra 2 — module được cache sau lần require đầu tiên nên a và b là một
- [ ] Báo lỗi — không được require cùng một file hai lần trong một module
- [ ] In ra undefined — hàm arrow không truy cập được biến count ở module scope

## Giải thích (VI)
In ra 2. Module CommonJS được cache theo đường dẫn đã resolve: lần require đầu thực thi counter.js và lưu module.exports vào require.cache; lần hai trả lại đúng object đó. a và b là cùng một instance nên hai lần increment() cùng tăng một biến count → 1 rồi 2.

### Giải thích các phương án:
- **In ra 1 — mỗi lần require nạp một bản module mới với count riêng** (Sai): Sai vì require không nạp lại: lần thứ hai trả về object đã cache. Nếu mỗi require tạo instance mới thì mới ra 1.
- **In ra 2 — module được cache sau lần require đầu tiên nên a và b là một** (Đúng): Theo docs Modules: mọi lời gọi require tới cùng một file (sau khi resolve) trả về đúng object đã cache trong require.cache. a và b là một; count tăng lên 1 rồi 2. Hai lời gọi cùng trỏ tới một instance nên chia sẻ biến count.
- **Báo lỗi — không được require cùng một file hai lần trong một module** (Sai): Require cùng file bao nhiêu lần cũng hợp lệ; đó chính là lý do cơ chế cache tồn tại. Không có lỗi nào ở đây.
- **In ra undefined — hàm arrow không truy cập được biến count ở module scope** (Sai): Arrow function vẫn là closure bình thường, giữ tham chiếu tới count trong scope của counter.js. Không có vấn đề truy cập nào.
