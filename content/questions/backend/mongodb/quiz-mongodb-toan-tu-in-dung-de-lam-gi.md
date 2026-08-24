---
id: quiz-mongodb-toan-tu-in-dung-de-lam-gi
position: backend
technology: mongodb
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Toán tử $in dùng để làm gì?

## Đáp án trắc nghiệm
- [ ] Tìm document nằm trong một collection khác
- [ ] Kiểm tra một trường có tồn tại trong document hay không
- [x] Khớp document có giá trị nằm trong danh sách cho trước
- [ ] Chèn nhiều document cùng lúc

## Giải thích (VI)
$in khớp khi giá trị của trường trùng với bất kỳ phần tử nào trong mảng cho trước: { status: { $in: ["paid", "shipped"] } }. Với trường kiểu mảng, nó khớp khi có ít nhất một phần tử chung. $nin là phủ định.

### Giải thích các phương án:
- **Tìm document nằm trong một collection khác** (Sai): Nối collection là $lookup.
- **Kiểm tra một trường có tồn tại trong document hay không** (Sai): Đó là $exists.
- **Khớp document có giá trị nằm trong danh sách cho trước** (Đúng): Đây đúng ngữ nghĩa của $in — tương đương IN (...) của SQL.
- **Chèn nhiều document cùng lúc** (Sai): Chèn nhiều là insertMany.
