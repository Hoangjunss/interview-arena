---
id: quiz-cpp-tham-chieu-khac-con-tro-o-diem-nao-trong-c
position: backend
technology: cpp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tham chiếu khác con trỏ ở điểm nào trong C++?

## Đáp án trắc nghiệm
- [ ] Tham chiếu chỉ dùng được với kiểu dựng sẵn
- [x] Tham chiếu gắn với đối tượng, không trỏ lại
- [ ] Tham chiếu tự giải phóng bộ nhớ khi ra khỏi phạm vi
- [ ] Tham chiếu chiếm ít bộ nhớ hơn con trỏ

## Giải thích (VI)
Tham chiếu bắt buộc gắn với một đối tượng lúc khởi tạo và không trỏ lại được . Không có tham chiếu rỗng, nên dùng nó cho tham số hàm loại bỏ được cả một nhóm lỗi liên quan tới con trỏ null.

### Giải thích các phương án:
- **Tham chiếu chỉ dùng được với kiểu dựng sẵn** (Sai): Nó dùng được với mọi kiểu, kể cả lớp tự định nghĩa.
- **Tham chiếu gắn với đối tượng, không trỏ lại** (Đúng): Không có tham chiếu rỗng và không trỏ lại được, nên nó an toàn hơn cho tham số hàm.
- **Tham chiếu tự giải phóng bộ nhớ khi ra khỏi phạm vi** (Sai): Tham chiếu không sở hữu đối tượng nên không giải phóng gì.
- **Tham chiếu chiếm ít bộ nhớ hơn con trỏ** (Sai): Trình biên dịch thường cài đặt tham chiếu bằng con trỏ nên chi phí tương đương.
