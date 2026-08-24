---
id: quiz-cpp-con-tro-so-hu-doc-quyen-khac-con-tro-chia-se-o-diem-nao
position: backend
technology: cpp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Con trỏ sở hữu độc quyền khác con trỏ chia sẻ ở điểm nào?

## Đáp án trắc nghiệm
- [x] Độc quyền không sao chép được và không tốn bộ đếm
- [ ] Độc quyền chỉ dùng được cho mảng
- [ ] Chia sẻ không dùng được với lớp tự định nghĩa
- [ ] Độc quyền không giải phóng đối tượng khi ra khỏi phạm vi

## Giải thích (VI)
Con trỏ độc quyền không sao chép được, chỉ chuyển quyền sở hữu , và không tốn bộ đếm nào. Con trỏ chia sẻ duy trì bộ đếm tham chiếu thread-safe, nên tốn hơn và nên dùng khi quyền sở hữu thật sự được chia sẻ.

### Giải thích các phương án:
- **Độc quyền không sao chép được và không tốn bộ đếm** (Đúng): Chia sẻ phải duy trì bộ đếm tham chiếu an toàn luồng nên tốn hơn cả bộ nhớ lẫn thời gian.
- **Độc quyền chỉ dùng được cho mảng** (Sai): Nó dùng cho cả đối tượng đơn lẻ và mảng.
- **Chia sẻ không dùng được với lớp tự định nghĩa** (Sai): Dùng được với mọi kiểu.
- **Độc quyền không giải phóng đối tượng khi ra khỏi phạm vi** (Sai): Nó giải phóng đúng như mong đợi.
