---
id: quiz-php-session-trong-php-duy-tri-trang-thai-dang-nhap-gia-cac-request-bang-cach-nao
position: backend
technology: php
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Session trong PHP duy trì trạng thái đăng nhập giữa các request bằng cách nào?

## Đáp án trắc nghiệm
- [x] Server lưu dữ liệu theo session ID, browser gửi lại ID qua cookie
- [ ] Toàn bộ dữ liệu session được browser lưu trong cookie và gửi kèm mỗi request
- [ ] Server nhận diện người dùng qua địa chỉ IP
- [ ] Browser lưu dữ liệu vào localStorage và gửi kèm mỗi request

## Giải thích (VI)
Server sinh một session ID ngẫu nhiên, gửi về browser qua cookie. Mỗi request sau, browser tự gửi lại cookie đó; server dùng ID để tra dữ liệu session lưu ở phía mình (file, Redis, DB). Dữ liệu nhạy cảm không rời khỏi server — chỉ có ID di chuyển.

### Giải thích các phương án:
- **Server lưu dữ liệu theo session ID, browser gửi lại ID qua cookie** (Đúng): Cookie chỉ chứa ID; dữ liệu thật nằm ở phía server.
- **Toàn bộ dữ liệu session được browser lưu trong cookie và gửi kèm mỗi request** (Sai): Cookie mặc định chỉ mang session ID, không mang dữ liệu.
- **Server nhận diện người dùng qua địa chỉ IP** (Sai): IP thay đổi và nhiều người dùng chung IP nên không dùng để định danh.
- **Browser lưu dữ liệu vào localStorage và gửi kèm mỗi request** (Sai): localStorage thuộc về JavaScript, không tự gửi kèm request.
