---
id: quiz-python-sai-so-dau-phay-dong-doan-code-sau-in-ra-gi
position: backend
technology: python
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sai số dấu phẩy động — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] 0.3000000000000000444 False
- [x] 0.30000000000000004 False
- [ ] 0.30000000000000004 True
- [ ] 0.3 False

## Giải thích (VI)
In ra 0.30000000000000004 rồi False. Số thực trong Python là float nhị phân IEEE-754 64-bit; 0.1 và 0.2 không biểu diễn chính xác được ở hệ nhị phân nên tổng bị lệch một chút. Vì thế so sánh bằng == với 0.3 cho False. So sánh float nên dùng dung sai, ví dụ math.isclose(a, b).

### Giải thích các phương án:
- **0.3000000000000000444 False** (Sai): Sai — sai số dấu chấm động khiến tổng không đúng bằng 0.3 và phép so sánh trả False.
- **0.30000000000000004 False** (Đúng): Số float là nhị phân IEEE-754; 0.1 và 0.2 không biểu diễn chính xác nên tổng lệch nhẹ, khác 0.3.
- **0.30000000000000004 True** (Sai): Dòng hai sai — tổng khác 0.3 nên == trả False.
- **0.3 False** (Sai): Dòng đầu sai — print hiển thị 0.30000000000000004, không làm tròn thành 0.3.
