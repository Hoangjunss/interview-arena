---
id: quiz-linux-os-sigterm-va-sigkill-khac-nhau-the-nao
position: backend
technology: linux-os
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SIGTERM và SIGKILL khác nhau thế nào?

## Đáp án trắc nghiệm
- [ ] SIGTERM dừng tiến trình còn SIGKILL chỉ tạm dừng nó
- [ ] SIGKILL gửi được cho tiến trình con, SIGTERM thì không
- [x] SIGTERM bắt được để dọn dẹp, SIGKILL không
- [ ] SIGTERM cần quyền root còn SIGKILL thì không cần

## Giải thích (VI)
SIGTERM (mặc định của kill) bắt được: tiến trình chạy handler để đóng kết nối, ghi dữ liệu rồi thoát. SIGKILL (kill -9) do kernel thực hiện, không bắt được và không bỏ qua được — tiến trình bị dừng ngay.

### Giải thích các phương án:
- **SIGTERM dừng tiến trình còn SIGKILL chỉ tạm dừng nó** (Sai): Tạm dừng là SIGSTOP; cả hai signal này đều kết thúc tiến trình.
- **SIGKILL gửi được cho tiến trình con, SIGTERM thì không** (Sai): Cả hai đều gửi được cho bất kỳ tiến trình nào bạn có quyền.
- **SIGTERM bắt được để dọn dẹp, SIGKILL không** (Đúng): SIGKILL do kernel thực hiện nên tiến trình không có cơ hội chạy code nào.
- **SIGTERM cần quyền root còn SIGKILL thì không cần** (Sai): Quyền phụ thuộc vào chủ tiến trình, không phụ thuộc loại signal.
