---
id: quiz-git-sau-khi-chay-git-add-reporttxt-ban-sua-tiep-reporttxt-roi-git-commit-commit-chua
position: backend
technology: git
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sau khi chạy git add report.txt, bạn sửa tiếp report.txt rồi git commit. Commit chứa bản nào của file?

## Đáp án trắc nghiệm
- [ ] Cả hai bản, Git lưu thành hai phiên bản trong cùng một commit
- [ ] Git báo lỗi và từ chối commit vì file đã đổi sau khi add
- [x] Bản "phiên bản 1" — commit lấy nội dung từ staging area
- [ ] Bản "phiên bản 2" — commit luôn đọc nội dung file mới nhất trên đĩa

## Giải thích (VI)
Commit chứa "phiên bản 1". git add chụp lại nội dung file ngay tại thời điểm chạy lệnh. Sửa tiếp sau đó nằm ở working directory và không được commit. git status lúc này sẽ liệt kê file ở CẢ hai mục staged và not staged.

### Giải thích các phương án:
- **Cả hai bản, Git lưu thành hai phiên bản trong cùng một commit** (Sai): Một commit chỉ chứa một trạng thái duy nhất của mỗi file.
- **Git báo lỗi và từ chối commit vì file đã đổi sau khi add** (Sai): Git không coi đây là lỗi; nó commit đúng những gì đang staged.
- **Bản "phiên bản 1" — commit lấy nội dung từ staging area** (Đúng): git add chụp nội dung ngay lúc chạy, không phải tham chiếu tới file sẽ đọc lúc commit. Staging đã chụp lại file tại thời điểm git add, nên sửa sau đó chỉ nằm ở working directory.
- **Bản "phiên bản 2" — commit luôn đọc nội dung file mới nhất trên đĩa** (Sai): Commit đọc từ staging area, không đọc thẳng từ đĩa.
