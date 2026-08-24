---
id: quiz-golang-iota-va-dong-doan-code-sau-in-ra-gi
position: backend
technology: golang
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
iota và dòng _ — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] 1 2 3 5
- [x] 0 1 2 4
- [ ] 0 1 2 0
- [ ] 0 1 2 3

## Giải thích (VI)
In 0 1 2 4. iota bắt đầu từ 0 và tăng 1 mỗi dòng trong khối const, kể cả dòng _. Các dòng B, C, E kế thừa ngầm biểu thức = iota. Dòng _ "nuốt" giá trị 3, nên E = 4. (FREE)

### Giải thích các phương án:
- **1 2 3 5** (Sai): Sai — iota khởi đầu từ 0, không phải 1.
- **0 1 2 4** (Đúng): iota bắt đầu từ 0 và TĂNG 1 theo mỗi dòng ConstSpec trong khối, kể cả dòng _. Nên A=0, B=1, C=2, _=3 (bị bỏ), E=4.
- **0 1 2 0** (Sai): Sai — B, C, E đều kế thừa biểu thức = iota ngầm, không reset về 0.
- **0 1 2 3** (Sai): Sai — dòng _ vẫn làm iota tăng lên 3, nên E nhận giá trị 4, không phải 3.
