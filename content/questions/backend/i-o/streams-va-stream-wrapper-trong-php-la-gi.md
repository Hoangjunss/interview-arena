---
id: streams-va-stream-wrapper-trong-php-la-gi
position: backend
technology: i-o
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Streams và stream wrapper trong PHP là gì?

## Question (EN)
What are streams and stream wrappers in PHP?

## Đáp án chi tiết (VI)
**Stream** là lớp trừu tượng chung cho mọi nguồn dữ liệu tuần tự — file, socket mạng, bộ nhớ, dữ liệu nén. Chính vì thế `fopen/fread/fwrite/file_get_contents` dùng được cho cả file lẫn URL mà không đổi API.\
\
**Stream wrapper** là \\"driver\\" xử lý một **scheme** trong URL:\
- `file://` (mặc định), `http://` / `https://`, `ftp://`\
- `php://` — các luồng đặc biệt: `php://input` (body request thô), `php://memory`, `php://temp`, `php://stdin/stdout`\
- `data://`, `phar://`, và nén `compress.zlib://`, `compress.bzip2://`\
\
```php\
$body = file_get_contents('php://input');       // đọc raw request body\
$fh = fopen('compress.zlib://big.log.gz', 'r'); // đọc file gzip như file thường\
```\
\
- **Stream context** truyền option (HTTP header, timeout, cấu hình SSL) qua `stream_context_create()`.\
- Có thể tự viết wrapper qua `stream_wrapper_register()`.\
- **Bảo mật:** bật `allow_url_include` hay để `phar://` chạy trên input không tin cậy có thể dẫn tới RCE/deserialization — kiểm soát chặt scheme cho phép.

## Detailed Answer (EN)
$83
