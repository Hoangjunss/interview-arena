---
id: quiz-python-va-chia-so-am-doan-code-sau-in-ra-gi
position: backend
technology: python
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
/, // và chia số âm — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] 3.5 3.5 3.5
- [x] 3.5 3 4
- [ ] 3 3 3
- [ ] 3.5 3 3

## Giải thích (VI)
In ra 3.5, 3, -4. Trong Python 3, / là chia thực và luôn trả về float (7 / 2 = 3.5). // là chia lấy sàn (floor division): làm tròn XUỐNG về phía âm vô cực, nên 7 // 2 = 3 nhưng -7 // 2 = -4 (không phải -3). Đây là điểm hay nhầm với kiểu cắt-về-0 của C/Java.

### Giải thích các phương án:
- **3.5 3.5 3.5** (Sai): Sai — // là chia lấy sàn, luôn trả về phần nguyên (kiểu int khi cả hai toán hạng là int).
- **3.5 3 4** (Đúng): / luôn trả float (3.5); // là chia lấy sàn (floor), làm tròn XUỐNG về âm vô cực nên -7 // 2 = -4.
- **3 3 3** (Sai): Sai dòng đầu — trong Python 3, / là chia thực trả float 3.5, không phải chia nguyên.
- **3.5 3 3** (Sai): Sai dòng cuối — // làm tròn xuống (floor), không cắt về 0; -7/2 = -3.5 → sàn là -4.
