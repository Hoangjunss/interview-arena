---
id: quiz-javascript-closure-trong-javascript-la-gi
position: frontend
technology: javascript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Closure trong JavaScript là gì?

## Đáp án trắc nghiệm
- [x] Hàm vẫn truy cập được các biến ở scope nơi nó được định nghĩa
- [ ] Là hàm không có tham số nào
- [ ] Là cách gọi một hàm ngay sau khi khai báo (IIFE)
- [ ] Là một object được đóng băng bằng Object.freeze()

## Giải thích (VI)
Closure là hàm "nhớ" được các biến ở lexical scope nơi nó được định nghĩa và vẫn truy cập được chúng sau khi hàm cha đã return. Cơ chế này cho phép giữ state riêng tư, tạo factory function, và là nền tảng của nhiều pattern như module hay currying.

### Giải thích các phương án:
- **Hàm vẫn truy cập được các biến ở scope nơi nó được định nghĩa** (Đúng): Đây chính là định nghĩa closure: hàm giữ liên kết tới lexical environment nơi nó được tạo, không phải nơi được gọi. Điều đó đúng cả sau khi hàm ngoài đã kết thúc — biến không bị thu hồi.
- **Là hàm không có tham số nào** (Sai): Số lượng tham số không liên quan gì đến closure.
- **Là cách gọi một hàm ngay sau khi khai báo (IIFE)** (Sai): IIFE là một pattern có thể tạo closure, nhưng bản thân IIFE không phải là định nghĩa của closure.
- **Là một object được đóng băng bằng Object.freeze()** (Sai): Object.freeze chỉ khoá thay đổi thuộc tính, không liên quan đến việc hàm giữ scope.
