---
id: quiz-python-bool-la-subclass-cua-int-doan-code-sau-in-ra-gi
position: backend
technology: python
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
bool là subclass của int — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] True True True
- [x] 2 3 True
- [ ] TypeError
- [ ] 2 3 False

## Giải thích (VI)
In ra 2, 3, True. Trong Python, bool là một subclass của int: True bằng 1 và False bằng 0. Vì vậy True + True được tính như 1 + 1 = 2, và isinstance(True, int) trả về True. Đây là lý do sum([True, False, True]) đếm được số phần tử thỏa điều kiện.

### Giải thích các phương án:
- **True True True** (Sai): Sai — + trên bool ép về số nguyên (1 + 1 = 2), không phải phép OR logic.
- **2 3 True** (Đúng): bool là subclass của int, với True == 1 và False == 0, nên cộng như số nguyên; isinstance(True, int) là True.
- **TypeError** (Sai): Không có lỗi — bool cộng được vì bản chất là số nguyên.
- **2 3 False** (Sai): Sai dòng cuối — bool KẾ THỪA int, nên isinstance(True, int) trả True.
