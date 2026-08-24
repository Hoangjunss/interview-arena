---
id: quiz-git-mot-commit-loi-da-duoc-push-len-nhanh-main-ma-ca-nhom-dang-dung-nen-hoan-tac-ban
position: backend
technology: git
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một commit lỗi đã được push lên nhánh main mà cả nhóm đang dùng. Nên hoàn tác bằng cách nào?

## Đáp án trắc nghiệm
- [ ] git commit --amend để sửa lại commit lỗi rồi push bình thường
- [ ] git reset --hard <hash trước đó> rồi git push --force
- [x] git revert <hash> — tạo một commit MỚI đảo ngược thay đổi của commit lỗi
- [ ] Xóa nhánh main trên remote rồi push lại từ máy local

## Giải thích (VI)
git revert <hash>. Nó tạo commit mới có nội dung ngược lại commit lỗi, giữ nguyên toàn bộ lịch sử cũ. Người khác chỉ cần git pull bình thường. reset + force push trên nhánh chung là thứ nên tránh: nó làm lệch lịch sử của mọi người đã pull.

### Giải thích các phương án:
- **git commit --amend để sửa lại commit lỗi rồi push bình thường** (Sai): Amend đổi hash nên cũng viết lại lịch sử, và push thường sẽ bị từ chối.
- **git reset --hard <hash trước đó> rồi git push --force** (Sai): Cách này viết lại lịch sử chung và làm hỏng bản sao của mọi người đã pull.
- **git revert <hash> — tạo một commit MỚI đảo ngược thay đổi của commit lỗi** (Đúng): Lịch sử không bị viết lại nên bản sao của người khác không bị ảnh hưởng. Revert là cách hoàn tác duy nhất an toàn cho nhánh đã chia sẻ.
- **Xóa nhánh main trên remote rồi push lại từ máy local** (Sai): Cực kỳ phá hoại và không giải quyết được gì hơn revert.
