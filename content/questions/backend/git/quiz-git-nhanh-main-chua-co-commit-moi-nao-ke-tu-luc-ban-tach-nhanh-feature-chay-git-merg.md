---
id: quiz-git-nhanh-main-chua-co-commit-moi-nao-ke-tu-luc-ban-tach-nhanh-feature-chay-git-merg
position: backend
technology: git
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nhánh main chưa có commit mới nào kể từ lúc bạn tách nhánh feature. Chạy git merge feature từ main cho kết quả gì?

## Đáp án trắc nghiệm
- [x] Fast-forward: Git đẩy con trỏ main tới commit cuối của feature
- [ ] Luôn tạo một merge commit có hai commit cha
- [ ] Báo lỗi vì hai nhánh không có điểm khác biệt để gộp
- [ ] Tự động xóa nhánh feature sau khi gộp xong

## Giải thích (VI)
Fast-forward — con trỏ main chỉ việc tiến lên commit cuối của feature. Không có merge commit, lịch sử tuyến tính. Muốn luôn có merge commit để thấy rõ ranh giới của một tính năng thì dùng git merge --no-ff feature.

### Giải thích các phương án:
- **Fast-forward: Git đẩy con trỏ main tới commit cuối của feature** (Đúng): Không có commit nào phân kỳ nên không cần merge commit; chỉ cần dời con trỏ. Không có merge commit nào được tạo và lịch sử vẫn tuyến tính.
- **Luôn tạo một merge commit có hai commit cha** (Sai): Merge commit chỉ cần khi hai nhánh thực sự phân kỳ, trừ khi ép bằng --no-ff.
- **Báo lỗi vì hai nhánh không có điểm khác biệt để gộp** (Sai): Có commit mới ở feature nên hoàn toàn gộp được.
- **Tự động xóa nhánh feature sau khi gộp xong** (Sai): Git không tự xóa nhánh; phải git branch -d thủ công.
