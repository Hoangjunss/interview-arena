---
id: quiz-php-declarestricttypes1-o-dau-file-thay-doi-dieu-gi
position: backend
technology: php
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
declare(strict_types=1) ở đầu file thay đổi điều gì?

## Đáp án trắc nghiệm
- [ ] Bắt buộc mọi biến trong file phải khai báo kiểu trước khi dùng
- [ ] Áp dụng strict mode cho toàn bộ project kể từ file đầu tiên khai báo nó
- [ ] Tắt hoàn toàn type juggling, khiến == hoạt động giống ===
- [x] Gọi hàm với scalar sai kiểu sẽ ném TypeError thay vì tự ép kiểu

## Giải thích (VI)
Bật strict mode cho type declaration : gọi hàm khai báo int mà truyền '5' (string) sẽ ném TypeError thay vì tự ép kiểu như weak mode mặc định. Phạm vi theo từng file — chỉ áp dụng cho lời gọi viết trong file có declare, không lan sang file khác.

### Giải thích các phương án:
- **Bắt buộc mọi biến trong file phải khai báo kiểu trước khi dùng** (Sai): PHP không có khai báo kiểu cho biến thường; strict types chỉ tác động type declaration của hàm.
- **Áp dụng strict mode cho toàn bộ project kể từ file đầu tiên khai báo nó** (Sai): strict types có phạm vi theo từng file — chỉ các lời gọi hàm viết trong file đó bị ảnh hưởng.
- **Tắt hoàn toàn type juggling, khiến == hoạt động giống ===** (Sai): Toán tử so sánh không thay đổi; strict types chỉ liên quan tới tham số và giá trị trả về của hàm.
- **Gọi hàm với scalar sai kiểu sẽ ném TypeError thay vì tự ép kiểu** (Đúng): Mặc định (weak mode) PHP ép '5' thành int 5 khi hàm khai báo int; strict mode từ chối và ném TypeError.
