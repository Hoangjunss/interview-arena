---
id: quiz-git-sua-nham-mot-file-va-muon-tra-no-ve-dung-ban-da-commit-gan-nhat-dung-lenh-nao
position: backend
technology: git
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sửa nhầm một file và muốn trả nó về đúng bản đã commit gần nhất. Dùng lệnh nào?

## Đáp án trắc nghiệm
- [ ] git reset --hard — cách duy nhất để bỏ thay đổi
- [ ] git clean <file> — dọn thay đổi về trạng thái sạch
- [x] git restore <file> — bỏ thay đổi chưa staged của riêng file đó
- [ ] git revert <file> — hoàn tác thay đổi trên một file

## Giải thích (VI)
git restore <file> trả file về bản trong staging (hoặc commit gần nhất nếu chưa stage gì). Đã lỡ git add thì git restore --staged <file> gỡ khỏi staging trước. Lưu ý: thay đổi bị bỏ đi là mất hẳn, Git chưa từng lưu chúng.

### Giải thích các phương án:
- **git reset --hard — cách duy nhất để bỏ thay đổi** (Sai): Nó bỏ thay đổi của TOÀN BỘ working directory, không chỉ file đó.
- **git clean <file> — dọn thay đổi về trạng thái sạch** (Sai): git clean chỉ xóa file CHƯA được theo dõi.
- **git restore <file> — bỏ thay đổi chưa staged của riêng file đó** (Đúng): git restore là lệnh chuyên cho việc khôi phục file trong working directory. Nếu đã git add rồi thì git restore --staged <file> gỡ khỏi staging trước.
- **git revert <file> — hoàn tác thay đổi trên một file** (Sai): git revert làm việc với commit, không nhận tham số là file.
