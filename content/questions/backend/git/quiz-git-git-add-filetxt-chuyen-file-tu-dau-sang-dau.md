---
id: quiz-git-git-add-filetxt-chuyen-file-tu-dau-sang-dau
position: backend
technology: git
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
git add file.txt chuyển file từ đâu sang đâu?

## Đáp án trắc nghiệm
- [ ] Từ máy local lên remote server, tương đương một nửa của git push
- [ ] Từ working directory thẳng vào repository, nên sau git add là đã có commit mới
- [ ] Từ staging area trở lại working directory để hủy thay đổi
- [x] Từ working directory sang staging area (index)

## Giải thích (VI)
Git có ba khu vực: working directory (file bạn đang sửa), staging area/index (những gì sẽ vào commit tới), repository (lịch sử commit). git add đưa thay đổi từ khu vực một sang khu vực hai. git commit mới đưa từ hai sang ba.

### Giải thích các phương án:
- **Từ máy local lên remote server, tương đương một nửa của git push** (Sai): git add hoàn toàn cục bộ, không chạm tới remote.
- **Từ working directory thẳng vào repository, nên sau git add là đã có commit mới** (Sai): Chỉ git commit mới tạo commit; git add dừng lại ở staging.
- **Từ staging area trở lại working directory để hủy thay đổi** (Sai): Đó là chiều ngược lại, thuộc về git restore --staged.
- **Từ working directory sang staging area (index)** (Đúng): Đúng ba khu vực của Git: working directory → staging area → repository. Nó đánh dấu bản thay đổi này sẽ nằm trong commit kế tiếp, và chưa hề ghi gì vào lịch sử repository.
