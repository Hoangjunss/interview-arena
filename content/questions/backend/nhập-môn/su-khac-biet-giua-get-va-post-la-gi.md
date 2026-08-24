---
id: su-khac-biet-giua-get-va-post-la-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa `$_GET` và `$_POST` là gì?

## Question (EN)
What's the difference between $_GET and $_POST?

## Đáp án chi tiết (VI)
Cả hai đều thu thập dữ liệu từ form nhưng khác nhau về tính bảo mật và giới hạn dữ liệu. `$_GET` đính kèm dữ liệu vào URL (dễ nhìn thấy), giới hạn khoảng 2KB và không an toàn cho dữ liệu nhạy cảm. `$_POST` gửi dữ liệu trong body của request (ẩn với URL), có giới hạn dung lượng lớn hơn nhiều (do `post_max_size` trong php.ini, mặc định ~8MB) và an toàn hơn cho mật khẩu hay thông tin cá nhân. Dùng `$_GET` khi lọc/tìm kiếm và muốn bookmark URL, dùng `$_POST` cho các form nhập dữ liệu nhạy cảm.

## Detailed Answer (EN)
Both collect form data but differ in visibility and security. `$_GET` appends data to the URL making it visible (http://example.com?name=John), has a 2KB limit, and is less secure for sensitive data. `$_POST` sends data in the request body (hidden from URL), has a much larger data limit (controlled by `post_max_size` in php.ini, default ~8MB), and is more secure for passwords or personal information. Use `$_GET` for filtering/searching where visibility helps, and `$_POST` for sensitive data entry.
