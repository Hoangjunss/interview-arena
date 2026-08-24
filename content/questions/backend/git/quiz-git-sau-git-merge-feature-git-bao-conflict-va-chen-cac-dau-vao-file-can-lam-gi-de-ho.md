---
id: quiz-git-sau-git-merge-feature-git-bao-conflict-va-chen-cac-dau-vao-file-can-lam-gi-de-ho
position: backend
technology: git
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sau git merge feature, Git báo conflict và chèn các dấu <<<<<<<, =======, >>>>>>> vào file. Cần làm gì để hoàn tất?

## Đáp án trắc nghiệm
- [ ] Chạy git merge --continue là đủ, không cần đụng vào file
- [x] Sửa file thành nội dung mong muốn, git add để đánh dấu đã giải quyết, rồi git commit
- [ ] Xóa file đi rồi checkout lại từ nhánh main
- [ ] Chỉ cần sửa file rồi git commit, không cần git add vì Git tự nhận ra đã hết dấu conflict

## Giải thích (VI)
Ba bước: sửa file cho đúng ý và xóa hết dấu <<<<<<< ======= >>>>>>>; git add <file> để báo Git đã xong; git commit để tạo merge commit. Muốn hủy giữa chừng thì git merge --abort.

### Giải thích các phương án:
- **Chạy git merge --continue là đủ, không cần đụng vào file** (Sai): Dấu conflict vẫn còn trong file thì code sẽ hỏng; phải sửa trước.
- **Sửa file thành nội dung mong muốn, git add để đánh dấu đã giải quyết, rồi git commit** (Đúng): Đây đúng ba bước chuẩn: sửa → add → commit. Nhớ xóa hết các dấu conflict trước khi add, vì Git không tự kiểm tra điều đó.
- **Xóa file đi rồi checkout lại từ nhánh main** (Sai): Cách này vứt bỏ luôn thay đổi từ nhánh kia, không phải giải quyết conflict.
- **Chỉ cần sửa file rồi git commit, không cần git add vì Git tự nhận ra đã hết dấu conflict** (Sai): Git dựa vào việc file được add để biết conflict đã được giải quyết, không tự quét nội dung.
