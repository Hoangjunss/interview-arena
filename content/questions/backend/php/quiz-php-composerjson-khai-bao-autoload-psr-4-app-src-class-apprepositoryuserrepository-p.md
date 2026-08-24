---
id: quiz-php-composerjson-khai-bao-autoload-psr-4-app-src-class-apprepositoryuserrepository-p
position: backend
technology: php
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
composer.json khai báo "autoload": {"psr-4": {"App\\": "src/"}}. Class App\Repository\UserRepository phải nằm ở file nào?

## Đáp án trắc nghiệm
- [ ] src/App/Repository/UserRepository.php — giữ nguyên toàn bộ namespace làm đường dẫn
- [ ] File nào cũng được, miễn có require thủ công ở đầu file dùng nó
- [ ] src/repository/user-repository.php — PSR-4 quy định đường dẫn viết thường
- [x] src/Repository/UserRepository.php

## Giải thích (VI)
src/Repository/UserRepository.php. Quy tắc PSR-4: bỏ namespace prefix đã khai báo (App\ → src/), phần namespace còn lại ánh xạ thành cây thư mục, tên class thành tên file .php — khớp chính xác hoa thường. Composer sinh autoloader từ ánh xạ này qua vendor/autoload.php.

### Giải thích các phương án:
- **src/App/Repository/UserRepository.php — giữ nguyên toàn bộ namespace làm đường dẫn** (Sai): Prefix App\ đã được ánh xạ vào src/ nên không lặp lại App trong đường dẫn.
- **File nào cũng được, miễn có require thủ công ở đầu file dùng nó** (Sai): Làm vậy bỏ luôn lợi ích autoload; PSR-4 tồn tại để không phải require thủ công.
- **src/repository/user-repository.php — PSR-4 quy định đường dẫn viết thường** (Sai): PSR-4 yêu cầu tên file khớp chính xác tên class, phân biệt hoa thường.
- **src/Repository/UserRepository.php** (Đúng): Bỏ prefix App\ (đã map vào src/), phần namespace còn lại thành thư mục, tên class thành tên file .php.
