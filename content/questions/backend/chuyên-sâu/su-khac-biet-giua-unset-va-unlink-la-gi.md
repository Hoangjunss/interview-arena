---
id: su-khac-biet-giua-unset-va-unlink-la-gi
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa `unset()` và `unlink()` là gì?

## Question (EN)
What is the difference between unset() and unlink()?

## Đáp án chi tiết (VI)
`unset()` xóa biến khỏi bộ nhớ, giải phóng giá trị của nó nhưng không xóa file nếu biến đó chứa tên file. Dùng để dọn dẹp: `unset($tempVar)`. `unlink()` xóa file khỏi hệ thống: `unlink(\\"oldfile.txt\\")` xóa vĩnh viễn file đó. Lỗi phổ biến là dùng `unset()` nghĩ rằng nó xóa file—luôn dùng `unlink()` để xóa file. Trong ngữ cảnh database, `unset($result)` chỉ xóa biến kết quả còn kết nối vẫn tồn tại.

## Detailed Answer (EN)
`unset()` removes a variable from memory, clearing its value but not deleting the file if it's a filename. Use for cleanup: `unset($tempVar)`. `unlink()` deletes files from the filesystem: `unlink(\\"oldfile.txt\\")` permanently removes the file. In database context, `unset($result)` clears result variable while connection persists. Common mistake: using `unset()` thinking it deletes files—always use `unlink()` for file deletion.
