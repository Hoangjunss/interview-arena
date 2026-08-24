---
id: quiz-cpp-vi-sao-ma-c-hien-dai-tranh-dung-cap-lenh-cap-phat-va-giai-phong-thu-cong
position: backend
technology: cpp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao mã C++ hiện đại tránh dùng cặp lệnh cấp phát và giải phóng thủ công?

## Đáp án trắc nghiệm
- [ ] Cấp phát thủ công không dùng được với lớp tự định nghĩa
- [x] Dễ rò rỉ khi có ngoại lệ hoặc nhiều đường thoát
- [ ] Trình biên dịch mới không còn hỗ trợ hai lệnh đó
- [ ] Cấp phát thủ công chậm hơn smart pointer

## Giải thích (VI)
Vì rất dễ rò rỉ: chỉ cần một lệnh trả về sớm hoặc một ngoại lệ là lệnh giải phóng bị bỏ qua. Smart pointer gắn việc giải phóng vào vòng đời của đối tượng , nên nó luôn xảy ra bất kể hàm thoát ra bằng đường nào.

### Giải thích các phương án:
- **Cấp phát thủ công không dùng được với lớp tự định nghĩa** (Sai): Vẫn dùng được bình thường với mọi kiểu.
- **Dễ rò rỉ khi có ngoại lệ hoặc nhiều đường thoát** (Đúng): Một lệnh trả về sớm hoặc một ngoại lệ là đủ để bỏ qua lệnh giải phóng.
- **Trình biên dịch mới không còn hỗ trợ hai lệnh đó** (Sai): Chúng vẫn hợp lệ và vẫn dùng được.
- **Cấp phát thủ công chậm hơn smart pointer** (Sai): Con trỏ thông minh cũng cấp phát như vậy, chi phí gần như tương đương.
