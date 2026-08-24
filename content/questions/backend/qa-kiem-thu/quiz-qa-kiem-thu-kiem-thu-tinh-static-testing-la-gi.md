---
id: quiz-qa-kiem-thu-kiem-thu-tinh-static-testing-la-gi
position: backend
technology: qa-kiem-thu
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kiểm thử tĩnh (static testing) là gì?

## Đáp án trắc nghiệm
- [ ] Kiểm thử giao diện không có tương tác người dùng
- [ ] Kiểm thử phiên bản đã đóng băng, không còn thay đổi
- [ ] Chạy test trên môi trường có dữ liệu cố định
- [x] Xem xét sản phẩm mà không thực thi mã nguồn

## Giải thích (VI)
Xem xét sản phẩm công việc mà không chạy mã : review yêu cầu, review thiết kế, review code, và phân tích tĩnh bằng công cụ (linter, quét bảo mật, kiểm tra kiểu). Nó tìm được cả lỗi trong tài liệu, thứ mà kiểm thử động không chạm tới.

### Giải thích các phương án:
- **Kiểm thử giao diện không có tương tác người dùng** (Sai): Giao diện vẫn phải chạy mới kiểm được.
- **Kiểm thử phiên bản đã đóng băng, không còn thay đổi** (Sai): Trạng thái phiên bản không liên quan tới định nghĩa.
- **Chạy test trên môi trường có dữ liệu cố định** (Sai): Vẫn là thực thi nên thuộc kiểm thử động.
- **Xem xét sản phẩm mà không thực thi mã nguồn** (Đúng): Bao gồm review tài liệu, review code và phân tích tĩnh bằng công cụ.
