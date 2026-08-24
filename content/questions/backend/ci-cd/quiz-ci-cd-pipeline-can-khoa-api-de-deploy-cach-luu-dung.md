---
id: quiz-ci-cd-pipeline-can-khoa-api-de-deploy-cach-luu-dung
position: backend
technology: ci-cd
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pipeline cần khoá API để deploy. Cách lưu đúng?

## Đáp án trắc nghiệm
- [ ] Mã hoá rồi commit vào repo, giải mã lúc chạy pipeline
- [ ] Truyền vào bằng tay mỗi lần chạy pipeline deploy
- [x] Trong secret của CI, đọc qua biến môi trường
- [ ] Trong tệp cấu hình của pipeline, đã nằm trong repo riêng tư

## Giải thích (VI)
Dùng secret store của CI (GitHub Actions secrets, biến môi trường của nền tảng deploy), tham chiếu qua biến môi trường trong job. Không bao giờ commit secret, kể cả trong repo riêng tư.

### Giải thích các phương án:
- **Mã hoá rồi commit vào repo, giải mã lúc chạy pipeline** (Sai): Vẫn phải lưu khoá giải mã ở đâu đó, nên chỉ dịch chuyển vấn đề.
- **Truyền vào bằng tay mỗi lần chạy pipeline deploy** (Sai): Không tự động hoá được và khoá dễ bị dán vào chỗ không an toàn.
- **Trong secret của CI, đọc qua biến môi trường** (Đúng): Secret được mã hoá, không hiện trong log, và phân quyền theo môi trường được.
- **Trong tệp cấu hình của pipeline, đã nằm trong repo riêng tư** (Sai): Ai đọc được repo là thấy khoá, kể cả qua lịch sử git.
