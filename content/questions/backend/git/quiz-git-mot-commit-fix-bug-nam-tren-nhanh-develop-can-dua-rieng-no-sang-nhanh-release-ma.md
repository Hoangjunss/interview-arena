---
id: quiz-git-mot-commit-fix-bug-nam-tren-nhanh-develop-can-dua-rieng-no-sang-nhanh-release-ma
position: backend
technology: git
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một commit fix bug nằm trên nhánh develop, cần đưa riêng nó sang nhánh release mà không kéo theo commit khác. Dùng gì?

## Đáp án trắc nghiệm
- [ ] git checkout <hash> -- . rồi commit — cách chuẩn để lấy một commit
- [ ] git stash từ nhánh này rồi pop ở nhánh kia
- [ ] git merge <hash> — merge được cho từng commit riêng lẻ
- [x] git cherry-pick <hash> — áp thay đổi của đúng commit đó lên nhánh hiện tại

## Giải thích (VI)
git cherry-pick <hash>. Nó tính phần thay đổi (diff) mà commit đó tạo ra rồi áp lên nhánh hiện tại thành một commit mới — nội dung giống, hash khác. Đây là công cụ chuẩn để backport một bản vá sang nhánh release.

### Giải thích các phương án:
- **git checkout <hash> -- . rồi commit — cách chuẩn để lấy một commit** (Sai): Cách này lấy toàn bộ trạng thái file tại commit đó, không phải riêng thay đổi của nó.
- **git stash từ nhánh này rồi pop ở nhánh kia** (Sai): Stash chỉ làm việc với thay đổi chưa commit.
- **git merge <hash> — merge được cho từng commit riêng lẻ** (Sai): Merge kéo theo toàn bộ lịch sử tới commit đó, không lấy lẻ được.
- **git cherry-pick <hash> — áp thay đổi của đúng commit đó lên nhánh hiện tại** (Đúng): Cherry-pick sinh ra chính cho việc lấy lẻ một commit sang nhánh khác. Nó tạo một commit MỚI với hash khác, còn commit gốc vẫn nguyên ở nhánh của nó.
