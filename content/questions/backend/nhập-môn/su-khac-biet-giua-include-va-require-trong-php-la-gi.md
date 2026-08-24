---
id: su-khac-biet-giua-include-va-require-trong-php-la-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa `include` và `require` trong PHP là gì?

## Question (EN)
What is the difference between include and require?

## Đáp án chi tiết (VI)
Cả hai đều nhúng file PHP bên ngoài, nhưng khác nhau ở cách xử lý lỗi. `include` chỉ cảnh báo (E_WARNING) nếu file không tồn tại và tiếp tục chạy, còn `require` báo lỗi nghiêm trọng (E_ERROR) và dừng thực thi ngay. `include_once` và `require_once` chỉ nhúng file một lần duy nhất trong cùng script. Dùng `require` cho các file thiết yếu (như kết nối database) và `include` cho các thành phần không bắt buộc (như sidebar template).

## Detailed Answer (EN)
Both include external PHP files, but `include` produces a warning (E_WARNING) if the file isn't found and continues script execution, while `require` throws a fatal error (E_ERROR) and stops execution immediately. Additionally, `include_once` and `require_once` include a file only if it hasn't been included before in the same script. Use `require` for critical files (like database connection) and `include` for optional components (like sidebar templates).
