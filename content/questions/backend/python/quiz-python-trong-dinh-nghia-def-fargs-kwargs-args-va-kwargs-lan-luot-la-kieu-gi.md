---
id: quiz-python-trong-dinh-nghia-def-fargs-kwargs-args-va-kwargs-lan-luot-la-kieu-gi
position: backend
technology: python
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong định nghĩa def f(*args, **kwargs), args và kwargs lần lượt là kiểu gì?

## Đáp án trắc nghiệm
- [ ] Cả args lẫn kwargs đều là dict
- [x] args là một tuple chứa các đối số vị trí dư ra
- [ ] args là list, kwargs là set
- [ ] args là dict các keyword, kwargs là tuple các positional

## Giải thích (VI)
Trong định nghĩa hàm, *args gom mọi đối số vị trí dư ra vào một tuple, còn **kwargs gom mọi đối số từ khóa dư ra vào một dict tên→giá trị. Chúng cho phép hàm nhận số lượng đối số tùy ý. Ở phía gọi hàm, * và ** làm ngược lại: "bung" (unpack) một iterable/dict thành các đối số rời.

### Giải thích các phương án:
- **Cả args lẫn kwargs đều là dict** (Sai): args là tuple, không phải dict; chỉ kwargs mới là dict.
- **args là một tuple chứa các đối số vị trí dư ra** (Đúng): kwargs là một dict ánh xạ tên → giá trị của các đối số từ khóa dư ra. * gom các positional argument còn lại vào một tuple; ** gom các keyword argument còn lại vào một dict — đúng theo mô hình gọi hàm của Python.
- **args là list, kwargs là set** (Sai): *args cho tuple (không phải list) và **kwargs cho dict (không phải set).
- **args là dict các keyword, kwargs là tuple các positional** (Sai): Đảo ngược vai trò: * mới là positional→tuple, ** là keyword→dict.
