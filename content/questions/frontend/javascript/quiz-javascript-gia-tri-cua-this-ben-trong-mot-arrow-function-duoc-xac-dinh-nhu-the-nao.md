---
id: quiz-javascript-gia-tri-cua-this-ben-trong-mot-arrow-function-duoc-xac-dinh-nhu-the-nao
position: frontend
technology: javascript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giá trị của this bên trong một arrow function được xác định như thế nào?

## Đáp án trắc nghiệm
- [x] Không có this riêng — kế thừa this từ lexical scope bao quanh
- [ ] this luôn trỏ tới object gọi hàm, giống hàm thường
- [ ] Có thể đổi this của arrow function bằng .bind()
- [ ] this luôn là window/globalThis bên trong arrow function

## Giải thích (VI)
Arrow function không tạo this của riêng nó; this được lấy từ lexical scope bao quanh nơi nó được viết. Vì thế call, apply, bind không đổi được this của arrow. Điều này giúp callback (vd trong setTimeout, map) giữ đúng this của method chứa nó.

### Giải thích các phương án:
- **Không có this riêng — kế thừa this từ lexical scope bao quanh** (Đúng): Arrow function lấy this theo lexical (nơi nó được viết), không theo cách gọi; call/apply/bind không đổi được this của nó. this được chốt tại nơi hàm được định nghĩa, không phụ thuộc cách gọi.
- **this luôn trỏ tới object gọi hàm, giống hàm thường** (Sai): Đó là quy tắc của hàm thường; arrow function bỏ qua object gọi và dùng this của scope cha.
- **Có thể đổi this của arrow function bằng .bind()** (Sai): bind/call/apply không ảnh hưởng this của arrow function; nó đã cố định theo lexical scope.
- **this luôn là window/globalThis bên trong arrow function** (Sai): Chỉ đúng khi scope cha là global; nếu arrow nằm trong method có this là object thì nó kế thừa this đó.
