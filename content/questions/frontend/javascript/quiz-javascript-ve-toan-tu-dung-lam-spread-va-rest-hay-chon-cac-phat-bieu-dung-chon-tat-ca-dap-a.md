---
id: quiz-javascript-ve-toan-tu-dung-lam-spread-va-rest-hay-chon-cac-phat-bieu-dung-chon-tat-ca-dap-a
position: frontend
technology: javascript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Về toán tử ... dùng làm spread và rest, hãy chọn các phát biểu ĐÚNG. (chọn tất cả đáp án đúng)

## Đáp án trắc nghiệm
- [ ] Spread trên object và trên mảng dùng chung cơ chế: cả hai đều duyệt qua Symbol.iterator
- [x] Spread "mở" một iterable thành các phần tử rời (trong lời gọi hàm, array/object literal); rest "gom" các phần tử còn lại thành một mảng (ở tham số hàm hoặc vế trái destructuring)

## Giải thích (VI)
Cùng ký hiệu ... nhưng ngược nhau: spread trải iterable thành phần tử rời (lời gọi hàm, [...a], { ...o }), rest gom phần còn lại thành một Array (tham số (...args) hoặc destructuring). Rest phải đứng cuối. Spread chỉ shallow copy. Lưu ý spread mảng dùng iterator protocol, còn spread object copy own enumerable property nên hai cơ chế khác nhau.

### Giải thích các phương án:
- **Spread trên object và trên mảng dùng chung cơ chế: cả hai đều duyệt qua Symbol.iterator** (Sai): Sai: spread mảng/lời gọi hàm dùng iterator protocol (Symbol.iterator), nhưng spread object { ...obj } copy own enumerable property, KHÔNG dùng iterator — nên { ...5 } hợp lệ còn [...5] ném lỗi.
- **Spread "mở" một iterable thành các phần tử rời (trong lời gọi hàm, array/object literal); rest "gom" các phần tử còn lại thành một mảng (ở tham số hàm hoặc vế trái destructuring)** (Đúng): Cùng cú pháp ... nhưng ngược ngữ cảnh: spread trải giá trị ra, rest thu giá trị lại thành một Array thật.
