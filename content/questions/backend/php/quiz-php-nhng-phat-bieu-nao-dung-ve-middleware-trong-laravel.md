---
id: quiz-php-nhng-phat-bieu-nao-dung-ve-middleware-trong-laravel
position: backend
technology: php
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những phát biểu nào đúng về middleware trong Laravel?

## Đáp án trắc nghiệm
- [x] Global middleware chạy cho mọi request; middleware gắn route chỉ chạy cho route đó
- [ ] Mỗi request chỉ được đi qua tối đa một middleware
- [ ] Middleware chỉ chạy được sau khi controller xử lý xong

## Giải thích (VI)
Middleware là pipeline : request đi qua chuỗi lớp lồng nhau trước khi tới controller, response đi ngược ra. Mỗi middleware quyết định gọi $next($request) để cho đi tiếp, hoặc trả response ngay để chặn. Global chạy cho mọi request; middleware gắn route chỉ chạy cho route đó. Thứ tự có ý nghĩa .

### Giải thích các phương án:
- **Global middleware chạy cho mọi request; middleware gắn route chỉ chạy cho route đó** (Đúng): Hai phạm vi đăng ký khác nhau: toàn app so với từng route/group.
- **Mỗi request chỉ được đi qua tối đa một middleware** (Sai): Request đi qua cả chuỗi middleware lồng nhau như các lớp hành tây.
- **Middleware chỉ chạy được sau khi controller xử lý xong** (Sai): Middleware chạy được cả trước lẫn sau — code sau $next($request) chạy sau controller.
