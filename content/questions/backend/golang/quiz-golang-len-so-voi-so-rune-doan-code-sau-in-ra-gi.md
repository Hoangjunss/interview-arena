---
id: quiz-golang-len-so-voi-so-rune-doan-code-sau-in-ra-gi
position: backend
technology: golang
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
len so với số rune — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] 6 6
- [x] 6 5
- [ ] 5 6
- [ ] 5 5

## Giải thích (VI)
In 6 5. String trong Go là chuỗi byte UTF-8; len(s) đếm BYTE. Chữ "é" chiếm 2 byte nên chuỗi dài 6 byte nhưng chỉ 5 rune (ký tự). Muốn đếm ký tự, dùng utf8.RuneCountInString hoặc range. (FREE)

### Giải thích các phương án:
- **6 6** (Sai): Sai — RuneCountInString đếm ký tự Unicode (5), không đếm byte.
- **6 5** (Đúng): len trên string đếm BYTE, không đếm ký tự. Chữ "é" (U+00E9) mã hoá UTF-8 hết 2 byte nên chuỗi dài 6 byte, nhưng có 5 rune → RuneCountInString trả 5.
- **5 6** (Sai): Sai — số byte (6) lớn hơn số rune (5) chứ không ngược lại.
- **5 5** (Sai): Sai — len đếm byte; "é" chiếm 2 byte nên số byte là 6, không phải 5.
