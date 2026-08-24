---
id: quiz-network-http-vi-sao-thao-tac-tao-don-hang-qua-post-can-khoa-chong-trung-idempotency-key
position: backend
technology: network-http
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao thao tác tạo đơn hàng qua POST cần khóa chống trùng (idempotency key)?

## Đáp án trắc nghiệm
- [ ] Vì POST không mã hóa dữ liệu trong body của request
- [x] Vì POST không bất biến khi gọi lặp lại
- [ ] Vì POST không được trình duyệt cache lại
- [ ] Vì POST có giới hạn kích thước dữ liệu gửi lên

## Giải thích (VI)
Vì POST không bất biến khi lặp : gọi hai lần tạo ra hai đơn. Mà gọi lại là chuyện thường xuyên — mạng chập chờn, client tự thử lại, người dùng bấm hai lần. Khóa chống trùng cho phép máy chủ nhận ra lần gọi lặp và trả về kết quả cũ thay vì tạo mới.

### Giải thích các phương án:
- **Vì POST không mã hóa dữ liệu trong body của request** (Sai): Mã hóa do HTTPS đảm nhiệm, không liên quan tới phương thức.
- **Vì POST không bất biến khi gọi lặp lại** (Đúng): Mạng chập chờn hoặc người dùng bấm hai lần đều dẫn tới gọi lại.
- **Vì POST không được trình duyệt cache lại** (Sai): Đúng nhưng không liên quan tới việc tạo trùng.
- **Vì POST có giới hạn kích thước dữ liệu gửi lên** (Sai): Giới hạn kích thước là chuyện cấu hình máy chủ.
