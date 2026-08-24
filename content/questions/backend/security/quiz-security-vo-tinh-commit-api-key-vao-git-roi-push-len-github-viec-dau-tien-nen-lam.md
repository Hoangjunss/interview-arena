---
id: quiz-security-vo-tinh-commit-api-key-vao-git-roi-push-len-github-viec-dau-tien-nen-lam
position: backend
technology: security
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vô tình commit API key vào git rồi push lên GitHub. Việc đầu tiên nên làm?

## Đáp án trắc nghiệm
- [ ] Xoá commit đó khỏi lịch sử rồi force push lên lại
- [x] Thu hồi key đó ngay, rồi dọn lịch sử git
- [ ] Đổi repository sang chế độ private để không ai còn thấy nữa
- [ ] Thêm tệp vào .gitignore rồi commit lại cho sạch

## Giải thích (VI)
Thu hồi (revoke) key trước tiên và phát key mới. Bot quét GitHub liên tục và thường tìm thấy secret trong vòng vài phút, nên phải coi như key đã bị lộ. Dọn lịch sử git là việc làm sau, không thay thế việc thu hồi.

### Giải thích các phương án:
- **Xoá commit đó khỏi lịch sử rồi force push lên lại** (Sai): Key vẫn có thể đã bị bot quét và lưu lại trước khi bạn xoá.
- **Thu hồi key đó ngay, rồi dọn lịch sử git** (Đúng): Key đã public thì phải coi như đã bị lộ; xoá commit không lấy lại được bí mật.
- **Đổi repository sang chế độ private để không ai còn thấy nữa** (Sai): Key vẫn còn trong lịch sử và có thể đã bị lấy trước đó.
- **Thêm tệp vào .gitignore rồi commit lại cho sạch** (Sai): Không xoá được thứ đã nằm trong lịch sử và đã được push.
