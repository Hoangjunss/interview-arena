---
id: quiz-cpp-bao-dam-manh-ve-an-toan-ngoai-le-nghia-la-gi
position: backend
technology: cpp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bảo đảm mạnh về an toàn ngoại lệ nghĩa là gì?

## Đáp án trắc nghiệm
- [ ] Ngoại lệ luôn được bắt bên trong hàm
- [ ] Bộ nhớ được giải phóng tự động khi có ngoại lệ
- [x] Thất bại thì trạng thái giữ nguyên như cũ
- [ ] Thao tác được bảo đảm không bao giờ ném ngoại lệ

## Giải thích (VI)
Bảo đảm mạnh nghĩa là nếu thao tác ném ngoại lệ thì trạng thái giữ nguyên như trước khi gọi , không có thay đổi một phần. Đây là mức giữa của ba mức: cơ bản, mạnh, và không bao giờ ném.

### Giải thích các phương án:
- **Ngoại lệ luôn được bắt bên trong hàm** (Sai): Ngoại lệ vẫn lan ra ngoài, chỉ là trạng thái không bị hỏng.
- **Bộ nhớ được giải phóng tự động khi có ngoại lệ** (Sai): Đó là hệ quả của việc gắn tài nguyên vào vòng đời đối tượng.
- **Thất bại thì trạng thái giữ nguyên như cũ** (Đúng): Không có thay đổi một phần, giống như thao tác chưa từng được thực hiện.
- **Thao tác được bảo đảm không bao giờ ném ngoại lệ** (Sai): Đó là bảo đảm không ném, một mức khác.
