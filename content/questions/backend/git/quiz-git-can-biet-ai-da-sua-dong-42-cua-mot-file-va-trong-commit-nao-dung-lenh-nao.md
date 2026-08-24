---
id: quiz-git-can-biet-ai-da-sua-dong-42-cua-mot-file-va-trong-commit-nao-dung-lenh-nao
position: backend
technology: git
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cần biết ai đã sửa dòng 42 của một file và trong commit nào. Dùng lệnh nào?

## Đáp án trắc nghiệm
- [ ] git status <file> — hiển thị lịch sử chỉnh sửa của file
- [ ] git diff <file> — liệt kê mọi người từng chạm vào file
- [ ] git fetch <file> — tải lịch sử của riêng file đó về
- [x] git blame <file>

## Giải thích (VI)
git blame <file> gán cho mỗi dòng commit đã sửa nó lần cuối, kèm tác giả và ngày. Muốn xem sâu hơn: git log -L 42,42:<file> cho toàn bộ lịch sử thay đổi của riêng dòng đó.

### Giải thích các phương án:
- **git status <file> — hiển thị lịch sử chỉnh sửa của file** (Sai): git status chỉ cho biết trạng thái hiện tại, không có lịch sử.
- **git diff <file> — liệt kê mọi người từng chạm vào file** (Sai): git diff so sánh hai trạng thái, không quy trách nhiệm theo dòng.
- **git fetch <file> — tải lịch sử của riêng file đó về** (Sai): git fetch làm việc với remote và không nhận tham số là file.
- **git blame <file>** (Đúng): Đây đúng công dụng của git blame. Nó in ra từng dòng kèm commit, tác giả và thời điểm sửa dòng đó lần cuối.
