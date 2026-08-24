---
id: quiz-python-python-xac-dinh-mot-khoi-lenh-body-cua-if-for-def-bang-cach-nao
position: backend
technology: python
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Python xác định một khối lệnh (body của if, for, def...) bằng cách nào?

## Đáp án trắc nghiệm
- [x] Bằng thụt đầu dòng: các dòng cùng mức thụt sau dấu hai chấm tạo thành một khối
- [ ] Bằng cặp ngoặc nhọn { } như C/Java/JavaScript
- [ ] Thụt dòng chỉ là quy ước cho dễ đọc, viết sát lề trái vẫn chạy bình thường
- [ ] Bằng từ khoá begin và end bao quanh khối

## Giải thích (VI)
Python dùng thụt đầu dòng làm cú pháp: sau dòng kết thúc bằng : (như if, for, def, class), các dòng thụt vào cùng một mức tạo thành khối; khối kết thúc khi mức thụt quay về như cũ. Không thụt hoặc thụt lệch mức ném IndentationError. Quy ước chuẩn (PEP 8) là 4 dấu cách mỗi mức, không trộn tab với space.

### Giải thích các phương án:
- **Bằng thụt đầu dòng: các dòng cùng mức thụt sau dấu hai chấm tạo thành một khối** (Đúng): Thiếu thụt dòng ném IndentationError. Indentation là cú pháp bắt buộc của Python, không phải trang trí: khối lệnh bắt đầu sau : và được xác định bằng mức thụt dòng thống nhất. Mức thụt phải thống nhất trong cùng một khối.
- **Bằng cặp ngoặc nhọn { } như C/Java/JavaScript** (Sai): Python không dùng {} cho khối lệnh (ngoặc nhọn dành cho dict/set); ranh giới khối là mức thụt dòng.
- **Thụt dòng chỉ là quy ước cho dễ đọc, viết sát lề trái vẫn chạy bình thường** (Sai): Sai: def f(): mà dòng body không thụt vào sẽ ném IndentationError: expected an indented block — đây là lỗi cú pháp, không chạy được.
- **Bằng từ khoá begin và end bao quanh khối** (Sai): Python không có begin/end; khối kết thúc khi mức thụt dòng quay về mức bên ngoài.
