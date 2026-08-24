---
id: quiz-php-trong-app-chay-php-fpm-mot-dev-dung-bien-static-de-cache-d-lieu-gia-cac-request
position: backend
technology: php
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong app chạy PHP-FPM, một dev dùng biến static để cache dữ liệu giữa các request. Kết quả?

## Đáp án trắc nghiệm
- [x] Không hoạt động — mỗi request bắt đầu với state mới
- [ ] Cache hoạt động nếu bật OPcache
- [ ] Cache hoạt động vì worker của FPM là process chạy lâu dài
- [ ] Chỉ mất cache khi request rơi vào worker khác

## Giải thích (VI)
Không hoạt động. PHP theo mô hình share-nothing : mỗi request thực thi script từ đầu và mọi biến (kể cả static) bị huỷ khi request kết thúc. Muốn cache giữa các request phải dùng nơi lưu ngoài process: Redis, Memcached, APCu, file.

### Giải thích các phương án:
- **Không hoạt động — mỗi request bắt đầu với state mới** (Đúng): PHP theo mô hình share-nothing: script chạy lại từ đầu ở mỗi request.
- **Cache hoạt động nếu bật OPcache** (Sai): OPcache chỉ cache bytecode đã biên dịch, không giữ giá trị biến runtime.
- **Cache hoạt động vì worker của FPM là process chạy lâu dài** (Sai): Worker sống lâu nhưng state của script bị dọn sạch sau mỗi request.
- **Chỉ mất cache khi request rơi vào worker khác** (Sai): Ngay cả cùng một worker, biến của request trước cũng không còn.
