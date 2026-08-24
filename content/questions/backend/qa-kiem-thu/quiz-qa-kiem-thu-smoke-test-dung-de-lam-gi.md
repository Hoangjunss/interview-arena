---
id: quiz-qa-kiem-thu-smoke-test-dung-de-lam-gi
position: backend
technology: qa-kiem-thu
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Smoke test dùng để làm gì?

## Đáp án trắc nghiệm
- [x] Kiểm nhanh các chức năng cốt lõi
- [ ] Kiểm toàn bộ chức năng trước khi phát hành
- [ ] Kiểm hiệu năng hệ thống dưới tải cao
- [ ] Kiểm khả năng phục hồi sau sự cố

## Giải thích (VI)
Kiểm nhanh rằng các luồng cốt lõi còn chạy sau khi có bản build mới — đăng nhập, luồng nghiệp vụ chính, kết nối cơ sở dữ liệu. Nếu smoke test đỏ thì trả build lại ngay, không mất công chạy bộ test đầy đủ.

### Giải thích các phương án:
- **Kiểm nhanh các chức năng cốt lõi** (Đúng): Nếu luồng chính đã hỏng thì không đáng bỏ công chạy bộ test đầy đủ.
- **Kiểm toàn bộ chức năng trước khi phát hành** (Sai): Kiểm toàn bộ là bộ regression đầy đủ, không phải smoke test.
- **Kiểm hiệu năng hệ thống dưới tải cao** (Sai): Đó là kiểm thử tải, thuộc nhóm phi chức năng.
- **Kiểm khả năng phục hồi sau sự cố** (Sai): Đó là kiểm thử phục hồi, thuộc nhóm nghiệm thu vận hành.
