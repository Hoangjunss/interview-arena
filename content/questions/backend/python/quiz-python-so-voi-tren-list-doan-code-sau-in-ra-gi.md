---
id: quiz-python-so-voi-tren-list-doan-code-sau-in-ra-gi
position: backend
technology: python
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
+= so với + trên list — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] [1, 2] [1, 2]
- [x] [1, 2, 3] [1, 2]
- [ ] [1, 2] [1, 2, 3]
- [ ] [1, 2, 3] [1, 2, 3]

## Giải thích (VI)
In ra [1, 2, 3] rồi [1, 2]. Với list, a += [3] gọi __iadd__ — mở rộng list NGAY TẠI CHỖ (như extend), nên alias b cũng thấy phần tử 3. Còn c = c + [3] tạo một list MỚI rồi gán lại cho c; biến d vẫn trỏ tới list cũ nên giữ nguyên [1, 2]. += và + khác nhau về việc mutate-tại-chỗ hay tạo-mới.

### Giải thích các phương án:
- **[1, 2] [1, 2]** (Sai): Sai dòng đầu — += trên list là mở rộng in-place, b (alias) cũng thấy thay đổi.
- **[1, 2, 3] [1, 2]** (Đúng): a += [3] gọi __iadd__, mở rộng list TẠI CHỖ nên b thấy 3; c = c + [3] tạo list MỚI và gán lại c, d không đổi.
- **[1, 2] [1, 2, 3]** (Sai): Đảo ngược cả hai — += mới là in-place (ảnh hưởng b), còn + mới tạo bản mới (không ảnh hưởng d).
- **[1, 2, 3] [1, 2, 3]** (Sai): Sai dòng hai — c + [3] tạo list mới rồi gán lại c; d vẫn trỏ list cũ nên không có 3.
