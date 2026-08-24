---
id: quiz-ci-cd-continuous-integration-nghia-la-gi
position: backend
technology: ci-cd
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Continuous Integration nghĩa là gì?

## Đáp án trắc nghiệm
- [x] Gộp code vào nhánh chính thường xuyên, mỗi lần đều kiểm tự động
- [ ] Dùng một công cụ CI như GitHub Actions cho toàn bộ dự án
- [ ] Tự động deploy lên production sau mỗi lần commit
- [ ] Chạy toàn bộ test suite mỗi đêm theo lịch định sẵn

## Giải thích (VI)
Gộp code vào nhánh chính thường xuyên (ít nhất mỗi ngày), mỗi lần gộp đều chạy build và test tự động. Cốt lõi là nhánh sống ngắn và phản hồi nhanh, không phải việc cài một công cụ.

### Giải thích các phương án:
- **Gộp code vào nhánh chính thường xuyên, mỗi lần đều kiểm tự động** (Đúng): Mục đích là phát hiện xung đột và lỗi sớm, khi thay đổi còn nhỏ.
- **Dùng một công cụ CI như GitHub Actions cho toàn bộ dự án** (Sai): Công cụ chỉ là phương tiện, không phải định nghĩa.
- **Tự động deploy lên production sau mỗi lần commit** (Sai): Đó là continuous deployment, một bước khác.
- **Chạy toàn bộ test suite mỗi đêm theo lịch định sẵn** (Sai): Có ích nhưng phản hồi quá muộn so với tinh thần của CI.
