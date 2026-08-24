---
id: quiz-python-thu-tu-khoa-cua-dict-doan-code-sau-in-ra-gi
position: backend
technology: python
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thứ tự khoá của dict — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] ['c', 'a', 'b']
- [ ] ['a', 'b', 'c']
- [ ] Thứ tự không xác định
- [x] ['b', 'a', 'c']

## Giải thích (VI)
In ra ['b', 'a', 'c']. Từ Python 3.7 trở đi, dict bảo toàn thứ tự CHÈN như một đảm bảo của ngôn ngữ (trước đó là chi tiết cài đặt của CPython 3.6). Vì thế duyệt khóa cho ra đúng thứ tự thêm vào: b, a, c — dict KHÔNG tự sắp xếp theo alphabet. Muốn thứ tự khác, dùng sorted(d).

### Giải thích các phương án:
- **['c', 'a', 'b']** (Sai): Sai — thứ tự chèn là b → a → c, không đảo ngược hay xáo trộn.
- **['a', 'b', 'c']** (Sai): Sai — dict KHÔNG tự sắp xếp khóa; nó giữ thứ tự chèn, không phải thứ tự alphabet.
- **Thứ tự không xác định** (Sai): Sai với Python hiện đại — từ 3.7 thứ tự chèn được đảm bảo về mặt ngôn ngữ.
- **['b', 'a', 'c']** (Đúng): Từ Python 3.7, dict bảo toàn thứ tự CHÈN; keys ra đúng thứ tự b, a, c như lúc thêm.
