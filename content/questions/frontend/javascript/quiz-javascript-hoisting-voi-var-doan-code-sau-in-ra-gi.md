---
id: quiz-javascript-hoisting-voi-var-doan-code-sau-in-ra-gi
position: frontend
technology: javascript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hoisting với var — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] ReferenceError
- [ ] 5 5
- [ ] null 5
- [x] undefined 5

## Giải thích (VI)
In ra undefined rồi 5. Khai báo var x được hoist lên đầu function/global scope và tự khởi tạo undefined, còn phép gán x = 5 ở nguyên chỗ. Nên log đầu tiên (trước gán) là undefined, log sau là 5.

### Giải thích các phương án:
- **ReferenceError** (Sai): var không rơi vào TDZ; nó được hoist và gán undefined nên không ném ReferenceError (khác với let/const).
- **5 5** (Sai): Chỉ phần khai báo được hoist, không phải phép gán; tại lần log đầu x chưa nhận giá trị 5.
- **null 5** (Sai): Biến var chưa gán có giá trị undefined, không phải null.
- **undefined 5** (Đúng): Khai báo var x được hoist lên đầu scope và khởi tạo undefined; phép gán = 5 vẫn ở nguyên vị trí nên log đầu là undefined.
