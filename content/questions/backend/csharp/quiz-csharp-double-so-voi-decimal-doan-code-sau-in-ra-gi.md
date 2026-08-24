---
id: quiz-csharp-double-so-voi-decimal-doan-code-sau-in-ra-gi
position: backend
technology: csharp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
double so với decimal — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] True True
- [x] False True
- [ ] False False
- [ ] True False

## Giải thích (VI)
In False rồi True. double dùng dấu phẩy động nhị phân IEEE 754, không biểu diễn chính xác 0.1/0.2/0.3, nên 0.1 + 0.2 ra 0.30000000000000004, khác 0.3 → False. Hậu tố m tạo decimal (dấu phẩy động thập phân) biểu diễn chính xác các số này nên 0.1m + 0.2m đúng bằng 0.3m → True. Đừng dùng == để so hai double; hãy so sai số trong ngưỡng epsilon.

### Giải thích các phương án:
- **True True** (Sai): Sai dòng đầu — với double, 0.1 + 0.2 không đúng bằng 0.3 do sai số làm tròn nhị phân, nên phép so sánh là False.
- **False True** (Đúng): 0.1, 0.2, 0.3 là double (nhị phân IEEE 754) không biểu diễn chính xác được, nên 0.1 + 0.2 ra 0.30000000000000004 ≠ 0.3 → False. Còn hậu tố m là decimal (thập phân, chính xác cho các số này) → 0.1m + 0.2m đúng bằng 0.3m → True.
- **False False** (Sai): Sai dòng sau — decimal biểu diễn chính xác các phân số thập phân này nên 0.1m + 0.2m đúng bằng 0.3m → True.
- **True False** (Sai): Sai cả hai — double cho False (sai số nhị phân), decimal cho True (chính xác); đáp án bị đảo.
