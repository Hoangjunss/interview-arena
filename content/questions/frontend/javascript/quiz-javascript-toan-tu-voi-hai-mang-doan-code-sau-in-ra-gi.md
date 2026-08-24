---
id: quiz-javascript-toan-tu-voi-hai-mang-doan-code-sau-in-ra-gi
position: frontend
technology: javascript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Toán tử + với hai mảng — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [x] 1,2,34,5,6
- [ ] [1,2,3,4,5,6]
- [ ] NaN
- [ ] 1,2,3,4,5,6

## Giải thích (VI)
In ra 1,2,34,5,6. Toán tử + khi gặp mảng sẽ gọi ToPrimitive, biến mỗi mảng thành chuỗi qua Array.prototype.join(","): "1,2,3" và "4,5,6". Vì có toán hạng chuỗi, + thực hiện nối chuỗi → "1,2,34,5,6". Muốn nối mảng thật, dùng concat hoặc [...a, ...b].

### Giải thích các phương án:
- **1,2,34,5,6** (Đúng): Toán tử + với mảng ép cả hai về primitive (chuỗi): "1,2,3" + "4,5,6" = "1,2,34,5,6".
- **[1,2,3,4,5,6]** (Sai): + không nối mảng thành mảng mới; muốn nối cần concat hoặc spread [...a, ...b].
- **NaN** (Sai): Vì cả hai toán hạng chuyển thành chuỗi rồi ghép, kết quả là một chuỗi hợp lệ chứ không phải NaN.
- **1,2,3,4,5,6** (Sai): Không có phép cộng số nào ở đây; các phần tử không được cộng lại thành tổng.
