---
id: quiz-html-css-cach-chuan-de-lien-ket-mot-label-voi-o-input-cua-no-la-gi
position: frontend
technology: html-css
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách chuẩn để liên kết một <label> với ô input của nó là gì?

## Đáp án trắc nghiệm
- [x] for của label trùng id của input, hoặc bọc input trong label
- [ ] Chỉ cần đặt label đứng ngay trước input trong HTML là tự liên kết
- [ ] Dùng thuộc tính placeholder trên input để thay thế label
- [ ] Đặt for của label trùng với class của input

## Giải thích (VI)
Hai cách chuẩn: (1) đặt for của label trùng id của input — <label for="email">Email</label><input id="email">; (2) bọc input trong label — <label>Email <input></label>. Liên kết này giúp click vào chữ là focus/check input (tăng vùng bấm trên mobile) và screen reader đọc đúng tên ô nhập. Placeholder không thay được label.

### Giải thích các phương án:
- **for của label trùng id của input, hoặc bọc input trong label** (Đúng): Đúng cả hai cách hợp lệ: <label for="email"> + <input id="email">, hoặc <label>Email <input></label> — cả hai đều cho click label focus vào input và screen reader đọc đúng. Cả hai cách đều tạo liên kết mà trình đọc màn hình hiểu được.
- **Chỉ cần đặt label đứng ngay trước input trong HTML là tự liên kết** (Sai): Vị trí kề nhau không tạo liên kết ngữ nghĩa — screen reader không gắn được chữ với ô nhập, click vào chữ cũng không focus input.
- **Dùng thuộc tính placeholder trên input để thay thế label** (Sai): Placeholder biến mất khi người dùng gõ và không được screen reader đọc nhất quán — nó là gợi ý định dạng, không thay được label.
- **Đặt for của label trùng với class của input** (Sai): for chỉ khớp theo id, không nhận class — sai attribute thì liên kết không hình thành dù chữ vẫn hiển thị.
