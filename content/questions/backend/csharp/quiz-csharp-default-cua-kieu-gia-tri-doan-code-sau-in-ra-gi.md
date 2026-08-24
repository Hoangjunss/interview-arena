---
id: quiz-csharp-default-cua-kieu-gia-tri-doan-code-sau-in-ra-gi
position: backend
technology: csharp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
default của kiểu giá trị — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [x] 0 False
- [ ] 0 0
- [ ] 0 false
- [ ] null False

## Giải thích (VI)
In 0 rồi False. default(int) là 0 vì kiểu giá trị số mặc định bằng 0. default(bool) là false, và khi in, Boolean.ToString() trả về "False" với chữ F viết hoa. Lưu ý: chỉ kiểu tham chiếu (và nullable như int?) mới có mặc định null; kiểu giá trị luôn có mặc định "zero-bit" cụ thể.

### Giải thích các phương án:
- **0 False** (Đúng): Giá trị mặc định của int là 0. Giá trị mặc định của bool là false, và Boolean.ToString() trả về "False" (viết hoa chữ F) khi in.
- **0 0** (Sai): Sai — mặc định của bool là false (in ra "False"), không phải số 0.
- **0 false** (Sai): Sai phần hoa/thường — bool.ToString() (Console.WriteLine dùng ToString) trả về "False" với chữ F hoa, không phải "false".
- **null False** (Sai): Sai — int là kiểu giá trị, mặc định là 0 chứ không phải null (chỉ kiểu tham chiếu và int? mới mặc định null).
