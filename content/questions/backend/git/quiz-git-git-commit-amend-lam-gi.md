---
id: quiz-git-git-commit-amend-lam-gi
position: backend
technology: git
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
git commit --amend làm gì?

## Đáp án trắc nghiệm
- [ ] Thêm một commit mới ghi đè lên commit trước, lịch sử có hai commit
- [ ] Sửa trực tiếp nội dung commit cũ, giữ nguyên hash
- [x] Thay commit gần nhất bằng một commit mới gồm nội dung cũ cộng phần đang staged
- [ ] Hoàn tác commit gần nhất và trả thay đổi về working directory

## Giải thích (VI)
Amend gộp phần đang staged vào commit gần nhất và cho sửa message, tạo ra một commit MỚI thay chỗ commit cũ. Hash đổi. Vì hash đổi nên chỉ dùng an toàn khi commit đó chưa được push.

### Giải thích các phương án:
- **Thêm một commit mới ghi đè lên commit trước, lịch sử có hai commit** (Sai): Amend thay thế chứ không thêm — lịch sử vẫn chỉ có một commit ở vị trí đó.
- **Sửa trực tiếp nội dung commit cũ, giữ nguyên hash** (Sai): Commit là bất biến; đổi nội dung thì bắt buộc đổi hash.
- **Thay commit gần nhất bằng một commit mới gồm nội dung cũ cộng phần đang staged** (Đúng): Commit cũ bị thay thế nên hash thay đổi. Amend tạo commit mới chứ không sửa tại chỗ, vì commit trong Git là bất biến. Message sửa được luôn, và vì commit cũ bị thay thế nên hash thay đổi.
- **Hoàn tác commit gần nhất và trả thay đổi về working directory** (Sai): Đó là git reset --mixed HEAD~1.
