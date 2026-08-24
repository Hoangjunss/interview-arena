---
id: quiz-python-chuoi-so-sanh-so-voi-so-sanh-long-doan-code-sau-in-ra-gi
position: backend
technology: python
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chuỗi so sánh so với so sánh lồng — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] True 1
- [ ] False False
- [x] True False
- [ ] True True

## Giải thích (VI)
In ra True rồi False. Python cho phép NỐI chuỗi so sánh: 5 > 3 > 1 nghĩa là (5 > 3) and (3 > 1), với 3 chỉ được đánh giá một lần → True. Nhưng khi bọc ngoặc (5 > 3) > 1, ta ép tính True trước (bằng 1) rồi so 1 > 1 → False. Ngoặc phá vỡ cơ chế chained comparison.

### Giải thích các phương án:
- **True 1** (Sai): Sai — phép so sánh trả về bool (False), không phải số 1.
- **False False** (Sai): Sai dòng đầu — chuỗi so sánh 5 > 3 > 1 đúng cả hai vế nên trả True.
- **True False** (Đúng): Chained: 5 > 3 > 1 là (5 > 3) and (3 > 1) → True. Còn (5 > 3) > 1 là True > 1 → 1 > 1 → False.
- **True True** (Sai): Sai dòng hai — (5 > 3) cho True (=1), rồi 1 > 1 là False.
