---
id: quiz-ci-cd-dockerfile-copy-toan-bo-source-truoc-khi-npm-install-van-de
position: backend
technology: ci-cd
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dockerfile copy toàn bộ source trước khi npm install. Vấn đề?

## Đáp án trắc nghiệm
- [ ] Build sẽ thất bại vì thiếu tệp lockfile
- [ ] Dependency có thể được cài sai phiên bản
- [ ] Image sẽ lớn hơn mức cần thiết vì chứa cả source
- [x] Sửa một dòng code là phải cài lại toàn bộ dependency của dự án

## Giải thích (VI)
Mất cache layer : Docker tính lại từ layer bị đổi trở đi, nên sửa một dòng code làm npm install chạy lại từ đầu. Thứ tự đúng: copy package.json + lockfile → install → rồi mới copy phần source còn lại.

### Giải thích các phương án:
- **Build sẽ thất bại vì thiếu tệp lockfile** (Sai): Copy toàn bộ source thì lockfile cũng có mặt.
- **Dependency có thể được cài sai phiên bản** (Sai): Phiên bản do lockfile quyết định, không phụ thuộc thứ tự copy.
- **Image sẽ lớn hơn mức cần thiết vì chứa cả source** (Sai): Kích thước liên quan tới nội dung, không phải thứ tự lệnh.
- **Sửa một dòng code là phải cài lại toàn bộ dependency của dự án** (Đúng): Copy lockfile trước rồi install, sau đó mới copy source thì cache dùng lại được.
