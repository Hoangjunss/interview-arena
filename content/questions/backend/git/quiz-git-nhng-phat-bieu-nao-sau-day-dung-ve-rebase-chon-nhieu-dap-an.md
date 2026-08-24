---
id: quiz-git-nhng-phat-bieu-nao-sau-day-dung-ve-rebase-chon-nhieu-dap-an
position: backend
technology: git
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những phát biểu nào sau đây đúng về rebase? (chọn nhiều đáp án)

## Đáp án trắc nghiệm
- [x] Không rebase commit đã push lên nhánh dùng chung
- [ ] Rebase gộp mọi commit của nhánh thành đúng một commit duy nhất

## Giải thích (VI)
Rebase phát lại commit nên đổi hash — vì vậy đừng rebase thứ người khác đang dùng. Interactive rebase (-i) là công cụ dọn lịch sử trước khi mở pull request. Gặp conflict thì git add rồi --continue, hoặc --abort để quay về nguyên trạng.

### Giải thích các phương án:
- **Không rebase commit đã push lên nhánh dùng chung** (Đúng): Hash bị đổi sẽ làm lịch sử của họ phân kỳ. Đây là quy tắc được nêu thẳng trong tài liệu chính thức của Git. Hash bị đổi sẽ làm lịch sử của họ phân kỳ so với bản bạn vừa đẩy lên.
- **Rebase gộp mọi commit của nhánh thành đúng một commit duy nhất** (Sai): Đó là squash — rebase thường giữ nguyên số lượng commit, chỉ đổi commit cha.
