---
id: quiz-git-nhng-phat-bieu-nao-sau-day-dung-ve-gitignore-chon-nhieu-dap-an
position: backend
technology: git
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những phát biểu nào sau đây đúng về .gitignore? (chọn nhiều đáp án)

## Đáp án trắc nghiệm
- [ ] Thêm file secret vào .gitignore sẽ xóa luôn nội dung của nó khỏi các commit đã có trong lịch sử
- [x] Quy tắc ignore chỉ áp cho file CHƯA được theo dõi; file đã commit vẫn tiếp tục được theo dõi cho tới khi git rm --cached

## Giải thích (VI)
.gitignore chỉ chặn file chưa tracked. Vị trí dấu / quyết định phạm vi mẫu. git check-ignore -v là công cụ gỡ rối khi không rõ quy tắc nào đang áp dụng. Và nó không hề dọn được secret đã nằm trong lịch sử.

### Giải thích các phương án:
- **Thêm file secret vào .gitignore sẽ xóa luôn nội dung của nó khỏi các commit đã có trong lịch sử** (Sai): .gitignore không đụng tới lịch sử; secret đã commit vẫn đọc lại được và phải xoay khóa.
- **Quy tắc ignore chỉ áp cho file CHƯA được theo dõi; file đã commit vẫn tiếp tục được theo dõi cho tới khi git rm --cached** (Đúng): Đây là ngữ nghĩa được ghi rõ trong tài liệu.
