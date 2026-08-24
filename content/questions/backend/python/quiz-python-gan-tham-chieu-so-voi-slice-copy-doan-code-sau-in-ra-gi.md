---
id: quiz-python-gan-tham-chieu-so-voi-slice-copy-doan-code-sau-in-ra-gi
position: backend
technology: python
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Gán tham chiếu so với slice copy — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] [1, 2, 3, 4] [1, 2, 3, 4]
- [ ] [1, 2, 3] [1, 2, 3, 4]
- [ ] [1, 2, 3] [1, 2, 3]
- [x] [1, 2, 3, 4] [1, 2, 3]

## Giải thích (VI)
In ra [1, 2, 3, 4] rồi [1, 2, 3]. Phép gán b = a KHÔNG sao chép list — nó chỉ tạo thêm một tên trỏ tới cùng object, nên a.append(4) cũng hiện ra qua b. Ngược lại c = a[:] tạo một bản sao nông (shallow copy) độc lập, nên c giữ nguyên [1, 2, 3]. Đây là khác biệt cốt lõi giữa aliasing và copy.

### Giải thích các phương án:
- **[1, 2, 3, 4] [1, 2, 3, 4]** (Sai): Sai — c = a[:] là bản sao mới, không bị ảnh hưởng bởi a.append.
- **[1, 2, 3] [1, 2, 3, 4]** (Sai): Đảo ngược — chính b (alias) mới thấy 4, còn c (bản sao) thì không.
- **[1, 2, 3] [1, 2, 3]** (Sai): Sai — b là alias của cùng một list nên phản ánh thay đổi (thêm 4).
- **[1, 2, 3, 4] [1, 2, 3]** (Đúng): b = a chỉ tạo tên khác trỏ cùng list nên thấy 4; c = a[:] tạo bản sao nông độc lập nên không đổi.
