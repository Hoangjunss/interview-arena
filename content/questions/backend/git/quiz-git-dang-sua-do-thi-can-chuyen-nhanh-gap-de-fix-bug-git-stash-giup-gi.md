---
id: quiz-git-dang-sua-do-thi-can-chuyen-nhanh-gap-de-fix-bug-git-stash-giup-gi
position: backend
technology: git
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đang sửa dở thì cần chuyển nhánh gấp để fix bug. git stash giúp gì?

## Đáp án trắc nghiệm
- [ ] Tạo một commit ẩn trên nhánh hiện tại mà git log không hiển thị
- [ ] Đẩy thay đổi chưa commit lên remote để backup
- [ ] Khóa nhánh lại để người khác không push vào trong lúc bạn đang sửa
- [x] Cất thay đổi chưa commit vào một ngăn tạm, trả working directory về trạng thái sạch

## Giải thích (VI)
git stash cất thay đổi chưa commit vào ngăn tạm và làm sạch working directory. git stash pop lấy ra và xóa khỏi ngăn; git stash apply lấy ra nhưng vẫn giữ lại. Mặc định stash KHÔNG cất file untracked — cần -u.

### Giải thích các phương án:
- **Tạo một commit ẩn trên nhánh hiện tại mà git log không hiển thị** (Sai): Stash lưu ở vùng riêng (refs/stash), không nằm trong lịch sử nhánh.
- **Đẩy thay đổi chưa commit lên remote để backup** (Sai): Stash hoàn toàn cục bộ, mặc định không đi kèm khi push.
- **Khóa nhánh lại để người khác không push vào trong lúc bạn đang sửa** (Sai): Git không có cơ chế khóa nhánh kiểu này.
- **Cất thay đổi chưa commit vào một ngăn tạm, trả working directory về trạng thái sạch** (Đúng): Đúng công dụng của stash — nơi cất tạm việc đang dở. Nhờ đó chuyển nhánh thoải mái, rồi quay lại lấy ra bằng git stash pop.
