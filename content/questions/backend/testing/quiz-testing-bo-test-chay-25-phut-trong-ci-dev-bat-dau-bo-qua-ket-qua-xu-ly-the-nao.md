---
id: quiz-testing-bo-test-chay-25-phut-trong-ci-dev-bat-dau-bo-qua-ket-qua-xu-ly-the-nao
position: backend
technology: testing
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bộ test chạy 25 phút trong CI, dev bắt đầu bỏ qua kết quả. Xử lý thế nào?

## Đáp án trắc nghiệm
- [ ] Chỉ chạy toàn bộ bộ test một lần vào mỗi đêm
- [ ] Giảm số lượng test để bộ test chạy nhanh hơn
- [ ] Yêu cầu dev chờ đủ 25 phút trước khi được merge nhánh
- [x] Chạy song song, tách tầng: test nhanh chặn merge, chậm chạy sau

## Giải thích (VI)
Hai việc song song: chạy test song song (chia shard theo file, mỗi worker một DB riêng) và tách tầng — unit + integration nhanh làm điều kiện merge, e2e đầy đủ chạy sau khi merge hoặc theo lịch.

### Giải thích các phương án:
- **Chỉ chạy toàn bộ bộ test một lần vào mỗi đêm** (Sai): Lỗi được phát hiện quá muộn, khi đã có nhiều commit chồng lên.
- **Giảm số lượng test để bộ test chạy nhanh hơn** (Sai): Mất phần bảo vệ mà không giải quyết vấn đề tổ chức.
- **Yêu cầu dev chờ đủ 25 phút trước khi được merge nhánh** (Sai): Chống lại hành vi con người thay vì sửa nguyên nhân.
- **Chạy song song, tách tầng: test nhanh chặn merge, chậm chạy sau** (Đúng): Phản hồi nhanh mới giữ được thói quen đọc kết quả CI.
