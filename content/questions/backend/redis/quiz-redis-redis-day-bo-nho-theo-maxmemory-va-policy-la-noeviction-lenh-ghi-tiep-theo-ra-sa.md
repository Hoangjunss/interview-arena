---
id: quiz-redis-redis-day-bo-nho-theo-maxmemory-va-policy-la-noeviction-lenh-ghi-tiep-theo-ra-sa
position: backend
technology: redis
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Redis đầy bộ nhớ theo maxmemory và policy là noeviction. Lệnh ghi tiếp theo ra sao?

## Đáp án trắc nghiệm
- [ ] Redis tự xoá các key cũ nhất trong keyspace để nhường chỗ
- [x] Lệnh ghi bị trả lỗi, lệnh đọc vẫn phục vụ bình thường
- [ ] Redis ghi tràn sang đĩa như bộ nhớ ảo
- [ ] Tiến trình Redis tự khởi động lại để giải phóng bộ nhớ

## Giải thích (VI)
Lệnh ghi bị lỗi (OOM), lệnh đọc vẫn chạy. Nếu Redis đóng vai cache thì noeviction là cấu hình sai — nên đặt allkeys-lru để nó tự nhường chỗ. Nếu Redis giữ dữ liệu không được phép mất (queue, session bắt buộc) thì noeviction mới đúng.

### Giải thích các phương án:
- **Redis tự xoá các key cũ nhất trong keyspace để nhường chỗ** (Sai): Đó là hành vi của các policy allkeys-*, không phải noeviction.
- **Lệnh ghi bị trả lỗi, lệnh đọc vẫn phục vụ bình thường** (Đúng): Client thấy lỗi OOM khi ghi, nên tầng ứng dụng phải xử lý tình huống này.
- **Redis ghi tràn sang đĩa như bộ nhớ ảo** (Sai): Tính năng bộ nhớ ảo đã bị loại bỏ từ lâu.
- **Tiến trình Redis tự khởi động lại để giải phóng bộ nhớ** (Sai): Redis không tự khởi động lại; chỉ hệ điều hành mới có thể kill tiến trình.
