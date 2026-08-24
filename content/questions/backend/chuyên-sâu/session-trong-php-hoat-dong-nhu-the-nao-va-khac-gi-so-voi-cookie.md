---
id: session-trong-php-hoat-dong-nhu-the-nao-va-khac-gi-so-voi-cookie
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Session trong PHP hoạt động như thế nào và khác gì so với Cookie?

## Question (EN)
How do PHP sessions work and what's the difference from cookies?

## Đáp án chi tiết (VI)
Session lưu dữ liệu người dùng trên server để duy trì trạng thái giữa các request. Bắt đầu bằng `session_start()`, rồi truy cập qua `$_SESSION[\\"key\\"] = value`. Dữ liệu ở trên server, chỉ gửi session ID về trình duyệt qua cookie. Cookie lưu dữ liệu trên client, gửi kèm mọi request, giới hạn ~4KB, và người dùng có thể sửa đổi. Session an toàn hơn vì dữ liệu ẩn với client, phù hợp cho dữ liệu nhạy cảm. Dùng `session_destroy()` để kết thúc session, `unset($_SESSION[\\"key\\"])` để xóa dữ liệu cụ thể.

## Detailed Answer (EN)
Sessions store user data on the server, maintaining state across requests. Start with `session_start()`, then access with `$_SESSION[\\"key\\"] = value`. Data persists on server, only a session ID sent to browser in a cookie. Cookies store data on the client, sent with every request, limited to ~4KB, and users can modify them. Sessions are more secure (data hidden from client), better for sensitive data. Use `session_destroy()` to end session, `unset($_SESSION[\\"key\\"])` to remove specific data.
