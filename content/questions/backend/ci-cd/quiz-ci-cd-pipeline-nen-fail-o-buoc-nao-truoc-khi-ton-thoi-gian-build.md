---
id: quiz-ci-cd-pipeline-nen-fail-o-buoc-nao-truoc-khi-ton-thoi-gian-build
position: backend
technology: ci-cd
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pipeline nên fail ở bước nào trước khi tốn thời gian build?

## Đáp án trắc nghiệm
- [ ] Build trước để chắc chắn code biên dịch được
- [ ] Test tích hợp chạy trước vì chúng bắt được nhiều lỗi
- [ ] Quét bảo mật trước vì đó là ưu tiên cao nhất
- [x] Lint và kiểm kiểu chạy trước vì nhanh nhất

## Giải thích (VI)
Nguyên tắc fail fast : xếp job theo thứ tự nhanh trước — lint và kiểm kiểu (giây) → unit test (phút) → build → integration → e2e. Lỗi rẻ nhất được phát hiện trước.

### Giải thích các phương án:
- **Build trước để chắc chắn code biên dịch được** (Sai): Kiểm kiểu đã bắt được phần lớn lỗi loại này và nhanh hơn nhiều.
- **Test tích hợp chạy trước vì chúng bắt được nhiều lỗi** (Sai): Chúng chậm nên đặt trước sẽ làm phản hồi lâu hơn.
- **Quét bảo mật trước vì đó là ưu tiên cao nhất** (Sai): Quan trọng nhưng thường chậm, nên đặt song song hoặc sau.
- **Lint và kiểm kiểu chạy trước vì nhanh nhất** (Đúng): Fail nhanh giúp người mở PR biết ngay thay vì chờ hết pipeline.
