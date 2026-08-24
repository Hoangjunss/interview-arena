---
id: quiz-cpp-tu-khoa-auto-trong-c-hien-dai-hoat-dong-the-nao
position: backend
technology: cpp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Từ khoá auto trong C++ hiện đại hoạt động thế nào?

## Đáp án trắc nghiệm
- [x] Trình biên dịch suy ra kiểu từ biểu thức khởi tạo
- [ ] Biến được cấp phát động thay vì trên stack
- [ ] Trình biên dịch chọn kiểu chiếm ít bộ nhớ nhất
- [ ] Biến có thể nhận giá trị thuộc kiểu bất kỳ lúc chạy

## Giải thích (VI)
Trình biên dịch suy ra kiểu từ biểu thức khởi tạo ngay lúc biên dịch. Đây là suy luận kiểu tĩnh chứ không phải kiểu động, nên không có chi phí lúc chạy và biến không đổi kiểu về sau.

### Giải thích các phương án:
- **Trình biên dịch suy ra kiểu từ biểu thức khởi tạo** (Đúng): Kiểu vẫn được xác định lúc biên dịch, chỉ là người viết không phải gõ ra.
- **Biến được cấp phát động thay vì trên stack** (Sai): Nơi cấp phát không đổi vì từ khoá này.
- **Trình biên dịch chọn kiểu chiếm ít bộ nhớ nhất** (Sai): Kiểu được suy ra từ biểu thức chứ không theo tiêu chí bộ nhớ.
- **Biến có thể nhận giá trị thuộc kiểu bất kỳ lúc chạy** (Sai): C++ có kiểu tĩnh, biến không đổi kiểu sau khi suy luận.
