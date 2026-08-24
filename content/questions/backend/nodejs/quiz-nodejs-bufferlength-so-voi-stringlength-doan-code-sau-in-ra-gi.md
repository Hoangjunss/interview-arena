---
id: quiz-nodejs-bufferlength-so-voi-stringlength-doan-code-sau-in-ra-gi
position: backend
technology: nodejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Buffer.length so với String.length — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] 2 3
- [ ] 2 2
- [ ] 3 3
- [x] 3 2

## Giải thích (VI)
In 3 2. Buffer.length đếm BYTE sau khi mã hóa UTF-8 — "é" chiếm 2 byte nên tổng 3. String.length đếm code unit UTF-16 — "hé" là 2. Ký tự ngoài ASCII làm hai con số này lệch nhau. (FREE)

### Giải thích các phương án:
- **2 3** (Sai): Sai — đảo ngược: buffer (byte) mới là bên lớn hơn, string length là 2.
- **2 2** (Sai): Sai — hiểu nhầm rằng buf.length đếm ký tự. Buffer đo BYTE; "é" cần 2 byte trong UTF-8 nên tổng là 3.
- **3 3** (Sai): Sai — .length của string JavaScript đếm code unit UTF-16, "hé" chỉ gồm 2 code unit, không liên quan tới số byte UTF-8.
- **3 2** (Đúng): Buffer.from mã hóa UTF-8: "h" chiếm 1 byte, "é" chiếm 2 byte → buffer dài 3 BYTE. .length của string đếm code unit UTF-16 → 2. Hai thước đo khác nhau.
