---
id: quiz-ci-cd-feature-flag-giup-gi-cho-quy-trinh-phat-hanh
position: backend
technology: ci-cd
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Feature flag giúp gì cho quy trình phát hành?

## Đáp án trắc nghiệm
- [ ] Giảm kích thước bundle vì code chưa bật không được tải
- [x] Tách việc deploy code khỏi việc bật tính năng
- [ ] Thay thế được nhu cầu có môi trường staging
- [ ] Cho phép bỏ qua bước test trước khi deploy

## Giải thích (VI)
Tách deploy (đưa code lên) khỏi release (bật cho người dùng). Nhờ đó gộp code sớm mà chưa lộ tính năng, bật dần cho một phần người dùng, và tắt ngay khi có sự cố mà không phải rollback.

### Giải thích các phương án:
- **Giảm kích thước bundle vì code chưa bật không được tải** (Sai): Code vẫn nằm trong bundle trừ khi tách riêng bằng cách khác.
- **Tách việc deploy code khỏi việc bật tính năng** (Đúng): Code lên production sớm nhưng chỉ hiện khi bật cờ, và tắt được ngay khi có sự cố.
- **Thay thế được nhu cầu có môi trường staging** (Sai): Staging vẫn cần cho việc kiểm thử tích hợp.
- **Cho phép bỏ qua bước test trước khi deploy** (Sai): Code tắt cờ vẫn nằm trên production nên vẫn cần test.
