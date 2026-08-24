---
id: let-const-class-co-duoc-hoisting-khong-tdz-la-gi
position: backend
technology: hoisting-\u0026-tdz
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`let`/`const`/`class` có được hoisting không? TDZ là gì?

## Question (EN)
Are `let`/`const`/`class` hoisted? What is the TDZ?

## Đáp án chi tiết (VI)
Có hoisting — binding **được tạo** ngay đầu block — nhưng chưa được khởi tạo. Khoảng từ đầu block tới dòng khai báo gọi là **TDZ (Temporal Dead Zone)**; truy cập trong khoảng này ném `ReferenceError`.\
\
```js\
console.log(a); // undefined  → var được khởi tạo sẵn bằng undefined\
var a = 1;\
\
console.log(b); // ReferenceError: Cannot access 'b' before initialization\
let b = 1;\
```\
\
Điểm phân biệt quan trọng: `undefined` nghĩa là \\"biến tồn tại, chưa gán\\"; `ReferenceError` của TDZ nghĩa là \\"biến tồn tại nhưng chưa được phép đọc\\". Nếu chưa khai báo ở đâu cả thì lỗi khác: `ReferenceError: x is not defined`.\
\
**Function declaration** được hoisting cả thân hàm nên gọi trước khai báo vẫn chạy. **Function expression** và **class** thì không:\
\
```js\
hello();            // chạy được\
function hello() {}\
\
new User();         // ReferenceError (TDZ)\
class User {}\
```\
\
TDZ là thiết kế có chủ đích: nó biến lỗi \\"dùng biến trước khi gán\\" từ giá trị `undefined` âm thầm thành lỗi phát hiện ngay.

## Detailed Answer (EN)
$82
