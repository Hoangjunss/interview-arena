---
id: quiz-csharp-toan-tu-doan-code-sau-in-ra-gi
position: backend
technology: csharp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Toán tử ?? — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] guest guest
- [ ] dev
- [x] guest dev
- [ ] null dev

## Giải thích (VI)
In guest rồi dev. Toán tử null-coalescing ?? trả về toán hạng phải khi toán hạng trái là null, và trả về chính toán hạng trái khi nó khác null. name là null nên lấy "guest"; other là "dev" (không null) nên giữ nguyên "dev". Đây là cách gọn để cung cấp giá trị mặc định thay cho null.

### Giải thích các phương án:
- **guest guest** (Sai): Sai — other là "dev" chứ không null, nên other ?? "guest" trả về "dev", không phải "guest".
- **dev** (Sai): Sai — vì name là null nên ?? dùng nhánh phải "guest", không in dòng trống.
- **guest dev** (Đúng): ?? trả về toán hạng phải khi toán hạng trái là null, ngược lại trả về toán hạng trái. name là null → "guest"; other là "dev" (khác null) → "dev".
- **null dev** (Sai): Sai — mục đích của ?? chính là thay null bằng giá trị mặc định, nên không in ra "null".
