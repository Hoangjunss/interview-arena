---
id: quiz-system-design-cho-user-upload-video-500mb-luong-nao-dung
position: system-design
technology: system-design
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cho user upload video 500MB. Luồng nào đúng?

## Đáp án trắc nghiệm
- [ ] Client gửi file lên server, server chuyển tiếp lên S3
- [x] Server phát presigned URL, client upload thẳng lên storage
- [ ] Lưu file vào cột kiểu blob trong cơ sở dữ liệu
- [ ] Lưu vào đĩa của server rồi để một job nền đẩy dần lên storage

## Giải thích (VI)
Presigned URL : server xác thực rồi phát một URL có thời hạn, client PUT thẳng lên S3/R2. Server không bao giờ giữ 500MB trong bộ nhớ hay băng thông, và upload không bị giới hạn thời gian request.

### Giải thích các phương án:
- **Client gửi file lên server, server chuyển tiếp lên S3** (Sai): Server thành nút cổ chai và tốn gấp đôi băng thông cho mỗi file.
- **Server phát presigned URL, client upload thẳng lên storage** (Đúng): File không đi qua server ứng dụng nên không chiếm băng thông và bộ nhớ của nó.
- **Lưu file vào cột kiểu blob trong cơ sở dữ liệu** (Sai): Làm phình DB, backup chậm, và không có CDN phục vụ file.
- **Lưu vào đĩa của server rồi để một job nền đẩy dần lên storage** (Sai): Đĩa server thành trạng thái phải quản lý và không scale ngang được.
