---
id: quiz-git-them-env-vao-gitignore-nhung-file-nay-da-bi-commit-tu-truoc-sau-khi-sua-gitignor
position: backend
technology: git
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thêm .env vào .gitignore nhưng file này đã bị commit từ trước. Sau khi sửa .gitignore, Git có ngừng theo dõi nó không?

## Đáp án trắc nghiệm
- [ ] Có, nhưng phải chạy git gc để dọn trước
- [x] Không — .gitignore chỉ có tác dụng với file chưa được theo dõi
- [ ] Có — Git quét lại toàn bộ repository và tự gỡ theo dõi mọi file khớp mẫu
- [ ] Không, và cũng không có cách nào gỡ ngoài việc xóa hẳn repository

## Giải thích (VI)
Không. .gitignore chỉ ngăn file chưa được theo dõi lọt vào staging. File đã commit thì Git vẫn theo dõi tiếp. Gỡ bằng git rm --cached .env rồi commit — lệnh này xóa khỏi index nhưng giữ file trên đĩa.

### Giải thích các phương án:
- **Có, nhưng phải chạy git gc để dọn trước** (Sai): git gc dọn object không dùng, không liên quan tới trạng thái theo dõi.
- **Không — .gitignore chỉ có tác dụng với file chưa được theo dõi** (Đúng): File đã tracked vẫn tiếp tục được theo dõi, phải gỡ bằng git rm --cached .env rồi commit. Đây là hành vi được ghi rõ trong tài liệu và là lỗi phổ biến nhất với .gitignore.
- **Có — Git quét lại toàn bộ repository và tự gỡ theo dõi mọi file khớp mẫu** (Sai): Git không quét lại; quy tắc ignore chỉ áp cho file untracked.
- **Không, và cũng không có cách nào gỡ ngoài việc xóa hẳn repository** (Sai): git rm --cached giải quyết được việc này.
